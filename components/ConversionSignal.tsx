"use client";
import { useEffect } from "react";
// Compatibility with the existing Apps Script success redirect, after appendRow.
// A bare thank-you-page visit never fires an advertising conversion.
export default function ConversionSignal() {
  useEffect(() => {
    const token = new URLSearchParams(location.search).get("submitted");
    if (window === window.top || !token || !/^[a-f0-9-]{36}$/i.test(token)) return;
    let ancestor = window.parent;
    for (let i = 0; i < 6; i++) {
      ancestor.postMessage({ type: "mora:lead-result", ok: true, legacyToken: token }, location.origin);
      if (ancestor === ancestor.parent) break;
      ancestor = ancestor.parent;
    }
  }, []);
  return null;
}
