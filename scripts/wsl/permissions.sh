#!/usr/bin/env bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "${SCRIPT_DIR}/common.sh"

PROJECT_ROOT="$(escandallo_default_root)"

if [ ! -d "${PROJECT_ROOT}" ]; then
    echo "[permissions] Missing project root: ${PROJECT_ROOT}"
    exit 1
fi

echo "[permissions] Applying safe permissions in ${PROJECT_ROOT}..."
# Note: if repo lives under /mnt/c, chmod may need WSL metadata enabled in /etc/wsl.conf.
find "${PROJECT_ROOT}" -type d -not -path "*/vendor/*" -not -path "*/node_modules/*" -exec chmod 755 {} \;
find "${PROJECT_ROOT}" -type f -not -path "*/vendor/*" -not -path "*/node_modules/*" -exec chmod 644 {} \;

if [ -d "${PROJECT_ROOT}/scripts/wsl" ]; then
    find "${PROJECT_ROOT}/scripts/wsl" -maxdepth 1 -type f -name "*.sh" -exec chmod 755 {} \;
fi

if [ -d "${PROJECT_ROOT}/backend/storage" ]; then
    chmod -R 775 "${PROJECT_ROOT}/backend/storage"
fi

if [ -d "${PROJECT_ROOT}/backend/bootstrap/cache" ]; then
    chmod -R 775 "${PROJECT_ROOT}/backend/bootstrap/cache"
fi

echo "[permissions] Done."
