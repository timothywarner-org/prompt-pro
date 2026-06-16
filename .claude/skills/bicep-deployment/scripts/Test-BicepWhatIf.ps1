#Requires -Version 7.0
<#
.SYNOPSIS
    Lint, validate, and what-if preview a Bicep deployment. Mutates nothing.

.DESCRIPTION
    Runs the safe-deployment preview loop against a resource group:
      1. Confirms Azure CLI and the Bicep tooling are present.
      2. Lints the template so best-practice warnings surface early.
      3. Validates the template against the target scope via ARM.
      4. Runs what-if so you see the exact create / modify / delete set.

    This is step 1-3 of the golden loop. It changes no Azure resources, so it
    is safe to run on production. Pair it with Deploy-Bicep.ps1 for the apply.

    Teaching scenario: deploys the Contoso Robotics telemetry starter.

.PARAMETER TemplateFile
    Path to the .bicep template. Defaults to the bundled Contoso starter.

.PARAMETER ParameterFile
    Path to the .bicepparam parameter file. Defaults to the bundled starter.

.PARAMETER ResourceGroup
    Target resource group name. Created on demand if it does not exist
    (creation is the only mutation, and only when -CreateResourceGroup is set).

.PARAMETER Location
    Azure region used when creating the resource group.

.PARAMETER CreateResourceGroup
    Create the resource group if it is missing. Off by default so a typo in the
    group name fails loudly instead of provisioning in the wrong place.

.EXAMPLE
    ./Test-BicepWhatIf.ps1 -ResourceGroup rg-contoso-robotics-dev -Location eastus2

    Lints, validates, and previews the bundled starter against the dev group.

.NOTES
    Author : Tim Warner - How to Prompt Like a Pro (O'Reilly)
    Why     : Demonstrates what-if-before-apply as a non-negotiable habit.
#>
[CmdletBinding()]
param(
    [string] $TemplateFile = (Join-Path $PSScriptRoot '..' 'templates' 'main.bicep'),
    [string] $ParameterFile = (Join-Path $PSScriptRoot '..' 'templates' 'main.bicepparam'),
    [Parameter(Mandatory)] [string] $ResourceGroup,
    [string] $Location = 'eastus2',
    [switch] $CreateResourceGroup
)

# Stop on the first error so a failed prerequisite never cascades into a
# misleading what-if. Structured exit codes let CI gate on the outcome.
$ErrorActionPreference = 'Stop'

function Write-Step {
    param([string] $Message)
    # Position + label, never color alone, so the output reads on any terminal.
    Write-Host "==> $Message" -ForegroundColor Cyan
}

try {
    Write-Step 'Checking prerequisites (Azure CLI + Bicep)'
    if (-not (Get-Command az -ErrorAction SilentlyContinue)) {
        throw 'Azure CLI (az) not found on PATH. Install from https://aka.ms/azcli.'
    }
    # Ensure the Bicep tooling is current; az self-installs it on first use.
    az bicep upgrade --only-show-errors | Out-Null

    if (-not (Test-Path $TemplateFile)) {
        throw "Template not found: $TemplateFile"
    }

    Write-Step "Linting template: $TemplateFile"
    az bicep lint --file $TemplateFile

    Write-Step "Ensuring resource group context: $ResourceGroup"
    $rgExists = (az group exists --name $ResourceGroup) -eq 'true'
    if (-not $rgExists) {
        if ($CreateResourceGroup) {
            Write-Step "Creating resource group $ResourceGroup in $Location"
            az group create --name $ResourceGroup --location $Location --only-show-errors | Out-Null
        }
        else {
            throw "Resource group '$ResourceGroup' does not exist. Re-run with -CreateResourceGroup to provision it, or fix the name."
        }
    }

    # Validate first: ARM checks the template against the scope without deploying.
    Write-Step 'Validating template against target scope'
    az deployment group validate `
        --resource-group $ResourceGroup `
        --template-file $TemplateFile `
        --parameters $ParameterFile `
        --only-show-errors | Out-Null
    Write-Host '    Validation passed.' -ForegroundColor Green

    # What-if: the whole point. Read this before you ever deploy.
    Write-Step 'Running what-if preview (no resources change)'
    az deployment group what-if `
        --resource-group $ResourceGroup `
        --template-file $TemplateFile `
        --parameters $ParameterFile

    Write-Host ''
    Write-Host 'Preview complete. Review the change set above, then run Deploy-Bicep.ps1 to apply.' -ForegroundColor Green
    exit 0
}
catch {
    Write-Host ''
    Write-Error "Preview failed: $($_.Exception.Message)"
    # Distinct non-zero code so a CI gate can branch on preview failure.
    exit 1
}
