<#
.SYNOPSIS
    Provisions the Azure Static Web App (Free tier) and wires the deployment
    token into GitHub Actions.

.DESCRIPTION
    Idempotent: re-running will reuse an existing resource group / static web
    app rather than failing. Requires `az` and `gh`, both already signed in.

.EXAMPLE
    ./scripts/setup-azure.ps1
    ./scripts/setup-azure.ps1 -AppName portfolio-stuart -Location westeurope
#>
[CmdletBinding()]
param(
    [string]$ResourceGroup = 'rg-portfolio',
    [string]$AppName       = 'swa-alestaos-portfolio',

    # Free-tier Static Web Apps exist only in these regions, and any of them
    # can stop accepting new customers without notice (westeurope was closed
    # when this was written). The script falls through the list in order.
    [ValidateSet('eastus2', 'centralus', 'westus2', 'westeurope', 'eastasia')]
    [string[]]$Location    = @('eastus2', 'centralus', 'westus2', 'eastasia'),

    [string]$Repo          = 'Alestaos/portfolio'
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Write-Step { param([string]$Message) Write-Host "`n==> $Message" -ForegroundColor Cyan }

# --- Preflight -------------------------------------------------------------
Write-Step 'Checking prerequisites'

foreach ($tool in 'az', 'gh') {
    if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) {
        throw "'$tool' is not on PATH. Install it and re-run."
    }
}

$account = az account show 2>$null | ConvertFrom-Json
if (-not $account) {
    throw "Not signed in to Azure. Run 'az login' first."
}
Write-Host "  Subscription: $($account.name) [$($account.id)]"

gh auth status 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) { throw "Not signed in to GitHub. Run 'gh auth login' first." }

# --- Resource group --------------------------------------------------------
Write-Step 'Ensuring the Microsoft.Web provider is registered'
$providerState = az provider show --namespace Microsoft.Web --query registrationState -o tsv 2>$null
if ($providerState -ne 'Registered') {
    Write-Host "  Currently '$providerState' — registering (this takes a minute)."
    az provider register --namespace Microsoft.Web --wait
    if ($LASTEXITCODE -ne 0) { throw 'Failed to register the Microsoft.Web provider.' }
}
Write-Host '  Registered.'

Write-Step "Ensuring resource group '$ResourceGroup'"
$rgExists = (az group exists --name $ResourceGroup) -eq 'true'
if ($rgExists) {
    Write-Host '  Already exists.'
} else {
    # The group's own region only stores metadata; the app picks its own below.
    az group create --name $ResourceGroup --location $Location[0] --output none
    if ($LASTEXITCODE -ne 0) { throw "Failed to create resource group '$ResourceGroup'." }
    Write-Host "  Created in $($Location[0])."
}

# --- Static Web App --------------------------------------------------------
Write-Step "Ensuring static web app '$AppName'"
$existing = az staticwebapp show --name $AppName --resource-group $ResourceGroup 2>$null | ConvertFrom-Json

if ($existing) {
    Write-Host "  Already exists in $($existing.location)."
    $swa = $existing
} else {
    $swa = $null
    foreach ($loc in $Location) {
        Write-Host "  Trying $loc..."
        # No --source/--token: the GitHub Actions workflow in this repo owns
        # deployment, so the app is created disconnected from any repo.
        $output = az staticwebapp create `
            --name $AppName `
            --resource-group $ResourceGroup `
            --location $loc `
            --sku Free `
            --output json 2>&1 | Out-String

        if ($LASTEXITCODE -eq 0) {
            $swa = $output | ConvertFrom-Json
            Write-Host "  Created in $loc."
            break
        }

        # Free-tier capacity closes region by region; keep trying. Anything
        # else is a real failure and should stop the script.
        if ($output -notmatch 'RequestDisallowedByAzure|not accepting new customers') {
            throw "Failed to create the static web app in ${loc}:`n$output"
        }
        Write-Host "    $loc is not accepting new customers."
    }

    if (-not $swa) {
        throw "No Free-tier region accepted the app. Tried: $($Location -join ', ')."
    }
}

if (-not $swa.defaultHostname) { throw 'The static web app has no defaultHostname.' }
Write-Host "  Default hostname: https://$($swa.defaultHostname)"

# --- Deployment token ------------------------------------------------------
Write-Step 'Fetching deployment token'
$token = az staticwebapp secrets list `
    --name $AppName `
    --resource-group $ResourceGroup `
    --query 'properties.apiKey' `
    --output tsv

if ([string]::IsNullOrWhiteSpace($token)) { throw 'Could not read the deployment token.' }
Write-Host '  Retrieved.'

Write-Step "Setting AZURE_STATIC_WEB_APPS_API_TOKEN on $Repo"
$token | gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN --repo $Repo
Write-Host '  Secret set.'

# --- Summary ---------------------------------------------------------------
Write-Step 'Done'
Write-Host @"
  Resource group : $ResourceGroup
  Static web app : $AppName ($($swa.location), Free)
  Live URL       : https://$($swa.defaultHostname)

  Next: push to main to trigger a deploy, then run
    ./scripts/setup-custom-domain.ps1
"@ -ForegroundColor Green
