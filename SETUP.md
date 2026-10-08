# Holista Sales OS — Development Setup

## Baseline

- Node.js: 24.5+
- Yarn: 4.x via Corepack
- Twenty SDK/client/UI: 2.46.0
- Local Docker: **not required** when using an existing remote Twenty server/workspace.

## 1. Install dependencies

```powershell
corepack enable
yarn install
```

Commit the generated `yarn.lock` before treating dependency resolution as reproducible.

## 2. Connect to a remote Twenty instance

Use a development/non-production Twenty workspace:

```powershell
yarn twenty remote:add --url https://YOUR-TWENTY-INSTANCE
```

For a remote server the Twenty CLI uses OAuth. Complete the browser authorization flow.

Do not paste credentials into source files.

## 3. Inspect changes before applying

```powershell
yarn plan
```

## 4. Apply once

```powershell
yarn apply
```

Use `--force` only after reviewing destructive changes.

## 5. Development loop

```powershell
yarn dev
```

## Local quality checks

```powershell
yarn lint
yarn typecheck
yarn test:unit
```

Integration tests need a Twenty server and API credentials. GitHub CI supplies an ephemeral Twenty test server, so Docker does not need to run on the developer laptop.

## Security

Never commit:
- Twenty API keys;
- database/service-role credentials;
- OpenAI/provider secrets;
- ERP credentials;
- OAuth tokens.

The `.twenty` directory and `.env*` files are ignored.

## M1 verification gate

M1 becomes VERIFIED only after:
1. dependencies install;
2. lint passes;
3. typecheck passes;
4. unit tests pass;
5. app builds/syncs to a Twenty test server;
6. the Holista page renders;
7. the Pharmacy object appears in the workspace.

Until then, status is IMPLEMENTED/PARTIAL rather than VERIFIED.
