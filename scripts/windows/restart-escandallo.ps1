$ErrorActionPreference = "Stop"

$WslDistro = "Ubuntu-24.04"

Write-Host "[restart] Restarting Escandallo stack..."
wsl -d $WslDistro bash -lc "cd /mnt/c/digitalbitsolutions/escandallo && bash scripts/wsl/restart.sh"
