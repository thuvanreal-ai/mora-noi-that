# MORA Nội Thất MDF

Next.js 15 App Router / React 19 / TypeScript static export, hosted with GitHub Pages. Product catalog, estimated whole-sheet pricing, selected deterministic BOMs, inquiry forms, SEO and optional GA4/Ads tracking.

## Develop and verify

Node 24 and pnpm 11.19.0 (pinned in `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm test
pnpm typecheck
pnpm build
```

GitHub Actions runs all four gates before uploading the Pages artifact. `pnpm-lock.yaml` locks installation; native resolver install scripts are explicitly ignored because platform optional packages supply the binary.

`NEXT_PUBLIC_BASE_PATH` overrides the path; GitHub Actions defaults to `/mora-noi-that`, local development to root. `NEXT_PUBLIC_SITE_URL` is the canonical production URL. `NEXT_PUBLIC_LEAD_ENDPOINT` controls the existing Apps Script URL; without it the form is disabled with a contact fallback. See `.env.example` and the Pages workflow. Optional tracking IDs are configured through GitHub repository variables.

## Product and cost data

`lib/catalog.ts` holds 9 product groups / 20 SKUs, dimensions in mm, material assumptions and estimates. `lib/cutting.ts` tries three deterministic shelf orders with 4mm kerf, keeps placement coordinates and accounts for 7% reserve before whole-sheet costing. It is not a CNC optimiser or proof of structural safety.

Board stock is 1220 × 2440mm; provisional unit prices are 625,000 VND for 17mm body and 475,000 VND for 9mm back. Cost includes full purchased sheets, hardware, consumables and labour at 100,000 VND/hour. Factory estimate = cost × 1.30; website list estimate = factory × 2. Promotion must remain separate.

Wardrobe, shoe, TV and shelf models have estimated BOMs. Bed, desk, vanity, bedside and dining retain clearly labelled manual estimates pending detailed construction BOMs. Confirm grain, edging, fixtures, loads, board prices and assembly with the workshop. Delivery/install, taxes, warranty and timeline are confirmed in the final quote.

## Leads and external setup

See `lead-hub/SETUP.md`. The site remains in place during submission. Only a scoped acknowledgement or the existing script's successful thank-you redirect opens the confirmation modal; iframe load alone does not. Apps Script source supports persistent request-ID deduplication and all attribution fields. Updating the source in Git does not deploy Apps Script: the owner must publish a new version of the existing deployment and verify an actual row in the Sheet.

This is a static website: there is no live admin panel, database CMS, payment processor or server-side Next API. `lib/cms.ts`, SQL schema and old data types are dormant scaffolding, not production services.

## Images and evidence

Original AI concepts under `public/images/` have visible “Ảnh phối cảnh minh họa” labels. See `docs/IMAGES.md` for prompts and provenance. No stock photos are claimed as MORA work. `docs/AUDIT-2026-09-20.md` documents findings, research and remaining owner inputs.

Do not commit credentials, `.env` files, real lead rows or personal customer data. Keep workshop/project photos and factual business claims evidence-backed.
