# Local Development

## Flujo diario
1. Arrancar stack
2. Trabajar en codigo desde Windows o WSL
3. Ejecutar Artisan y npm dentro de contenedores
4. Parar stack al terminar si quieres liberar recursos

## Arranque
```bash
cd /srv/escandallo
bash scripts/wsl/up.sh
```

## Primera instalacion
```bash
cd /srv/escandallo
bash scripts/wsl/bootstrap.sh
bash scripts/wsl/fresh-install.sh
```

## Laravel dentro de Docker
```bash
docker compose exec backend composer install
docker compose exec backend composer update
docker compose exec backend php artisan migrate
docker compose exec backend php artisan migrate:fresh --seed
docker compose exec backend php artisan test
docker compose exec backend php artisan optimize:clear
docker compose exec backend php artisan about
```

## Frontend dentro de Docker
```bash
docker compose exec frontend npm install
docker compose exec frontend npm run dev
docker compose exec frontend npm run build
docker compose exec frontend npm run lint
docker compose exec frontend npm run typecheck
```

## Shells utiles
```bash
bash scripts/wsl/shell-backend.sh
bash scripts/wsl/shell-frontend.sh
bash scripts/wsl/mysql.sh
```

## URLs locales
- Frontend: `http://localhost:5173`
- Laravel/Nginx: `http://localhost:8080`
- API base: `http://localhost:8080/api/v1`
- MySQL host: `127.0.0.1:3307`
