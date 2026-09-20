const SHEET_NAME="Leads";
const THANK_YOU_URL="https://thuvanreal-ai.github.io/mora-noi-that/cam-on/?submitted=1";
const HEADERS=["timestamp","website","gclid","product","sku","size","viewed_price","name","phone","house_number","street","ward","province","note","page_url","utm_source","utm_medium","utm_campaign"];
function clean(v){return String(v||"").replace(/^[=+\-@]/,"'").trim().slice(0,1000)}
function doPost(e){
 const lock=LockService.getScriptLock();
 try{
  const p=e&&e.parameter?e.parameter:{};
  if(p.company_website)return HtmlService.createHtmlOutput("OK");
  if(!clean(p.name)||!clean(p.phone))throw new Error("missing required lead fields");
  lock.waitLock(10000);
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  let sh=ss.getSheetByName(SHEET_NAME);
  if(!sh)sh=ss.insertSheet(SHEET_NAME);
  if(sh.getLastRow()===0)sh.appendRow(HEADERS);
  sh.appendRow(HEADERS.map(k=>k==="timestamp"?new Date():clean(p[k])));
  return HtmlService.createHtmlOutput('<meta charset="utf-8"><script>location.replace("'+THANK_YOU_URL+'")</script><p>Đã nhận thông tin. MORA sẽ liên hệ xác nhận.</p>')
 }catch(err){
  return HtmlService.createHtmlOutput("Có lỗi khi nhận thông tin. Vui lòng gọi 0916 85 85 66.")
 }finally{
  try{lock.releaseLock()}catch(_){}
 }
}
function doGet(){return ContentService.createTextOutput("MORA Lead Hub OK")}