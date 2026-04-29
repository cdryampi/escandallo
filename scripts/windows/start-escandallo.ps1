$ErrorActionPreference = "Stop"

$WslDistro = "Ubuntu-24.04"
$ProjectPath = "/mnt/c/digitalbitsolutions/escandallo"
$StartScript = "bash scripts/wsl/up.sh"

function Wait-Docker {
    param (
        [int]$TimeoutSeconds = 90
    )

    $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
    while ((Get-Date) -lt $deadline) {
        try {
            docker info | Out-Null
            return $true
        } catch {
            Start-Sleep -Seconds 3
        }
    }

    return $false
}

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    throw "Docker CLI not found. Install Docker Desktop first."
}

Write-Host "[start] Checking Docker Desktop..."
try {
    docker info | Out-Null
} catch {
    $dockerDesktop = Join-Path $Env:ProgramFiles "Docker\Docker\Docker Desktop.exe"
    if (-not (Test-Path $dockerDesktop)) {
        throw "Docker Desktop executable not found at $dockerDesktop"
    }

    Write-Host "[start] Starting Docker Desktop..."
    Start-Process -FilePath $dockerDesktop

    if (-not (Wait-Docker)) {
        throw "Docker Desktop did not become ready in time."
    }
}

Write-Host "[start] Starting Escandallo stack in WSL..."
wsl -d $WslDistro bash -lc "cd $ProjectPath && $StartScript"

Write-Host ""
Write-Host "Frontend: http://localhost:5173"
Write-Host "Laravel/Nginx: http://localhost:8080"
Write-Host "API: http://localhost:8080/api/v1"
