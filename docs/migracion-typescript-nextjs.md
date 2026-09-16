# Migración a TypeScript + Next.js + Arquitectura Hexagonal

Rama: `feature/typescript-nextjs-hexagonal-migration`

## 1. Qué cambió y por qué

### Vite → Next.js
El proyecto usaba Vite como bundler y `react-router-dom` para las rutas (`/` y `/terminos`) manejadas a mano en `App.jsx`. Ahora Next.js (App Router) maneja el routing por convención de carpetas: cada carpeta dentro de `src/app` con un archivo `page.tsx` es una ruta. Se eliminó `react-router-dom` porque Next.js ya trae su propio sistema de rutas y navegación (`next/link`, `next/navigation`).

### JavaScript → TypeScript
Todos los `.jsx` pasaron a `.tsx`/`.ts`. Cada componente ahora declara una `interface` para sus props (por ejemplo `ButtonProps`, `InputProps`), y las funciones de dominio declaran los tipos de sus parámetros y retornos (`Credentials`, `ValidationErrors`, `LoginResult`). Esto hace que errores como pasarle un `onChange` con la firma equivocada a un `Input` se detecten al compilar, no en el navegador.

### Arquitectura hexagonal
Antes, `Login.jsx` mezclaba tres responsabilidades en un solo archivo: las reglas de validación (¿qué es un email válido?), el manejo de estado de React, y el JSX de la UI. Se separó en capas:

- **`domain/`** — reglas de negocio puras, sin saber nada de React ni de Next.js. `validateCredentials` es una función que recibe datos y devuelve errores; se podría testear sin levantar un navegador.
- **`application/`** — orquesta el dominio. `loginUseCase` decide: primero valido, si hay errores no sigo, si no hay errores le pido al `AuthService` que intente loguear.
- **`infrastructure/`** — implementaciones concretas de los "puertos" del dominio. `mockAuthService` es un `AuthService` de prueba que siempre responde éxito (no hay backend real todavía). El día que haya una API real, se agrega `infrastructure/auth/apiAuthService.ts` implementando la misma interfaz `AuthService`, y se cambia una sola línea en `useLogin` — el resto del código no se entera del cambio.
- **`presentation/`** — todo lo que es React: componentes (`Button`, `Input`, `Password`, `Checkbox`, `AuthLayout`), el hook `useLogin` (conecta el use case con el estado de React) y las vistas (`LoginView`, `TerminosView`, el contenido que antes vivía en `pages/`).
- **`app/`** — es la carpeta que exige Next.js para el routing. Cada `page.tsx` es "delgada": solo importa una vista de `presentation/` y la renderiza. La idea es que si el día de mañana cambiamos de Next.js a otra cosa, solo se reescribe `app/`, no la lógica de negocio.

### Cambio visual
Se agregó padding (`px-6 py-12`) al contenedor del formulario dentro de `AuthLayout`, para que en pantallas chicas el contenido no quede pegado a los bordes. **Ojo:** no tuve acceso a la imagen de referencia que mencionaste (no se adjuntó ningún archivo a la conversación), así que este es mi criterio basado en el layout actual. Si el padding que tenías en mente es otro, decime y lo ajusto.

## 2. Estructura nueva vs. anterior

**Antes:**
```
src/
  App.jsx
  main.jsx
  index.css
  components/
    AuthLayout.jsx
    Button.jsx
    Checkbox.jsx
    Input.jsx
    Password.jsx
  pages/
    Login.jsx
    Terminos.jsx
  hooks/       (vacía)
  services/    (vacía)
vite.config.js
index.html
```

**Ahora:**
```
src/
  app/                       # Next.js App Router (routing, capa fina)
    layout.tsx
    globals.css
    page.tsx                 # ruta "/"
    terminos/
      page.tsx               # ruta "/terminos"
  domain/
    auth/
      credentials.ts
      validateCredentials.ts
      authService.port.ts    # interfaz (puerto)
  application/
    auth/
      loginUseCase.ts
  infrastructure/
    auth/
      mockAuthService.ts     # adaptador (implementa el puerto)
  presentation/
    components/
      AuthLayout.tsx
      Button.tsx
      Checkbox.tsx
      Input.tsx
      Password.tsx
    hooks/
      useLogin.ts
    views/
      LoginView.tsx
      TerminosView.tsx
next.config.ts
tsconfig.json
postcss.config.mjs
```

Se eliminaron `vite.config.js`, `index.html`, `src/App.jsx`, `src/main.jsx` (Next.js no los necesita) y las carpetas vacías `hooks/`/`services/` de la raíz de `src` (ahora `hooks` vive dentro de `presentation`, y `services` se reemplazó por `infrastructure`).

## 3. Dependencias

**Se sacaron:** `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `react-router-dom`, `eslint-plugin-react-refresh`.

**Se agregaron:** `next`, `@tailwindcss/postcss`, `typescript`, `@types/node`, `typescript-eslint`, `eslint-config-next` (esta última quedó instalada pero no conectada todavía al `eslint.config.js` — ver punto 4).

## 4. Pendiente / simplificaciones que hice a propósito

- **Lint de Next.js no integrado a fondo:** `eslint-config-next` quedó instalada pero el `eslint.config.js` usa una config genérica de `typescript-eslint` + `react-hooks`. Integrar el flat config de `eslint-config-next` tiene su propia vuelta y no quería frenar el resto de la migración por un tema de tooling. Lo puedo hacer en un paso aparte.
- **`AuthService` es un mock:** no hay backend real. Cuando lo haya, se implementa un adaptador nuevo en `infrastructure/auth/` sin tocar `domain/` ni `application/`.
- **No se generaron commits todavía.** Dejé todo el trabajo en la rama `feature/typescript-nextjs-hexagonal-migration`, sin commitear ni abrir PR, para que lo revises antes. Decime si querés que arme el/los commits y el PR (siguiendo el criterio de agrupar tareas relacionadas en una sola rama, como venimos haciendo).
- **Next.js generó automáticamente `AGENTS.md`/`CLAUDE.md`** en la raíz del proyecto (una función nueva de Next 16 para "agentes de IA"). Lo desactivé (`agentRules: false` en `next.config.ts`) y borré `AGENTS.md`, pero no pude borrar `CLAUDE.md` por una restricción de permisos de mi entorno — te va a quedar un archivo `CLAUDE.md` de una sola línea (`@AGENTS.md`) en la raíz del repo que podés borrar vos con `rm CLAUDE.md`.

## 5. Verificación hecha

- `npm run build` — compila TypeScript sin errores y genera las rutas `/` y `/terminos` como estáticas.
- `npm run lint` — sin errores.
- `npm run dev` — ambas rutas responden `200`.

## 6. Preguntas para chequear entendimiento

No hace falta que las respondas todas ahora ni de una — es para que veas dónde tenés más claro el porqué y dónde no, y seguimos desde ahí.

1. Si mañana cambiamos `mockAuthService` por una implementación real que llame a una API, ¿qué archivos tenés que tocar y cuáles NO deberías tener que tocar? ¿Por qué?
2. `validateCredentials` está en `domain/` y no en `presentation/`. ¿Qué problema traería si esa función usara, por ejemplo, `useState` de React adentro?
3. En `app/page.tsx` no hay ninguna lógica, solo un `return <AuthLayout><LoginView /></AuthLayout>`. ¿Por qué se armó así en vez de escribir el formulario directamente ahí?
4. ¿Qué diferencia concreta hay entre `domain/auth/authService.port.ts` (la interfaz `AuthService`) y `infrastructure/auth/mockAuthService.ts` (el objeto `mockAuthService`)? ¿Por qué uno es "puerto" y el otro "adaptador"?
5. `Password.tsx` tiene `'use client'` en la primera línea, pero `Input.tsx` no. ¿Qué tiene `Password` que `Input` no tiene, que explica esa diferencia?
6. Antes, `Login.jsx` tenía `min-h-screen` tanto en `AuthLayout` como en el div interno de `Login`. En la versión nueva saqué ese `min-h-screen` duplicado. ¿Por qué era redundante?
