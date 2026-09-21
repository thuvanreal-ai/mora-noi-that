export type CutPart = { name: string; width: number; height: number; qty: number };
export type Placement = { name: string; sheet: number; x: number; y: number; width: number; height: number };
export type CutPlan = { sheets: number; packedSheets: number; areaSheets: number; partArea: number; utilization: number; remnantArea: number; parts: CutPart[]; placements: Placement[] };
export const sheetSpec = { width: 1220, height: 2440, kerf: 4, waste: .07 };
type Shelf = { y: number; h: number; x: number };

// Try three stable shelf orders. This is an estimate, not a certified CNC nest.
export function planSheets(parts: CutPart[], allowRotate = false): CutPlan {
  for (const p of parts) {
    if (!Number.isFinite(p.width) || !Number.isFinite(p.height) || p.width <= 0 || p.height <= 0 || !Number.isSafeInteger(p.qty) || p.qty < 0 || p.qty > 1000) throw new Error("Chi tiết không hợp lệ: " + p.name);
  }
  const { width: sw, height: sh, kerf, waste } = sheetSpec;
  const items = parts.flatMap(p => Array.from({ length: p.qty }, () => ({ ...p })));
  if (items.length > 5000) throw new Error("BOM quá lớn");
  const fits = (w: number, h: number) => w <= sw && h <= sh;
  const trials = [0, 1, 2].map(order => {
    const sorted = [...items].sort((a, b) => order === 0 ? b.height - a.height || b.width - a.width : order === 1 ? b.width * b.height - a.width * a.height : b.width - a.width || b.height - a.height);
    const sheets: Shelf[][] = [];
    const placements: Placement[] = [];
    for (const item of sorted) {
      const opts = [[item.width, item.height], ...(allowRotate ? [[item.height, item.width]] : [])].filter(([w, h]) => fits(w, h));
      if (!opts.length) throw new Error("Chi tiết vượt khổ tấm: " + item.name);
      let found = false;
      for (let index = 0; index < sheets.length && !found; index++) {
        const rows = sheets[index];
        for (const row of rows) {
          const size = opts.find(([w, h]) => h <= row.h && row.x + w <= sw);
          if (!size) continue;
          const [width, height] = size;
          placements.push({ name: item.name, sheet: index, x: row.x, y: row.y, width, height });
          row.x += width + kerf;
          found = true;
          break;
        }
        if (found) break;
        const y = Math.max(...rows.map(r => r.y + r.h)) + kerf;
        const size = opts.find(([, h]) => y + h <= sh);
        if (size) {
          const [width, height] = size;
          rows.push({ y, h: height, x: width + kerf });
          placements.push({ name: item.name, sheet: index, x: 0, y, width, height });
          found = true;
        }
      }
      if (!found) {
        const [width, height] = opts[0];
        placements.push({ name: item.name, sheet: sheets.length, x: 0, y: 0, width, height });
        sheets.push([{ y: 0, h: height, x: width + kerf }]);
      }
    }
    return { count: sheets.length, placements };
  });
  const best = trials.sort((a, b) => a.count - b.count)[0];
  const partArea = items.reduce((sum, p) => sum + p.width * p.height, 0);
  const sheetArea = sw * sh;
  // Reserve 7% in the material planning stage, never as an additional money fee.
  const areaSheets = Math.ceil(partArea * (1 + waste) / sheetArea);
  const sheets = Math.max(best.count, areaSheets);
  return { sheets, packedSheets: best.count, areaSheets, partArea, utilization: sheets ? partArea / (sheets * sheetArea) : 0, remnantArea: sheets * sheetArea - partArea, parts, placements: best.placements };
}

export function wardrobeCutList(width: number, height: number, depth: number): { body: CutPart[]; back: CutPart[] } {
  const t = 17, bays = width <= 1300 ? 2 : 3, doors = width <= 1300 ? 2 : 4;
  const bayWidth = Math.floor((width - (bays + 1) * t) / bays);
  return {
    body: [
      { name: "Hông", width: depth, height, qty: 2 },
      { name: "Nóc/đáy", width: width - 2 * t, height: depth, qty: 2 },
      { name: "Vách khoang", width: depth - 20, height: height - 2 * t, qty: bays - 1 },
      { name: "Đợt theo khoang", width: bayWidth, height: depth - 20, qty: bays * 2 },
      { name: "Cánh", width: Math.floor((width - 3 * (doors + 1)) / doors), height: height - 6, qty: doors }
    ],
    back: Array.from({ length: bays }, (_, n) => ({ name: "Hậu khoang " + (n + 1), width: Math.ceil(width / bays), height, qty: 1 }))
  };
}
