# MORA Lead Hub

1. Tạo Google Sheet mới tên **MORA Lead Hub**.
2. Extensions → Apps Script.
3. Dán nội dung `Code.gs` vào editor và Save.
4. Deploy → New deployment → Web app.
5. Execute as: **Me**. Who has access: **Anyone**.
6. Authorize bằng tài khoản Google của chủ Sheet.
7. Copy URL kết thúc bằng `/exec` và đặt vào GitHub Actions/Pages build dưới biến `NEXT_PUBLIC_LEAD_ENDPOINT`.

Không đưa mật khẩu Google vào GitHub hoặc ChatGPT. Endpoint công khai đã sanitize dữ liệu đầu vào cơ bản; trước khi scale Ads nên bổ sung honeypot/rate-limit/anti-spam.