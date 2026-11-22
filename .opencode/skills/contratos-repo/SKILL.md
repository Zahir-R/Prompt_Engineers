---
name: contratos-repo
description: Use before changing shared types, demo data, AppProvider, constants, routes, or component props. Prevents breaking the public course flow, guest sessions, La Fogata, profile, and backstage panel.
---

# Contratos del repositorio

## Archivos compartidos

Cambios aditivos y coordinados:

- `src/types/exercise.ts`
- `src/types/demo.ts`
- `src/types/anatomy.ts`
- `src/types/cosmetics.ts`
- `src/types/roadmap.ts`
- `src/data/exercises.json`
- `src/data/demo.ts`
- `src/data/roadmap.ts`
- `src/context/AppProvider.tsx`
- `src/lib/constants.ts`
- `src/lib/demo.ts`
- `src/lib/roadmap.ts`
- `src/lib/exerciseTemplates.ts`
- `src/components/student/interactions/`
- `src/components/figures/`
- `src/app/ejercicio/[id]/page.tsx`
- `src/app/unidad/[id]/page.tsx`
- `src/app/club/[threadId]/page.tsx`

No renombrar campos del SRS sin actualizar todos los consumidores.

## Modelo de ejercicio

Campos obligatorios: `id`, `categoria`, `nivel`, `titulo`, `enunciado`, `datos`,
`respuesta_correcta`, `desglose_pasos`. Cada paso usa `color_tag`:
`blue | orange | green | purple | yellow`.

## Sesión demo

- `session.profileId === null` es invitado.
- Invitado: cursos públicos, lectura de La Fogata y progreso local.
- Estudiante con alias: XP, racha, carnet y escritura en La Fogata.
- Docente: solo backstage en `/panel`; nunca en la navegación del estudiante.

## Estado

`AppProvider` expone, entre otros:

- `exercises`, `progress`, `progressByProfile`, `ready`
- `profiles`, `classrooms`, `club`, `session`, `activeProfile`
- `getExercise`, `getProfile`, `getUnit`, `getUnitForExercise`
- `recordAttempt`, `markCompleted`, `resetProgress`
- `enterClass`, `enterTeacher`, `createStudentAlias`, `switchProfile`, `logout`
- `recordAnatomyStep`, `completeAnatomy`, `getAnatomyProgress`
- `buySticker`, `equipSticker`, `getProfileCosmetics`
- `addThread`, `addReply`, `resolveThread`, `togglePinThread`,
  `toggleHideThread`, `reportThread`, `reportReply`
- `resetDemo`

No mover lógica de intentos al `AnatomyPanel`; el contenedor del estudiante
decide cuándo abrir el desglose. No otorgar XP a invitados.

## Rutas

- `/`, `/hoja-de-ruta`, `/unidades`, `/unidad/[id]`, `/ejercicio/[id]`
- `/club`, `/club/[threadId]`
- `/entrar`, `/perfil`
- `/panel`, `/docente`

Las rutas dinámicas usan `generateStaticParams` + `<Suspense>` porque el header
usa `usePathname` con `cacheComponents`.

## Persistencia

- `mates:demo:profiles:v1`
- `mates:demo:classrooms:v1`
- `mates:demo:session:v1`
- `mates:demo:progress:v1`
- `mates:demo:xp-awards:v1`
- `mates:demo:anatomy:v1`
- `mates:demo:sparks:v1`
- `mates:demo:cosmetics:v1`
- `mates:demo:club:v1`
- `mates:custom-exercises:v1`
- `mates:progress:v1` (legado, migrado a invitado)

Versionar la clave si cambia la forma de los datos.

## Verificación

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test:e2e
```

Revisar cursos públicos, invitado, alias, perfil, La Fogata, panel backstage,
hoja de ruta N0–N6, figuras del desglose, plantillas docentes e interactivos
Base10, recta y fracciones.
