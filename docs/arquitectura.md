# Arquitectura — Lumina/AMU

Referencia de las reglas de organización del front. Volver acá cada vez que dudes dónde va un archivo nuevo.

## Vertical slicing + arquitectura hexagonal

El proyecto está organizado **por feature primero, por capa adentro**. Cada slice en `src/features/<nombre>/` tiene sus propias capas:

```
src/
  app/                  solo routing (convención Next.js): páginas y Route Handlers
  features/
    auth/
      domain/           tipos, validaciones de formulario, puertos
      application/       casos de uso
      infrastructure/    adaptadores de salida (reales y mocks)
      presentation/       vistas, hooks, layouts propios de la feature
    user/                mismo patrón, nace con el ABM de usuarios
  shared/
    ui/                  componentes genéricos sin lógica de negocio (Input, Button…)
    views/               vistas transversales (TerminosView…)
```

### Por qué feature primero

Con una sola carpeta por capa (`domain/`, `application/`, etc.) cada feature nueva se desparrama en 4 lugares lejanos entre sí. Con vertical slicing, `features/auth/` es autocontenida: se puede leer, tocar o borrar entera sin ir a buscar código en otro lado.

### Criterio para decidir dónde va un archivo

**¿Lo usaría una feature que no sea esta?**
- Sí → `shared/`.
- No → adentro del slice.

**¿Es feature de `auth` o de `user`?** Se corta por **caso de uso / actor**, no por qué tabla toca en el backend. Que una acción escriba en la tabla `users` no la hace parte del slice `user`. Ejemplo: Registro pega contra `POST /auth/register` y lo usa un visitante anónimo antes de loguearse → es `auth`. El ABM de usuarios (listar/editar/eliminar) lo usa un admin ya logueado → es `user`.

## La regla de dependencias (adentro de cada slice)

Las flechas de dependencia siempre apuntan hacia adentro:

```
infrastructure  →  application  →  domain
presentation    →  application  →  domain
```

- **`domain`** no importa de ninguna otra capa. Es el centro: tipos (`Credentials`), reglas de negocio de formulario (`validateCredentials`), y **puertos** (interfaces como `AuthService`) que las capas de afuera implementan.
- **`application`** conoce `domain` (lo usa) y define los casos de uso (`createLoginUseCase`). No sabe nada de HTTP, React ni Next.js.
- **`infrastructure`** e **`presentation`** conocen `application` y `domain`, y pueden usar lo que necesiten de afuera (fetch, React, cookies).

El dominio de un front como este es deliberadamente flaco: la lógica de negocio real vive en la API NestJS. Acá el dominio son tipos, validaciones de formulario y contratos (puertos). No hay que inventar entidades ricas para "llenar" la capa.

### Adaptadores de entrada vs. de salida

`infrastructure` y `presentation` están en la misma "capa externa", pero cumplen roles opuestos:

- **Adaptadores de entrada (driving):** algo de afuera empuja hacia la app. La UI (`useLogin`, `LoginView`) y los Route Handlers (`app/api/auth/login/route.ts`). **Llaman** a un caso de uso.
- **Adaptadores de salida (driven):** la app empuja hacia afuera. `apiAuthService`, `mockAuthService`. **Implementan** un puerto definido en `domain`.

Por eso el dominio "no conoce a nadie" pero igual manda: define la interfaz (`authService.port.ts`) y la infraestructura se adapta a ella (inversión de dependencias), nunca al revés.

## Slices entre sí: no se importan a piacere

`features/auth` no importa archivos internos de `features/user`, ni viceversa. Si en el futuro una feature necesita algo de otra (ej. `user` necesita saber quién es el usuario logueado, que vive en `auth`), se resuelve por:

- Un barrel público (`features/auth/index.ts`) que expone solo lo que otras features pueden usar, o
- Un puerto, igual que con infraestructura.

Nunca importando directo un archivo interno (`features/auth/domain/algo.ts`) desde otro slice. Sin esta regla, el vertical slicing se degrada a carpetas prolijas con espagueti adentro.

`app/` es la excepción: ahí vive el routing de Next.js, que **sí** puede importar de cualquier slice para componer páginas (ej. `app/page.tsx` importa `AuthLayout` y `LoginView` de `features/auth/`).
