# Gemini CLI Guide For Escandallo

`AGENTS.md` manda. Si este archivo contradice `AGENTS.md`, seguir `AGENTS.md`.

Workflow operativo compartido: `docs/AGENT_WORKFLOW.md`.

## Resumen del Proyecto

- Monorepo con `backend/` Laravel 12 REST API, `frontend/` React 19 SPA, MySQL 8.4 y Docker Compose sobre WSL2.
- Auth oficial con Laravel Sanctum y cookies stateful.
- Frontend usa TanStack Router, TanStack Query, React Hook Form, Zod y Tailwind 4.
- Proyecto prioriza reproducibilidad local, reglas estrictas de arquitectura y trabajo multiagente controlado.

## Cuando Usar Gemini CLI

Usar Gemini CLI cuando haga falta contexto amplio o analisis largo que seria costoso en iteraciones locales:

- analisis multiarchivo o multipaquete
- auditorias de arquitectura
- deteccion de deuda tecnica transversal
- revision de impacto de cambios grandes
- propuestas de planes o refactors amplios
- revision de consistencia entre docs, contratos y capas
- sintesis de contexto antes de que Codex ejecute cambios
- code review de areas grandes del repo

## Cuando No Usar Gemini CLI

No usar Gemini CLI para:

- cambios pequenos o locales que Codex puede resolver rapido
- fixes acotados en uno o pocos archivos
- correcciones mecanicas de lint, typecheck o tests puntuales
- ajustes pequenos de copy, layout o wiring
- tareas donde el coste de contexto amplio supera el beneficio

## Politica Operativa

- Tratar `AGENTS.md` como fuente principal de reglas.
- Basar recomendaciones en stack real del repo, no en docs antiguas.
- **Laravel Boost:** Se ha instalado `laravel/boost`. Utilizar las guidelines en `backend/CLAUDE.md` y activar el skill `laravel-best-practices` para tareas de backend.
- Si detectas contradicciones entre documentos, destacar primero la diferencia y luego proponer alineacion con `AGENTS.md`.
- En cambios pequenos, delegar a Codex en lugar de abrir analisis grande.
- En UX/UI, permitir que Antigravity revise experiencia y consistencia visual mientras Codex mantiene integracion tecnica.

## Tipos de Salida Recomendados

- mapas de arquitectura
- planes por fases
- auditorias con riesgos y prioridades
- listas de hallazgos de code review
- propuestas de refactor con tradeoffs
- resumen de impacto por capas

## Regla de Escalado

- Si tarea mezcla arquitectura, multiples features o cambios de contrato, Gemini CLI puede analizar y Codex implementa.
- Si tarea es principalmente UX/UI, Gemini CLI puede apoyar con contexto, pero Antigravity debe revisar experiencia final.

## Login Local Para QA

Cuando Gemini CLI, Codex o un agente de QA necesiten entrar al backoffice local:

- Frontend local: `http://localhost:5173`
- Backend local: `http://localhost:8080`
- Password comun seed: `password`
- Superadmins por defecto:
  - `superadmin1@escandallo.test`
  - `superadmin2@escandallo.test`
- Admins por defecto:
  - `admin@escandallo.test`
  - `admin2@escandallo.test`
  - `admin3@escandallo.test`
  - `admin4@escandallo.test`
  - `admin5@escandallo.test`

Estas cuentas salen del seed controlado por `backend/.env`:

```env
SEED_USER_PASSWORD=password
SEED_SUPERADMIN_EMAILS=superadmin1@escandallo.test,superadmin2@escandallo.test
SEED_ADMIN_EMAILS=admin@escandallo.test,admin2@escandallo.test,admin3@escandallo.test,admin4@escandallo.test,admin5@escandallo.test
```

Si el agente necesita refrescar cuentas demo:

```bash
docker compose exec backend php artisan migrate:fresh --seed
```
