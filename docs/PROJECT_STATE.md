# PROJECT_STATE.md — Holista Sales OS

Updated: 2026-10-08
Status: INITIALISED / PRE-SCAFFOLD
Canonical repository: `Egeorgievbg/holista-sales-os`
Default branch: `main`

## Verified current state

- Repository exists and is writable.
- Repository was empty before project initialization.
- `AGENTS.md` is the canonical engineering contract.
- No production database is connected.
- No production deployment is configured.
- No Twenty App scaffold has been committed yet.
- No legacy code has been migrated yet.
- No build, typecheck, test or browser QA result exists for this repository yet.

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

## Current immediate objective

Establish a clean Twenty App development baseline for Holista without forking or modifying Twenty core.

First development gate:
1. scaffold the Holista Twenty App;
2. connect it to a safe Twenty development workspace;
3. create one test custom object;
4. render one Holista custom UI component;
5. run typecheck/build;
6. document the exact verified commands and versions.

## Architectural decision pending validation

Target strategy:
- Twenty = generic CRM platform;
- Holista Sales OS = custom Twenty App + supporting server integrations;
- legacy repositories = selective migration sources.

This strategy must be validated against the actual Twenty App SDK/API available in the selected Twenty version before domain implementation begins.

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
