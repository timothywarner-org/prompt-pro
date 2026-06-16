# Bicep language cheatsheet

A scannable reference for the constructs you reach for in real templates. Every snippet uses the **Contoso Robotics** scenario so examples read like production, not toy code.

## Parameters

Parameters are deployment-time inputs. Decorate them to validate early and document intent.

```bicep
@description('Deployment region for all resources.')
@allowed([ 'eastus2', 'centralus', 'westus3' ])
param location string = 'eastus2'

@description('Environment short name, used in resource names and tags.')
@allowed([ 'dev', 'test', 'prod' ])
param env string = 'dev'

@description('Storage SKU. ZRS for zone redundancy in prod, LRS to save cost in dev.')
param storageSku string = 'Standard_LRS'

@minLength(3)
@maxLength(11)
@description('Workload stem used to compose resource names.')
param workload string = 'robotics'

@secure()
@description('Never defaulted, never logged. Supplied at deploy time or from Key Vault.')
param adminPassword string
```

**Why decorators matter:** `@allowed` and `@minLength` fail the deployment at validation, before any resource is touched. That is far cheaper than a half-applied deployment.

## Variables

Variables are compile-time expressions. Use them to build names and dedupe logic.

```bicep
var namePrefix = '${workload}-${env}'
var storageName = 'st${workload}${env}${uniqueString(resourceGroup().id)}'
var commonTags = {
  workload: workload
  env: env
  managedBy: 'bicep'
  costCenter: 'CR-1042'
}
```

## Resources and symbolic references

The symbolic name (left of the `=`) is how other resources reference this one. Referencing it creates an **implicit dependency** - you rarely need `dependsOn`.

```bicep
resource workspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: '${namePrefix}-law'
  location: location
  tags: commonTags
  properties: {
    sku: { name: 'PerGB2018' }
    retentionInDays: 30
  }
}

resource storage 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageName
  location: location
  tags: commonTags
  sku: { name: storageSku }
  kind: 'StorageV2'
  properties: {
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
    supportsHttpsTrafficOnly: true
  }
}
```

## Existing resources (read, don't redeploy)

Use `existing` to reference something you only need to read - a shared Key Vault, a hub VNet. No redeployment, no ownership.

```bicep
resource sharedVault 'Microsoft.KeyVault/vaults@2023-07-01' existing = {
  name: 'kv-contoso-shared-prod'
  scope: resourceGroup('rg-contoso-shared-prod')
}
```

## Conditions

Deploy a resource only when a condition holds. Common for env-specific resources.

```bicep
// Only stand up the zone-redundant failover account in prod
resource failover 'Microsoft.Storage/storageAccounts@2023-05-01' = if (env == 'prod') {
  name: '${storageName}fo'
  location: location
  sku: { name: 'Standard_ZRS' }
  kind: 'StorageV2'
}
```

## Loops

Create N resources from an array or range.

```bicep
param containerNames array = [ 'telemetry', 'firmware', 'audit-logs' ]

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  name: 'default'
  parent: storage
}

resource containers 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = [
  for name in containerNames: {
    name: name
    parent: blobService
  }
]
```

## Modules

Modules are reusable Bicep files you call with parameters. They are how you compose large deployments from small, testable units.

```bicep
module monitoring './modules/monitoring.bicep' = {
  name: 'monitoring-deploy'
  params: {
    location: location
    workspaceId: workspace.id
    tags: commonTags
  }
}
```

## Key Vault references (the right way to handle secrets)

Never put a secret in a parameter default or an output. Pull it from Key Vault at deploy time.

In a `.bicepparam` file:

```bicep
using './main.bicep'

param adminPassword = getSecret(
  '00000000-0000-0000-0000-000000000000', // subscription id
  'rg-contoso-shared-prod',
  'kv-contoso-shared-prod',
  'sql-admin-password'
)
```

`getSecret` resolves during deployment; the value never lands in the template, the parameter file, or the deployment history in plain text.

## Outputs (and what never goes in them)

Outputs surface values for downstream stages or humans.

```bicep
output storageAccountName string = storage.name
output workspaceResourceId string = workspace.id
```

**Never output a secret or a key.** Outputs are stored in deployment history in plain text and are readable by anyone with reader access. If a caller needs a key, grant it a managed identity and RBAC instead.

## High-value functions

| Function                          | Returns                                                    |
| --------------------------------- | ---------------------------------------------------------- |
| `uniqueString(resourceGroup().id)`| Deterministic 13-char hash for globally unique names        |
| `resourceGroup().location`        | The target group's region (good param default)             |
| `subscription().subscriptionId`   | Current subscription id                                    |
| `reference(resourceId)`           | Runtime properties of a deployed resource                  |
| `union(obj1, obj2)`               | Merge tag objects or property bags                         |
| `format('{0}-{1}', a, b)`         | String composition (alternative to interpolation)          |
| `guid(...)`                       | Deterministic GUID, used for stable RBAC assignment names   |

## Lint and format from the CLI

```powershell
# Lint surfaces best-practice warnings (unused params, insecure defaults)
az bicep lint --file main.bicep

# Build transpiles to ARM JSON to inspect what ARM actually receives
az bicep build --file main.bicep

# Format normalizes whitespace and ordering
az bicep format --file main.bicep
```
