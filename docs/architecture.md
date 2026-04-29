# Arquitectura del Proyecto - Escandallo

## Visión General
Plataforma monorepo para la gestión de escandallos, diseñada como una aplicación desacoplada con un backend en Laravel y un frontend en React.

## Estructura de Directorios
- `backend/`: API REST construida con Laravel 11.
- `frontend/`: Single Page Application (SPA) construida con React, Vite y TypeScript.
- `docs/`: Documentación técnica y de negocio.

## Decisiones Técnicas
1. **Backend (Laravel):**
   - API RESTful bajo el prefijo `/api/v1`.
   - Autenticación: Laravel Sanctum (Stateful, basado en cookies).
   - Base de datos: PostgreSQL (recomendado) o MySQL.
   - Gestión de Dinero: Uso de `Brick\Money` o almacenamiento en céntimos (integer) para evitar problemas de coma flotante.

2. **Frontend (React):**
   - Bundler: Vite para desarrollo rápido.
   - Lenguaje: TypeScript para seguridad de tipos.
   - Routing: React Router 6+.
   - Estilizado: Vanilla CSS o módulos de CSS (siguiendo las constraints).
   - Estado: React Context o librerías ligeras si es necesario.

3. **Comunicación:**
   - El frontend consume la API del backend.
   - Autenticación compartida vía cookies en subdominios (ej: `app.escandallo.test` y `api.escandallo.test`).

## Flujo de Autenticación
- Laravel Sanctum gestiona la sesión.
- El frontend realiza una petición a `/sanctum/csrf-cookie` antes del login.
- El login es una petición POST a `/api/v1/login`.
- Las cookies de sesión mantienen al usuario autenticado.
