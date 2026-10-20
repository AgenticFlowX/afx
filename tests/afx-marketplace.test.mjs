import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Exercise the distributable folders, rather than the repository README.
 * @see docs/specs/afx-packs/spec.md [FR-25]
 * @see https://claude.com/docs/plugins/pre-submission-checklist
 */
test('generated plugins bundle listing assets without broad shell pre-approvals', t => {
  const output = mkdtempSync(join(tmpdir(), 'afx-marketplace-'));
  t.after(() => rmSync(output, { recursive: true, force: true }));
  execFileSync(process.execPath, [
    join(root, 'scripts/build-plugins.mjs'), '--out', relative(root, output),
  ], { stdio: 'pipe' });
  const marketplace = JSON.parse(readFileSync(join(output, '.claude-plugin/marketplace.json'), 'utf8'));
  const license = readFileSync(join(root, 'LICENSE'), 'utf8');

  assert.equal(marketplace.plugins.length, 7);
  for (const entry of marketplace.plugins) {
    const pluginRoot = join(output, entry.source);
    const manifest = JSON.parse(readFileSync(join(pluginRoot, '.claude-plugin/plugin.json'), 'utf8'));
    const readme = readFileSync(join(pluginRoot, 'README.md'), 'utf8');
    const prose = readme.replace(/```[^\n]*\n[\s\S]*?```/g, '');
    assert.ok(prose.trim().split(/\s+/).length >= 40, `${entry.name}: listing needs 40 prose words`);
    assert.ok(readme.includes(`/plugin install ${entry.name}@afx`), `${entry.name}: install address`);
    assert.equal(readFileSync(join(pluginRoot, 'LICENSE'), 'utf8'), license, `${entry.name}: license`);
    assert.equal(manifest.name, entry.name);
    assert.equal(manifest.version, marketplace.metadata.version);
    assert.equal(entry.version, undefined, `${entry.name}: plugin.json owns the version`);
    assert.equal(manifest.documentationUrl, 'https://github.com/AgenticFlowX/afx#readme');
    assert.equal(manifest.supportUrl, 'https://github.com/AgenticFlowX/afx/issues');
    assert.equal(manifest.privacyPolicyUrl, 'https://github.com/AgenticFlowX/afx/blob/main/PRIVACY.md');
    assert.ok(readme.includes(manifest.supportUrl), `${entry.name}: accessible support link`);
    assert.ok(readme.includes(manifest.privacyPolicyUrl), `${entry.name}: accessible privacy link`);
    assert.match(readme, /send issue content, commits, tags, release notes, and assets to GitHub/, `${entry.name}: external transfer disclosure`);
    for (const field of ['documentationUrl', 'supportUrl', 'privacyPolicyUrl']) {
      assert.equal(entry[field], undefined, `${entry.name}: directory metadata belongs in plugin.json`);
    }
    const icon = readFileSync(join(pluginRoot, '.claude-plugin/icon.png'));
    assert.deepEqual(icon.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    const width = icon.readUInt32BE(16);
    assert.equal(width, icon.readUInt32BE(20), `${entry.name}: square icon`);
    assert.ok(width >= 512 && width <= 2048, `${entry.name}: directory icon dimensions`);
    assert.ok(icon.length < 2 * 1024 * 1024, `${entry.name}: directory icon size`);
    assert.deepEqual(icon, readFileSync(join(root, 'assets/agenticflow_icon.png')));

    for (const skill of readdirSync(join(pluginRoot, 'skills'))) {
      const md = readFileSync(join(pluginRoot, 'skills', skill, 'SKILL.md'), 'utf8');
      const tools = md.match(/^allowed-tools:\s*(.+)$/m)?.[1].split(/\s+/) || [];
      assert.ok(!tools.includes('Bash'), `${entry.name}:${skill}: no unrestricted shell pre-approval`);
      assert.doesNotMatch(md, /curl[^\n]*\|\s*(?:bash|sh)\b/, `${entry.name}:${skill}: no download-and-run instructions`);
    }
  }
  assert.match(readFileSync(join(root, 'skills/agenticflowx/afx-hello/SKILL.md'), 'utf8'), /^allowed-tools: Read Grep Glob Bash$/m, 'CLI tool policy is retained');
});
