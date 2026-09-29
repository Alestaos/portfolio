<#
.SYNOPSIS
    Registers alestaos.com (apex) and www.alestaos.com on the Static Web App.

.DESCRIPTION
    Azure validates the apex domain with a TXT record and the www subdomain
    with a CNAME. This script requests both and prints the DNS records you
    need to create at your registrar. Re-run it after the records propagate
    to confirm validation.

.EXAMPLE
    ./scripts/setup-custom-domain.ps1
    ./scripts/setup-custom-domain.ps1 -Domain example.com -WwwOnly
#>
[CmdletBinding()]
param(
    [string]$ResourceGroup = 'rg-portfolio',
    [string]$AppName       = 'swa-alestaos-portfolio',
    [string]$Domain        = 'alestaos.com',

    # Skip the apex record if you only want www.
    [switch]$WwwOnly
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Write-Step { param([string]$Message) Write-Host "`n==> $Message" -ForegroundColor Cyan }

$swa = az staticwebapp show --name $AppName --resource-group $ResourceGroup --output json | ConvertFrom-Json
if (-not $swa) { throw "Static web app '$AppName' not found in '$ResourceGroup'." }

$defaultHost = $swa.defaultHostname
Write-Host "Static web app: $AppName"
Write-Host "Default host  : $defaultHost"

# --- www: validated by the CNAME itself ------------------------------------
$wwwHost = "www.$Domain"
Write-Step "Registering $wwwHost"
$existingWww = az staticwebapp hostname show --name $AppName --resource-group $ResourceGroup --hostname $wwwHost 2>$null
if ($existingWww) {
    Write-Host '  Already registered.'
} else {
    az staticwebapp hostname set `
        --name $AppName `
        --resource-group $ResourceGroup `
        --hostname $wwwHost `
        --output none
    Write-Host '  Requested.'
}

Write-Host "`n  DNS record required:" -ForegroundColor Yellow
Write-Host "    Type: CNAME   Name: www   Value: $defaultHost"

# --- apex: validated by a TXT token ----------------------------------------
if (-not $WwwOnly) {
    Write-Step "Registering $Domain (apex)"
    $existingApex = az staticwebapp hostname show --name $AppName --resource-group $ResourceGroup --hostname $Domain 2>$null | ConvertFrom-Json

    if (-not $existingApex) {
        az staticwebapp hostname set `
            --name $AppName `
            --resource-group $ResourceGroup `
            --hostname $Domain `
            --validation-method 'dns-txt-token' `
            --output none
        Write-Host '  Requested.'
        Start-Sleep -Seconds 5
        $existingApex = az staticwebapp hostname show --name $AppName --resource-group $ResourceGroup --hostname $Domain --output json | ConvertFrom-Json
    } else {
        Write-Host '  Already requested.'
    }

    $txtToken = $existingApex.validationToken
    $status   = $existingApex.status

    Write-Host "`n  Status: $status"
    Write-Host "`n  DNS records required:" -ForegroundColor Yellow
    Write-Host "    Type: TXT     Name: @   Value: $txtToken"
    Write-Host "    Type: ALIAS   Name: @   Value: $defaultHost"
    Write-Host '      (if your registrar has no ALIAS/ANAME support, use an A record'
    Write-Host "       pointing at the IP that '$defaultHost' resolves to)"
}

Write-Host @"

Create the records above, wait for propagation (usually minutes, up to an
hour), then re-run this script to check the status. Azure issues the TLS
certificate automatically once validation passes.

Afterwards, confirm astro.config.mjs `site` matches the domain you kept as
canonical — currently https://$Domain
"@ -ForegroundColor Green
