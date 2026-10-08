# PROJECT_STATE.md — Holista Sales OS

Updated: 2026-10-08
Status: M1 IMPLEMENTED / RUNTIME VERIFICATION BLOCKED
Canonical repository: `Egeorgievbg/holista-sales-os`
Default branch: `main`
Working branch: `feature/m1-twenty-foundation`
Draft PR: #1

## Verified repository state

- Repository exists and is writable.
- `AGENTS.md` is the canonical engineering contract.
- M1 source scaffold is committed on the working branch.
- The working branch is ahead of `main`; `main` remains unchanged.
- Twenty core has not been modified.
- Released platform baseline is pinned to Twenty / SDK 2.45.0.
- Node baseline is 24.5+ and Yarn baseline is 4.x.
- A first custom `Pharmacy` smoke object is implemented.
- A Holista standalone front component, page layout and navigation item are implemented.
- A health check and test harness are implemented.
- CI workflow exists and uses GitHub-hosted Docker rather than requiring Docker on the developer laptop.
- No production database is connected.
- No production deployment is configured.
- No legacy code has been migrated yet.

## Verification status

### IMPLEMENTED
- application config;
- stable universal identifiers;
- initial least-privilege application function role;
- Pharmacy smoke object;
- Holista foundation front component;
- standalone page layout;
- navigation item;
- health check;
- unit/integration test harness;
- CI definition;
- remote Twenty setup instructions.

### VERIFIED
- repository diff contains only intended M1 files;
- official Twenty 2.45.0 tag/template contracts for application config, object definition, page layout, navigation and health check were inspected;
- current branch is isolated from `main`.

### NOT VERIFIED
- dependency installation;
- lint;
- TypeScript typecheck;
- unit tests;
- SDK build;
- sync/install against a Twenty workspace;
- Pharmacy object visible in a live workspace;
- Holista page rendering in a live workspace;
- browser/mobile QA.

## CI blocker

GitHub Actions runs for PR #1 are failing before runner allocation.

Observed evidence:
- workflow: CI;
- job: test;
- runner id: 0 / no runner allocated;
- steps: empty;
- conclusion: failure.

The first workflow used the official Twenty composite test action.
The second workflow inlined the Twenty Docker start command to remove that external action dependency.
Both failed before any step executed.

Classification:
`BLOCKED / GITHUB ACTIONS PRE-RUN INFRASTRUCTURE OR REPOSITORY POLICY`

This is not evidence that npm/Yarn, TypeScript, Vitest or the Holista source code failed.

## External/reference codebases

Read-only migration sources:
- `Egeorgievbg/revita-sales-os`
- `Egeorgievbg/sladurana`

Platform/upstream:
- `twentyhq/twenty`

Do not mutate or overwrite the legacy repositories during migration.

## Known legacy assets to inspect

### revita-sales-os
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

Complete the M1 verification gate without local Docker.

Preferred route:
1. install dependencies on the developer machine;
2. connect CLI to a safe remote Twenty development workspace via OAuth;
3. run `yarn lint`, `yarn typecheck`, `yarn test:unit`;
4. run `yarn plan`;
5. run `yarn apply`;
6. verify the Holista page and Pharmacy object in the browser;
7. record evidence here;
8. only then merge PR #1.

## Next milestone

M2 begins only after M1 runtime verification.

M2 scope:
- Company;
- Territory;
- Product;
- ProductAccount;
- Visit;
- canonical relations and status enums;
- initial permission model.

## First pilot scope

`Login → Today → Pharmacy 360 → Prepare Visit → Visit → Product Discussion → Request/Order → Follow-up → Next Best Action`

## Do not claim

Until verified, do not claim that:
- Twenty is installed locally as a full CRM;
- the Holista app is installed into Twenty;
- database/auth are configured;
- Holista API sync works;
- production persistence works;
- AI can mutate records;
- build/tests/browser QA pass;
- deployment exists.
