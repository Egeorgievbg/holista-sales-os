# Remote Twenty Development — No Docker

Status: M1 setup contract
Baseline checked against Twenty SDK / create-twenty-app 2.46.0.

## Why

The standard `create-twenty-app` quick start can launch a local Twenty server through Docker. Holista development should instead use a non-production remote Twenty workspace to keep the local machine lightweight.

## Prerequisites

- Node.js 24.5+ (see `.nvmrc`)
- Corepack/Yarn 4
- Git
- access to a non-production Twenty workspace that supports app development

Do not use the production Holista workspace for initial development.

## Install

```powershell
corepack enable
yarn install
```

The first successful install must generate `yarn.lock`. Commit that lockfile before M1 is merged so dependency resolution is reproducible.

## Configure a remote

Twenty SDK stores credentials in the user's Twenty CLI configuration, outside this repository.

Run:

```powershell
yarn twenty remote:add
```

Follow the interactive authentication flow and point it to the approved development workspace.

Then verify:

```powershell
yarn twenty remote:list
```

No API key, OAuth token or workspace secret may be committed to this repository.

## Preview metadata changes

Before applying schema/layout changes:

```powershell
yarn twenty plan
```

This is the default safety step.

## Apply once

After reviewing the plan:

```powershell
yarn twenty apply
```

Do not use `--force` unless a destructive change has been explicitly reviewed.

## Development watch mode

After the remote is configured:

```powershell
yarn twenty dev
```

The SDK uses the active configured remote. A local Docker Twenty server is not required when development is intentionally pointed at an approved remote workspace.

## Local quality gates

```powershell
yarn lint
yarn typecheck
yarn test:unit
```

A milestone is not VERIFIED until these commands have actually run successfully in a compatible environment.

## M1 remote verification checklist

After authentication:
1. run `yarn twenty plan`;
2. inspect all proposed metadata changes;
3. run `yarn twenty apply`;
4. open the development Twenty workspace;
5. confirm `Holista Sales` navigation exists;
6. confirm the standalone Holista page renders;
7. confirm the `Аптека / Аптеки` custom object exists;
8. create one disposable test Pharmacy record;
9. verify it can be read back;
10. remove test data if no longer needed;
11. record evidence in `docs/PROJECT_STATE.md`.

## Security

- Do not commit `~/.twenty/config.json`.
- Do not paste API keys into source files.
- Do not use production credentials for M1.
- Do not grant AI/admin/service identities broad access for convenience.
