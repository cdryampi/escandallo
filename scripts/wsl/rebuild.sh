#!/usr/bin/env bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "${SCRIPT_DIR}/common.sh"

cd_escandallo_root
echo "[rebuild] Rebuilding containers without cache..."
docker compose down
docker compose build --no-cache
docker compose up -d
