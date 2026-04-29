$ErrorActionPreference = "Stop"

$WslDistro = "Ubuntu-24.04"

Write-Host "[stop] Stopping Escandallo stack..."
wsl -d $WslDistro bash -lc "cd /mnt/c/digitalbitsolutions/escandallo && bash scripts/wsl/down.sh"
