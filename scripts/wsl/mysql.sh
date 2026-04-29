#!/usr/bin/env bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "${SCRIPT_DIR}/common.sh"

cd_escandallo_root
echo "[mysql] Opening MySQL client..."
docker compose exec mysql mysql -u escandallo_app -pescandallo_secret escandallo
