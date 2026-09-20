export type CutPart={name:string;width:number;height:number;qty:number};
export type CutPlan={sheets:number;packedSheets:number;areaSheets:number;partArea:number;utilization:number;remnantArea:number;parts:CutPart[]};
const SW=1220,SH=2440,KERF=4,WASTE=.07;
type Shelf={y:number,h:number,x:number};
function expand(parts:CutPart[]){return parts.flatMap(p=>Array.from({length:p.qty},()=>({name:p.name,w:p.width,h:p.height})));}
function fits(w:number,h:number){return w<=SW&&h<=SH}
export function planSheets(parts:CutPart[],allowRotate=false):CutPlan{
 const items=expand(parts).sort((a,b)=>Math.max(b.w,b.h)-Math.max(a.w,a.h));
 const sheets:Shelf[][]=[];
 for(const item of items){
  if(!fits(item.w,item.h)&&!(allowRotate&&fits(item.h,item.w)))throw new Error("Chi tiết vượt khổ tấm: "+item.name);
  let placed=false;
  for(const sh of sheets){for(const s of sh){const opts=allowRotate?[[item.w,item.h],[item.h,item.w]]:[[item.w,item.h]];for(const [w,h] of opts){if(h<=s.h&&s.x+w<=SW){s.x+=w+KERF;placed=true;break}}if(placed)break}if(placed)break;
   const usedH=sh.reduce((m,s)=>Math.max(m,s.y+s.h),0);const opts=allowRotate?[[item.w,item.h],[item.h,item.w]]:[[item.w,item.h]];for(const [w,h] of opts){if(w<=SW&&usedH+h<=SH){sh.push({y:usedH,h,x:w+KERF});placed=true;break}}if(placed)break;
  }
  if(!placed){let w=item.w,h=item.h;if(!fits(w,h)&&allowRotate){w=item.h;h=item.w}sheets.push([{y:0,h,x:w+KERF}]);}
 }
 const partArea=items.reduce((s,p)=>s+p.w*p.h,0),sheetArea=SW*SH;
 const areaSheets=Math.max(1,Math.ceil(partArea*(1+WASTE)/sheetArea));
 const count=Math.max(sheets.length,areaSheets);
 return{sheets:count,packedSheets:sheets.length,areaSheets,partArea,utilization:partArea/(count*sheetArea),remnantArea:count*sheetArea-partArea,parts};
}
export function wardrobeCutList(width:number,height:number,depth:number):{body:CutPart[];back:CutPart[]}{
 const inner=Math.max(300,width-34);
 const doors=width<=1300?2:4;
 const body:CutPart[]=[
  {name:"Hông",width:depth,height,qty:2},
  {name:"Nóc/đáy",width:inner,height:depth,qty:2},
  {name:"Đợt",width:inner,height:Math.max(250,depth-20),qty:width>=1600?3:2},
  {name:"Cánh",width:Math.floor((width-12)/doors),height:height-8,qty:doors}
 ];
 const back:CutPart[]=[];
 let remain=width;while(remain>0){const w=Math.min(1220,remain);back.push({name:"Hậu",width:w,height,qty:1});remain-=w}
 return{body,back};
}
