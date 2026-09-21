const SHEET_NAME = "Leads";
const ALLOWED_ORIGINS = ["https://thuvanreal-ai.github.io"];
const HEADERS = ["timestamp","website","gclid","product","sku","size","custom_width","custom_height","custom_depth","viewed_price","name","phone","house_number","street","ward","province","note","page_url","utm_source","utm_medium","utm_campaign","utm_term","utm_content","request_id"];
function clean(v) { const s = String(v || "").trim().slice(0, 2000); return /^[=+\-@]/.test(s) ? "'" + s : s; }
function result(p, ok) {
  const origin = ALLOWED_ORIGINS.includes(p.return_origin) ? p.return_origin : ALLOWED_ORIGINS[0];
  const data = JSON.stringify({ type: "mora:lead-result", ok: ok, requestId: p.request_id || "" }).replace(/</g, "\\u003c");
  return HtmlService.createHtmlOutput('<meta charset="utf-8"><p>' + (ok ? 'Đã nhận yêu cầu đặt hàng.' : 'Chưa lưu được yêu cầu. Vui lòng gọi 0916 85 85 66.') + '</p><script>var a=window.parent;for(var i=0;i<6;i++){a.postMessage(' + data + ',' + JSON.stringify(origin) + ');if(a===a.parent)break;a=a.parent;}</script>').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
function doPost(e) {
  const p = e && e.parameter ? e.parameter : {};
  const lock = LockService.getScriptLock();
  try {
    if (p.company_website || !ALLOWED_ORIGINS.includes(p.return_origin)) return result(p, false);
    p.phone = String(p.phone || "").replace(/\s+/g, "");
    if (!clean(p.name) || !/^0\d{9,10}$/.test(p.phone) || !/^[a-f0-9-]{36}$/i.test(p.request_id || "")) return result(p, false);
    if (["house_number", "street", "ward", "province"].some(k => !clean(p[k]))) return result(p, false);
    lock.waitLock(10000);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (!sh.getLastRow()) sh.appendRow(HEADERS);
    let headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
    HEADERS.forEach(k => { if (!headers.includes(k)) headers.push(k); });
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    const idColumn = headers.indexOf("request_id") + 1;
    if (sh.getLastRow() > 1 && sh.getRange(2, idColumn, sh.getLastRow() - 1, 1).createTextFinder(p.request_id).matchEntireCell(true).findNext()) return result(p, true);
    sh.appendRow(headers.map(k => k === "timestamp" ? new Date() : clean(p[k])));
    SpreadsheetApp.flush();
    return result(p, true);
  } catch (_) { return result(p, false); }
  finally { try { lock.releaseLock(); } catch (_) {} }
}
function doGet() { return ContentService.createTextOutput("MORA Lead Hub OK"); }
