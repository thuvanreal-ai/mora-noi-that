# MORA Research V1 — cập nhật 20/09/2026

## Mục đích
Benchmark giá/UX để kiểm tra mô hình MORA. Không sao chép nội dung, hình ảnh hay tuyên bố của đối thủ. Giá đối thủ là snapshot công khai và có thể thay đổi.

## Benchmark tủ quần áo
- JYSK: LIMFJORDEN 180×58×200cm giá niêm yết 15,9 triệu; snapshot 20/09/2026 có khuyến mại 12,72 triệu. LIMFJORDEN 120×58×200cm 11,9 triệu. Nguồn: https://jysk.vn/phong-ngu/tu/tu-quan-ao
- Nội Thất Mạnh Hệ: bảng T08/2026 công bố tủ quần áo theo m², khoảng 3,1–4,0 triệu ở một nhóm bề mặt; các nhóm khác cao hơn. Nguồn: https://noithatmanhhe.vn/thi-cong-noi-that
- UMA: TQA028 MDF Melamine 200×240×60cm 13 triệu; TQACL029 17,5 triệu trong snapshot. Nguồn: https://uma.vn/san-pham/tu-quan-ao-go-mdf-canh-lua-hien-dai-tqa028/
- Nội thất Giá Xưởng/Thịnh Phát: TQA024 1,6×2m 5,2 triệu; TQA001 1,6×2,4m 6,9 triệu. Nguồn: https://noithatgiaxuong.vn/
- Thịnh Phát Furniture: TQA88 cánh mở 1,6×2×0,6m MDF tiêu chuẩn 5,5 triệu, lõi xanh 6,3 triệu; 2×2m lần lượt 6,4 và 7,2 triệu. Nguồn: https://noithatthinhphat.com/tu-quan-ao-mdf-hien-dai-van-go-canh-trang-thiet-ke-da-ngan-cao-cap-tai-tphcm-tqa88-1m6-x-2m.html
- Mộc Hải Phát: TQA-07 1,6×2×0,56m MDF Melamine 17mm, hậu 9mm, snapshot 5,25 triệu. Nguồn: https://mochaiphat.vn/san-pham/tu-quan-ao-tqa-07/
- Nội Thất CaCo: MDF Melamine 1,6×2m 6,4 triệu; 1,8×2m 7,2 triệu; 2×2m 8 triệu. Nguồn: https://noithatcaco.vn/san-pham/tu-ao-ba-canh-go-mdf-melamine-cao-cap-1583.html
- Nội Thất Trong Nhà: tủ MDF lõi xanh cửa lùa 1,6×2×0,55m snapshot sale 6 triệu. Nguồn: https://noithattrongnha.com/tu-quan-ao-cua-lua-hien-dai-tphcm-ms-1131/
- Nội Thất Thái Bình: tủ 1,6×2m MDF snapshot 6,5 triệu. Nguồn: https://noithatthaibinh.com/tu-quan-ao-1-6m/
- Nội Thất Viva: báo giá MDF Melamine theo mét dài, 2,7 triệu/md cho cấu hình được công bố; đã gồm vận chuyển/lắp đặt HCM, chưa VAT. Nguồn: https://noithatviva.vn/tu-quan-ao/tu-quan-ao-go-cong-nghiep/tu-quan-ao-mdf/

## Benchmark hạng mục khác
- Nội Thất Thái Bình: giường MDF thường 1,6m từ 3,2 triệu; lõi xanh từ 3,8 triệu trong bảng 2026. Nguồn: https://noithatthaibinh.com/8-mau-giuong-ngu-go-mdf-dep-ban-chay-nhat-2026/
- Nội Thất HCM: giường MDF 1,6×2m có ngăn kéo 4,6 triệu, chưa VAT trong snapshot. Nguồn: https://noithathcm.vn/giuong-ngu-1m6-co-ngan-keo-gnk01/
- VPS Decor: bảng 2026 công bố giường MDF chống ẩm 1,6/1,8m 5,5–8,5 triệu; bàn 1,2–1,8m 1,8–3,8 triệu; tủ giày 2,0–3,2 triệu/m². Nguồn: https://xuongnoithatquan7.com/dong-noi-that-go-theo-yeu-cau
- MOHO: dùng SKU, thông số kích thước, lựa chọn cấu hình, Zalo, chính sách giao/lắp và bảo hành rõ trên product page. Nguồn: https://moho.com.vn/

## Kết luận dùng cho MORA
Thị trường không đồng nhất: vật liệu, độ dày, phụ kiện, kiểu cánh, vận chuyển/lắp đặt và VAT khác nhau nên không so giá chỉ bằng chiều ngang. MORA phải benchmark theo cấu hình tương đương và cảnh báo khi mô hình vượt dải tham chiếu; không tự hạ giá để khớp thị trường.

## Giá vật liệu tham chiếu
An Cường 2026: MDF phủ Melamine 17mm 1220×2440 khoảng 553–694k/tấm; MDF chống ẩm phủ Melamine 17mm khoảng 621–747k; MDF phủ Melamine 9mm khoảng 398–553k. Engine V1 dùng 625k thân 17mm và 475k hậu 9mm làm giá nghiên cứu, chưa phải giá mua xưởng.

## Costing hiện hành
Tấm chuẩn 1220×2440mm. Phần dư của tấm nguyên vẫn tính cho SKU. Planner tủ áo tạo cutting list, dùng kerf 4mm, shelf-packing 2D bảo thủ và kiểm tra thêm 7% dự phòng diện tích; số tấm tính tiền là max(số tấm packing, số tấm theo diện tích có dự phòng). 7% không bị cộng thêm lần hai vào tiền ván. Công 100.000đ/giờ. Giá xưởng = cost × 1,30; giá niêm yết = giá xưởng × 2. Không còn mặc định sale 20% trong core pricing.

## Cần calibration trước báo giá chính thức
Giá mua thật theo mã/màu ván; cutting list đã duyệt của thợ; chiều vân và quy tắc xoay chi tiết; nẹp cạnh; thanh treo; ray/bản lề/tay nắm; vít/keo; công thực tế; vận chuyển/lắp đặt; VAT. Planner hiện là công cụ dự toán, không thay phần mềm nesting/CNC của xưởng.
