# AGENTS.md — Mates / Modo Desglose

App de nivelación matemática para primaria (6–13 años). El SRS es la fuente
funcional: `Especificación de Requisitos de Software (SRS).md`; no lo edites sin
pedido explícito.

## Comandos

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm test:e2e
pnpm qa:screenshots
```

Verificación antes de cerrar: `pnpm lint` → `pnpm typecheck` → `pnpm build` →
`pnpm test:e2e`.

- `pnpm test:e2e` **compila y arranca producción** en el puerto 3000
  (`pnpm build && pnpm start`), no usa `pnpm dev`. No dejes un dev server en
  3000 antes de correrlo.
- En NixOS el Chromium de Playwright no arranca por enlaces dinámicos:

```bash
nix shell nixpkgs#chromium --command sh -c \
  'PLAYWRIGHT_CHROMIUM_EXECUTABLE=$(command -v chromium) pnpm test:e2e'
```

- Tests en `e2e/`: humo, axe (solo falla en `critical`/`serious`) y capturas
  1440×900 + Pixel 7. Las capturas se escriben en `test-results/` (ignorado).

## Producto actual

- **Los cursos son públicos**: unidades, ejercicios y Modo Desglose no piden
  cuenta.
- La cuenta es opcional: código de clase + alias. Desbloquea XP, racha, carnet
  y escritura en **La Fogata** (`/club`).
- El Modo Desglose se gamifica con retos en pasos clave, chispas, sello de
  detective y bonus de XP al resolver después de completarlo. El XP se gana al
  resolver, no por hacer clic en pasos.
- Las chispas se canjean por 3 pegatinas cosméticas en `/perfil`.
- La hoja de ruta N0–N6 usa 7 niveles con 5 ejercicios cada uno (35 retos).
- Las figuras dinámicas viven en `src/components/figures/` y se usan desde `StepVisualizer`.
- Los ejercicios docentes se generan con `src/lib/exerciseTemplates.ts` y
  permiten editar explicaciones sin romper los cinco pasos.
- La práctica interactiva vive en `src/components/student/interactions/`:
  Base10, recta numérica y fracciones.
- No hay correos de estudiantes, contraseñas ni backend. Todo es demo local en
  `localStorage`; el progreso de invitado se importa al elegir alias.
- **El docente es backstage**: no aparece en la navegación del estudiante. Su
  panel vive en `/panel`; no lo enlaces desde la UI del estudiante.
- No introduzcas backend, autenticación real ni LLM en el producto sin pedido.
  El LLM es solo herramienta de desarrollo.
- No se ingresan datos de menores; solo alias y avatar.

## Stack y arquitectura

- Next.js 16 App Router, React 19, TypeScript estricto, Tailwind 4, pnpm.
- `next.config.ts` tiene `cacheComponents` y `partialPrefetching` activos.
- Rutas: `/`, `/hoja-de-ruta`, `/unidades`, `/unidad/[id]`, `/ejercicio/[id]`, `/club`,
  `/club/[threadId]`, `/entrar`, `/perfil`, `/panel`, `/docente`.
- `/unidad/[id]`, `/club/[threadId]` y `/ejercicio/[id]` usan
  `generateStaticParams` + `<Suspense>`; mantén ambos. El header usa
  `usePathname`, así que una ruta dinámica sin params estáticos rompe el build.
- `src/components/anatomy/`, `src/components/figures/` y
  `src/components/student/interactions/` componen la práctica; `club/`, `student/`, `route/`,
  `teacher/` y `companion/` son módulos separados.
- `AppProvider` combina ejercicios semilla + creados por docentes y persiste
  perfiles, sesión, progreso por perfil, XP, racha y La Fogata.
- La UI espera `ready` para evitar mismatch de hidratación; el override de ESLint
  para `react-hooks/set-state-in-effect` en `AppProvider` es intencional.
- Los seeds de `src/data/demo.ts` usan fechas estáticas. No uses `new Date()`
  ni `Date.now()` en inicializadores o render: Next 16 falla al prerenderizar
  client components con tiempo inestable.

## Cambios compartidos

Aditivos y coordinados:

- `src/types/exercise.ts`, `src/types/demo.ts`, `src/types/anatomy.ts`,
  `src/types/cosmetics.ts`, `src/types/roadmap.ts`
- `src/data/exercises.json`, `src/data/demo.ts`, `src/data/roadmap.ts`
- `src/context/AppProvider.tsx`
- `src/lib/constants.ts`, `src/lib/demo.ts`, `src/lib/roadmap.ts`,
  `src/lib/exerciseTemplates.ts`
- `src/components/anatomy/`

No renombres campos del SRS (`desglose_pasos`, `color_tag`, `visual_state`,
`respuesta_correcta`) sin actualizar todos los consumidores. Los colores
`blue/orange/green/purple/yellow` son semánticos del desglose.

## Diseño

Concepto: **cuaderno de aventuras matemáticas**. Papel cálido, tinta, coral,
mostaza y turquesa; bordes dibujados, sombras duras, mascota Tinta y doodles SVG.

- La experiencia del estudiante debe sentirse como juego/aventura, no LMS.
  No muestres “Docente”, “Mi clase”, listas de compañeros ni diagnóstico en su
  navegación.
- No usar gradientes radiales de fondo, glassmorphism/`backdrop-blur`, héroes
  con estadísticas, filas de tres tarjetas idénticas ni exceso de
  `rounded-3xl`.
- Los colores semánticos del desglose no se usan como decoración general.
- Antes de rediseñar, lee `docs/design/principios.md`,
  `docs/design/tokens.md` y `docs/design/anti-patrones.md`.
- Capturas de referencia: `docs/design/screenshots/`.
- No usar textos de demo/desarrollo en la UI. Preferir “aprende sin cuenta”,
  “tu avance se guarda en este navegador” y “elige tu alias”.
- La navegación usa **Mi perfil**, no “Mi carnet”.

## Skills y subagentes

- Skills en `.opencode/skills/` (`.claude/skills` enlaza a la misma carpeta):
  `interfaz-infantil`, `microcopy-es`, `pedagogia-matematica`,
  `accesibilidad-ninos`, `qa-visual-playwright`, `contratos-repo`.
- Subagentes en `.opencode/agents/`: `design-reviewer`, `a11y-reviewer`,
  `content-reviewer` (solo lectura).
- `opencode.json` registra `AGENTS.md`, la referencia `docs/` y los MCP
  Playwright + Context7. Reinicia opencode tras cambiar config o skills.

## Flujo

Ramas cortas `feat/<área>` desde `main`; PR a `main`. No subas `node_modules`
ni artefactos de `.next`/Playwright.
