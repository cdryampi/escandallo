# Escandallo Agent Rules

`AGENTS.md` es fuente principal de reglas operativas para este repo. Si otro documento contradice este archivo, manda `AGENTS.md`.

Para cualquier cambio de UI, leer primero `DESIGN.md`. `DESIGN.md` es fuente de verdad del sistema visual; componentes, tokens, estados y decisiones estéticas deben alinearse con ese archivo antes de introducir o modificar estilos.

Workflow multiagente detallado: `docs/AGENT_WORKFLOW.md`.

## Arquitectura General

- Monorepo desacoplado:
  - `backend/`: Laravel 12 Full REST API.
  - `frontend/`: React 19 SPA con Vite 8 y TypeScript 6.
  - `docker/`: imagenes y configuracion local.
  - `scripts/wsl/`: flujo diario dentro de WSL2.
  - `scripts/windows/`: wrappers PowerShell para arranque y parada.
  - `docs/`: documentacion tecnica, operativa y multiagente.
- Backend expuesto por Nginx en `http://localhost:8080`.
- Frontend Vite en `http://localhost:5173`.
- API base versionada bajo `http://localhost:8080/api/v1`.
- Auth stateful con Laravel Sanctum, cookies y CSRF.
- MySQL 8.4 es base de datos oficial de desarrollo local.

## Stack Oficial

### Backend

- PHP `^8.2`
- Laravel `^12.0`
- Laravel Sanctum `^4.0`
- PHPUnit `^11.5`
- Laravel Pint
- MySQL 8.4

### Frontend

- React `^19.2`
- TypeScript `~6.0`
- Vite `^8.0`
- TanStack Router `^1.x`
- TanStack Query `^5.x`
- React Hook Form `^7.x`
- Zod `^4.x`
- Tailwind CSS `^4.1`
- Vitest `^3.x`
- Testing Library

### Infraestructura

- Docker Compose
- WSL2 con distro objetivo `Ubuntu-24.04`
- Nginx
- Node `lts-alpine`
- Redis, Mailpit y Adminer como servicios opcionales por perfil

## Roles de Herramientas

- Codex: orquestacion principal, correcciones, integracion final, cambios pequenos y medianos.
- Gemini CLI: analisis de gran contexto, auditorias amplias, planes grandes, revision de arquitectura, sintesis multiarchivo.
- Antigravity: revision UX/UI, arquitectura visual, accesibilidad percibida, consistencia de pantallas y contenido.

## Reglas Estrictas de Frontend

- Usar `@tanstack/react-router` para routing. No introducir React Router clasico.
- Usar `@tanstack/react-query` para server state. No duplicar cache remota en stores globales sin motivo claro.
- Usar `react-hook-form` + `zod` para formularios con validacion tipada.
- Mantener separacion por feature folder dentro de `frontend/src/features`.
- Toda llamada HTTP pasa por capa `frontend/src/api` o modulo API de feature. No hacer `fetch` o `axios` directo desde componentes de presentacion.
- Componentes UI deben ser lo mas puros posible. Efectos, carga de datos y mutaciones viven en hooks, providers o capa feature.
- Reutilizar alias `@/` y patrones ya presentes en `frontend/src/app`, `frontend/src/routes`, `frontend/src/features`, `frontend/src/components`.
- Preferir composicion sobre stores globales. Usar Zustand solo cuando estado compartido de UI lo justifique.
- Mantener accesibilidad base: labels, estados disabled, feedback de error, navegacion por teclado, jerarquia semantica.
- Toda pantalla nueva debe contemplar estados `loading`, `empty`, `error` y responsive movil.
- No meter logica de negocio de escandallo dentro de componentes de tabla o layout.
- No introducir librerias de UI gigantes, design systems externos pesados o colecciones sin revision explicita.
- No introducir colores hardcodeados dispersos en componentes React si existe token o primitive equivalente en `DESIGN.md`.
- No usar Tailwind blue por defecto en UI de producto; usar tokens del sistema visual.
- No introducir estilos one-off si existe token, utility o componente compartido equivalente.

## Reglas Estrictas de Backend

- Mantener API REST bajo `/api/v1`.
- Auth stateful con Sanctum: pedir CSRF antes de login y respetar cookies de sesion.
- Validacion de entrada en Form Requests o capas equivalentes. No validar ad hoc dentro de controladores si puede evitarse.
- Autorizacion obligatoria para endpoints protegidos mediante policies, gates o reglas explicitas.
- Controladores delgados. Mover logica de negocio a acciones, servicios o clases de dominio.
- Respuestas JSON deben ser consistentes y tipables por frontend.
- Para escrituras complejas usar transacciones de base de datos.
- Para dinero, costes, rendimientos y calculos de escandallo: no usar `float` ni `double` como fuente de verdad.
- Guardar importes en enteros de precision fija o decimal controlado; documentar unidad y escala.
- Evitar N+1 con eager loading y consultas expresivas.
- Migraciones y seeders deben ser reversibles, claras y seguras para MySQL.
- No mezclar logica web Blade con contratos API salvo necesidades del framework base.

## Reglas de Docker y WSL

- Flujo local oficial corre por Docker Desktop + WSL2. No asumir PHP, MySQL o Nginx instalados en Windows.
- Ejecutar stack desde WSL o wrappers oficiales de `scripts/windows/`.
- No correr migraciones, Composer o npm contra runtimes host si version puede divergir del contenedor.
- Respetar volumenes `backend_vendor` y `frontend_node_modules`; no mover dependencias al bind mount sin razon fuerte.
- Usar contenedor `backend` para Artisan, Composer y pruebas PHP.
- Usar contenedor `frontend` para `npm`, Vite, lint, typecheck y pruebas JS.
- Mantener puertos de referencia:
  - `8080` Nginx/Laravel
  - `5173` Vite
  - `3307` MySQL host
- No introducir XAMPP, Laragon ni stacks paralelos que dupliquen servicios del proyecto.

## Reglas de Tests

- Todo cambio funcional debe venir con cobertura de regresion proporcionada al riesgo.
- Backend:
  - usar `php artisan test`
  - priorizar tests Feature para contratos API
  - usar Unit tests para logica pura y calculos de dominio
- Frontend:
  - usar `npm run test:run`
  - cubrir schemas, hooks, utils y componentes con comportamiento no trivial
- Antes de cerrar trabajo que toque frontend, correr al menos:
  - `npm run lint`
  - `npm run typecheck`
  - tests relevantes
- Antes de cerrar trabajo que toque backend, correr al menos:
  - `php artisan test`
  - cualquier check puntual afectado
- No reclamar exito sin evidencia fresca de verificacion.

## Reglas de Seguridad

- No commitear secretos reales ni copiar credenciales productivas a ejemplos.
- Revisar auth, authz y exposicion de datos en cada endpoint nuevo.
- Proteger mass assignment en modelos.
- Sanitizar y validar inputs externos siempre.
- No confiar en permisos de frontend para seguridad real.
- Mantener cookies, CSRF y configuracion Sanctum coherentes con entorno Docker local.
- Revisar CORS, sesiones y origenes permitidos antes de abrir nuevos flujos auth.
- Minimizar datos sensibles en logs, errores y respuestas JSON.
- Si un cambio toca auth, sesiones, roles o permisos, exigir revision explicita de seguridad.

## Que No Hacer

- No instalar colecciones gigantes de skills, paquetes o componentes sin revisar alcance, mantenimiento y coste.
- No crear skills genericas sin valor especifico para Laravel, React, escandallo, Docker/WSL o UX.
- No cambiar stack oficial por gusto personal.
- No introducir fetches inline, SQL crudo innecesario o reglas de negocio duplicadas en frontend y backend.
- No usar `float` para dinero, costes, porcentajes criticos o cantidades de dominio que deban ser exactas.
- No saltarse CSRF/Sanctum en auth web stateful.
- No ejecutar cambios destructivos de BD o Docker sin entender impacto y ruta de recuperacion.
- No confiar en docs antiguas si contradicen manifests o este archivo.
- No usar Gemini CLI para parches pequenos que Codex resuelve de forma local y segura.
- No usar Antigravity para decidir reglas backend o seguridad.

## Regla de Actualizacion

- Si cambia stack, flujo Docker/WSL, politica de testing o seguridad, actualizar este archivo en mismo cambio.
