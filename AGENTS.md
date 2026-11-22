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

## Stack y arquitectura

- Next.js 16 App Router, React 19, TypeScript estricto, Tailwind 4, pnpm.
- `next.config.ts` tiene `cacheComponents` y `partialPrefetching` activos.
- `src/app/ejercicio/[id]/page.tsx` prerenderiza los IDs semilla con
  `generateStaticParams` y mantiene un `<Suspense>` para ejercicios creados por
  docentes. No quites ese boundary.
- Rutas: `/`, `/ruta`, `/docente`, `/ejercicio/[id]`.
- `src/components/anatomy/` es el Modo Desglose; `student/`, `route/`,
  `teacher/` y `companion/` son módulos separados.
- `AppProvider` combina `src/data/exercises.json` con ejercicios creados por
  docentes y persiste en `localStorage`. La UI espera `ready` para evitar
  mismatch de hidratación; el override de ESLint para
  `react-hooks/set-state-in-effect` en ese archivo es intencional.

## Cambios compartidos

Aditivos y coordinados:

- `src/types/exercise.ts`
- `src/data/exercises.json`
- `src/context/AppProvider.tsx`
- `src/lib/constants.ts`

No renombres campos del SRS (`desglose_pasos`, `color_tag`, `visual_state`,
`respuesta_correcta`) sin actualizar todos los consumidores. Los colores
`blue/orange/green/purple/yellow` son semánticos del desglose.

## Producto y alcance

- Producto y microcopy en español claro, con acentos y contexto boliviano.
- No introduzcas backend, autenticación ni LLM dentro del producto sin pedido.
- El LLM es solo herramienta de desarrollo.
- No se ingresan datos de menores; como máximo cuentas de docentes.
- No expongas secretos ni API keys en cliente ni repo.

## Diseño

Concepto: **cuaderno de aventuras matemáticas**. Papel cálido, tinta, coral,
mostaza y turquesa; bordes dibujados, sombras duras, mascota Tinta y doodles SVG.

- No usar gradientes radiales de fondo, glassmorphism/`backdrop-blur`, héroes
  con estadísticas, filas de tres tarjetas idénticas ni exceso de
  `rounded-3xl`.
- Los colores semánticos del desglose no se usan como decoración general.
- Antes de rediseñar, lee `docs/design/principios.md`,
  `docs/design/tokens.md` y `docs/design/anti-patrones.md`.
- Capturas de referencia: `docs/design/screenshots/`.

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
