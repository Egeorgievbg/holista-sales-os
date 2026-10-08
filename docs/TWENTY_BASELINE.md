# Twenty Platform Baseline

Verified against upstream Twenty `main` on 2026-10-08.

## Selected app-development baseline

- `create-twenty-app`: 2.46.0
- `twenty-sdk`: 2.46.0
- SDK declared Twenty compatibility: >= 2.40.0
- Node engine in current official scaffold: ^24.5.0
- Yarn in current official scaffold: 4.13.0
- React in current official scaffold: 19.x

## Upstream contract used for M1

The official scaffold currently provides:
- `defineApplication`;
- application roles;
- custom objects;
- front components;
- standalone page layouts;
- navigation menu items;
- health checks;
- unit/integration-test support;
- CLI remotes;
- `plan`, `apply`, and `dev` app lifecycle commands.

The Twenty CLI stores remote credentials outside the app repository in the user's CLI config.

## Holista deviations from the generic scaffold

1. Holista is `private: true` and `UNLICENSED`; it is not being published as an MIT template.
2. The default logic-function role starts with zero broad record permissions.
3. The first object is a real domain smoke object (`Pharmacy`), not an `ExampleItem`.
4. The first page is a Holista-specific Bulgarian foundation page.
5. Local Docker is not the preferred development target. Use an approved non-production remote Twenty workspace.
6. Production data and demo fallbacks are intentionally absent from M1.

## Revalidation rule

Before upgrading any Twenty first-party package:
- inspect the upstream package version and engine constraints;
- inspect breaking changes;
- run plan/build/typecheck/tests;
- verify application sync in a non-production workspace;
- update this document.
