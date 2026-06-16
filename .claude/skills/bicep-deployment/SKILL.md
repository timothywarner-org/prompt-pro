---
name: bicep-deployment
description: Author, validate, preview, and ship Azure infrastructure with Bicep the safe way - what-if before deploy, the four deployment scopes, idempotent re-runs, and Well-Architected guardrails. Use when designing or reviewing Bicep templates, choosing a deployment scope, wiring Bicep into GitHub Actions, or teaching IaC deployment workflow. Pairs with the azure-principal-architect agent for design-then-deploy handoffs.
---

# Bicep deployment

**Bicep** is Azure's domain-specific language for declarative infrastructure. You describe the **desired state** of resources, and the **Azure Resource Manager (ARM)** engine figures out the create, update, or no-op needed to reach it. This skill teaches the **safe deployment loop** that keeps demos green and production intact.

> Teaching note: every example uses the **Contoso Robotics** scenario (mid-size robotics manufacturer, 500 employees, Austin TX). Swap the names, keep the pattern.

## The golden rule: what-if before apply

Never run a bare `az deployment ... create` against an environment you care about. The loop is always:

1. **Lint** the template so syntax and best-practice warnings surface early.
2. **Validate** so ARM checks the template against the target scope.
3. **What-if** so you see the exact create / modify / delete set before anything changes.
4. **Deploy** only after a human (or a gate) reads the what-if output.
5. **Verify** the resources match intent, then record outputs.

The two scripts in `scripts/` encode steps 1-5 so learners run the loop, not just the last line.

## When to reach for this skill

- You are about to write or review a `.bicep` or `.bicepparam` file.
- You need to pick the right **deployment scope** (tenant, management group, subscription, resource group).
- You are wiring Bicep into **GitHub Actions** with OIDC and want the what-if-as-gate pattern.
- You are teaching IaC and need a clean, idempotent, real-world demo.

## Quick start (Contoso Robotics)

The `templates/` folder ships a deployable starter: a storage account plus a Log Analytics workspace at **resource group scope**. Preview then deploy with the bundled scripts.

```powershell
# 0. Lint first - free, offline, catches mistakes before any login
./scripts/Invoke-BicepLint.ps1 -Path ./templates/main.bicep

# 1. Preview every change ARM would make - mutates nothing
./scripts/Test-BicepWhatIf.ps1 `
  -TemplateFile ./templates/main.bicep `
  -ParameterFile ./templates/main.bicepparam `
  -ResourceGroup rg-contoso-robotics-dev `
  -Location eastus2

# 2. Deploy after reading the what-if output. Idempotent: safe to re-run.
./scripts/Deploy-Bicep.ps1 `
  -TemplateFile ./templates/main.bicep `
  -ParameterFile ./templates/main.bicepparam `
  -ResourceGroup rg-contoso-robotics-dev `
  -Location eastus2 `
  -WhatIfFirst
```

Both scripts default to **PowerShell 7.x + Azure CLI**. They validate prerequisites, fail with meaningful exit codes, and print structured output you can screen-share.

## Choosing a deployment scope

ARM deploys at four scopes. Picking wrong is the most common beginner mistake. Full decision guide in `references/deployment-scopes.md`; the short version:

| Scope                | `targetScope` value  | Deploy with                              | Use for                                            |
| -------------------- | -------------------- | ---------------------------------------- | -------------------------------------------------- |
| **Resource group**   | `resourceGroup` (default) | `az deployment group create`        | Workload resources (storage, app, DB, networking)  |
| **Subscription**      | `subscription`      | `az deployment sub create`               | Creating resource groups, policy, RBAC at sub level |
| **Management group**  | `managementGroup`   | `az deployment mg create`                | Org-wide policy, blueprints, subscription placement |
| **Tenant**            | `tenant`            | `az deployment tenant create`            | Tenant-wide management groups, root assignments     |

## Authoring guardrails (the short list)

- **Parameterize environment differences**, not everything. Hardcode what never changes; parameterize region, SKU, names.
- **Never hardcode secrets.** Reference **Azure Key Vault** with the `getSecret` function in a `.bicepparam`, or pull from a pipeline secret. See `references/bicep-language-cheatsheet.md`.
- **Use `existing` references** instead of redeploying resources you only need to read.
- **Name with a convention.** Contoso uses `<type>-<workload>-<env>` (e.g. `st`+`contosorobotics`+`dev`). Storage names have no hyphens and a 24-char limit.
- **Emit `output` values** for anything a downstream stage or human needs (connection hints, resource IDs).
- **Set `targetScope` explicitly** even when it is `resourceGroup`. Explicit beats implicit for learners reading the file.

## Well-Architected at deploy time

Deployment is where reliability and security intentions get real. Before you ship, walk `references/waf-deployment-checklist.md`. The high-value items:

- **Reliability:** zone-redundant SKUs where offered, `dependsOn` only when ARM cannot infer order, idempotent re-runs.
- **Security:** managed identity over keys, `publicNetworkAccess: 'Disabled'` plus Private Link for data services, no secrets in outputs.
- **Operational excellence:** what-if-as-a-gate in CI, deployment stacks for lifecycle and deny-delete, tagging for ownership and cost.
- **Cost:** right-size SKUs in params per environment, tear down ephemeral demo groups, tag `costCenter`.

## CI/CD: what-if as a pull-request gate

In GitHub Actions, run **what-if on the PR** and post the diff as a comment, then **deploy on merge** to `main`. Authenticate with **OIDC federated credentials** (no stored secrets). The pattern and a starter workflow snippet live in `references/waf-deployment-checklist.md` under "Pipeline integration."

## Common failure modes (and the fix)

| Symptom                                             | Cause                                           | Fix                                                              |
| --------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------- |
| `InvalidTemplateDeployment` on a fresh group        | Wrong scope (RG template at sub scope)          | Match `targetScope` to the `az deployment <scope>` verb         |
| Storage name `... is not available`                 | Globally unique name collision or invalid chars | Use `uniqueString(resourceGroup().id)` suffix, lowercase, no `-` |
| What-if shows everything as "Modify" on a no-op run | Drift, or properties ARM normalizes             | Inspect the diff; normalized props are benign, real drift is not |
| Deployment hangs on a dependency                    | Manual `dependsOn` creating a cycle             | Remove manual `dependsOn`; let ARM infer from symbolic references |

## Reference and script index

- `references/deployment-scopes.md` - the four scopes, decision tree, and worked CLI examples.
- `references/bicep-language-cheatsheet.md` - params, variables, loops, conditions, modules, Key Vault, functions.
- `references/waf-deployment-checklist.md` - pre-deploy checklist mapped to the five WAF pillars, plus the CI/CD gate pattern.
- `scripts/Invoke-BicepLint.ps1` - offline lint of one file or a whole folder, with an optional fail-on-warning CI gate. The cheapest, fastest check in the loop.
- `scripts/Test-BicepWhatIf.ps1` - lint + validate + what-if preview. Mutates nothing.
- `scripts/Deploy-Bicep.ps1` - idempotent deploy with optional what-if confirmation gate and output capture.
- `templates/main.bicep` + `templates/main.bicepparam` - deployable Contoso Robotics starter at RG scope.
