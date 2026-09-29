<#
.SYNOPSIS
    Registers alestaos.com (apex) and www.alestaos.com on the Static Web App,
    then reports what still needs doing.

.DESCRIPTION
    Safe to run repeatedly — it is the progress check, not a one-shot.

    Azure validates the two hostnames differently:
      - apex, via a TXT record. Register first to get the token, then add the
        TXT and an ALIAS record.
      - www, via the CNAME itself. The CNAME must already resolve before
        Azure will accept the hostname, so this script waits to register it
        until DNS shows it.

    Every Azure call is non-blocking; validation happens server-side and can
    take up to an hour (Microsoft allows 72h for apex propagation).

.EXAMPLE
    ./scripts/setup-custom-domain.ps1
    ./scripts/setup-custom-domain.ps1 -Domain example.com -WwwOnly
#>
[CmdletBinding()]
param(
    [string]$ResourceGroup = 'rg-portfolio',
    [string]$AppName       = 'swa-alestaos-portfolio',
    [string]$Domain        = 'alestaos.com',

    # Skip the apex and configure only the www subdomain.
    [switch]$WwwOnly,

    # Public resolver, so results are not masked by the local DNS cache.
    [string]$Resolver      = '1.1.1.1'
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Write-Step { param([string]$Message) Write-Host "`n==> $Message" -ForegroundColor Cyan }
function Write-Todo { param([string]$Message) Write-Host "  TODO  $Message" -ForegroundColor Yellow }
function Write-Ok   { param([string]$Message) Write-Host "  OK    $Message" -ForegroundColor Green }

# --- The app ---------------------------------------------------------------
$swa = az staticwebapp show --name $AppName --resource-group $ResourceGroup -o json 2>$null | ConvertFrom-Json
if (-not $swa) { throw "Static web app '$AppName' not found in '$ResourceGroup'." }

$defaultHost = $swa.defaultHostname
Write-Host "Static web app : $AppName ($($swa.location))"
Write-Host "Default host   : $defaultHost"

function Get-Hostname {
    param([string]$Name)
    $json = az staticwebapp hostname show `
        --name $AppName --resource-group $ResourceGroup --hostname $Name -o json 2>$null
    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($json)) { return $null }
    return $json | ConvertFrom-Json
}

function Resolve-Record {
    param([string]$Name, [string]$Type)
    try {
        Resolve-DnsName -Name $Name -Type $Type -Server $Resolver -ErrorAction Stop |
            Where-Object { $_.Type -eq $Type }
    } catch {
        @()
    }
}

$outstanding = @()

# --- Apex ------------------------------------------------------------------
if (-not $WwwOnly) {
    Write-Step "Apex — $Domain"

    $apex = Get-Hostname -Name $Domain
    if (-not $apex) {
        az staticwebapp hostname set `
            --name $AppName `
            --resource-group $ResourceGroup `
            --hostname $Domain `
            --validation-method 'dns-txt-token' `
            --no-wait `
            --output none
        if ($LASTEXITCODE -ne 0) { throw "Failed to register the apex hostname '$Domain'." }

        # The token is minted asynchronously; give it a moment to appear.
        for ($i = 0; $i -lt 10 -and -not ($apex -and $apex.validationToken); $i++) {
            Start-Sleep -Seconds 3
            $apex = Get-Hostname -Name $Domain
        }
    }

    if (-not $apex) { throw "Apex hostname '$Domain' did not register." }

    Write-Host "  Azure status: $($apex.status)"
    if ($apex.errorMessage) { Write-Host "  Azure says  : $($apex.errorMessage)" -ForegroundColor Red }

    # TXT ownership record
    $wantToken = $apex.validationToken
    if ($wantToken) {
        $txt = Resolve-Record -Name $Domain -Type TXT
        $haveToken = $txt | Where-Object { $_.Strings -contains $wantToken }
        if ($haveToken) {
            Write-Ok "TXT @ = $wantToken"
        } else {
            Write-Todo ("{0,-6} {1,-5} {2,-4} {3}" -f "add", "TXT", "@", $wantToken)
            $outstanding += 'apex TXT'
        }
    }

    # ALIAS shows up to the outside world as an A record.
    $apexA = Resolve-Record -Name $Domain -Type A
    $stale = $apexA | Where-Object { $_.IPAddress -eq '172.233.211.187' }
    if ($stale) {
        Write-Todo ("{0,-6} {1,-5} {2,-4} {3}" -f "delete", "A", "@", "172.233.211.187  (stale, blocks the ALIAS)")
        $outstanding += 'apex stale A'
    }
    if (-not $apexA) {
        Write-Todo ("{0,-6} {1,-5} {2,-4} {3}" -f "add", "ALIAS", "@", $defaultHost)
        $outstanding += 'apex ALIAS'
    } elseif (-not $stale) {
        Write-Ok "apex resolves to $(($apexA.IPAddress) -join ', ')"
    }
}

# --- www -------------------------------------------------------------------
$wwwHost = "www.$Domain"
Write-Step "Subdomain — $wwwHost"

$cname = Resolve-Record -Name $wwwHost -Type CNAME
$pointsAtApp = $cname | Where-Object { $_.NameHost -eq $defaultHost }

if (-not $pointsAtApp) {
    Write-Todo ("{0,-6} {1,-5} {2,-4} {3}" -f "add", "CNAME", "www", $defaultHost)
    Write-Host '        (Azure validates www from this record, so it must exist first)'
    $outstanding += 'www CNAME'
} else {
    Write-Ok "CNAME www -> $defaultHost"

    $www = Get-Hostname -Name $wwwHost
    if (-not $www) {
        Write-Host '  Registering with Azure...'
        az staticwebapp hostname set `
            --name $AppName `
            --resource-group $ResourceGroup `
            --hostname $wwwHost `
            --no-wait `
            --output none
        if ($LASTEXITCODE -ne 0) { throw "Failed to register '$wwwHost'." }
        Start-Sleep -Seconds 3
        $www = Get-Hostname -Name $wwwHost
    }

    if ($www) {
        Write-Host "  Azure status: $($www.status)"
        if ($www.errorMessage) { Write-Host "  Azure says  : $($www.errorMessage)" -ForegroundColor Red }
        if ($www.status -ne 'Ready') { $outstanding += 'www validation' }
    }
}

# --- Summary ---------------------------------------------------------------
Write-Step 'Summary'
if ($outstanding.Count -eq 0) {
    Write-Host @"
  Both hostnames are configured. Azure issues the TLS certificates
  automatically; allow a few minutes after validation flips to Ready.

  Verify:
    curl -sI https://$Domain | Select-String '^HTTP|^location'
"@ -ForegroundColor Green
} else {
    Write-Host "  Outstanding: $($outstanding -join ', ')" -ForegroundColor Yellow
    Write-Host '  Add the records marked TODO above, then re-run this script.'
    Write-Host '  DNS changes usually land within minutes; apex can take longer.'
}
