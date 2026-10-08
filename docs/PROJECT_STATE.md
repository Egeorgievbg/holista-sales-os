# PROJECT_STATE.md — Holista Sales OS

Updated: 2026-10-08
Status: M1 IMPLEMENTED / VERIFICATION BLOCKED
Canonical repository: `Egeorgievbg/holista-sales-os`
Default branch: `main`
Working branch: `m1/twenty-app-foundation`

## Verified current state

- Repository exists and is writable.
- `AGENTS.md` is the canonical engineering contract.
- M1 implementation exists on `m1/twenty-app-foundation`.
- Twenty app-development baseline was checked against upstream `create-twenty-app` / `twenty-sdk` 2.46.0.
- The branch contains a Twenty application descriptor, least-privilege application role, `Pharmacy` smoke object, Holista standalone front component/page, navigation entry, health check and unit-test baseline.
- No production database is connected.
- No production deployment is configured.
- No legacy code has been migrated yet.
- The app has NOT yet been synced into a Twenty development workspace.
- Browser/mobile QA has NOT yet been performed.

## M1 version baseline

- create-twenty-app: 2.46.0
- twenty-sdk: 2.46.0
- twenty-client-sdk: 2.46.0
- twenty-ui: 2.46.0
- Node requirement: ^24.5.0
- Yarn: 4.13.0
- preferred development target: remote/non-production Twenty workspace, no local Docker requirement

See `docs/TWENTY_BASELINE.md` and `docs/SETUP_REMOTE_TWENTY.md`.

## M1 quality-gate status

GitHub Actions run:
- workflow: `M1 Quality Gate`
- run id: `37791285621`
- head SHA: `5b9dce43f50f0568073ee1496d32236894d931a9`
- result: FAILURE BEFORE RUNNER START
- job steps: 0
- runner id: 0
- downloadable job log: unavailable / no log blob

Classification:
`BLOCKED — GITHUB ACTIONS STARTUP/INFRASTRUCTURE`

This is not evidence that Yarn install, lint, TypeScript typecheck or unit tests failed; none of those steps started.

A separate container verification attempt was also unable to clone the public repository because the execution container could not resolve `github.com`. Therefore no local build claim is made.

Current verification labels:
- scaffold code: IMPLEMENTED
- upstream contract/version inspection: VERIFIED
- GitHub workflow dispatch: VERIFIED
- dependency install: NOT VERIFIED
- lint: NOT VERIFIED
- TypeScript typecheck: NOT VERIFIED
- unit tests: NOT VERIFIED
- Twenty plan/apply: NOT VERIFIED
- Twenty workspace sync: NOT VERIFIED
- browser QA: NOT VERIFIED

## External/reference codebases

Read-only migration sources:
- `Egeorgievbg/revita-sales-os`
- `Egeorgievbg/sladurana`

Platform/upstream:
- `twentyhq/twenty`

Do not mutate or overwrite the legacy repositories during migration.

## Known legacy assets to inspect

### revita-sales-os
Expected useful areas:
- Pharmacy 360
- Contact 360
- Tasks / Notes / Activity
- Visit Preparation / Active Visit / Visit Review
- Holista ProductRepository / ProductPicker
- Product discussions
- Requests
- mobile-first app shell
- source/provenance handling
- runtime diagnostics

### sladurana
Expected useful areas:
- Account 360
- Visit OS
- ProductAccount
- Orders
- Expiry
- Action Center
- Next Best Action
- Holista sync
- Agent V2
- Data Quality
- route logic
- Neon persistence pilot
- offline/sync patterns

## Immediate next gate

On a machine with Node 24.5+ and network access:

1. `corepack enable`
2. `yarn install`
3. `yarn lint`
4. `yarn typecheck`
5. `yarn test:unit`
6. configure an approved non-production Twenty remote with `yarn twenty remote:add`
7. run `yarn twenty plan`
8. review the plan for destructive/unexpected metadata changes
9. run `yarn twenty apply`
10. verify Holista navigation, front component and Pharmacy object in the workspace
11. create/read/delete one disposable Pharmacy smoke record
12. record evidence here

Do not merge M1 into `main` before the local/remote quality gate is verified.

## Architectural decision

Target strategy:
- Twenty = generic CRM platform;
- Holista Sales OS = custom Twenty App + supporting server integrations;
- legacy repositories = selective migration sources.

The M1 scaffold follows the current Twenty App SDK model and does not modify Twenty core.

## First pilot scope

`Login → Today → Pharmacy 360 → Prepare Visit → Visit → Product Discussion → Request/Order → Follow-up → Next Best Action`

Everything outside this path is secondary until the vertical slice works.

## Do not claim

Until verified in this repository, do not claim that:
- Twenty is installed locally as a full CRM;
- the Holista app is installed into Twenty;
- database/auth are configured;
- Holista API sync works;
- production persistence works;
- AI can mutate records;
- build/tests/browser QA pass;
- deployment exists.
