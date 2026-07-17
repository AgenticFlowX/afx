import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const query = join(root, 'skills/agenticflowx/afx-help/scripts/afx-doc-query.mjs');
const validator = join(root, 'skills/agenticflowx/afx-help/scripts/afx-validate.mjs');
const fixtures = join(root, 'tests/fixtures/generated-document-contract');

function runQuery(...args) {
  return JSON.parse(execFileSync(process.execPath, [query, ...args], { encoding: 'utf8' }));
}

test('WBS headings are dispatchable task groups and checkboxes are completion criteria', () => {
  const tasks = join(fixtures, 'tasks.md');
  const task = runQuery('task', tasks, '1.1');
  const status = runQuery('status', tasks);

  assert.equal(task.task, '1.1');
  assert.equal(task.complete, false);
  assert.deepEqual(task.criteria, [
    { done: true, text: 'Establish the contract' },
    { done: false, text: 'Verify the incomplete boundary' },
  ]);
  assert.equal(status.taskGroups, 2);
  assert.equal(status.complete, 1);
  assert.equal(status.inProgress, 1);
  assert.equal(status.planned, 0);
  assert.equal(status.workSessionRows, 1);
});

test('journal query reads canonical hyphen and shipped em-dash headings', () => {
  const result = runQuery('journal', join(fixtures, 'journal.md'), '--limit', '5');

  assert.equal(result.total, 2);
  assert.deepEqual(result.items.map(item => item.id), ['GC-D002', 'GC-D001']);
  assert.deepEqual(result.items.map(item => item.title), [
    'Shipped compatibility separator',
    'Canonical separator',
  ]);
});

test('release-facing example tasks use derived group progress without lifecycle status', () => {
  const taskDocuments = [
    'examples/starter/docs/specs/01-room-dashboard/tasks.md',
    'examples/basic/docs/specs/01-room-dashboard/tasks.md',
    'examples/full/docs/specs/01-room-dashboard/tasks.md',
    'examples/full/docs/specs/02-check-in/tasks.md',
    'examples/full/docs/specs/03-room-history/tasks.md',
    'examples/full/docs/specs/04-check-out/tasks.md',
  ];

  for (const relativePath of taskDocuments) {
    const path = join(root, relativePath);
    const frontmatter = readFileSync(path, 'utf8').split('---', 3)[1];
    const status = runQuery('status', path);

    assert.doesNotMatch(frontmatter, /^status:/m, relativePath);
    assert.ok(status.groups.every(group => group.criteria > 0), relativePath);
  }
});

test('validator rejects generated-document lifecycle, anchor, and empty-fence drift', () => {
  const result = spawnSync(process.execPath, [
    validator,
    join(fixtures, 'invalid-generated-contract'),
    '--json',
  ], { encoding: 'utf8' });

  assert.equal(result.status, 1);
  const report = JSON.parse(result.stdout);
  const errors = report.results[0].errors;
  assert.ok(errors.includes('assets/tasks-template.md: TASKS must not carry lifecycle status'));
  assert.ok(errors.some(error => error.startsWith('assets/tasks-template.md: TASKS checkbox must start at column 0')));
  assert.ok(errors.includes('assets/tasks-template.md: TASKS group has no completion criteria: 1.1 Indented criterion'));
  assert.ok(errors.includes('assets/journal-template.md: JOURNAL must not carry lifecycle status'));
  assert.ok(errors.includes('assets/design-template.md: DESIGN H2 missing [DES-ID]: Missing Anchor'));
  assert.ok(errors.includes('assets/spec-template.md: empty fenced code block'));
});
