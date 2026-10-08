# GitHub Actions pre-run blocker

Status: BLOCKED
Date: 2026-10-08
PR: #1

## Evidence

Two CI attempts ended before a runner executed any step.

Attempt signatures observed:
- workflow name: `CI`
- job name: `test`
- conclusion: `failure`
- runner: none allocated
- steps: empty

The workflow was changed between attempts:
1. official Twenty composite action for the ephemeral test server;
2. inline `docker run twentycrm/twenty-app-dev` implementation.

The same pre-run behavior remained.

## Classification

This is currently classified as a GitHub Actions repository/account/policy/infrastructure blocker, not an application build failure.

No evidence exists yet that:
- Yarn install failed;
- lint failed;
- TypeScript failed;
- Vitest failed;
- Twenty SDK build failed;
- app sync failed.

## Workaround

Use a remote Twenty development workspace from the developer machine:
- `corepack enable`
- `yarn install`
- `yarn lint`
- `yarn typecheck`
- `yarn test:unit`
- `yarn twenty remote:add --url <development-instance>`
- `yarn plan`
- `yarn apply`

Do not merge PR #1 until equivalent verification evidence is collected.
