# Pendientes — Lumina/AMU

Lista viva de trabajo pendiente. Actualizar acá en vez de dejarlo solo en la conversación.

## En curso (rama `bugfix/feedback-login`)

Completado y probado de punta a punta contra el backend NestJS real (los 4 casos: credenciales válidas, inválidas, backend caído, doble click). Falta abrir el PR a `develop`.

## Backlog

### Rutas y sesión
1. **Protección de rutas privadas.** Hoy no hay `middleware.ts` ni ninguna página que lea la cookie `access_token` — se escribe pero nadie la consume. Decidir entre `middleware.ts` (protege varias rutas a la vez) o chequeo por Server Component (página por página). ← siguiente
2. **Home.** Página post-login, primera pantalla privada real; sirve además para tener algo que proteger con el punto anterior.
3. **Logout.** Borrar la cookie `access_token` y volver a `/`.

### Pantallas nuevas
4. **Pantalla de error genérica.** Recibe y muestra los mensajes que manda la API (ver criterio acordado: si el backend responde con `message`, se muestra tal cual; si no hay respuesta útil —backend caído, timeout, 500 sin body—, mensaje genérico propio del front, nunca detalles técnicos).
5. **Pantalla de perfil.** Cambiar imagen de avatar, correo y contraseña. Va a necesitar: casos de uso nuevos en `application/`, un puerto (`profileService` o similar) en `domain/`, y su adaptador real en `infrastructure/`, siguiendo el mismo patrón que `auth`.
6. **Registro.** Mismo patrón que Login (`app/registro/page.tsx` + vista + use case + adaptador).
7. **Recuperar contraseña.**

### Validación y errores
8. Mapear al menos estos casos de respuesta de la API de login además de "credenciales inválidas" (401): cuenta no verificada / bloqueada (403), demasiados intentos (429), error de validación del propio backend (400, por si se saltea la validación del front).
9. Validar que el checkbox de términos esté marcado antes de permitir el submit.
10. Revalidar el body recibido en `route.ts` en vez de confiar ciegamente en lo que mande el cliente.

### Otros
11. Modo oscuro/claro (toggle de tema).
12. Cambio de idioma (i18n).
13. Iconografía en los campos del formulario (sobre en email, candado en password, etc.).
14. Enganchar `eslint-config-next` al `eslint.config.js` (está instalado pero no conectado).
15. Revisar el contenido mezclado de Login/Registro en `LoginView` (checkbox de términos y botones sociales son típicos de alta de cuenta, no de login).
16. Prolijidad de `apiAuthService.ts` (formato inconsistente con el resto del código: llaves pegadas, falta `type` en algunos imports).
17. Sacar la lógica de `fetch` a NestJS (llamada, `try/catch`, mapeo de errores) de los Route Handlers (`src/app/api/**/route.ts`) y moverla a adaptadores en `infrastructure/` (ej. `nestAuthGateway.ts`), dejando el `route.ts` como cableado fino entre la convención de rutas de Next.js y la arquitectura hexagonal. Hoy `route.ts` de login concentra esa lógica porque Next.js obliga a que el archivo viva ahí, pero conviene ordenarlo antes de que haya más endpoints consumiendo la API real (registro, recuperar contraseña, perfil, etc.) y se repita el mismo patrón en cada uno.
