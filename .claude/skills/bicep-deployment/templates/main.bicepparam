// =============================================================================
// Parameter file for main.bicep - Contoso Robotics dev environment.
// -----------------------------------------------------------------------------
// .bicepparam is type-checked against the template it references via `using`,
// so a wrong name or type fails at build time, not mid-deploy. For secrets,
// use getSecret(...) to pull from Key Vault rather than placing a value here.
// =============================================================================

using './main.bicep'

param env = 'dev'

// Dev stays cheap with locally redundant storage. Prod would override to
// Standard_ZRS (or GZRS) in a separate main.prod.bicepparam.
param storageSku = 'Standard_LRS'

param retentionInDays = 30
