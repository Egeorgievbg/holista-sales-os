# TWENTY_EDITION_MATRIX.md — Holista Sales OS

Updated: 2026-10-08
Purpose: prevent architecture decisions from depending unknowingly on paid Twenty features.

## Verified licensing baseline

- Twenty core is mostly AGPLv3.
- The repository contains some commercially licensed Enterprise files.
- App-development packages are intended to be MIT-licensed under the repository license policy.
- Twenty grants an Application Exception: a Holista app built through published Application Interfaces (SDK, APIs, webhooks, logic functions, front components, application config) may be licensed separately, including proprietary.
- Modifying Twenty core is different: AGPL obligations apply to the modified core.
- Free self-hosting of the open-source edition is allowed.
- Commercial self-hosted features require a valid Twenty license key/subscription.

## Features relevant to Holista

### Safe to architect around in the open/core platform

Use native Twenty/Open-source capabilities where available for:
- self-hosted CRM core;
- custom objects;
- custom fields;
- views/layouts;
- standard object-level permissions;
- field-level permissions where present in the chosen version;
- REST/GraphQL/API capabilities available in core;
- standard CRM records and relations;
- basic task/activity infrastructure;
- Twenty App interfaces / SDK where supported.

Always validate the exact version before implementation.

### Commercial / paid dependency to avoid for the first pilot

#### Row-level permissions
Current Twenty positioning places row-level permissions behind the Organization/commercial tier.

Implication:
- Do NOT design the first pilot so that security depends on sales reps being unable to read arbitrary other reps' records via native row-level permissions.
- For a one-user or tightly controlled pilot this is acceptable.
- Before multi-rep production, choose one of:
  1. buy the required Twenty commercial tier;
  2. isolate workspaces where practical;
  3. implement a separately reviewed security architecture outside Twenty's commercial code;
  4. reconsider platform choice if cost/security requirements conflict.

Do not bypass access control only in UI; authorization must be enforced server-side.

#### SAML/OIDC SSO
Current pricing places SAML/OIDC SSO in the Organization tier.

Not required for initial Holista pilot.

#### Custom domain / advanced enterprise controls
Custom domain, SCIM, IP allow-listing, single-tenant isolation and enterprise SLA/support are paid-plan capabilities according to current pricing.

Not required for the first pilot.

## AI / Apps / Workflows

Current Twenty pricing markets:
- custom apps;
- AI agents with custom skills;
- workflows

as Pro capabilities in their commercial offering.

Important distinction:
- the open-source repository and license determine what can be run from source;
- the hosted/self-host commercial product may meter or package the same/similar capabilities differently;
- before production reliance on AI agents, workflow credits or app runtime, verify the exact selected deployment mode and version.

Do not assume Cloud entitlements equal free self-host entitlements.

## Holista implementation decision

Pilot architecture should avoid any hard dependency on:
- row-level permissions;
- SAML/OIDC;
- SCIM;
- IP allow-listing;
- Twenty-hosted workflow credits;
- Twenty-hosted AI billing.

Preferred first pilot:
- one controlled workspace;
- small number of trusted users;
- object/field permissions validated;
- Holista business mutations through deterministic server-side commands;
- AI reads bounded context and proposes actions;
- explicit confirmation for writes;
- external AI/provider secrets server-side.

## Security warning

Twenty had a 2026 permission bug affecting system-object authorization that was discussed and patched upstream. Therefore:
- do not rely only on UI role configuration;
- test API access with restricted roles;
- specifically test system objects such as messages/calendar records if enabled;
- pin a verified Twenty version for pilot;
- run authorization regression tests before production.

## Decision gate before adding a second sales rep

Do not add multi-rep production use until all are true:
- record visibility requirements are written;
- cross-user read/write tests exist;
- chosen Twenty edition legally and technically supports required record isolation;
- manager visibility is tested;
- AI uses the acting user's effective permission scope;
- no alternate API/MCP path bypasses those controls.

## Platform decision rule

For Holista:
1. use free/open Twenty where it safely satisfies the requirement;
2. prefer a Holista App extension over Twenty-core modification;
3. pay for Organization features only when their business/security value justifies the recurring cost;
4. never weaken authorization merely to avoid licensing cost.
