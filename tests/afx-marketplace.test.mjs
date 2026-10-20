import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
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
test('every generated plugin carries its directory listing and license', t => {
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
  }
});
