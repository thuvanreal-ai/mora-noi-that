import { site } from "@/lib/site";
export default function ProductImage({asset,alt,hero=false}:{asset:string;alt:string;hero?:boolean}) {
  return <figure className={hero?'commerceImage heroImage':'commerceImage'}><img src={`${site.basePath}/images/${asset}-960.webp`} srcSet={`${site.basePath}/images/${asset}-480.webp 480w, ${site.basePath}/images/${asset}-960.webp 960w`} sizes={hero?'(max-width: 900px) 92vw, 55vw':'(max-width: 560px) 92vw, (max-width: 900px) 46vw, 30vw'} alt={alt} width={hero?1440:960} height={hero?960:960} loading={hero?'eager':'lazy'} fetchPriority={hero?'high':'auto'} decoding="async"/><figcaption>Ảnh phối cảnh minh họa</figcaption></figure>;
}
