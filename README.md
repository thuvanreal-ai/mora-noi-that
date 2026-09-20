# MORA Nội Thất MDF

Website production-oriented cho MORA tại Tân Phú, TP.HCM.

## Đã triển khai
- Next.js App Router + TypeScript
- Responsive warm-minimal frontend
- Product, project, knowledge, pricing, quote routes
- Dynamic sitemap + robots
- Structured data business foundation
- GA4 loader controlled by environment variable
- UTM/GCLID capture foundation
- Lead endpoint + thank-you page
- Database SQL schema for products/projects/posts/leads
- CMS API read foundation
- /admin protected by environment-based Basic Auth
- GitHub Actions build CI

## Không bịa dữ liệu kinh doanh
Giá, vật liệu, bảo hành, Zalo, địa chỉ số nhà và ảnh/công trình thật chưa được tự tạo.

## BLOCKERS cần chủ website cung cấp/tạo
1. Production database DATABASE_URL
2. Production hosting/deployment for Next.js
3. Final domain -> NEXT_PUBLIC_SITE_URL
4. ADMIN_USER + ADMIN_PASSWORD secret values on hosting (không commit vào GitHub)
5. Image storage provider/credentials
6. GA4 measurement ID, Google Ads conversion ID/label
7. Official Zalo URL/phone
8. Real product data, pricing, materials, warranty and project images

## Sau khi có blockers
- Replace in-memory CMS adapter with database queries
- Enable authenticated CRUD writes
- Persist leads
- Image upload/storage
- Production tracking/conversion events
- Domain Search Console verification
- Final Lighthouse, accessibility and device QA
