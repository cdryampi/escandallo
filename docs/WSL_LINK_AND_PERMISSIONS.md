# WSL Link and Permissions

## Rutas
- Windows: `C:\digitalbitsolutions\escandallo`
- WSL real: `/mnt/c/digitalbitsolutions/escandallo`
- Symlink operativo: `/srv/escandallo`

## Crear link operativo
```bash
bash scripts/wsl/link-project.sh
```

El script:
- crea ruta Windows si falta
- crea `/srv` si falta
- recrea `/srv/escandallo`
- valida enlace final

## Permisos
```bash
bash scripts/wsl/permissions.sh
```

Reglas aplicadas:
- directorios `755`
- archivos `644`
- scripts `.sh` ejecutables
- `backend/storage` y `backend/bootstrap/cache` a `775`

## Importante sobre `/mnt/c`
En algunos equipos, `chmod` dentro de `/mnt/c` no aplica como esperas si WSL no tiene metadata activada.

Si hace falta, revisar `/etc/wsl.conf`:

```ini
[automount]
options = "metadata,umask=22,fmask=11"
```

Luego reiniciar WSL:

```powershell
wsl --shutdown
```

## Recomendacion futura
Si el bind mount sobre `/mnt/c` va lento, mover repo a filesystem nativo WSL puede mejorar Vite, npm y Composer. No forma parte de esta primera entrega.
