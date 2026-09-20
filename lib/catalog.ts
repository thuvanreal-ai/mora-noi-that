import {priceVariant,type Variant} from "./pricing";
import {planSheets,wardrobeCutList} from "./cutting";
const make=(x:Variant[])=>x.map(priceVariant);
const wd=(sku:string,label:string,width:number,height:number,depth:number,hinges:number,handles:number,laborHours:number,hardwareOther:number,consumables:number):Variant=>{const cuts=wardrobeCutList(width,height,depth);const body=planSheets(cuts.body,true);const back=planSheets(cuts.back,true);return{sku,label,width,height,depth,bodySheets:body.sheets,backSheets:back.sheets,hinges,handles,laborHours,hardwareOther,consumables,cutPlan:{body,back}}};
const wardrobe:Variant[]=[
wd("MORA-WD-120","1,2m × 2m × 0,55m",1200,2000,550,8,2,6,180000,150000),
wd("MORA-WD-160","1,6m × 2m × 0,55m",1600,2000,550,12,4,7,220000,180000),
wd("MORA-WD-180","1,8m × 2m × 0,55m",1800,2000,550,12,4,8,250000,200000),
wd("MORA-WD-200","2m × 2m × 0,55m",2000,2000,550,16,4,9,280000,220000)];
const bed:Variant[]=[
{sku:"MORA-BED-120",label:"Nệm 1,2m × 2m",width:1200,height:350,depth:2000,bodySheets:3,backSheets:0,hinges:0,handles:0,laborHours:5,hardwareOther:250000,consumables:150000},
{sku:"MORA-BED-160",label:"Nệm 1,6m × 2m",width:1600,height:350,depth:2000,bodySheets:4,backSheets:0,hinges:0,handles:0,laborHours:6,hardwareOther:300000,consumables:170000},
{sku:"MORA-BED-180",label:"Nệm 1,8m × 2m",width:1800,height:350,depth:2000,bodySheets:4,backSheets:0,hinges:0,handles:0,laborHours:6.5,hardwareOther:320000,consumables:180000}];
const desk:Variant[]=[
{sku:"MORA-DESK-100",label:"1m × 0,75m × 0,55m",width:1000,height:750,depth:550,bodySheets:1,backSheets:0,hinges:0,handles:1,laborHours:2.5,hardwareOther:80000,consumables:70000},
{sku:"MORA-DESK-120",label:"1,2m × 0,75m × 0,6m",width:1200,height:750,depth:600,bodySheets:2,backSheets:0,hinges:0,handles:1,laborHours:3,hardwareOther:90000,consumables:80000}];
const vanity:Variant[]=[{sku:"MORA-DT-100",label:"1m × 0,75m × 0,45m",width:1000,height:750,depth:450,bodySheets:2,backSheets:0,hinges:0,handles:2,laborHours:3.5,hardwareOther:180000,consumables:90000},{sku:"MORA-DT-120",label:"1,2m × 0,75m × 0,45m",width:1200,height:750,depth:450,bodySheets:2,backSheets:0,hinges:0,handles:3,laborHours:4,hardwareOther:220000,consumables:100000}];
const bedside:Variant[]=[{sku:"MORA-TAB-045",label:"0,45m × 0,5m × 0,4m",width:450,height:500,depth:400,bodySheets:1,backSheets:1,hinges:0,handles:2,laborHours:2.5,hardwareOther:120000,consumables:60000}];
const tv:Variant[]=[{sku:"MORA-TV-160",label:"1,6m × 0,45m × 0,4m",width:1600,height:450,depth:400,bodySheets:2,backSheets:1,hinges:4,handles:2,laborHours:4,hardwareOther:180000,consumables:100000},{sku:"MORA-TV-200",label:"2m × 0,45m × 0,4m",width:2000,height:450,depth:400,bodySheets:3,backSheets:1,hinges:4,handles:3,laborHours:4.5,hardwareOther:220000,consumables:120000}];
const dining:Variant[]=[{sku:"MORA-DIN-140",label:"Bàn 1,4m × 0,75m × 0,8m",width:1400,height:750,depth:800,bodySheets:2,backSheets:0,hinges:0,handles:0,laborHours:4,hardwareOther:180000,consumables:100000},{sku:"MORA-DIN-160",label:"Bàn 1,6m × 0,75m × 0,8m",width:1600,height:750,depth:800,bodySheets:2,backSheets:0,hinges:0,handles:0,laborHours:4.5,hardwareOther:200000,consumables:110000}];
const shoe:Variant[]=[
{sku:"MORA-SHOE-080",label:"0,8m × 1m × 0,35m",width:800,height:1000,depth:350,bodySheets:2,backSheets:1,hinges:4,handles:2,laborHours:3.5,hardwareOther:90000,consumables:90000},
{sku:"MORA-SHOE-120",label:"1,2m × 1m × 0,35m",width:1200,height:1000,depth:350,bodySheets:2,backSheets:1,hinges:6,handles:3,laborHours:4,hardwareOther:120000,consumables:100000}];
export const catalog=[
{slug:"tu-quan-ao-mdf-modern",name:"Tủ quần áo MDF Modern",category:"Tủ quần áo",description:"Tủ cánh mở tối giản, nhiều kích thước.",variants:make(wardrobe)},
{slug:"giuong-mdf-modern",name:"Giường MDF Modern",category:"Giường",description:"Giường MDF kiểu tối giản theo kích thước nệm phổ biến.",variants:make(bed)},
{slug:"ban-lam-viec-mdf",name:"Bàn làm việc MDF",category:"Bàn",description:"Bàn MDF gọn cho phòng ngủ và góc làm việc.",variants:make(desk)},
{slug:"tu-giay-mdf",name:"Tủ giày MDF",category:"Tủ giày",description:"Tủ giày sâu gọn cho căn hộ và nhà phố.",variants:make(shoe)},
{slug:"ban-trang-diem-mdf",name:"Bàn trang điểm MDF Minimal",category:"Phòng ngủ",description:"Bàn trang điểm gọn, ngăn kéo lưu trữ, nhận kích thước riêng.",variants:make(vanity)},
{slug:"tab-dau-giuong-mdf",name:"Tab đầu giường MDF",category:"Phòng ngủ",description:"Tab đầu giường hai ngăn, kiểu dáng tối giản.",variants:make(bedside)},
{slug:"ke-tivi-mdf",name:"Kệ tivi MDF Modern",category:"Phòng khách",description:"Kệ tivi thấp, bố cục gọn cho căn hộ và nhà phố.",variants:make(tv)},
{slug:"ban-an-mdf",name:"Bàn ăn MDF Modern",category:"Phòng ăn",description:"Bàn ăn MDF tối giản theo kích thước 4–6 chỗ.",variants:make(dining)}
];