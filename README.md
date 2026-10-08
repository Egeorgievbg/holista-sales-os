# Holista Sales OS

Holista Sales OS is a mobile-first pharmacy field-sales CRM built as a Twenty application.

## Current milestone

**M1 — Twenty App Foundation**

Implemented in the current feature branch:
- Twenty SDK app descriptor;
- least-privilege application function role;
- `Pharmacy` smoke object;
- Holista standalone page and navigation entry;
- health check;
- unit-test baseline.

Not yet enabled:
- production database/data migration;
- Holista product synchronization;
- Visit OS;
- Requests / Orders;
- Territory / Routes;
- AI Copilot;
- production deployment.

## Architecture

Twenty provides generic CRM/platform capabilities. Holista-specific business logic remains in this repository as an application extension.

Read before development:
- [AGENTS.md](AGENTS.md)
- [Project state](docs/PROJECT_STATE.md)
- [Implementation plan](docs/IMPLEMENTATION_PLAN.md)
- [Data model](docs/DATA_MODEL.md)
- [Security and AI rules](docs/SECURITY_AI_RULES.md)
- [Twenty edition matrix](docs/TWENTY_EDITION_MATRIX.md)

## Development baseline

- Node.js: 24.5+
- Yarn: 4.13
- Twenty SDK: 2.46.0
- React: 19
- TypeScript: 5.9

The preferred development mode is a remote/non-production Twenty workspace so the developer machine does not need to run the full Docker stack.

See [docs/SETUP_REMOTE_TWENTY.md](docs/SETUP_REMOTE_TWENTY.md).
