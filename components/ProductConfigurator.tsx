"use client";
import { useState } from "react";
import { money } from "@/lib/pricing";
import type { CatalogProduct } from "@/lib/catalog";
import type { CutPlan } from "@/lib/cutting";
import LeadForm from "@/components/LeadForm";
import CustomerFields from "@/components/CustomerFields";

function Plan({ plan, title }: {plan:CutPlan;title:string}) {
  return <section className="bomSection"><h3>{title}: {plan.sheets} tấm nguyên</h3>
    <p>Xếp chi tiết: {plan.packedSheets} tấm · Sử dụng {(plan.utilization*100).toFixed(1)}% · Phần còn lại {(plan.remnantArea/1e6).toFixed(2)} m² (gồm đường cắt và dự phòng, không phải toàn bộ đều tái sử dụng được).</p>
    <div className="tableScroll"><table><caption>BOM dự toán · mm</caption><thead><tr><th>Chi tiết</th><th>Rộng × dài</th><th>SL</th></tr></thead><tbody>{plan.parts.map((p,n)=><tr key={n}><td>{p.name}</td><td>{p.width} × {p.height}</td><td>{p.qty}</td></tr>)}</tbody></table></div>
    <div className="cutSheets">{Array.from({length:plan.sheets},(_,sheet)=><figure key={sheet}><svg viewBox="0 0 1220 2440" role="img" aria-label={`${title}, tấm ${sheet+1}: sơ đồ dự toán`}><rect width="1220" height="2440" fill="#e8e0d5"/>{plan.placements.filter(p=>p.sheet===sheet).map((p,i)=><g key={i}><rect x={p.x} y={p.y} width={p.width} height={p.height} fill={i%2?'#b38b63':'#315c4c'} stroke="white" strokeWidth="4"/><title>{`${p.name}: ${p.width} × ${p.height} mm`}</title></g>)}</svg><figcaption>Tấm {sheet+1}{sheet>=plan.packedSheets?' · dự phòng':''}</figcaption></figure>)}</div>
  </section>;
}
export default function ProductConfigurator({product}:{product:CatalogProduct}) {
  const [index,setIndex]=useState(0);
  const v=index>=0?product.variants[index]:null;
  return <div className="productConfig">
    <label htmlFor="size-select"><b>Chọn kích thước</b></label><select id="size-select" className="input" value={index} onChange={e=>setIndex(Number(e.target.value))}>{product.variants.map((x,n)=><option value={n} key={x.sku}>{x.label}</option>)}<option value={-1}>Kích thước riêng — nhận báo giá</option></select>
    {v?<><div className="priceBlock" aria-live="polite"><span className="discount">Giá dự toán</span><strong>{money(v.list)}</strong></div><p className="muted">SKU {v.sku} · Rộng {v.width} × cao {v.height} × sâu {v.depth} mm{v.sku.includes('BED')?' (cỡ nệm; phủ bì xác nhận sau)':''}.</p>
      <details><summary>BOM, số tấm & cách tính giá</summary><p>Tấm 1.220 × 2.440 mm. Dự phòng thiết kế 7% áp dụng một lần khi tính số tấm; không cộng thêm vào tiền ván. Công 100.000đ/giờ. Giá xưởng = chi phí × 1,30; niêm yết = giá xưởng × 2.</p>
      {v.cutPlan?<><p className="notice">BOM giả định; thử 3 thứ tự xếp với đường cắt 4 mm và cho phép xoay. Chưa xét chiều vân, xén biên, liên kết hoặc tải trọng. Cần xưởng duyệt trước sản xuất; không phải sơ đồ CNC đã kiểm chứng.</p><Plan title="Thân MDF 17 mm" plan={v.cutPlan.body}/><Plan title="Hậu MDF 9 mm" plan={v.cutPlan.back}/></>:<p className="notice">Chưa có BOM kết cấu đủ chi tiết. Số tấm dưới đây là giả định dự toán, chưa được tối ưu hoặc xác minh bằng cutting layout.</p>}
      <dl className="costList"><div><dt>Ván thân / hậu</dt><dd>{v.bodySheets} / {v.backSheets} tấm · {money(v.boardCost)}</dd></div><div><dt>Bản lề / tay nắm</dt><dd>{v.hinges} / {v.handles} chiếc · {money(v.hingeCost+v.handleCost)}</dd></div><div><dt>Phụ kiện khác / vật tư</dt><dd>{money(v.hardwareOther+v.consumables)}</dd></div><div><dt>Nhân công {v.laborHours} giờ</dt><dd>{money(v.labor)}</dd></div><div><dt>Chi phí dự toán</dt><dd>{money(v.cost)}</dd></div><div><dt>Giá xưởng dự toán</dt><dd>{money(v.factory)}</dd></div><div><dt>Giá niêm yết dự toán</dt><dd>{money(v.list)}</dd></div></dl></details></>:<p>Nhập kích thước dự kiến bên dưới. MORA sẽ xác nhận cấu hình trước khi báo giá.</p>}
    <p className="muted">{product.estimateNote}</p>
    <div className="actions"><a className="btn" href="tel:0916858566">Gọi 0916 85 85 66</a><a className="btn" href="https://zalo.me/0916858566" target="_blank" rel="noreferrer">Tư vấn qua Zalo</a></div>
    <h2 className="formHeading">Gửi yêu cầu cho mẫu này</h2>
    <LeadForm id="product-lead-form" className="orderForm" endpoint={process.env.NEXT_PUBLIC_LEAD_ENDPOINT||''}>
      {!v&&<div className="formGrid fullWidth">{[['custom_width','Rộng'],['custom_height','Cao'],['custom_depth','Sâu']].map(([name,label])=><label key={name}>{label} (mm) *<input className="input" type="number" name={name} min={100} max={10000} step={1} required/></label>)}</div>}
      <input type="hidden" name="sku" value={v?.sku||'CUSTOM'}/><input type="hidden" name="product" value={product.name}/><input type="hidden" name="size" value={v?.label||'Kích thước riêng'}/><input type="hidden" name="viewed_price" value={v?.list||''}/>
      <CustomerFields/>
    </LeadForm>
  </div>;
}
