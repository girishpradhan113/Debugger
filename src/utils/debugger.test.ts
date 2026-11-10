import test from 'node:test';
import assert from 'node:assert/strict';
import { computeDiff, buildSideBySide } from './diffEngine';
import { PRESET_DEMOS } from '../data/presets';

test('computeDiff correctly identifies unchanged, added, and removed lines', () => {
  const original = `line 1
line 2 buggy
line 3`;

  const patched = `line 1
line 2 fixed
line 3`;

  const result = computeDiff(original, patched);

  assert.equal(result.stats.additions, 1);
  assert.equal(result.stats.deletions, 1);
  assert.equal(result.stats.totalLines >= 3, true);

  const hasAdded = result.lines.some((l) => l.type === 'added' && l.content.includes('line 2 fixed'));
  const hasRemoved = result.lines.some((l) => l.type === 'removed' && l.content.includes('line 2 buggy'));

  assert.equal(hasAdded, true);
  assert.equal(hasRemoved, true);
});

test('buildSideBySide pairs removed and added lines effectively', () => {
  const original = `const a = 1;\nconst b = 2;`;
  const patched = `const a = 1;\nconst b = 999;`;

  const diff = computeDiff(original, patched);
  const rows = buildSideBySide(diff.lines);

  assert.equal(rows.length > 0, true);
  // Row for "const a = 1;" should be unchanged on both sides
  assert.equal(rows[0].left?.type, 'unchanged');
  assert.equal(rows[0].right?.type, 'unchanged');

  // Modified row should pair removed and added
  const pairedRow = rows.find((r) => r.left?.type === 'removed' && r.right?.type === 'added');
  assert.ok(pairedRow, 'Should pair removed and added lines');
});

test('presets contains all 3 required demos with valid fields', () => {
  const keys = Object.keys(PRESET_DEMOS);
  assert.ok(keys.includes('1: UI Flexbox Collision'));
  assert.ok(keys.includes('2: C++ Pointer Segfault'));
  assert.ok(keys.includes('3: Python Null Reference'));

  for (const key of keys) {
    const demo = PRESET_DEMOS[key];
    assert.ok(demo.title.length > 0);
    assert.ok(demo.buggyCode.length > 0);
    assert.ok(demo.patchedCode.length > 0);
    assert.ok(demo.logs.length > 0);
    assert.ok(demo.mockImageUrl.length > 0);
    assert.ok(demo.rootCause.length > 0);
  }
});
