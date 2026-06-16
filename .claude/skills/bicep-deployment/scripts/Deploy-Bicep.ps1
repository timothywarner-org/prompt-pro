#Requires -Version 7.0
<#
.SYNOPSIS
    Idempotently deploy a Bicep template to a resource group, with an optional
    what-if confirmation gate and output capture.

.DESCRIPTION
    Runs step 4-5 of the safe-deployment loop:
      4. (Optional) what-if preview, then prompt for confirmation.
      5. Deploy, then read back and print the deployment outputs.

    The deployment is idempotent: re-running with the same template and state
    is a no-op. A unique deployment name is derived from the template and a
    timestamp so concurrent runs do not collide in deployment history.

    Teaching scenario: deploys the Contoso Robotics telemetry starter.

.PARAMETER TemplateFile
    Path to the .bicep template. Defaults to the bundled Contoso starter.

.PARAMETER ParameterFile
    Path to the .bicepparam parameter file. Defaults to the bundled starter.

.PARAMETER ResourceGroup
    Target resource group. Must already exist (run Test-BicepWhatIf.ps1
    -CreateResourceGroup first if it does not).

.PARAMETER Location
    Region recorded on the deployment metadata.

.PARAMETER WhatIfFirst
    Run what-if and require confirmation before deploying. Strongly recommended
    for any environment you care about.

.PARAMETER Force
    Skip the confirmation prompt even when -WhatIfFirst is set. For CI, where a
    prior gated stage already approved the change.

.EXAMPLE
    ./Deploy-Bicep.ps1 -ResourceGroup rg-contoso-robotics-dev -WhatIfFirst

    Previews, asks for confirmation, then deploys the bundled starter.

.EXAMPLE
    ./Deploy-Bicep.ps1 -ResourceGroup rg-contoso-robotics-prod -WhatIfFirst -Force

    CI-style: previews for the log, deploys without an interactive prompt.

.NOTES
    Author : Tim Warner - How to Prompt Like a Pro (O'Reilly)
    Why     : Models idempotent, gated, output-capturing deployment.
#>
[CmdletBinding()]
param(
    [string] $TemplateFile = (Join-Path $PSScriptRoot '..' 'templates' 'main.bicep'),
    [string] $ParameterFile = (Join-Path $PSScriptRoot '..' 'templates' 'main.bicepparam'),
    [Parameter(Mandatory)] [string] $ResourceGroup,
    [string] $Location = 'eastus2',
    [switch] $WhatIfFirst,
    [switch] $Force
)

$ErrorActionPreference = 'Stop'

function Write-Step {
    param([string] $Message)
    Write-Host "==> $Message" -ForegroundColor Cyan
}

try {
    Write-Step 'Checking prerequisites (Azure CLI + Bicep)'
    if (-not (Get-Command az -ErrorAction SilentlyContinue)) {
        throw 'Azure CLI (az) not found on PATH. Install from https://aka.ms/azcli.'
    }
    az bicep upgrade --only-show-errors | Out-Null

    if (-not (Test-Path $TemplateFile)) {
        throw "Template not found: $TemplateFile"
    }

    if ((az group exists --name $ResourceGroup) -ne 'true') {
        throw "Resource group '$ResourceGroup' does not exist. Run Test-BicepWhatIf.ps1 -CreateResourceGroup first."
    }

    if ($WhatIfFirst) {
        Write-Step 'What-if preview before deploy'
        az deployment group what-if `
            --resource-group $ResourceGroup `
            --template-file $TemplateFile `
            --parameters $ParameterFile

        if (-not $Force) {
            # Interactive gate. A human reads the diff and types the answer.
            $answer = Read-Host 'Deploy these changes? Type "yes" to proceed'
            if ($answer -ne 'yes') {
                Write-Host 'Aborted by operator. No changes made.' -ForegroundColor Yellow
                exit 2
            }
        }
    }

    # Deterministic-but-unique deployment name keeps history readable and avoids
    # collisions when two runs land in the same minute.
    $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
    $deploymentName = "bicep-$([System.IO.Path]::GetFileNameWithoutExtension($TemplateFile))-$stamp"

    Write-Step "Deploying as '$deploymentName'"
    az deployment group create `
        --name $deploymentName `
        --resource-group $ResourceGroup `
        --template-file $TemplateFile `
        --parameters $ParameterFile `
        --only-show-errors | Out-Null
    Write-Host '    Deployment succeeded.' -ForegroundColor Green

    # Capture outputs so a downstream stage or a human has the resource handles.
    Write-Step 'Deployment outputs'
    $outputs = az deployment group show `
        --name $deploymentName `
        --resource-group $ResourceGroup `
        --query properties.outputs `
        --output json | ConvertFrom-Json

    if ($outputs) {
        $outputs.PSObject.Properties | ForEach-Object {
            Write-Host ("    {0} = {1}" -f $_.Name, $_.Value.value)
        }
    }
    else {
        Write-Host '    (template declares no outputs)'
    }

    Write-Host ''
    Write-Host 'Done. Verify the resources match intent, then record the outputs above.' -ForegroundColor Green
    exit 0
}
catch {
    Write-Host ''
    Write-Error "Deployment failed: $($_.Exception.Message)"
    exit 1
}
