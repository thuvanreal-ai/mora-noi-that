import type { CutPlan } from "./cutting";
export const pricingConfig = { board: { widthMm:1220,heightMm:2440,body17:625000,back9:475000 }, planningWasteRate:.07,laborPerHour:100000,factoryMarkup:.30,listMultiplier:2,hingeUnit:30000,handleUnit:60000 };
export type Variant = { sku:string;label:string;width:number;height:number;depth:number;bodySheets:number;backSheets:number;hinges:number;handles:number;laborHours:number;hardwareOther:number;consumables:number;cutPlan?:{body:CutPlan;back:CutPlan} };
export function priceVariant(v: Variant) {
  const c = pricingConfig;
  const bodySheets = v.cutPlan?.body.sheets ?? v.bodySheets, backSheets = v.cutPlan?.back.sheets ?? v.backSheets;
  for(const n of [bodySheets,backSheets,v.hinges,v.handles]) if(!Number.isSafeInteger(n)||n<0) throw new Error('Invalid material quantity');
  for(const n of [v.laborHours,v.hardwareOther,v.consumables]) if(!Number.isFinite(n)||n<0) throw new Error('Invalid estimated cost');
  const boardCost=bodySheets*c.board.body17+backSheets*c.board.back9;
  const hingeCost=v.hinges*c.hingeUnit,handleCost=v.handles*c.handleUnit,labor=v.laborHours*c.laborPerHour;
  const cost=Math.round(boardCost+hingeCost+handleCost+v.hardwareOther+v.consumables+labor);
  const factory=Math.round(cost*(1+c.factoryMarkup)),list=Math.round(factory*c.listMultiplier);
  return {...v,bodySheets,backSheets,boardCost,hingeCost,handleCost,labor,planningWasteRate:c.planningWasteRate,cost,factory,list};
}
export const money=(n:number)=>new Intl.NumberFormat('vi-VN').format(n)+'đ';
