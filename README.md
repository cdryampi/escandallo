# Escandallo Monorepo

Base local para proyecto Escandallo con:
- `backend/` Laravel REST API
- `frontend/` React SPA con Vite
- `docs/` documentacion operativa y tecnica
- Docker Compose + WSL2 para entorno controlado

## Requisitos
- Docker Desktop
- WSL2
- Distro `Ubuntu-24.04`
- Integracion WSL activa en Docker Desktop

## Inicio rapido

### Primera vez

1. Abrir WSL `Ubuntu-24.04`.
2. Ir al repo:

```bash
cd /mnt/c/digitalbitsolutions/escandallo
```

3. Preparar contenedores, `.env`, permisos y enlace WSL:

```bash
bash scripts/wsl/bootstrap.sh
```

4. Instalar dependencias y dejar backend/frontend listos:

```bash
bash scripts/wsl/fresh-install.sh
```

5. Abrir aplicacion:
- Frontend: `http://localhost:5173`
- Laravel/Nginx: `http://localhost:8080`
- API: `http://localhost:8080/api/v1`

### Arranque diario

Si ya hiciste instalacion inicial, para arrancar proyecto no hace falta repetir `fresh-install.sh`.

Desde Windows PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\windows\start-escandallo.ps1
```

O desde WSL:

```bash
cd /mnt/c/digitalbitsolutions/escandallo
bash scripts/wsl/up.sh
```

### Parar proyecto

Desde Windows PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\windows\stop-escandallo.ps1
```

O desde WSL:

```bash
cd /mnt/c/digitalbitsolutions/escandallo
bash scripts/wsl/down.sh
```

### Reiniciar proyecto

Desde Windows PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\windows\restart-escandallo.ps1
```

O desde WSL:

```bash
cd /mnt/c/digitalbitsolutions/escandallo
bash scripts/wsl/restart.sh
```

## Estructura
- `backend/`: Laravel API
- `frontend/`: React SPA
- `docker/`: infraestructura Docker local
- `scripts/wsl/`: operacion diaria desde WSL
- `scripts/windows/`: arranque/parada desde PowerShell
- `docs/`: setup, servicios, troubleshooting

## Reconstruir contenedores

Desde WSL:

```bash
cd /mnt/c/digitalbitsolutions/escandallo
bash scripts/wsl/rebuild.sh
```

Alternativa desde Windows:

```bash
wsl -d Ubuntu-24.04 bash -lc "cd /srv/escandallo && bash scripts/wsl/rebuild.sh"
```

## Shells utiles
Backend:

```bash
cd /mnt/c/digitalbitsolutions/escandallo
bash scripts/wsl/shell-backend.sh
```

Frontend:

```bash
cd /mnt/c/digitalbitsolutions/escandallo
bash scripts/wsl/shell-frontend.sh
```

MySQL:

```bash
cd /mnt/c/digitalbitsolutions/escandallo
bash scripts/wsl/mysql.sh
```

## URLs locales
- Frontend dev: `http://localhost:5173`
- Nginx/Laravel: `http://localhost:8080`
- API base: `http://localhost:8080/api/v1`
- MySQL host: `127.0.0.1:3307`

## Comandos Laravel dentro de Docker
```bash
docker compose exec backend php artisan migrate
docker compose exec backend php artisan migrate:fresh --seed
docker compose exec backend php artisan test
docker compose exec backend php artisan optimize:clear
docker compose exec backend composer install
docker compose exec backend composer update
```

## Comandos frontend dentro de Docker
```bash
docker compose exec frontend npm install
docker compose exec frontend npm run dev
docker compose exec frontend npm run build
docker compose exec frontend npm run lint
docker compose exec frontend npm run typecheck
```

## Nota sobre rutas WSL

Scripts WSL resuelven repo automaticamente:
- usan `/srv/escandallo` si `bootstrap.sh` ya creo enlace
- si no existe, caen a `/mnt/c/digitalbitsolutions/escandallo`

Para documentacion de uso diario, este README usa `/mnt/c/...` porque siempre existe en maquina Windows + WSL.

## Documentacion
- [Docker + WSL setup](docs/DOCKER_WSL_SETUP.md)
- [Docker services](docs/DOCKER_SERVICES.md)
- [Windows PowerShell](docs/WINDOWS_POWERSHELL.md)
- [WSL link and permissions](docs/WSL_LINK_AND_PERMISSIONS.md)
- [Local development](docs/LOCAL_DEVELOPMENT.md)
- [Troubleshooting Docker](docs/TROUBLESHOOTING_DOCKER.md)
