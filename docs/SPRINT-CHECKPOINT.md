# Production sprint checkpoint — 20 September 2026

## Resume, do not restart
Repository: `thuvanreal-ai/mora-noi-that`, local `main`. Baseline HEAD before milestone commits: `c686411dae93fa1da4e2f1ba2825022037beccd8`. Remote fetched and unchanged at final checkpoint inspection. Existing CI and Pages success refer to that old SHA, not the pending changes.

## Verified working tree
- Locked dependency installation: PASS (`pnpm install --frozen-lockfile`, pnpm 11.19.0 / Node 24).
- ESLint: PASS.
- TypeScript: PASS.
- Unit/integration mocks: 9/9 PASS (cutting, pricing, Apps Script persistence/deduplication/error handling).
- Production Next build: PASS, 26 generated entries including icon; static export complete.
- Browser QA: 26/26 PASS with Edge headless, zero page errors/hydration errors. Includes home/catalog/product/quote at 360, 390, 768, 1024 and 1440px; menu; search/empty state; selected SKU/price; BOM; required custom dimensions; form loading, success, exact modal copy, manual close, 5-second auto close, legacy redirect bridge, negative acknowledgement, timeout and duplicate submit prevention.
- Browser lead tests used intercepted/mock requests, not real Sheet submissions. This does not prove a production Sheet row was persisted.
- `git diff --check`: PASS. No credential/private-key patterns found in reviewed application/documentation files.

## Resolved defects
- Missing vertical kerf between cutting rows.
- Invalid/empty BOM handling and manually assumed material quantities presented without adequate distinction.
- False success on iframe load; missing error and timeout states; missing backend idempotency.
- Mobile navigation hidden without replacement, image placeholders, small details and unlabelled form inputs.
- SVG title JSX array caused hydration errors: converted to one string and browser regression passed.
- pnpm 11 requires `allowBuilds`, not the removed `ignoredBuiltDependencies`: frozen install passed after correction.

## Backlog
### P0
No known P0 defect in the locally tested build. Production changes have not been verified until milestone commits are pushed and the corresponding Actions runs succeed.

### P1 release gates
1. Commit related milestones, push non-force to current `main`, verify the exact SHA in both workflows, then inspect production routes/assets/navigation. Check remote again before pushing.
2. Owner publishes the prepared Apps Script as a new version of the existing deployment and verifies one authorized acceptance-test Sheet row, including retry deduplication. Source in Git is not an Apps Script deployment.
3. Workshop approves BOM/material/price inputs before estimates become binding production quotations. The storefront explicitly labels estimates; no business terms were invented.

### P2 owner data
- Verified real workshop/project photos, full business address, material samples, warranty, lead time, delivery/install and tax terms.
- GA4/Ads configuration must be supplied/verified in repository variables if tracking is needed; no account values invented.

## Implementation map
`docs/AUDIT-2026-09-20.md`: findings and scope. `docs/IMAGES.md`: all image files and prompts. `lead-hub/SETUP.md`: update the existing Apps Script without changing endpoint. `README.md`: build and data model. Tests in `tests/`.

The active task's `work/qa/` contains screenshots and browser results; `work/commit-milestones.ps1` contains three explicit commit batches. All finished source/assets are already in the repository; `work/stage/` is a staging mirror, not a new repository. Do not reapply older staging files over future changes.
