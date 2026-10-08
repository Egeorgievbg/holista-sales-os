# Holista Sales OS

Canonical implementation of a mobile-first pharmacy field-sales CRM for Holista / Revita.

## Platform strategy

- Twenty CRM is the generic CRM/platform engine.
- Holista-specific workflows live in this app.
- `Egeorgievbg/sladurana` and `Egeorgievbg/revita-sales-os` are read-only migration sources.
- Do not modify Twenty core unless a verified platform limitation requires it.

## Current milestone

**M1 — Twenty Foundation**

Implemented in this branch:
- Twenty App project structure aligned to the released SDK 2.45.0;
- Node 24.5 / Yarn 4 baseline;
- application registration;
- least-privilege initial function role;
- health check;
- custom standalone Holista page;
- custom navigation item;
- first custom `Pharmacy` smoke object;
- unit/integration test harness;
- GitHub CI using an ephemeral Twenty test instance.

This does **not** mean production CRM, database, auth model, Holista sync, or field-sales workflows are complete.

## Core product flow

`Today → Route → Pharmacy 360 → Prepare Visit → Visit → Product Discussion → Request/Order → Follow-up → Next Best Action`

## Development without local Docker

The app itself does not require a local Twenty server if you connect to an existing remote Twenty workspace.

See [SETUP.md](SETUP.md).

## Project contracts

Read before changing code:
1. [AGENTS.md](AGENTS.md)
2. [Project state](docs/PROJECT_STATE.md)
3. [Implementation plan](docs/IMPLEMENTATION_PLAN.md)
4. [Data model](docs/DATA_MODEL.md)
5. [Security & AI rules](docs/SECURITY_AI_RULES.md)
6. [Twenty edition matrix](docs/TWENTY_EDITION_MATRIX.md)
