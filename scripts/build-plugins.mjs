#!/usr/bin/env node
// build-plugins — assemble the self-hosted Claude Code marketplace from source.
// Reads packs/*.yaml + skills.json and writes committed output:
//   .claude-plugin/marketplace.json   one marketplace ("afx") listing every pack plugin
//   plugins/<plugin>/                 one plugin dir per pack (.claude-plugin/plugin.json + skills/)
// Source of truth stays skills/ + packs/; plugins/ is generated — never edit by hand.
// AFX-authored skills only are bundled; upstream-referenced skills are not re-bundled.
// Self-contained (Node stdlib only).
//
// Usage: node scripts/build-plugins.mjs [--out <dir>]   (--out overrides the output root; default repo root)

import { readFileSync, writeFileSync, existsSync, readdirSync, rmSync, mkdirSync, cpSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const outIdx = process.argv.indexOf('--out');
const OUT_ROOT = outIdx !== -1 ? join(ROOT, process.argv[outIdx + 1]) : ROOT;
const PLUGINS_DIR = join(OUT_ROOT, 'plugins');

const catalog = JSON.parse(readFileSync(join(ROOT, 'skills.json'), 'utf8'));
const version = catalog.version || '0.0.0';
const AUTHOR = { name: 'AgenticFlowX', email: 'noreply@agenticflowx.dev' };
const REPO_URL = 'https://github.com/AgenticFlowX/afx';
const MARKETPLACE_NAME = 'afx';
// The core workflow pack; listed first, add-ons after it.
const MAIN_PLUGIN = 'afx';

// Minimal parse of a pack yaml: name/description/category + every AFX-authored include block.
function parsePack(file) {
  const lines = readFileSync(file, 'utf8').split('\n');
  const top = k => (lines.find(l => l.startsWith(k + ':')) || '').split(':').slice(1).join(':').trim();
  const pack = {
    name: top('name'),
    // Optional override; defaults to the afx-pack-<x> → afx-<x> derivation below.
    pluginName: top('plugin-name'),
    description: top('description'),
    category: top('category'),
    afxIncludes: [],
  };
  // Capture all AgenticFlowX/afx include blocks. A pack may compose skills from
  // multiple source paths (for example, Architect uses skills/architect + skills/dev).
  let current = null;
  for (const raw of lines) {
    const l = raw.trim();
    if (l.startsWith('- repo:')) {
      current = l.includes('AgenticFlowX/afx') ? { path: null, items: [] } : null;
      if (current) pack.afxIncludes.push(current);
      continue;
    }
    if (current && l.startsWith('path:')) { current.path = l.slice('path:'.length).trim(); continue; }
    if (current && l.startsWith('- ') && !l.startsWith('- repo:')) current.items.push(l.slice(2).split('#')[0].trim());
  }
  return pack;
}

// Collect keywords from a skill's frontmatter `afx-tags: "a,b,c"` metadata line.
function skillTags(skillMdPath) {
  const match = readFileSync(skillMdPath, 'utf8').match(/^\s*afx-tags:\s*"([^"]*)"/m);
  return match ? match[1].split(',').map(t => t.trim()).filter(Boolean) : [];
}

const packFiles = readdirSync(join(ROOT, 'packs')).filter(f => /^afx-pack-.*\.yaml$/.test(f));

// ── Command rewriting ────────────────────────────────────────────────────────
// Source skills carry an `afx-` prefix because afx-cli installs them into a flat
// provider namespace where the prefix IS the namespace. Plugins namespace by
// plugin name already, so the prefix is stripped: afx-spec → /afx:spec.
// Every cross-reference in skill bodies (~1.2k of them) is rewritten to match,
// so a plugin user is never told to run a command that does not exist for them.
const exposedName = skill => skill.replace(/^afx-/, '');

const parsedPacks = packFiles.map(pf => {
  const pack = parsePack(join(ROOT, 'packs', pf));
  pack.pluginName = pack.pluginName || pack.name.replace(/^afx-pack-/, 'afx-');
  pack.declared = pack.afxIncludes.flatMap(inc => inc.items.map(skill => ({ skill, path: inc.path })));
  return pack;
});

// skill → "/plugin:name". A skill shipped by several packs (afx-hello, and
// afx-architecture-patterns) resolves to the core plugin when it is a member,
// since that is the pack a reader is most likely to have installed.
const COMMANDS = {};
for (const pack of parsedPacks) {
  for (const { skill } of pack.declared) {
    const preferred = COMMANDS[skill] && COMMANDS[skill].plugin === MAIN_PLUGIN;
    if (!preferred) COMMANDS[skill] = { plugin: pack.pluginName, command: `/${pack.pluginName}:${exposedName(skill)}` };
  }
}

// Match only invocable command forms: `/afx-task`, `` `/afx-spec` ``, `| /afx-adr |`.
// The lookbehind/lookahead reject path and URL contexts so
// `skills/agenticflowx/afx-spec/SKILL.md` and `.../main/afx-cli` are left intact.
const COMMAND_RE = /(?<![\w/.-])\/afx-([a-z][a-z0-9-]*)(?![\w/.-])/g;
// .mjs is included for helper scripts that assert on command strings. Rewriting is
// map-driven and position-guarded, so only real command tokens change.
const REWRITABLE = /\.(md|ya?ml|txt|json|mjs)$/i;

// Skills load each other's templates by relative directory (`../afx-spec/assets/…`).
// Those directories are renamed too, so the paths must follow or template reads fail.
// Both forms below are anchored so repo paths like `skills/agenticflowx/afx-spec/`
// can never match — only sibling (`../afx-x/`) and bare (`` `afx-x/assets/ ``) refs.
const SIBLING_DIR_RE = /((?:\.\.\/)+)afx-([a-z][a-z0-9-]*)\//g;
const BARE_DIR_RE = /(?<![\w/.-])afx-([a-z][a-z0-9-]*)\//g;

function rewriteCommands(text) {
  return text
    .replace(COMMAND_RE, (match, name) => {
      const target = COMMANDS[`afx-${name}`];
      return target ? target.command : match; // unknown (e.g. /afx-cli) stays as written
    })
    .replace(SIBLING_DIR_RE, (match, up, name) => (COMMANDS[`afx-${name}`] ? `${up}${name}/` : match))
    .replace(BARE_DIR_RE, (match, name) => (COMMANDS[`afx-${name}`] ? `${name}/` : match));
}

function rewriteTree(dir, counter) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) { rewriteTree(full, counter); continue; }
    if (!REWRITABLE.test(entry.name)) continue;
    const before = readFileSync(full, 'utf8');
    let after = rewriteCommands(before);
    if (entry.name === 'SKILL.md') {
      after = after
        // Match afx-cli's installed skill tree exactly.
        .replace(/^<!-- @afx:\/?provider-commands -->\n?/gm, '')
        // Frontmatter name drives the plugin:skill address.
        .replace(/^(name:\s*)afx-([a-z0-9-]+)\s*$/m, (_m, key, rest) => `${key}${rest}`);
    }
    if (after !== before) { writeFileSync(full, after); counter.files++; }
  }
}

rmSync(PLUGINS_DIR, { recursive: true, force: true });
mkdirSync(PLUGINS_DIR, { recursive: true });

const built = [];
const listings = [];
const rewriteStats = { files: 0 };
for (const pack of parsedPacks) {
  const declared = pack.declared;
  if (declared.length === 0) { console.error(`skip ${pack.name}: no AFX-authored skills`); continue; }
  const pluginName = pack.pluginName;
  const pluginDir = join(PLUGINS_DIR, pluginName);
  const skillsDir = join(pluginDir, 'skills');
  mkdirSync(join(pluginDir, '.claude-plugin'), { recursive: true });
  mkdirSync(skillsDir, { recursive: true });

  let copied = 0, missing = [];
  const keywords = new Set(['afx', 'agenticflowx']);
  for (const { skill, path } of declared) {
    if (!path) { missing.push(`${skill} (missing source path)`); continue; }
    const src = join(ROOT, path, skill);
    if (!existsSync(join(src, 'SKILL.md'))) { missing.push(`${path}${skill}`); continue; }
    const destination = join(skillsDir, exposedName(skill));
    cpSync(src, destination, { recursive: true });
    rewriteTree(destination, rewriteStats);
    for (const tag of skillTags(join(destination, 'SKILL.md'))) keywords.add(tag);
    copied++;
  }

  const runtimeNote = pack.name === 'afx-pack-agenticflowx'
    ? '. Node.js 18+ enables optional structured document queries; targeted-search fallback remains available.'
    : '';
  const listingDescription = pack.description + runtimeNote;
  const plugin = {
    name: pluginName,
    version,
    description: listingDescription,
    author: AUTHOR,
    homepage: `${REPO_URL}#readme`,
    repository: REPO_URL,
    license: catalog.license || 'MIT',
    keywords: [...keywords].slice(0, 12),
    skills: './skills/',
  };
  writeJson(join(pluginDir, '.claude-plugin', 'plugin.json'), plugin);
  listings.push({
    name: pluginName,
    source: `./plugins/${pluginName}`,
    description: listingDescription,
    version,
    author: { name: AUTHOR.name },
    category: pack.category,
    keywords: plugin.keywords,
  });
  built.push({ plugin: pluginName, skills: copied, missing });
  console.error(`built ${pluginName}: ${copied} skills${missing.length ? ' (missing: ' + missing.join(', ') + ')' : ''}`);
}

// Main pack first, add-ons after (alphabetical from readdir order).
listings.sort((a, b) => (a.name === MAIN_PLUGIN ? -1 : b.name === MAIN_PLUGIN ? 1 : a.name.localeCompare(b.name)));
const marketplace = {
  name: MARKETPLACE_NAME,
  owner: AUTHOR,
  metadata: {
    description: `AgenticFlowX (AFX) — spec-driven development skills for AI coding agents. "${MAIN_PLUGIN}" is the core workflow pack; the rest are role add-ons.`,
    version,
  },
  plugins: listings,
};
writeJson(join(OUT_ROOT, '.claude-plugin', 'marketplace.json'), marketplace);

function writeJson(p, o) { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, JSON.stringify(o, null, 2) + '\n'); }

// Cross-pack drift guard: a skill name shared by multiple packs (e.g. afx-hello in
// starter + agenticflowx) MUST have identical source content. afx-cli protects the
// recorded owner in its flat provider namespace, and may transfer that ownership
// when a pack is removed.
const byName = {};
for (const pack of parsedPacks) {
  for (const include of pack.afxIncludes) {
    if (!include.path) continue;
    for (const skill of include.items) {
      const md = join(ROOT, include.path, skill, 'SKILL.md');
      if (!existsSync(md)) continue;
      (byName[skill] ||= []).push({ pack: pack.name, content: readFileSync(md, 'utf8') });
    }
  }
}
const drift = Object.entries(byName)
  .filter(([, copies]) => copies.length > 1 && new Set(copies.map(c => c.content)).size > 1)
  .map(([name, copies]) => ({ skill: name, packs: copies.map(c => c.pack) }));
const missingSkills = built.filter(result => result.missing.length > 0);
if (missingSkills.length || drift.length) {
  for (const result of missingSkills) console.error(`MISSING: ${result.plugin}: ${result.missing.join(', ')}`);
  for (const d of drift) console.error(`DRIFT: skill "${d.skill}" differs across packs ${d.packs.join(', ')} — content must be byte-identical`);
  process.stdout.write(JSON.stringify({ out: OUT_ROOT, built, missingSkills, drift }, null, 2) + '\n');
  process.exit(1);
}

console.error(`rewrote commands in ${rewriteStats.files} files`);
process.stdout.write(JSON.stringify({
  out: OUT_ROOT,
  marketplace: MARKETPLACE_NAME,
  plugins: listings.map(l => l.name),
  rewrittenFiles: rewriteStats.files,
  built,
}, null, 2) + '\n');
