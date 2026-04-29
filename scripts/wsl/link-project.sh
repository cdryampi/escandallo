#!/usr/bin/env bash

set -e

WINDOWS_PROJECT_ROOT="/mnt/c/digitalbitsolutions/escandallo"
WSL_LINK_ROOT="/srv"
WSL_PROJECT_LINK="${WSL_LINK_ROOT}/escandallo"

run_link_cmd() {
    local root_cmd

    if [ -w "${WSL_LINK_ROOT}" ] || [ ! -e "${WSL_LINK_ROOT}" ] && [ -w / ]; then
        "$@"
        return
    fi

    if command -v wsl.exe >/dev/null 2>&1 && [ -n "${WSL_DISTRO_NAME:-}" ]; then
        printf -v root_cmd '%q ' "$@"
        wsl.exe -d "${WSL_DISTRO_NAME}" -u root bash -lc "${root_cmd}"
        return
    fi

    if ! command -v sudo >/dev/null 2>&1; then
        echo "[link-project] sudo not available and ${WSL_LINK_ROOT} requires elevated permissions."
        exit 1
    fi

    sudo "$@"
}

echo "[link-project] Ensuring Windows project path exists..."
mkdir -p "${WINDOWS_PROJECT_ROOT}"

echo "[link-project] Ensuring ${WSL_LINK_ROOT} exists..."
run_link_cmd mkdir -p "${WSL_LINK_ROOT}"

if [ -L "${WSL_PROJECT_LINK}" ] || [ -e "${WSL_PROJECT_LINK}" ]; then
    echo "[link-project] Removing previous ${WSL_PROJECT_LINK}..."
    run_link_cmd rm -rf "${WSL_PROJECT_LINK}"
fi

echo "[link-project] Creating symlink..."
run_link_cmd ln -s "${WINDOWS_PROJECT_ROOT}" "${WSL_PROJECT_LINK}"

if [ ! -e "${WSL_PROJECT_LINK}" ]; then
    echo "[link-project] Failed to create ${WSL_PROJECT_LINK}"
    exit 1
fi

echo "[link-project] Ready: $(readlink -f "${WSL_PROJECT_LINK}")"
