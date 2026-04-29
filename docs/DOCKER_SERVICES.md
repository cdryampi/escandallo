# Docker Services

## Red
- Red principal: `escandallo_bridge`
- Host interno MySQL: `mysql`

## Servicios activos

### nginx
- Imagen: `nginx:alpine`
- Puerto host: `8080`
- Sirve Laravel desde `backend/public`
- Reenvia PHP a `backend:9000`

### backend
- Base: `php:8.3-fpm`
- Workdir: `/var/www/escandallo/backend`
- Composer disponible dentro del contenedor
- Extensiones instaladas:
  - `pdo`
  - `pdo_mysql`
  - `zip`
  - `bcmath`
  - `intl`
  - `gd`
  - `opcache`

### frontend
- Imagen: `node:lts-alpine`
- Workdir: `/var/www/escandallo/frontend`
- Ejecuta `npm run dev -- --host 0.0.0.0`
- Puerto host: `5173`

### mysql
- Imagen: `mysql:8.4`
- Puerto host: `3307`
- Volumen persistente: `mysql_data`
- No guarda datos dentro de `/mnt/c`

## Servicios opcionales
- `redis` perfil `cache`
- `mailpit` perfil `mail`
- `adminer` perfil `tools`

Ejemplo:

```bash
docker compose --profile tools up -d
```

## Volumenes
- `mysql_data`: datos persistentes MySQL
- `backend_vendor`: dependencias Composer fuera de bind mount Windows
- `frontend_node_modules`: dependencias npm fuera de bind mount Windows
