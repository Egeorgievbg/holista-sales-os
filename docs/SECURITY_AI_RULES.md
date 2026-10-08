# SECURITY_AI_RULES.md — Holista Sales OS

Status: CANONICAL SECURITY CONTRACT

## 1. Data minimisation

The product is a commercial/pharmacy field-sales CRM.

Default allowed data:
- pharmacy/account data;
- business contacts;
- visits;
- commercial notes;
- products;
- requests;
- orders;
- tasks;
- territory/route data.

Do not introduce patient medical/health data into the CRM by default.

## 2. Secrets

Never commit or expose:
- database passwords;
- service-role keys;
- OpenAI/provider API keys;
- private ERP/API credentials;
- admin tokens;
- session secrets.

Client-side `VITE_*` variables must be treated as public.

Secrets must remain server-side and use the platform's supported secret store/environment mechanism.

## 3. Authorization

Apply least privilege.

Baseline roles:
- HOLISTA_ADMIN
- SALES_MANAGER
- SALES_REP
- PRODUCT_MANAGER
- READ_ONLY
- AI_AGENT/service identity

Before multi-rep pilot:
- verify territory/account scoping;
- verify record-level access requirements;
- test cross-user access explicitly;
- ensure managers/admins have intentional broader scope only.

## 4. AI permissions

AI must not receive admin/service-role access merely for convenience.

AI read scope must be limited to what the acting user is permitted to see.

AI write rule:
`proposal → review → explicit confirmation → deterministic command → result`

High-risk actions such as deletion, bulk mutation, permission changes, pricing/master-data changes and exports require stronger validation and must not be autonomously executed by a model.

## 5. Prompt/data safety

When building AI context:
- include only necessary fields;
- distinguish CRM facts from generated recommendation;
- avoid sending secrets;
- avoid unrelated personal data;
- use structured context where possible;
- include record identifiers separately from user-facing prose;
- reject unsupported product/medical claims.

## 6. External integrations

Every external integration must have:
- explicit server-side boundary;
- timeout;
- bounded input;
- schema validation;
- bounded response size where relevant;
- retry/backoff only where safe;
- error classification;
- no silent demo fallback;
- provenance/source tracking.

## 7. Mutations

Use validated domain commands for important writes.

Examples:
- CompleteVisit
- CreateFollowUpTask
- ConvertRequestToOrder
- ConfirmOrder
- UpdateProductAccountObservation

Do not let UI/AI perform arbitrary unvalidated database writes when a domain command can enforce invariants.

## 8. Auditability

Important business events should be traceable:
- visit completion;
- order confirmation/change;
- pricing override;
- master-product change;
- role/permission change;
- destructive operation;
- AI-assisted confirmed mutation.

Preserve actor, timestamp, target record and relevant before/after values where feasible.

## 9. Demo/test data

Demo data must:
- be explicitly labeled;
- remain separate from production paths;
- never activate automatically after a real-data failure;
- never be reported as actual customer activity.

## 10. Backups and recovery

Before production pilot:
- verify export/backup path;
- verify restore/recovery procedure;
- document ownership of backups;
- protect backups as production data;
- test at least one recovery scenario.

## 11. Logging

Logs must not expose:
- API keys;
- database credentials;
- authorization headers;
- sensitive personal content unnecessarily.

Use correlation/request IDs for debugging rather than dumping raw sensitive payloads.

## 12. Security gate before deployment

Required evidence:
- dependency/security scan where available;
- no committed secrets;
- production environment variables reviewed;
- auth required on protected routes/actions;
- role/record access tested;
- public endpoints inventoried;
- mutation validation tested;
- external API failure behavior tested;
- backup/recovery documented.

## 13. Incident rule

If a security issue is discovered:
1. stop propagation/deployment;
2. identify affected secrets/data/scope;
3. rotate exposed secrets if applicable;
4. patch the smallest safe change;
5. verify;
6. document root cause and prevention.
