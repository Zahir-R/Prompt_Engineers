# Claude Code — Mates

Lee `AGENTS.md` como fuente principal de reglas del proyecto.

## Contexto

- App infantil de matemática con “Modo Desglose”.
- Stack: Next.js 16, React 19, TypeScript, Tailwind 4, pnpm.
- LLM solo para desarrollo. No hay LLM en el producto.
- No se ingresan datos de menores. Como máximo cuentas de docentes.
- El concepto visual es “cuaderno de aventuras matemáticas”.

## Antes de trabajar

1. Lee `docs/design/principios.md`, `docs/design/tokens.md` y
   `docs/design/anti-patrones.md`.
2. Usa las skills de `.claude/skills/` (enlazadas a `.opencode/skills/`):
   `interfaz-infantil`, `microcopy-es`, `pedagogia-matematica`,
   `accesibilidad-ninos`, `qa-visual-playwright`, `contratos-repo`.
3. Para cambios visuales, revisa capturas en `docs/design/screenshots/`.

## Comandos

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm test:e2e
```

En NixOS:

```bash
nix shell nixpkgs#chromium --command sh -c \
  'PLAYWRIGHT_CHROMIUM_EXECUTABLE=$(command -v chromium) pnpm test:e2e'
```

## Restricciones

- No cambies el SRS sin pedirlo.
- Los archivos compartidos son aditivos: `src/types/exercise.ts`,
  `src/data/exercises.json`, `src/context/AppProvider.tsx`,
  `src/lib/constants.ts`.
- No introduzcas backend, autenticación ni LLM en el producto sin pedirlo.
- No expongas secretos.
- No cierres un cambio visual sin revisar móvil, escritorio, foco y contraste.
