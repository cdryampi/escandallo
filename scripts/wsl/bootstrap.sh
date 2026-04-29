#!/usr/bin/env bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "${SCRIPT_DIR}/common.sh"

echo "[bootstrap] Verifying WSL environment..."
if [ -z "${WSL_DISTRO_NAME:-}" ]; then
    echo "[bootstrap] This script must run inside WSL."
    exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
    echo "[bootstrap] Docker CLI not found."
    exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
    echo "[bootstrap] Docker Compose plugin not available."
    exit 1
fi

echo "[bootstrap] Linking project into /srv..."
bash "${SCRIPT_DIR}/link-project.sh"

cd_escandallo_root

if [ -d backend ] && [ ! -f backend/.env ]; then
    echo "[bootstrap] Creating backend/.env from .env.docker.example..."
    cp .env.docker.example backend/.env
fi

if [ -d frontend ] && [ ! -f frontend/.env ] && [ -f frontend/.env.example ]; then
    echo "[bootstrap] Creating frontend/.env from frontend/.env.example..."
    cp frontend/.env.example frontend/.env
fi

echo "[bootstrap] Applying permissions..."
bash "${SCRIPT_DIR}/permissions.sh"

echo "[bootstrap] Building containers..."
docker compose build

echo "[bootstrap] Starting containers..."
docker compose up -d

echo "[bootstrap] Infra ready."
echo "[bootstrap] If backend/vendor or frontend/node_modules are empty, run: bash scripts/wsl/fresh-install.sh"
