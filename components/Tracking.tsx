"use client";
import Script from 'next/script';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
declare global { interface Window { gtag?: (...args:unknown[])=>void; } }
export default function Tracking(){
 const path=usePathname(),ga=process.env.NEXT_PUBLIC_GA4_ID,ads=process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,label=process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
 const gaId=ga&&/^G-[A-Z0-9]+$/.test(ga)?ga:undefined,adsId=ads&&/^AW-\d+$/.test(ads)?ads:undefined,id=gaId||adsId;
 useEffect(()=>{if(!id)return;const lead=()=>{window.gtag?.('event','generate_lead',{method:'form'});if(adsId&&label)window.gtag?.('event','conversion',{send_to:adsId+'/'+label});};const click=(e:MouseEvent)=>{const a=e.target instanceof Element?e.target.closest('a'):null;if(!a)return;if(a.href.startsWith('tel:'))window.gtag?.('event','contact_click',{method:'phone'});if(a.hostname==='zalo.me')window.gtag?.('event','contact_click',{method:'zalo'});};window.addEventListener('mora:lead-success',lead);document.addEventListener('click',click);return()=>{window.removeEventListener('mora:lead-success',lead);document.removeEventListener('click',click);};},[id,adsId,label]);
 useEffect(()=>{if(gaId)window.gtag?.('event','page_view',{page_location:location.origin+location.pathname});},[path,gaId]);
 if(!id)return null;
 const code='window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};gtag("js",new Date());'+(gaId?'gtag("config",'+JSON.stringify(gaId)+',{send_page_view:false});gtag("event","page_view",{page_location:location.origin+location.pathname});':'')+(adsId?'gtag("config",'+JSON.stringify(adsId)+');':'');
 return <><Script src={'https://www.googletagmanager.com/gtag/js?id='+id} strategy="afterInteractive"/><Script id="mora-tracking" strategy="afterInteractive">{code}</Script></>;
}
