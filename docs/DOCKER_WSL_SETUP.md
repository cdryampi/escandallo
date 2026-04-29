# Docker + WSL2 Setup

## Objetivo
Levantar entorno local de Escandallo con Docker Desktop + WSL2, sin XAMPP y sin instalar PHP o MySQL directamente en Windows.

## Requisitos
- Windows 11 o Windows 10 con WSL2 habilitado.
- Docker Desktop instalado.
- Distro `Ubuntu-24.04` disponible en WSL.
- Integracion de Docker Desktop activa para `Ubuntu-24.04`.

## Activar Docker Desktop con WSL2
1. Instalar Docker Desktop.
2. Abrir Docker Desktop.
3. Ir a `Settings > General` y activar `Use the WSL 2 based engine`.
4. Ir a `Settings > Resources > WSL Integration`.
5. Activar integracion para `Ubuntu-24.04`.

## Comprobaciones
En WSL:

```bash
wsl -l -v
docker version
docker compose version
```

Debes ver:
- `Ubuntu-24.04` en version `2`
- Docker client/server respondiendo
- Docker Compose plugin disponible

## Por que no XAMPP
- Duplica servicios que Docker ya controla.
- Mezcla versiones del host con versiones del proyecto.
- Complica reproducibilidad entre equipos.
- Hace mas dificil aislar PHP, MySQL y Nginx por proyecto.

## Por que no instalar PHP/MySQL en Windows
- Docker ya fija versiones y extensiones.
- Se evita ensuciar Windows con servicios residentes.
- Se reduce conflicto de puertos y PATH.
- Todo el stack queda controlado por Compose.

## Que hace cada contenedor
- `nginx`: expone Laravel en `http://localhost:8080`
- `backend`: ejecuta PHP-FPM y Composer para Laravel
- `frontend`: ejecuta Vite en `http://localhost:5173`
- `mysql`: base de datos persistente en volumen Docker

## Flujo inicial
```bash
cd /mnt/c/digitalbitsolutions/escandallo
bash scripts/wsl/bootstrap.sh
bash scripts/wsl/fresh-install.sh
```
