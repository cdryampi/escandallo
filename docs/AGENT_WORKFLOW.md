# Agent Workflow

## Objetivo

Preparar flujo multiagente controlado para Escandallo sin perder reglas de arquitectura, testing, seguridad y entorno local.

Fuentes de verdad:

1. `AGENTS.md`
2. manifests reales del repo
3. este workflow

Si hay conflicto, seguir ese orden.

## Roles Principales

### Codex

- Punto de entrada por defecto
- Orquesta trabajo y decide siguiente especialista
- Hace fixes, integracion final, ajustes pequenos y medianos
- Mantiene coherencia entre backend, frontend, Docker y docs

### Gemini CLI

- Analisis de gran contexto
- Auditorias de arquitectura o code review amplio
- Planes grandes, refactors grandes y sintesis multiarchivo
- Revision de impacto transversal antes de ejecutar

### Antigravity

- Revision UX/UI y experiencia percibida
- Arquitectura visual, claridad de pantallas y jerarquia
- Feedback sobre formularios, tablas, navegacion y responsive

## Flujo Recomendado

1. Leer `AGENTS.md` antes de proponer o cambiar algo importante.
2. Dejar que Codex haga exploracion local inicial.
3. Si tarea es pequena o localizada, Codex resuelve directo.
4. Si tarea cruza muchas capas o requiere contexto grande, Codex pide apoyo a Gemini CLI.
5. Si tarea es visual o de experiencia, Codex o Gemini pasan revision a Antigravity.
6. Antes de cerrar, Codex verifica cambios, corrige drift y deja resultado integrado.

## Matriz Tarea a Agente y Skill

| Tarea | Agente principal | Skill principal | Escalado recomendado |
|---|---|---|---|
| Definir direccion tecnica de cambio transversal | `project-architect` | `code-review` o `testing-policy` segun caso | Gemini CLI si analisis es amplio |
| Crear o revisar endpoint Laravel | `laravel-api-specialist` | `laravel-api` | `security-reviewer` si toca auth |
| Crear o revisar pantalla React | `react-frontend-specialist` | `react-frontend` | `ux-reviewer` o Antigravity |
| Validar formulas y entidades de escandallo | `escandallo-domain-reviewer` | `escandallo-domain` | Gemini CLI si impacto cruza muchas features |
| Disenar migracion o esquema | `mysql-data-modeler` | `laravel-api` + `escandallo-domain` si hay costes | `security-reviewer` si hay datos sensibles |
| Ajustar Docker Compose o scripts WSL | `docker-wsl-devops` | `docker-wsl` | `security-reviewer` si expone servicios |
| Revisar UX de flujo o pantalla | `ux-reviewer` | `ux-review` | Antigravity para revision visual profunda |
| Definir cobertura y regresion | `test-engineer` | `testing-policy` | Gemini CLI si cobertura cruza muchas capas |
| Revisar auth, permisos o secretos | `security-reviewer` | `security-review` | Gemini CLI para auditoria amplia |
| Mantener docs y reglas | `documentation-maintainer` | segun area descrita | `project-architect` si cambia direccion tecnica |

## Uso de Skills del Proyecto

### Skills compartidas en `.agents/skills/`

- `escandallo-domain`
- `laravel-api`
- `react-frontend`
- `docker-wsl`
- `ux-review`
- `code-review`
- `testing-policy`
- `security-review`

### Regla de uso

- Cargar skill antes de actuar sobre area correspondiente.
- No crear skills genericas nuevas si no aportan criterio especifico a este repo.
- Mantener skills pequenas, claras y buscables.

## Prompts Cortos Recomendados

### Para Codex

```text
Revisa este cambio de backend con reglas de AGENTS.md y aplica fix minimo seguro.
```

```text
Orquesta review de este flujo React y deja tests y docs alineados.
```

### Para Gemini CLI

```text
Analiza backend y frontend de Escandallo para detectar contradicciones de contrato y riesgos de arquitectura. Respeta AGENTS.md.
```

```text
Haz auditoria amplia de modulo de recetas: dominio, persistencia, API, UI, tests y deuda tecnica. No propongas librerias nuevas sin justificar.
```

### Para Antigravity

```text
Revisa UX/UI de pantalla de recetas: jerarquia, claridad, tablas, formularios, estados vacios, errores y responsive. Respeta AGENTS.md.
```

```text
Evalua experiencia de login y recuperacion de password para SPA React con Sanctum: friccion, mensajes, accesibilidad y confianza visual.
```

## Reglas de Escalado

- Escalar a Gemini CLI cuando analisis local necesite barrer muchas carpetas, resumir arquitectura o comparar varias estrategias grandes.
- Escalar a Antigravity cuando la pregunta real sea de experiencia, claridad visual o calidad de interfaz.
- Mantener en Codex cambios pequenos, wiring local, fixes puntuales, integracion y verificacion final.

## Instalacion Recomendada de Skills Externas

Documentar solo. No instalar automaticamente sin revisar.

```bash
npx skills add vercel-labs/agent-skills --skill react-best-practices
npx skills add vercel-labs/agent-skills --skill web-design-guidelines
```

## Guardrails

- No instalar colecciones gigantes sin revision.
- No violar `AGENTS.md` por conveniencia de herramienta.
- No usar Gemini CLI para microcambios locales.
- No usar Antigravity para decidir backend, seguridad o contratos de API.
- Actualizar este documento cuando cambie flujo multiagente del proyecto.
