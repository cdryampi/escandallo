# Windows PowerShell

## Scripts disponibles
- `scripts/windows/start-escandallo.ps1`
- `scripts/windows/stop-escandallo.ps1`
- `scripts/windows/restart-escandallo.ps1`

## Ejecucion
Desde PowerShell en Windows:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\windows\start-escandallo.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\windows\stop-escandallo.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\windows\restart-escandallo.ps1
```

## Que hace `start-escandallo.ps1`
1. Verifica que `docker` exista.
2. Intenta iniciar Docker Desktop si no responde.
3. Espera a que Docker este listo.
4. Lanza `bash scripts/wsl/up.sh` dentro de `Ubuntu-24.04`.
5. Muestra URLs finales.

## Notas
- No requiere PowerShell como administrador en condiciones normales.
- Usa `wsl -d Ubuntu-24.04` de forma explicita para evitar ambiguedad.
