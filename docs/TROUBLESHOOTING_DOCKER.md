# Troubleshooting Docker

## Docker no arranca
- Abrir Docker Desktop manualmente.
- Esperar a que `docker version` responda.
- Verificar que WSL2 backend este activo.

## Puerto ocupado
- `8080`, `5173` o `3307` pueden estar usados.
- Revisar procesos locales y parar servicio en conflicto.
- Ajustar puertos en `docker-compose.yml` si hace falta.

## MySQL no conecta
- Confirmar que `mysql` esta healthy:

```bash
docker compose ps
docker compose logs mysql
```

- Verificar que Laravel usa:
  - `DB_HOST=mysql`
  - `DB_PORT=3306`

## Permission denied
- Ejecutar:

```bash
bash scripts/wsl/permissions.sh
```

- Revisar metadata WSL si repo vive en `/mnt/c`.

## npm lento
- Es normal que `/mnt/c` sea mas lento que filesystem WSL.
- `frontend_node_modules` ya vive en volumen Docker para reducir impacto.

## vendor no existe
- Ejecutar:

```bash
bash scripts/wsl/fresh-install.sh
```

## node_modules corrupto o vacio
- Reconstruir:

```bash
docker compose down
docker volume rm escandallo_frontend_node_modules
docker compose run --rm frontend npm install
docker compose up -d
```

## Laravel APP_KEY missing
- Ejecutar:

```bash
docker compose exec backend php artisan key:generate
```

## CORS o Sanctum falla
- Revisar `FRONTEND_URL`, `APP_URL` y `SANCTUM_STATEFUL_DOMAINS`.
- Verificar `withCredentials: true` en frontend.
- Pedir CSRF antes de login usando `VITE_SANCTUM_CSRF_URL`.

## API no responde
- Revisar logs:

```bash
docker compose logs -f nginx backend
```
