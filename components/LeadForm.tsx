"use client";
import { FormEvent, useEffect, useId, useRef, useState } from "react";

type Props = { endpoint: string; className?: string; id?: string; children: React.ReactNode; onSuccess?: () => void };
const attribution = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];
export default function LeadForm({ endpoint, className, id, children, onSuccess }: Props) {
  const sinkName = "mora-sink-" + useId().replace(/:/g, "");
  const iframe = useRef<HTMLIFrameElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const pending = useRef(false);
  const requestId = useRef("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const successCallback = useRef(onSuccess);
  successCallback.current = onSuccess;

  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (!pending.current || !event.data || event.data.type !== "mora:lead-result") return;
      const local = event.origin === location.origin;
      const google = /^https:\/\/(?:[a-z0-9-]+-)?script\.googleusercontent\.com$/.test(event.origin);
      if (!local && !google) return;
      // Apps Script uses a nested sandbox iframe. Only accept our own sink tree.
      let source = event.source as Window | null;
      let inSink = false;
      try { for (let i = 0; source && i < 6; i++) { if (source === iframe.current?.contentWindow) { inSink = true; break; } if (source === source.parent) break; source = source.parent; } } catch { return; }
      if (!inSink) return;
      const valid = event.data.requestId === requestId.current || (local && typeof event.data.legacyToken === "string" && /^[a-f0-9-]{36}$/i.test(event.data.legacyToken));
      if (!valid) return;
      pending.current = false;
      setSending(false);
      if (timer.current) clearTimeout(timer.current);
      if (!event.data.ok) { setError("Chưa lưu được yêu cầu. Vui lòng thử lại hoặc gọi 0916 85 85 66."); return; }
      requestId.current = "";
      setError("");
      setOpen(true);
      successCallback.current?.();
      window.dispatchEvent(new CustomEvent("mora:lead-success"));
    };
    window.addEventListener("message", receive);
    return () => { window.removeEventListener("message", receive); if (timer.current) clearTimeout(timer.current); };
  }, []);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement;
    closeButton.current?.focus();
    const timeout = setTimeout(() => setOpen(false), 5000);
    const keyboard = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); if (e.key === "Tab") { e.preventDefault(); closeButton.current?.focus(); } };
    document.addEventListener("keydown", keyboard);
    return () => { clearTimeout(timeout); document.removeEventListener("keydown", keyboard); returnFocus.current?.focus(); };
  }, [open]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    if (!endpoint || pending.current) { e.preventDefault(); return; }
    const el = e.currentTarget;
    if (!el.checkValidity()) { e.preventDefault(); el.reportValidity(); return; }
    if (!requestId.current) requestId.current = crypto.randomUUID();
    const setHidden = (key: string, value: string) => {
      let input = el.querySelector<HTMLInputElement>('input[name="' + key + '"]');
      if (!input) { input = document.createElement("input"); input.type = "hidden"; input.name = key; el.appendChild(input); }
      input.value = value;
    };
    const query = new URLSearchParams(location.search);
    attribution.forEach(key => { let value = query.get(key) || ""; try { value ||= sessionStorage.getItem(key) || ""; } catch {} setHidden(key, value); });
    setHidden("request_id", requestId.current);
    setHidden("return_origin", location.origin);
    setHidden("page_url", location.href);
    setHidden("website", "MORA Nội Thất");
    pending.current = true;
    setSending(true);
    setError("");
    timer.current = setTimeout(() => {
      pending.current = false;
      setSending(false);
      setError("Chưa xác nhận được yêu cầu đã lưu. Thông tin vẫn còn trong form; vui lòng liên hệ Hotline/Zalo 0916 85 85 66 để kiểm tra trước khi gửi lại.");
    }, 30000);
  };

  return <><form ref={form} id={id} className={className} action={endpoint || undefined} method="post" target={sinkName} onSubmit={submit} aria-busy={sending}>
    {children}<p className="formNote">Thông tin dùng để MORA liên hệ và tư vấn yêu cầu này. Gửi yêu cầu chưa phải xác nhận mua hàng hoặc thanh toán.</p>
    <button className="btn primary" disabled={!endpoint || sending} type="submit">{sending ? "Đang gửi…" : "Gửi yêu cầu đặt hàng / báo giá"}</button>
    {!endpoint && <p className="formError" role="status">Form chưa được kết nối. Vui lòng gọi <a href="tel:0916858566">0916 85 85 66</a> hoặc nhắn Zalo.</p>}
    {error && <p className="formError" role="alert">{error}</p>}
  </form><iframe ref={iframe} name={sinkName} className="leadSink" title="Tiếp nhận yêu cầu MORA" aria-hidden="true" tabIndex={-1}/>
    {open && <div className="leadModalBackdrop"><div className="leadModal" role="dialog" aria-modal="true" aria-labelledby="lead-success-title"><button ref={closeButton} type="button" className="leadModalClose" aria-label="Đóng thông báo" onClick={() => setOpen(false)}>×</button><div className="leadModalIcon" aria-hidden="true">✓</div><h2 id="lead-success-title">Đã nhận yêu cầu đặt hàng</h2><p>Nhân viên MORA sẽ liên hệ lại trong thời gian sớm nhất.</p><small>Thông báo tự đóng sau 5 giây.</small></div></div>}
  </>;
}
