#!/usr/bin/env bash

set -e

escandallo_default_root() {
    if [ -e /srv/escandallo ]; then
        printf '%s\n' "/srv/escandallo"
    else
        printf '%s\n' "/mnt/c/digitalbitsolutions/escandallo"
    fi
}

cd_escandallo_root() {
    local project_root
    project_root="$(escandallo_default_root)"

    if [ ! -d "${project_root}" ]; then
        echo "[common] Project root not found: ${project_root}"
        exit 1
    fi

    cd "${project_root}"
}
