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

    # Free-tier Static Web Apps are only available in these regions.
    [ValidateSet('westus2', 'centralus', 'eastus2', 'westeurope', 'eastasia')]
    [string]$Location      = 'westeurope',

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
Write-Step "Ensuring resource group '$ResourceGroup'"
$rgExists = (az group exists --name $ResourceGroup) -eq 'true'
if ($rgExists) {
    Write-Host '  Already exists.'
} else {
    az group create --name $ResourceGroup --location $Location --output none
    Write-Host "  Created in $Location."
}

# --- Static Web App --------------------------------------------------------
Write-Step "Ensuring static web app '$AppName'"
$existing = az staticwebapp show --name $AppName --resource-group $ResourceGroup 2>$null | ConvertFrom-Json

if ($existing) {
    Write-Host '  Already exists.'
    $swa = $existing
} else {
    # No --source/--token: the GitHub Actions workflow in this repo owns
    # deployment, so the app is created disconnected from any repo.
    $swa = az staticwebapp create `
        --name $AppName `
        --resource-group $ResourceGroup `
        --location $Location `
        --sku Free `
        --output json | ConvertFrom-Json
    Write-Host '  Created.'
}

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
  Static web app : $AppName ($Location, Free)
  Live URL       : https://$($swa.defaultHostname)

  Next: push to main to trigger a deploy, then run
    ./scripts/setup-custom-domain.ps1
"@ -ForegroundColor Green
