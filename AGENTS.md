# AGENTS.md — Holista Sales OS Engineering Contract

Status: CANONICAL
Repository: `Egeorgievbg/holista-sales-os`
Product: Holista Sales OS
Platform strategy: Twenty CRM as the CRM/platform engine; Holista-specific workflows and UI as a Twenty App and supporting services.

## 1. Mission

Build a production-grade, mobile-first field-sales CRM for Holista / Revita pharmacy sales.

Primary user flow:

`Today → Route → Pharmacy 360 → Prepare Visit → Visit → Product Discussion → Request/Order → Follow-up → Next Best Action`

The product must feel like Holista Sales OS, not like a generic CRM.

## 2. Canonical sources

- This repository is the new canonical implementation target.
- `Egeorgievbg/sladurana` is READ-ONLY migration/reference source.
- `Egeorgievbg/revita-sales-os` is READ-ONLY migration/reference source.
- `twentyhq/twenty` is platform/upstream reference. Do not modify upstream core unless absolutely necessary.
- Prefer a Twenty App / SDK extension over forking Twenty core.
- Never overwrite or delete legacy repositories as part of migration.

## 3. Core architectural rule

Twenty provides generic CRM infrastructure:
- authentication;
- workspace/user management;
- CRM records and relations;
- permissions;
- workflows;
- API/MCP;
- generic activities/tasks/views;
- platform UI primitives.

Holista code provides domain value:
- Pharmacy 360;
- Visit OS;
- Product × Pharmacy intelligence;
- Holista product catalogue/sync;
- Requests and Orders;
- Territory and Route workflows;
- Action Center / Next Best Action;
- AI Sales Copilot;
- Sales Academy;
- healthcare/pharmacy-specific dashboards.

Do not rebuild generic CRM infrastructure that Twenty already provides unless a verified platform limitation requires it.

## 4. Domain model

Canonical business objects to design and validate before production migration:

- Company — legal entity / pharmacy chain / customer organization.
- Pharmacy — physical pharmacy outlet.
- Person/Contact — pharmacist, manager, buyer, owner, operational contact.
- Territory — sales territory.
- Visit — planned/executed field visit.
- Product — Holista catalogue item.
- Brand — product brand.
- ProductAccount — product × pharmacy commercial intelligence.
- VisitProduct — product discussion during a visit.
- Request — commercial request/inquiry.
- RequestLine — request line item.
- Order — commercial order.
- OrderLine — immutable order line snapshot.
- InventoryObservation — observed stock/shelf/expiry state.
- RoutePlan — daily route.
- RouteStop — route stop.
- PriceList / PriceListItem — commercial pricing.
- Opportunity — larger commercial opportunity where useful.
- Task / Activity / Notes — prefer native Twenty primitives when they fit.

Do not equate Company with Pharmacy. One company/chain may own many pharmacy outlets.

## 5. ProductAccount rule

`ProductAccount` is a first-class object, not a derived UI convenience.

It should support facts such as:
- listed / not listed;
- stock state;
- interest;
- recommendation level;
- shelf visibility;
- last discussed date;
- last ordered date;
- last order quantity;
- objection;
- competitor presence;
- opportunity score;
- evidence/provenance where relevant.

This object is central to Next Best Action and AI recommendations.

## 6. Visit OS rule

The canonical visit lifecycle is:

`PLANNED → PREPARING → IN_PROGRESS → REVIEW → COMPLETED`

A visit cannot be treated as complete merely because a note exists.

Review should capture, where applicable:
- objective;
- contacts;
- products discussed;
- interest/reaction;
- objections;
- request/order;
- outcome;
- follow-up;
- next action;
- notes.

The mobile visit flow has priority over generic desktop CRM forms.

## 7. Holista product source

Official Holista product data must come from a verified official source/API.

Required pipeline:
`source → validate → normalize → match by stable external key/SKU → upsert → provenance`

Rules:
- never invent product specifications, availability, pricing, brand ownership or claims;
- never silently replace failed live data with demo data;
- absence from one sync must not automatically hard-delete a product;
- use inactive/deprecated states until deletion is explicitly validated;
- preserve source identifiers and sync timestamps.

## 8. Orders and commercial history

Historical commercial records must remain historically correct.

OrderLine should snapshot commercial values used at confirmation time, including where relevant:
- product/SKU identity;
- quantity;
- list price;
- discount;
- net price;
- currency;
- tax/other commercial fields if introduced.

Never recompute historical orders from a current price list.

## 9. AI boundary

AI is an assistant, not an unrestricted database operator.

Default mutation flow:

`AI proposal → visible review → explicit user confirmation → deterministic domain command → persistence result`

AI may read only data allowed by the acting role.

Sensitive/destructive actions must never be executed solely because the model suggested them.

Initial Holista AI skills:
- prepare_visit;
- next_best_actions;
- account_summary;
- product_opportunity;
- followup_review;
- data_quality.

AI responses must distinguish:
- verified CRM facts;
- official product facts;
- derived recommendation;
- unknown/unverified data.

Never fabricate visits, orders, stock, customer statements, results or product facts.

## 10. Security

Apply least privilege.

Never expose in browser/client variables:
- database passwords;
- service-role keys;
- OpenAI/provider secrets;
- private integration credentials;
- admin tokens.

Do not store secrets in `VITE_*` variables.

Production must have:
- authentication;
- authorization;
- role/object/field/record access as required;
- server-side secret handling;
- auditability for important mutations;
- validated input schemas;
- safe external API boundaries;
- backup/export/recovery path.

Healthcare boundary:
This CRM is for pharmacy/commercial operations. Do not introduce patient health data unless a separately approved use case, legal basis, security model and data-protection review exist.

## 11. Roles

Baseline roles:
- HOLISTA_ADMIN;
- SALES_MANAGER;
- SALES_REP;
- PRODUCT_MANAGER;
- READ_ONLY;
- AI_AGENT/service identity.

Territory/account scoping must be enforced technically before multi-rep production use.

## 12. Migration policy

Migration is selective, not wholesale copying.

From `revita-sales-os`, inspect/reuse concepts and implementation where suitable:
- mobile design system;
- Pharmacy 360;
- Contact 360;
- Visit Preparation / Active Visit / Review;
- ProductPicker;
- Requests;
- provenance;
- runtime diagnostics.

From `sladurana`, inspect/reuse concepts and implementation where suitable:
- Account 360;
- ProductAccount;
- Visit OS;
- Orders;
- Expiry;
- Action Center;
- Next Best Action;
- Agent V2;
- Holista sync;
- Data Quality;
- route logic;
- offline/sync lessons.

For every migrated module:
1. inspect original code;
2. identify reusable domain rules;
3. map to Twenty primitives;
4. port the smallest coherent slice;
5. test;
6. document source and intentional differences.

Do not blindly copy legacy architecture or data storage.

## 13. UI/UX principles

- Bulgarian-first UI; English only where technically appropriate.
- Mobile-first for field sales.
- Fast access to today's work.
- Strong hierarchy, low cognitive load.
- Avoid generic admin-dashboard feel.
- No fake statistics, fake achievements or fake account history.
- Make source/status uncertainty visible.
- A rep should complete the core visit flow with minimal navigation.

Primary navigation target:
- Днес
- Аптеки
- Маршрут
- Посещения
- Продукти
- Заявки
- Поръчки
- Задачи
- AI Copilot

## 14. Delivery sequence

Do not build everything at once.

Milestones:
M0 — repository baseline, instructions, upstream/legacy inventory.
M1 — Twenty app scaffold and development connection.
M2 — validated data model and permissions skeleton.
M3 — Holista product catalogue integration.
M4 — Pharmacy 360.
M5 — Visit OS end-to-end.
M6 — Requests → Orders.
M7 — Today / Action Center / Next Best Action.
M8 — AI Copilot skills.
M9 — workflows/automations.
M10 — territory/routes.
M11 — security hardening, QA, pilot.
M12 — optional offline/PWA, ERP and advanced analytics.

First pilot vertical slice:
`Login → Today → Pharmacy 360 → Prepare Visit → Visit → Product Discussion → Request/Order → Follow-up → Next Best Action`

## 15. Quality gates

Before calling a milestone complete:
- typecheck passes;
- build passes;
- targeted tests pass;
- critical mobile path is browser-tested;
- no secrets are exposed;
- production paths do not silently use demo fixtures;
- error/loading/empty states are handled;
- permissions are checked;
- data provenance is preserved where needed;
- unknown assumptions are documented.

Never claim deploy/build/test/browser QA passed without tool evidence.

## 16. Git/change discipline

- Work in feature branches unless explicitly instructed otherwise.
- Keep commits coherent and reviewable.
- Do not rewrite unrelated code.
- Do not merge to main with known failing build/typecheck/security gates.
- Record meaningful architecture decisions in docs.
- Keep `docs/PROJECT_STATE.md` updated after each material milestone.
- Preserve exact repository history of legacy sources.

## 17. Decision rule

When choosing between:
A) changing Twenty core,
B) using native Twenty capability,
C) building a Holista Twenty App extension,

prefer B, then C, and use A only after a verified platform limitation.

## 18. Definition of success

Holista Sales OS is successful when a field rep can open the system on a phone and immediately know:
- where to go;
- who to speak with;
- what happened previously;
- which products matter;
- what to ask/offer;
- what request/order/follow-up is pending;
- what the next best action is;

while managers retain trustworthy, permission-controlled, auditable CRM data.
