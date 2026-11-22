---
name: contratos-repo
description: Use before changing shared types, exercise data, AppProvider, constants, routes, or component props. Prevents breaking the student, anatomy, teacher, and learning-path modules.
---

# Contratos del repositorio

## Archivos compartidos

Cambios aditivos y coordinados:

- `src/types/exercise.ts`
- `src/data/exercises.json`
- `src/context/AppProvider.tsx`
- `src/lib/constants.ts`
- `src/lib/exercises.ts`
- `src/app/ejercicio/[id]/page.tsx`

No renombrar campos del SRS sin actualizar todos los consumidores.

## Modelo de ejercicio

Campos obligatorios:

- `id`
- `categoria`
- `nivel`
- `titulo`
- `enunciado`
- `datos`
- `respuesta_correcta`
- `desglose_pasos`

Cada paso usa `color_tag` del conjunto:
`blue | orange | green | purple | yellow`.

## Estado

`AppProvider` expone:

- `exercises`
- `progress`
- `ready`
- `getExercise(id)`
- `addExercise(exercise)`
- `recordAttempt(id, answer)`
- `markCompleted(id)`
- `resetProgress()`

No mover lógica de intentos al `AnatomyPanel`; el contenedor del estudiante es
quien decide cuándo abrir el desglose.

## Rutas

- `/`
- `/ruta`
- `/docente`
- `/ejercicio/[id]`

## Persistencia

- `mates:progress:v1`
- `mates:custom-exercises:v1`

Si cambia la forma de los datos, versionar la clave y migrar o descartar de
forma segura.

## Verificación

Antes de cerrar:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Revisar que los ejercicios semilla sigan funcionando y que el docente pueda
crear uno nuevo.
