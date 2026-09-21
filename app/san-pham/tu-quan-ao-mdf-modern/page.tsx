import ProductDetail from '@/components/ProductDetail';import {catalog} from '@/lib/catalog';import {site} from '@/lib/site';
export const metadata={title:'Tủ quần áo MDF Modern 1,2–2m',description:'Chọn kích thước tủ áo MDF, xem BOM và giá dự toán, gửi yêu cầu tư vấn.',alternates:{canonical:site.url+'/san-pham/tu-quan-ao-mdf-modern/'},openGraph:{images:[{url:site.url+'/images/wardrobe-960.webp',alt:'Phối cảnh tủ quần áo MDF'}]}};
export default function Page(){return <ProductDetail product={catalog[0]}/>}
