// =============================================================================
// Contoso Robotics - telemetry foundation (resource group scope)
// -----------------------------------------------------------------------------
// A deployable teaching starter: a hardened storage account for robot
// telemetry plus a Log Analytics workspace for its diagnostics. Small enough
// to read in one screen, real enough to model production habits.
//
// Deploy with the bundled scripts (what-if first, always):
//   ../scripts/Test-BicepWhatIf.ps1 -ResourceGroup rg-contoso-robotics-dev
//   ../scripts/Deploy-Bicep.ps1     -ResourceGroup rg-contoso-robotics-dev -WhatIfFirst
// =============================================================================

// Explicit scope even though resourceGroup is the default - clarity for readers.
targetScope = 'resourceGroup'

// ---------------------------------------------------------------------------
// Parameters - the knobs that change between environments.
// ---------------------------------------------------------------------------

@description('Region for all resources. Defaults to the resource group region.')
param location string = resourceGroup().location

@allowed([ 'dev', 'test', 'prod' ])
@description('Environment short name, used in names and tags.')
param env string = 'dev'

@allowed([ 'Standard_LRS', 'Standard_ZRS', 'Standard_GZRS' ])
@description('Storage redundancy. LRS for dev to save cost, ZRS+ for prod resilience.')
param storageSku string = 'Standard_LRS'

@minValue(7)
@maxValue(730)
@description('Log Analytics retention in days.')
param retentionInDays int = 30

// ---------------------------------------------------------------------------
// Variables - composed once, reused everywhere.
// ---------------------------------------------------------------------------

var workload = 'robotics'

// Storage names: lowercase, no hyphens, 24-char max, globally unique. The
// uniqueString hash makes re-deploys deterministic and collision-resistant.
var storageName = 'st${workload}${env}${uniqueString(resourceGroup().id)}'

var commonTags = {
  workload: workload
  env: env
  managedBy: 'bicep'
  costCenter: 'CR-1042'
}

// Telemetry containers created in one loop instead of three copy-paste blocks.
var containerNames = [ 'telemetry', 'firmware', 'audit-logs' ]

// ---------------------------------------------------------------------------
// Resources.
// ---------------------------------------------------------------------------

resource workspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: '${workload}-${env}-law'
  location: location
  tags: commonTags
  properties: {
    sku: { name: 'PerGB2018' }
    retentionInDays: retentionInDays
  }
}

resource storage 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageName
  location: location
  tags: commonTags
  sku: { name: storageSku }
  kind: 'StorageV2'
  properties: {
    // Security defaults that should never regress, regardless of environment.
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
    allowBlobPublicAccess: false
    allowSharedKeyAccess: false // force Entra ID / managed-identity auth
  }
}

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

// ---------------------------------------------------------------------------
// Outputs - handles a downstream stage or human needs. No secrets here, ever.
// ---------------------------------------------------------------------------

output storageAccountName string = storage.name
output storageAccountId string = storage.id
output workspaceResourceId string = workspace.id
