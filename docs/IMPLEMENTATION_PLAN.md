# IMPLEMENTATION_PLAN.md — Holista Sales OS

## Objective

Build Holista Sales OS as a Twenty-based, mobile-first pharmacy field-sales CRM while preserving the best domain logic already created in `revita-sales-os` and `sladurana`.

## Phase 0 — Baseline and audit

Deliverables:
- canonical engineering contract;
- current-state document;
- inventory of reusable legacy modules;
- Twenty version/SDK capability check;
- development branch convention.

Exit gate:
- no ambiguity about canonical repo;
- no legacy repository modified;
- no claim of working Twenty integration without evidence.

## Phase 1 — Twenty App foundation

Tasks:
1. scaffold the app using the supported Twenty App tooling;
2. record exact Node/package-manager/Twenty versions;
3. connect to a non-production Twenty workspace;
4. add a minimal custom object;
5. add one front component;
6. verify sync/install cycle;
7. verify typecheck/build.

Target app identity:
- package/app name: `holista-sales-os`
- product label: `Holista Sales`

Exit gate:
- app installs/syncs successfully;
- one custom record can be created/read;
- one custom Holista component renders inside Twenty;
- exact verification evidence is recorded.

## Phase 2 — Canonical data model

Implement and validate relations for:
- Company
- Pharmacy
- Person/Contact
- Territory
- Brand
- Product
- ProductAccount
- Visit
- VisitProduct
- Request
- RequestLine
- Order
- OrderLine
- InventoryObservation
- RoutePlan
- RouteStop
- PriceList
- PriceListItem

Key modeling rules:
- Company != Pharmacy.
- ProductAccount is first-class.
- order commercial values are snapshots.
- records require stable external/source identifiers where integrations exist.
- enums and status transitions are explicit.

Exit gate:
- end-to-end sample graph can be created:
  `Company → Pharmacy → Visit → VisitProduct → Request/Order`.

## Phase 3 — Holista catalogue integration

Tasks:
- audit current Holista source contract from legacy code;
- implement server-side fetch/proxy;
- schema validate source payload;
- normalize identifiers, SKU, taxonomy, images, price/stock metadata;
- upsert Product/Brand;
- preserve provenance and sync timestamp;
- implement safe deactivation policy.

Exit gate:
- verified official product data appears in Twenty;
- failed source calls do not produce fake/demo products;
- secrets remain server-side.

## Phase 4 — Pharmacy 360

Build a Holista-specific record experience showing:
- overview;
- contacts;
- visits;
- products/ProductAccount;
- requests;
- orders;
- tasks;
- notes;
- activity timeline;
- next action.

Exit gate:
- a rep can understand account status without navigating generic CRM objects manually.

## Phase 5 — Visit OS

Implement mobile-first custom flow:
1. Prepare
2. Start
3. Discuss Products
4. Capture Request/Order
5. Review
6. Complete
7. Follow-up

Required captured context:
- objectives;
- participant/contact;
- VisitProduct discussions;
- objections;
- outcomes;
- notes;
- next action;
- follow-up date.

Exit gate:
- complete visit can be performed from a phone-sized viewport;
- completion updates account timeline and follow-up state deterministically.

## Phase 6 — Requests and Orders

Implement:
- request builder;
- request status workflow;
- request-to-order conversion;
- order lines;
- price snapshots;
- review/confirmation;
- export/integration boundary for future ERP.

Exit gate:
- historical order is unchanged by later catalogue price changes.

## Phase 7 — Today / Action Center

Create the primary field-sales home:
- today's visits;
- overdue follow-ups;
- priority accounts;
- pending requests/orders;
- route entry point;
- next best actions.

Next Best Action should derive from deterministic signals before AI explanation:
- days since visit;
- task debt;
- open request/order;
- ProductAccount opportunity;
- priority/potential;
- explicit follow-up due date.

Exit gate:
- rep knows what to do next immediately after login.

## Phase 8 — AI Copilot

Port the useful Agent V2 concepts into bounded Twenty skills.

Initial skills:
- prepare_visit
- next_best_actions
- account_summary
- product_opportunity
- followup_review
- data_quality

Rules:
- facts and recommendations must be separated;
- source/provenance must be retained where useful;
- writes require visible confirmation;
- AI role has minimum permissions;
- no service/admin keys in the browser.

Exit gate:
- AI can prepare a visit from real CRM context;
- hallucinated CRM/product facts are rejected/clearly marked unknown;
- write proposal requires human confirmation.

## Phase 9 — Workflows

Implement first production automations:
1. Visit completed → update lastVisitAt.
2. Visit completed → calculate nextVisitDue.
3. Follow-up selected → create Task.
4. Request approved → create draft Order.
5. Order confirmed → queue export/integration action.
6. Product sync → update Product master.
7. nextVisitDue overdue → flag account.
8. inactivity threshold → create action candidate.

Exit gate:
- no duplicate/unsafe workflow loops;
- execution failures are observable.

## Phase 10 — Territory and Route

Implement:
- territory ownership;
- coverage metrics;
- never/overdue/recently visited segmentation;
- map;
- daily route plan;
- route stop state;
- route suggestion algorithm.

Initial route score inputs:
- account priority;
- days since last visit;
- due follow-up;
- opportunity;
- distance/travel cost;
- opening hours.

Do not add route optimisation before reliable geo/account data exists.

## Phase 11 — Security and pilot

Required:
- role matrix;
- object/field/record access validation;
- secrets audit;
- input validation;
- mutation auditability;
- backup/export/recovery test;
- mobile/browser QA;
- production-data boundary;
- deployment runbook.

Pilot users:
- start with minimal controlled set;
- do not scale to multiple reps until territory/record access is technically enforced.

## Phase 12 — Optional expansion

Only after pilot:
- offline/PWA sync;
- expiry/shelf execution;
- advanced analytics;
- Sales Academy;
- ERP integration;
- manager forecasting;
- richer product recommendation;
- document/media/call tooling where justified.

## Migration order from legacy

Prefer domain logic over old infrastructure.

### revita-sales-os
Port in this order:
1. mobile shell/design ideas;
2. Pharmacy 360;
3. Visit Preparation/Active/Review;
4. ProductPicker;
5. Requests;
6. provenance/runtime patterns.

### sladurana
Port in this order:
1. ProductAccount;
2. Account 360 concepts;
3. Visit OS rules;
4. Orders/Expiry domain logic;
5. Action Center/Next Best Action;
6. Holista sync;
7. Agent V2 tools;
8. Data Quality;
9. route/offline patterns.

## Working protocol for every implementation task

Before coding:
1. read `AGENTS.md`;
2. read `docs/PROJECT_STATE.md`;
3. inspect current repository tree;
4. inspect relevant legacy source;
5. inspect current Twenty SDK/API contract if the task depends on it;
6. state assumptions internally and avoid unverified claims.

During coding:
1. make smallest coherent change;
2. preserve platform boundaries;
3. avoid secrets in client;
4. keep demo/test data explicit;
5. add/update tests where appropriate.

Before completion:
1. typecheck;
2. build;
3. targeted tests;
4. browser/mobile QA for UI work;
5. review diff for accidental changes;
6. update `docs/PROJECT_STATE.md`;
7. record remaining blockers.

## Completion language

Use:
- IMPLEMENTED — code exists.
- VERIFIED — evidence from build/test/runtime exists.
- PARTIAL — only part of the flow is implemented.
- PLANNED — no implementation yet.
- BLOCKED — external or technical blocker identified.

Never use “done”, “working”, “deployed” or equivalent unless the relevant verification gate has actually passed.
