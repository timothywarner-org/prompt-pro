# Bicep deployment scopes

Every Bicep deployment targets exactly one of **four scopes**. The scope decides which `az deployment` verb you use, what `targetScope` you declare, and which resources are even legal in the file. Getting this right removes the single most common class of beginner deployment error.

## The decision tree

Ask one question: **what is the parent container of the thing I am creating?**

- Creating storage, an app, a database, a VNet -> their parent is a **resource group** -> `targetScope = 'resourceGroup'`.
- Creating the resource group itself, or assigning policy / RBAC across a subscription -> parent is a **subscription** -> `targetScope = 'subscription'`.
- Placing subscriptions, or assigning org-wide policy -> parent is a **management group** -> `targetScope = 'managementGroup'`.
- Creating root-level management groups or tenant-wide assignments -> parent is the **tenant** -> `targetScope = 'tenant'`.

## The four scopes side by side

| Scope             | `targetScope`        | CLI verb                       | Default if omitted | Typical Contoso use                                  |
| ----------------- | -------------------- | ------------------------------ | ------------------ | ---------------------------------------------------- |
| Resource group    | `resourceGroup`      | `az deployment group create`   | Yes (this is default) | Deploy the robotics telemetry storage + workspace |
| Subscription      | `subscription`       | `az deployment sub create`     | No                 | Create `rg-contoso-robotics-dev` and tag it          |
| Management group  | `managementGroup`    | `az deployment mg create`      | No                 | Apply "no public IPs" policy across all Contoso subs  |
| Tenant            | `tenant`             | `az deployment tenant create`  | No                 | Stand up the Contoso management group hierarchy       |

## Worked examples

### Resource group scope (the everyday case)

`targetScope` is optional here because it is the default, but declare it anyway for clarity.

```bicep
targetScope = 'resourceGroup'

resource telemetry 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: 'stcontosorobotics${uniqueString(resourceGroup().id)}'
  location: resourceGroup().location
  sku: { name: 'Standard_ZRS' }
  kind: 'StorageV2'
}
```

```powershell
az deployment group create `
  --resource-group rg-contoso-robotics-dev `
  --template-file main.bicep `
  --parameters main.bicepparam
```

### Subscription scope (create the resource group itself)

A resource group cannot create itself. To make one with IaC, deploy at **subscription scope**.

```bicep
targetScope = 'subscription'

param location string = 'eastus2'

resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: 'rg-contoso-robotics-dev'
  location: location
  tags: {
    workload: 'robotics-telemetry'
    env: 'dev'
    costCenter: 'CR-1042'
  }
}
```

```powershell
# Note: --location sets where the deployment metadata lives, not the resources
az deployment sub create `
  --location eastus2 `
  --template-file create-rg.bicep
```

### Cross-scope with modules

A common real pattern: a **subscription-scope** file creates the resource group, then calls a **module** scoped into that group to deploy workload resources. This is how you go from "empty subscription" to "running workload" in one deployment.

```bicep
targetScope = 'subscription'

param location string = 'eastus2'

resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: 'rg-contoso-robotics-dev'
  location: location
}

// The module runs at resource-group scope, targeting the group we just made
module workload 'main.bicep' = {
  name: 'contoso-workload'
  scope: rg
  params: {
    location: location
  }
}
```

## Mistakes this prevents

- **`InvalidTemplateDeployment` / "resource type not supported at scope"** - you used `az deployment group create` on a file whose `targetScope` is `subscription`, or vice versa. Match the verb to the `targetScope`.
- **"Cannot create resource group from within itself"** - you tried to declare a `resourceGroups` resource in an RG-scoped file. Move it to a subscription-scoped file.
- **Deployment succeeds but lands in the wrong place** - you forgot `scope:` on a module and it deployed into the parent scope. Always set `scope:` when a module's target differs from the file's scope.

## Scope-aware functions

These functions return different things depending on scope. Using one outside its scope is an authoring error.

| Function                   | Valid at scope        | Returns                                |
| -------------------------- | --------------------- | -------------------------------------- |
| `resourceGroup()`          | resourceGroup         | The target resource group object        |
| `subscription()`           | subscription, RG      | The target subscription object          |
| `managementGroup()`        | managementGroup       | The target management group object      |
| `tenant()`                 | all                   | The tenant object                       |
| `deployment()`             | all                   | The current deployment metadata         |
