#!/usr/bin/env bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "${SCRIPT_DIR}/common.sh"

cd_escandallo_root
echo "[shell-frontend] Opening frontend shell..."
docker compose exec frontend sh
