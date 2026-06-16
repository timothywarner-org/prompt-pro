# Well-Architected deployment checklist

Deployment is the moment design intent becomes running infrastructure. This checklist maps the **five WAF pillars** to concrete things you verify in the Bicep and in the deployment loop, before you ship. Walk it before every non-trivial deploy.

## Reliability

- [ ] **Zone-redundant SKUs** where the service offers them and the env warrants it (`Standard_ZRS` storage, zone-redundant App Service plans, AZ-aware AKS node pools).
- [ ] **Idempotent re-runs.** Re-deploying the same template against the same state is a no-op. Confirm with a second what-if showing zero changes.
- [ ] **No manual `dependsOn` cycles.** Let ARM infer order from symbolic references. Manual `dependsOn` only when a true ordering exists that ARM cannot see.
- [ ] **Failover resources gated by environment** so dev does not pay for prod resilience (`if (env == 'prod')`).
- [ ] **Health-affecting properties set explicitly** (retention days, backup policy) rather than relying on shifting service defaults.

## Security

- [ ] **No secrets in the template, parameter defaults, or outputs.** Use `@secure()` params and Key Vault `getSecret`.
- [ ] **Managed identity over keys** for service-to-service auth. Assign RBAC in the template with a deterministic `guid()` assignment name.
- [ ] **Public network access disabled** on data services (`publicNetworkAccess: 'Disabled'`) with **Private Link** for connectivity.
- [ ] **TLS 1.2 minimum** and **HTTPS-only** on storage and web tiers.
- [ ] **`allowBlobPublicAccess: false`** unless a documented requirement says otherwise.
- [ ] **Least-privilege deployment identity.** The pipeline principal can deploy to the target scope and nothing broader.

## Operational excellence

- [ ] **What-if runs as a gate**, not an afterthought. In CI it posts the diff on the PR; a human or policy approves before merge deploys.
- [ ] **Deployment stacks** for resources with a shared lifecycle, to get **deny-delete** protection and clean teardown (`az stack group create`).
- [ ] **Consistent tagging** for ownership and cost: `workload`, `env`, `costCenter`, `managedBy: 'bicep'`.
- [ ] **Outputs captured** by the pipeline for downstream stages and audit.
- [ ] **Templates linted in CI** (`az bicep lint`) so warnings fail fast.

## Performance efficiency

- [ ] **SKUs parameterized per environment** so you scale up only where load demands it.
- [ ] **Autoscale settings declared in IaC**, not clicked in the portal, so they survive redeployment.
- [ ] **Region chosen for proximity** to users and dependent services, set once via a `location` param.

## Cost optimization

- [ ] **Right-sized dev/test SKUs** (`Standard_LRS`, Basic tiers) via params, with prod overriding to resilient tiers.
- [ ] **Ephemeral demo groups torn down** after use - resource group deletion is the cleanest blast radius.
- [ ] **`costCenter` tag on every resource** so spend rolls up to the right owner.
- [ ] **Reserved capacity / savings plans** considered for steady prod workloads (decision, not template, but record it).

## Pipeline integration: what-if as a pull-request gate

The operational-excellence keystone. Run **what-if on the PR**, post the diff, **deploy on merge**. Authenticate with **OIDC federated credentials** so no secret is ever stored.

```yaml
# .github/workflows/bicep-deploy.yml (starter shape, trim to your needs)
name: bicep-deploy

on:
  pull_request:
    paths: [ 'infra/**' ]
  push:
    branches: [ main ]
    paths: [ 'infra/**' ]

permissions:
  id-token: write      # required for OIDC federated login
  contents: read
  pull-requests: write # required to post the what-if comment

jobs:
  preview:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
      - name: What-if preview
        run: |
          az deployment group what-if \
            --resource-group rg-contoso-robotics-dev \
            --template-file infra/main.bicep \
            --parameters infra/main.bicepparam

  deploy:
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
      - name: Deploy
        run: |
          az deployment group create \
            --resource-group rg-contoso-robotics-dev \
            --template-file infra/main.bicep \
            --parameters infra/main.bicepparam
```

**Why OIDC over a stored secret:** federated credentials mint a short-lived token per run. There is no client secret to rotate, leak, or find in a logged environment variable. This is the current Azure-recommended pattern for GitHub Actions to Azure auth.

## The pre-deploy ritual (memorize this)

1. `az bicep lint` - warnings are bugs in waiting.
2. `az deployment group validate` - ARM checks the template against the scope.
3. `az deployment group what-if` - read every create / modify / delete.
4. Deploy.
5. Verify resources match intent; capture outputs.

The bundled `scripts/Test-BicepWhatIf.ps1` runs 1-3; `scripts/Deploy-Bicep.ps1` runs 4-5 with an optional what-if confirmation gate.
