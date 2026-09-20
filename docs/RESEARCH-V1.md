# MORA Research V1 — 20/09/2026

## Benchmark UX / giá
- MOHO: bộ lọc kích thước 90cm/1m2/1m4/1m6/1m8, màu, giá; product page có SKU, variant, giá sale/list và Zalo. Ví dụ MONZA 1m6: 8.990.000đ sale từ 11.290.000đ; 160x60x200cm.
- MOHO NARVIK: variant 1m2/1m8; 120/180x60x200cm; 6.990.000đ sale từ 7.590.000đ ở snapshot nghiên cứu.
- JYSK: bộ lọc kích thước rất cụ thể; LIMFJORDEN 180x58x200cm 12.720.000đ sale từ 15.900.000đ; có thông tin tồn kho/lắp đặt.

## Pattern giữ lại
Variant theo kích thước; giá bán rõ; giá niêm yết; bộ lọc; SKU; CTA trực tiếp; thông số kỹ thuật dễ quét.

## Điểm MORA cải thiện
Không buộc khách đoán giá custom; có lựa chọn kích thước khác; 3 CTA Call/Zalo/Lead; lead mang SKU/size/price; công khai logic giá nội bộ ở chế độ nghiên cứu; không dùng ảnh đối thủ.

## Giá vật liệu tham chiếu
An Cường 2026: MDF phủ Melamine 17mm khổ 1220x2440: 553.000–694.000đ/tấm; MDF chống ẩm phủ Melamine 17mm: 621.000–747.000đ/tấm; MDF phủ Melamine 9mm: 398.000–553.000đ/tấm. Giá chưa VAT và có thể thay đổi.
Price engine V1 dùng 625.000đ/tấm thân 17mm và 475.000đ/tấm hậu 9mm làm midpoint nghiên cứu, KHÔNG coi là giá mua thực tế của xưởng.
Hafele benchmark: bản lề Metalla A giảm chấn khoảng 20–21k/cái, Metalla SM khoảng 35–36k/cái trong snapshot; engine tạm dùng 30k/cái.

## Quy tắc costing
Tấm chuẩn 1220x2440. Phần ván dư vẫn tính cost cho SKU. Mô hình SKU đã làm tròn số tấm nguyên; waste target 5–10%, default 7%. Công thợ 100.000đ/giờ. Giá xưởng=cost*1.30; niêm yết=giá xưởng*2; sale=niêm yết*0.80.

## Cần calibration từ xưởng
Giá mua thật theo mã ván/màu, cutting list thực tế, nẹp cạnh, thanh treo, tay nắm, vít/keo, thời gian công thực tế, vận chuyển/lắp đặt, VAT. Khi có các số này chỉ thay config/BOM, không đổi kiến trúc website.
