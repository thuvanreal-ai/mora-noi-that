import assert from 'node:assert/strict';
import test from 'node:test';
import { planSheets, wardrobeCutList, sheetSpec } from '../lib/cutting.ts';

test('empty BOM buys zero sheets; invalid and oversized parts reject', () => {
  assert.equal(planSheets([]).sheets, 0);
  for (const width of [0, -1, NaN, Infinity, 3000]) assert.throws(() => planSheets([{ name: 'invalid', width, height: 500, qty: 1 }]));
  assert.throws(() => planSheets([{ name: 'invalid', width: 50, height: 50, qty: .5 }]));
});
test('horizontal row kerf prevents impossible packing', () => {
  const result = planSheets([{ name: 'panel', width: 1220, height: 1220, qty: 2 }]);
  assert.equal(result.packedSheets, 2);
});
test('7% reserve is applied once in whole-sheet planning', () => {
  const result = planSheets([{ name: 'full', width: 1220, height: 2440, qty: 1 }]);
  assert.equal(result.sheets, 2);
  assert.equal(result.packedSheets, 1);
});
test('all wardrobe sizes produce deterministic, bounded, separated placements', () => {
  for (const width of [1200, 1600, 1800, 2000]) {
    const bom = wardrobeCutList(width, 2000, 550);
    for (const parts of [bom.body, bom.back]) {
      const plan = planSheets(parts, true);
      assert.deepEqual(plan, planSheets(parts, true));
      assert.equal(plan.placements.length, parts.reduce((s, p) => s + p.qty, 0));
      for (const a of plan.placements) {
        assert.ok(a.x >= 0 && a.y >= 0 && a.x + a.width <= 1220 && a.y + a.height <= 2440);
        for (const b of plan.placements) if (a !== b && a.sheet === b.sheet) {
          assert.ok(a.x + a.width + sheetSpec.kerf <= b.x || b.x + b.width + sheetSpec.kerf <= a.x || a.y + a.height + sheetSpec.kerf <= b.y || b.y + b.height + sheetSpec.kerf <= a.y);
        }
      }
      assert.ok(plan.utilization <= 1 / 1.07);
    }
  }
});
