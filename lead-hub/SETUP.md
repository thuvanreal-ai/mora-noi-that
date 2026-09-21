# MORA Lead Hub — update existing deployment

The configured `/exec` URL is preserved in `.github/workflows/pages.yml`. Do not replace the Sheet or create a different endpoint just to update this source.

1. Sign in as the owner of the existing Google Sheet and open its Apps Script project.
2. Back up the existing code and paste `Code.gs` from this repository.
3. Confirm `ALLOWED_ORIGINS` contains the site's origin (`https://thuvanreal-ai.github.io`); add a verified custom domain only when actually used.
4. Deploy → Manage deployments → Edit the existing Web app → New version. Execute as owner; access Anyone. Preserve the current deployment URL.
5. With the owner's authorization, submit one marked acceptance-test request from the live site. Verify the actual Sheet row and all address, SKU, price, URL, UTM/GCLID fields. Retry with the same request ID and verify one row only.
6. Verify success stays on MORA, has the required confirmation text, closes with X/Escape or after 5 seconds, and a rejected request never counts as a conversion.

The script keeps existing columns and appends missing columns by header name. A script lock protects deduplication and append. `SpreadsheetApp.flush()` precedes the positive acknowledgement. Formula prefixes are escaped after trimming. Request IDs are stored in the Sheet, not only an expiring cache.

The frontend also understands the previous `/cam-on/?submitted=<uuid>` success redirect from the configured script. It never interprets iframe `load` as successful persistence. Errors/timeouts keep the entered fields and show a contact fallback. Updating the script remains necessary for backend retry deduplication and the additional UTM fields.

Do not share Google credentials, private Sheet content or personal customer information in Git. Public form endpoints still need operational spam monitoring; origin values supplied by clients are not authentication.
