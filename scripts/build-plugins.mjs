#!/usr/bin/env node
// build-plugins — assemble one Claude Code marketplace per AFX pack from source.
// Non-destructive: reads packs/*.yaml + skills.json, writes dist/marketplaces/<pack>/.
// Each pack becomes its own marketplace publishing one plugin (all skills of that group).
// AFX-authored skills only are bundled; upstream-referenced skills are not re-bundled.
// See plan §12. Self-contained (Node stdlib only).
//
// Usage: node scripts/build-plugins.mjs [--out dist/marketplaces]

import { readFileSync, writeFileSync, existsSync, readdirSync, rmSync, mkdirSync, cpSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const outIdx = process.argv.indexOf('--out');
const OUT = join(ROOT, outIdx !== -1 ? process.argv[outIdx + 1] : 'dist/marketplaces');

const catalog = JSON.parse(readFileSync(join(ROOT, 'skills.json'), 'utf8'));
const version = catalog.version || '0.0.0';
const AUTHOR = { name: 'AgenticFlowX', email: 'noreply@agenticflowx.dev' };

// Minimal parse of a pack yaml: name/description/category + every AFX-authored include block.
function parsePack(file) {
  const lines = readFileSync(file, 'utf8').split('\n');
  const top = k => (lines.find(l => l.startsWith(k + ':')) || '').split(':').slice(1).join(':').trim();
  const pack = { name: top('name'), description: top('description'), category: top('category'), afxIncludes: [] };
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

const packFiles = readdirSync(join(ROOT, 'packs')).filter(f => /^afx-pack-.*\.yaml$/.test(f));
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const built = [];
for (const pf of packFiles) {
  const pack = parsePack(join(ROOT, 'packs', pf));
  const declared = pack.afxIncludes.flatMap(include => include.items.map(skill => ({ skill, path: include.path })));
  if (declared.length === 0) { console.error(`skip ${pack.name}: no AFX-authored skills`); continue; }
  const pluginName = pack.name.replace(/^afx-pack-/, 'afx-');
  const marketDir = join(OUT, pluginName);
  const pluginDir = join(marketDir, pluginName);
  const skillsDir = join(pluginDir, 'skills');
  mkdirSync(join(pluginDir, '.claude-plugin'), { recursive: true });
  mkdirSync(join(marketDir, '.claude-plugin'), { recursive: true });
  mkdirSync(skillsDir, { recursive: true });

  let copied = 0, missing = [];
  for (const { skill, path } of declared) {
    if (!path) { missing.push(`${skill} (missing source path)`); continue; }
    const src = join(ROOT, path, skill);
    if (!existsSync(join(src, 'SKILL.md'))) { missing.push(`${path}${skill}`); continue; }
    const destination = join(skillsDir, skill);
    cpSync(src, destination, { recursive: true });
    // Match afx-cli's installed skill tree exactly.
    const installedSkill = join(destination, 'SKILL.md');
    const normalized = readFileSync(installedSkill, 'utf8')
      .replace(/^<!-- @afx:\/?provider-commands -->\n?/gm, '');
    writeFileSync(installedSkill, normalized);
    copied++;
  }

  const runtimeNote = pack.name === 'afx-pack-agenticflowx'
    ? ' Node.js 18+ enables optional structured document queries; targeted-search fallback remains available.'
    : '';
  const listingDescription = pack.description + runtimeNote;
  const plugin = { name: pluginName, version, description: listingDescription, author: AUTHOR };
  writeJson(join(pluginDir, '.claude-plugin', 'plugin.json'), plugin);
  const marketplace = {
    name: pluginName,
    owner: AUTHOR,
    metadata: { description: listingDescription, category: pack.category },
    plugins: [{ name: pluginName, source: `./${pluginName}`, description: listingDescription, version }],
  };
  writeJson(join(marketDir, '.claude-plugin', 'marketplace.json'), marketplace);
  built.push({ plugin: pluginName, skills: copied, missing });
  console.error(`built ${pluginName}: ${copied} skills${missing.length ? ' (missing: ' + missing.join(', ') + ')' : ''}`);
}

function writeJson(p, o) { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, JSON.stringify(o, null, 2) + '\n'); }

// Cross-pack drift guard: a skill name shared by multiple packs (e.g. afx-hello in
// starter + agenticflowx) MUST have identical SKILL.md content, since afx-cli installs
// by skill name into a flat .claude/skills/<name> and the last pack wins.
const byName = {};
for (const pf of packFiles) {
  const pack = parsePack(join(ROOT, 'packs', pf));
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
  process.stdout.write(JSON.stringify({ out: OUT, built, missingSkills, drift }, null, 2) + '\n');
  process.exit(1);
}

process.stdout.write(JSON.stringify({ out: OUT, built }, null, 2) + '\n');
