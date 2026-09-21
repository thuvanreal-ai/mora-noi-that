import test from 'node:test';
import assert from 'node:assert/strict';
import { priceVariant } from '../lib/pricing.ts';
import { catalog } from '../lib/catalog.ts';
test('exact MORA formula: whole sheets + hardware + labour, 1.30 then 2',()=>{
 const v={sku:'test',label:'test',width:1000,height:1000,depth:500,bodySheets:2,backSheets:1,hinges:4,handles:2,laborHours:3,hardwareOther:100000,consumables:50000};
 const p=priceVariant(v);
 assert.equal(p.boardCost,1725000);
 assert.equal(p.cost,2415000);
 assert.equal(p.factory,3139500);
 assert.equal(p.list,6279000);
 assert.throws(()=>priceVariant({...v,bodySheets:1.5}));
});
test('catalog SKUs unique; every modelled BOM drives charged sheet count',()=>{
 const skus=new Set<string>();
 for(const p of catalog) for(const v of p.variants){
  assert.ok(!skus.has(v.sku));skus.add(v.sku);
  assert.ok(v.list>0);
  assert.equal(v.list,v.factory*2);
  if(v.cutPlan){assert.equal(v.bodySheets,v.cutPlan.body.sheets);assert.equal(v.backSheets,v.cutPlan.back.sheets);}
 }
 assert.equal(catalog.length,9);
});
