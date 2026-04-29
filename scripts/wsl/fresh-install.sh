#!/usr/bin/env bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "${SCRIPT_DIR}/common.sh"

cd_escandallo_root

echo "[fresh-install] Starting MySQL first..."
docker compose up -d mysql

echo "[fresh-install] Waiting for MySQL healthcheck..."
until [ "$(docker inspect -f '{{.State.Health.Status}}' "$(docker compose ps -q mysql)")" = "healthy" ]; do
    sleep 2
done

if [ ! -f backend/.env ]; then
    echo "[fresh-install] backend/.env missing. Copying docker example..."
    cp .env.docker.example backend/.env
fi

if [ ! -f frontend/.env ] && [ -f frontend/.env.example ]; then
    echo "[fresh-install] frontend/.env missing. Copying example..."
    cp frontend/.env.example frontend/.env
fi

echo "[fresh-install] Installing backend dependencies..."
docker compose run --rm backend composer install

echo "[fresh-install] Generating Laravel key..."
docker compose exec backend php artisan key:generate

echo "[fresh-install] Running Laravel migrations and seeders..."
docker compose exec backend php artisan migrate --seed

echo "[fresh-install] Installing frontend dependencies..."
docker compose run --rm frontend npm install

echo "[fresh-install] Recreating app containers with installed dependencies..."
docker compose up -d --force-recreate frontend backend nginx

echo "[fresh-install] Re-applying permissions..."
bash scripts/wsl/permissions.sh
