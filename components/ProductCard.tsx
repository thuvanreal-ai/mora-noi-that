import Link from 'next/link';
import type { CatalogProduct } from '@/lib/catalog';
import { money } from '@/lib/pricing';
import ProductImage from './ProductImage';
export default function ProductCard({product:p}:{product:CatalogProduct}){return <Link className="productCard" href={'/san-pham/'+p.slug}><ProductImage asset={p.image} alt={'Phối cảnh '+p.name}/><div className="productCardBody"><small>{p.category}</small><h3>{p.name}</h3><div className="price">Từ {money(Math.min(...p.variants.map(v=>v.list)))}</div><span className="muted">Giá dự toán · {p.variants.length} kích thước</span><span className="cardAction">Chọn kích thước →</span></div></Link>}
