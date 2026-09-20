"use client";
import Script from "next/script";
export default function Tracking(){
 const ga=process.env.NEXT_PUBLIC_GA4_ID;
 const ads=process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
 const id=ga||ads;
 if(!id)return null;
 const cfg=(ga?'gtag("config","'+ga+'",{send_page_view:true});':'')+(ads?'gtag("config","'+ads+'");':'');
 const js='window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag("js",new Date());'+cfg+'document.addEventListener("click",function(e){var a=e.target.closest("a");if(!a)return;if(a.href&&a.href.indexOf("tel:")===0)gtag("event","generate_lead",{method:"phone"});if(a.href&&a.href.indexOf("zalo.me")>-1)gtag("event","generate_lead",{method:"zalo"});});';
 return <><Script src={"https://www.googletagmanager.com/gtag/js?id="+id} strategy="afterInteractive"/><Script id="mora-tracking" strategy="afterInteractive">{js}</Script></>
}