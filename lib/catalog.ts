import {priceVariant,type Variant} from "./pricing";
const wardrobeVariants:Variant[]=[
{sku:"MORA-WD-120",label:"1,2m × 2m × 0,55m",width:1200,height:2000,depth:550,bodySheets:4,backSheets:1,hinges:8,handles:2,laborHours:6,hardwareOther:180000,consumables:150000},
{sku:"MORA-WD-160",label:"1,6m × 2m × 0,55m",width:1600,height:2000,depth:550,bodySheets:5,backSheets:2,hinges:12,handles:4,laborHours:7,hardwareOther:220000,consumables:180000},
{sku:"MORA-WD-180",label:"1,8m × 2m × 0,55m",width:1800,height:2000,depth:550,bodySheets:6,backSheets:2,hinges:12,handles:4,laborHours:8,hardwareOther:250000,consumables:200000},
{sku:"MORA-WD-200",label:"2m × 2m × 0,55m",width:2000,height:2000,depth:550,bodySheets:6,backSheets:2,hinges:16,handles:4,laborHours:9,hardwareOther:280000,consumables:220000}];
export const catalog=[{slug:"tu-quan-ao-mdf-modern",name:"Tủ quần áo MDF Modern",category:"Tủ quần áo",description:"Dòng tủ cánh mở tối giản, nhiều kích thước. Giá đang dùng mô hình chi phí nghiên cứu và sẽ được hiệu chỉnh bằng giá mua thực tế của xưởng.",variants:wardrobeVariants.map(priceVariant)}];