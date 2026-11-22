# Mates — Cuaderno de aventuras matemáticas

Aplicación web para estudiantes de primaria (6–13 años) que explica matemática
básica paso a paso. Al fallar o pedir ayuda, el **Modo Desglose** descompone el
procedimiento en pasos con colores, explicaciones cortas y apoyo visual.

Los cursos son **públicos y abiertos sin cuenta**. Un alias opcional desbloquea
racha, XP, el carnet y la escritura en **La Fogata**, el club de dudas por
unidad. El docente trabaja solo en backstage: no aparece en la navegación del
estudiante.

**Evento:** Abstracthon 2026 · MLSA University Community, Bolivia  
**Track:** Educación  
**Especificación completa:** [`Especificación de Requisitos de Software (SRS).md`](./Especificación%20de%20Requisitos%20de%20Software%20(SRS).md)

## Problema

Según ERCE 2023 de la UNESCO, solo el **9%** de estudiantes bolivianos de sexto
de primaria alcanza el nivel mínimo en matemática, y en tercero de primaria solo
el **35,8%**. La plataforma ataca la falta de explicación del procedimiento:
en lugar de solo marcar “incorrecto”, muestra dónde se rompió el razonamiento.

## Dirección visual

Concepto: **cuaderno de aventuras matemáticas**.

- Papel cálido, tinta oscura y acentos coral, mostaza y turquesa.
- Bordes dibujados, sombras duras y ligeras rotaciones.
- Mascota propia (Tinta) y doodles SVG.
- Los colores azul, naranja, verde, violeta y amarillo son semánticos del Modo
  Desglose; no se usan como decoración general.
- Ver `docs/design/principios.md` y `docs/design/anti-patrones.md`.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Lucide React
- Estado local con React Context + `localStorage`
- Playwright + axe-core para QA visual y accesibilidad
- Sin backend para el MVP
- Sin LLM en el producto

## Requisitos

- Node.js 20 o superior (recomendado 24)
- pnpm

## Instalación

```bash
pnpm install
pnpm dev
```

Abrir <http://localhost:3000>.

## Scripts

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm start` | Servir el build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript sin emitir archivos |
| `pnpm test:e2e` | Smoke tests y accesibilidad con Playwright |
| `pnpm test:e2e:ui` | Playwright en modo UI |
| `pnpm qa:screenshots` | Capturas de las rutas principales |

### Playwright en NixOS

Si el Chromium descargado por Playwright no arranca por enlaces dinámicos:

```bash
nix shell nixpkgs#chromium --command sh -c \
  'PLAYWRIGHT_CHROMIUM_EXECUTABLE=$(command -v chromium) pnpm test:e2e'
```

El resultado de las capturas queda en `test-results/capturas/`.

## Rutas

| Ruta | Propósito |
| :--- | :--- |
| `/` | Inicio del estudiante: aventura de hoy, racha y capítulos |
| `/unidades` | Mapa de capítulos abierto a todos |
| `/unidad/[id]` | Ficha de unidad, hojas y acceso a La Fogata |
| `/ejercicio/[id]` | Reto activo del estudiante |
| `/club` | La Fogata: dudas y pistas por unidad |
| `/club/[threadId]` | Hilo y respuestas |
| `/entrar` | Código de clase + alias opcional |
| `/perfil` | Carnet de aventuras |
| `/panel` | Backstage docente, sin enlace en la navegación del estudiante |
| `/docente` | Creador de actividades sin código |

`/ruta` redirige a `/unidades` por compatibilidad.

### Cuenta de demo

- Código de clase: **MATES-3A**
- Perfiles semilla: Profe Ana (guía), Sofía y Mateo.
- No hay contraseñas, correos de estudiantes ni backend real.

## Estructura

```text
src/
├── app/                      Rutas y layout global
├── components/
│   ├── anatomy/              Modo Desglose (motor visual)
│   ├── brand/                Mascota, avatares, doodles y papel
│   ├── club/                 La Fogata
│   ├── companion/            Diagnóstico para acompañante
│   ├── layout/               Encabezado
│   ├── route/                Unidades y detalle de capítulo
│   ├── student/              Reto activo del estudiante
│   └── teacher/              Creador de actividades
├── context/AppProvider.tsx   Estado global, sesión demo y persistencia
├── data/
│   ├── demo.ts               Clase, perfiles, unidades y club semilla
│   └── exercises.json        Ejercicios semilla
├── lib/                      Gamificación, selectores y utilidades
└── types/
    ├── demo.ts               Perfiles, unidades y club
    └── exercise.ts           Contratos del ejercicio

.opencode/
├── skills/                   Skills del proyecto
└── agents/                   Reviewers de solo lectura

docs/
├── design/                   Principios, tokens, anti-patrones, bitácora
├── decisions/                ADRs
├── referencias/              Capturas de referencia
└── research/                 Evidencia, usuarios, pedagogía, microcopy
```

## Contratos compartidos

No cambiar estos archivos sin coordinar con el equipo; los cambios deben ser
aditivos.

- `src/types/exercise.ts`: `Exercise`, `DesgloseStep`, `VisualState`,
  `ProgressEntry`.
- `src/types/demo.ts`: `UserProfile`, `Classroom`, `Unit`, `ClubThread`,
  `ClubReply`, `DemoSession`.
- `src/context/AppProvider.tsx`: ejercicios, progreso por perfil, sesión de
  invitado/estudiante/docente, XP, racha, La Fogata y persistencia.
- `src/data/exercises.json`: ejercicios semilla.
- `src/data/demo.ts`: clase, perfiles, unidades y club semilla.
- `src/lib/demo.ts`: reglas de XP, niveles, racha y avatares.
- `src/lib/constants.ts`: claves de `localStorage`.

### Modo Desglose

```tsx
<DeconstructionModal exercise={exercise} open={open} onClose={onClose} />

<AnatomyPanel exercise={exercise} mode="preview" />
```

- El contenedor del estudiante decide cuándo abrir el modal.
- El modal se abre a demanda y automáticamente después de 2 intentos fallidos.
- La vista previa del docente reutiliza el mismo `AnatomyPanel`.
- Colores: azul = datos, naranja = operación, verde = agrupación/resultado
  intermedio, violeta = respuesta final, amarillo = verificación.

## Herramientas para agentes

El repositorio está preparado para trabajar con opencode:

- `AGENTS.md`: reglas de producto, diseño, contratos y QA.
- `CLAUDE.md`: instrucciones equivalentes para Claude Code.
- `.opencode/skills/`: `interfaz-infantil`, `microcopy-es`,
  `pedagogia-matematica`, `accesibilidad-ninos`, `qa-visual-playwright` y
  `contratos-repo`. `.claude/skills` enlaza a esta misma carpeta para Claude
  Code.
- `.opencode/agents/`: `design-reviewer`, `a11y-reviewer`,
  `content-reviewer`.
- `opencode.json`: instrucciones, referencia a `docs/` y MCPs de Playwright y
  Context7.
- `docs/`: evidencia, pedagogía, UX infantil, microcopy, diseño y ADRs.

Después de cambiar configuración de opencode, reiniciar la sesión. El LLM es
solo una herramienta de desarrollo: no hay LLM en el producto y no se ingresan
datos de menores.

## Persistencia

`AppProvider` combina los ejercicios semilla con los creados por docentes y
guarda la demo en `localStorage`:

- `mates:demo:profiles:v1`
- `mates:demo:classrooms:v1`
- `mates:demo:session:v1`
- `mates:demo:progress:v1`
- `mates:demo:xp-awards:v1`
- `mates:demo:club:v1`
- `mates:custom-exercises:v1`

El progreso de invitado se guarda aparte y se puede importar al elegir alias.

## Equipo y responsabilidades

| Persona | Responsabilidad |
| :--- | :--- |
| Paola | 4.1 Módulo estudiante e interfaz gráfica básica |
| Crismar | Apoyo a la interfaz gráfica de Paola |
| Jairo | Ruta de aprendizaje por defecto |
| Aárón | 4.3 Módulo docente / creador de actividades |
| Zahir | 4.2 Módulo “Modo Desglose” |

## Flujo de trabajo

1. Actualizar `main`: `git pull`.
2. Crear rama corta: `git checkout -b feat/mi-area`.
3. Implementar y verificar con `pnpm lint`, `pnpm typecheck`, `pnpm build`.
4. Ejecutar `pnpm test:e2e` antes de cerrar cambios visuales.
5. Abrir PR hacia `main`; mantener los cambios de archivos compartidos pequeños.
6. No subir secretos ni `node_modules`.

## Flujo de demo

1. `/` → explorar sin cuenta.
2. `/unidades` → abrir un capítulo y una hoja.
3. Fallar dos veces → el Modo Desglose se abre solo.
4. Navegar los pasos con Anterior/Siguiente.
5. Responder correctamente → progreso actualizado.
6. `/entrar` → código **MATES-3A** + alias → carnet, XP y racha.
7. `/club` → leer La Fogata; con alias, abrir una duda.
8. `/panel` → entrar como Profe Ana y revisar estudiantes/moderación.

## Despliegue

El proyecto está listo para Vercel o Netlify. En Vercel:

1. Importar el repositorio.
2. Framework preset: Next.js.
3. Build command: `pnpm build`.

## Créditos

Construido para Abstracthon 2026. Datos de contexto: ERCE 2023, UNESCO.
