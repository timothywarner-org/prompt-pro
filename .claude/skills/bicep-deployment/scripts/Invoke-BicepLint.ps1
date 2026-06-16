#Requires -Version 7.0
<#
.SYNOPSIS
    Lint one or many Bicep files and report warnings as structured output.

.DESCRIPTION
    The cheapest, fastest gate in the deployment loop. Linting runs entirely
    offline - no Azure login, no resources touched - and catches the mistakes
    that would otherwise surface as a failed deployment minutes later:
    unused parameters, insecure defaults, hardcoded locations, and use of
    deprecated API versions.

    Use it as a pre-commit check, the first step in CI, and a teaching tool to
    show learners what "clean Bicep" looks like before they ever deploy.

    Linter rules and severities are configured in bicepconfig.json (placed
    next to your templates). With no config, Bicep applies its built-in
    default rule set.

.PARAMETER Path
    A .bicep file, or a directory to scan recursively for .bicep files.
    Defaults to the skill's bundled templates folder.

.PARAMETER TreatWarningsAsErrors
    Exit non-zero if any lint warning is found. Use in CI to fail the build on
    warnings; leave off for an interactive, advisory run.

.EXAMPLE
    ./Invoke-BicepLint.ps1

    Lints every .bicep file under ../templates and prints findings.

.EXAMPLE
    ./Invoke-BicepLint.ps1 -Path ../../infra -TreatWarningsAsErrors

    CI gate: recursively lint the infra folder and fail on any warning.

.NOTES
    Author : Tim Warner - How to Prompt Like a Pro (O'Reilly)
    Why     : Lint is the highest-ROI habit in IaC - it is free and offline.
#>
[CmdletBinding()]
param(
    [string] $Path = (Join-Path $PSScriptRoot '..' 'templates'),
    [switch] $TreatWarningsAsErrors
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

    if (-not (Test-Path $Path)) {
        throw "Path not found: $Path"
    }

    # Resolve to a concrete list whether the caller passed a file or a folder.
    $files = if ((Get-Item $Path).PSIsContainer) {
        Get-ChildItem -Path $Path -Filter '*.bicep' -Recurse -File
    }
    else {
        @(Get-Item $Path)
    }

    if ($files.Count -eq 0) {
        Write-Host "No .bicep files found under $Path - nothing to lint." -ForegroundColor Yellow
        exit 0
    }

    Write-Step "Linting $($files.Count) Bicep file(s)"
    $hadFindings = $false

    foreach ($file in $files) {
        Write-Host ""
        Write-Host ("  File: {0}" -f $file.FullName) -ForegroundColor White

        # `az bicep lint` writes findings to stderr and returns non-zero only on
        # errors (not warnings). Capture both streams so warnings are visible
        # and we can decide the exit policy ourselves.
        $findings = az bicep lint --file $file.FullName 2>&1
        if ($findings) {
            $hadFindings = $true
            $findings | ForEach-Object { Write-Host ("    {0}" -f $_) }
        }
        else {
            Write-Host "    No findings. Clean." -ForegroundColor Green
        }
    }

    Write-Host ""
    if ($hadFindings -and $TreatWarningsAsErrors) {
        # Fail the gate so CI blocks the merge on lint findings.
        Write-Error 'Lint findings present and -TreatWarningsAsErrors is set.'
        exit 1
    }

    Write-Host 'Lint complete.' -ForegroundColor Green
    exit 0
}
catch {
    Write-Host ''
    Write-Error "Lint run failed: $($_.Exception.Message)"
    exit 1
}
