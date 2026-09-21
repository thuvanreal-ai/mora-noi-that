"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function UtmCapture() {
  const path = usePathname();
  useEffect(() => {
    try { const q = new URLSearchParams(location.search); ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"].forEach(k => { const v = q.get(k); if (v) sessionStorage.setItem(k, v); }); } catch { /* Form captures current URL when storage is unavailable. */ }
  }, [path]);
  return null;
}
