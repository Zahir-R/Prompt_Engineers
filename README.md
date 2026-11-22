# Mates — Cuaderno de aventuras matemáticas

Aplicación web para estudiantes de primaria (6–13 años) que explica matemática
básica paso a paso. Al fallar o pedir ayuda, el **Modo Desglose** descompone el
procedimiento en pasos con colores, explicaciones cortas y apoyo visual.

Los cursos son **públicos y abiertos sin cuenta**. Un alias opcional desbloquea
racha, XP, el carnet y la escritura en **La Fogata**, el club de dudas por
unidad. El docente trabaja solo en backstage: no aparece en la navegación del
estudiante.

El **Modo Desglose** también es una misión: retos en pasos clave, chispas,
sello de detective y un bonus de XP al resolver después de entender el
procedimiento. Las chispas se canjean por pegatinas cosméticas en el carnet.

La **hoja de ruta N0–N6** organiza el currículo oficial de primaria en 7 niveles
de dominio. Cada nivel tiene 5 ejercicios: **35 retos** en total.

El estudiante puede construir respuestas con bloques Base10, moverse en la recta
numérica y pintar fracciones. Los docentes crean **rutas de clase** desde
plantillas de cinco pasos, eligen actividades existentes o nuevas, ordenan la
secuencia y publican la ruta para su clase.

**Evento:** Abstracthon 2026 · MLSA University Community, Bolivia  
**Track:** Educación  
**SRS:** [`Especificación de Requisitos de Software (SRS).md`](./Especificación%20de%20Requisitos%20de%20Software%20(SRS).md) · versión 1.4  
**Fuente curricular:** [`hoja-de-ruta-matematica-primaria-bolivia.md`](./hoja-de-ruta-matematica-primaria-bolivia.md)  
**Demo pública:** <https://prompt-engineers-psi.vercel.app/>  
**Estado y futuro:** [`docs/ESTADO-Y-FUTURO.md`](./docs/ESTADO-Y-FUTURO.md)

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
| `/hoja-de-ruta` | Camino N0–N6, nivel actual y checkpoints |
| `/unidades` | Capítulos agrupados por nivel |
| `/unidad/[id]` | Ficha de unidad, hojas y acceso a La Fogata |
| `/ejercicio/[id]` | Reto activo del estudiante |
| `/club` | La Fogata: dudas y pistas por unidad |
| `/club/[threadId]` | Hilo y respuestas |
| `/entrar` | Acceso de estudiante o educador |
| `/perfil` | Carnet de aventuras |
| `/panel` | Backstage docente, sin enlace en la navegación del estudiante |
| `/docente` | Creador de actividades sin código |

`/ruta` redirige a `/hoja-de-ruta` por compatibilidad. Las rutas docentes viven en `/ruta/[id]`.

### Cuenta de demo

**Estudiante**
- Código de clase: **MATES-3A**
- Alias: elige el tuyo o usa Sofía / Mateo.

**Educador**
- Correo: `ana@mates.club`
- Clave: `mates2026`

- No hay correos de estudiantes ni backend real. El acceso docente es local y
  simulado para la demo.

## Estructura

```text
src/
├── app/                      Rutas y layout global
├── components/
│   ├── anatomy/              Modo Desglose (motor visual)
│   ├── brand/                Mascota, avatares, doodles y papel
│   ├── club/                 La Fogata
│   ├── companion/            Diagnóstico para acompañante
│   ├── figures/              Figuras de fracciones, geometría y objetos
│   ├── layout/               Encabezado
│   ├── route/                Unidades, capítulos y rutas docentes
│   ├── student/              Reto activo del estudiante
│   ├── student/interactions/ Bloques Base10, recta y fracciones
│   └── teacher/              Creador de actividades y rutas
├── context/AppProvider.tsx   Estado global, sesión demo y persistencia
├── data/
│   ├── demo.ts               Clase, perfiles, unidades y club semilla
│   ├── roadmap.ts            Niveles N0–N6, componentes y compuertas
│   └── exercises.json        35 ejercicios semilla
├── lib/                      Gamificación, ruta, selectores y utilidades
└── types/
    ├── demo.ts               Perfiles, unidades y club
    ├── roadmap.ts            Niveles de dominio
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
- `src/types/roadmap.ts`: `RoadmapLevel`, `RoadmapComponent`, `CriticalGate`.
- `src/types/teacherRoute.ts`: `TeacherRoute` y estados de publicación.
- `src/types/demo.ts`: `UserProfile`, `Classroom`, `Unit`, `ClubThread`,
  `ClubReply`, `DemoSession`.
- `src/context/AppProvider.tsx`: ejercicios, progreso por perfil, sesión de
  invitado/estudiante/docente, XP, racha, La Fogata y persistencia.
- `src/data/exercises.json`: ejercicios semilla.
- `src/data/demo.ts`: clase, perfiles, unidades y club semilla.
- `src/data/roadmap.ts`: ruta N0–N6 y compuertas críticas.
- `src/lib/roadmap.ts`: nivel actual, progreso por nivel y meta diaria.
- `src/lib/exerciseTemplates.ts`: generador de retos docentes en cinco pasos.
- `src/lib/teacherRoutes.ts`: progreso y siguiente actividad de una ruta docente.
- `src/components/student/interactions/`: Base10, recta numérica y fracciones.
- `src/types/exercise.ts`: `levelId`, `interaccion` y `expresion`.
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
- `mates:demo:anatomy:v1`
- `mates:demo:sparks:v1`
- `mates:demo:cosmetics:v1`
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
2. `/hoja-de-ruta` → ver el camino N0–N6 y el nivel actual.
3. `/unidades` → abrir un capítulo y una hoja.
4. Fallar dos veces → el Modo Desglose se abre solo con una intro amable.
5. En pasos clave, responder un mini reto y ver la chispa.
6. Completar el desglose → sello de detective y bonus de XP.
7. Responder correctamente → progreso actualizado.
8. `/entrar` → estudiante con código **MATES-3A** + alias, o educador con
   `ana@mates.club` / `mates2026` → perfil, XP, chispas y racha.
9. Construir la respuesta con bloques, recta o fracción; luego comprobar.
10. `/club` → leer La Fogata; con alias, abrir una duda.
11. `/panel` → **Mis rutas** → crear ruta, agregar actividades, publicar.
12. Iniciar sesión como estudiante en el mismo navegador y abrir
    **Rutas de mi clase**.
13. Resolver un reto → **Siguiente reto** → avanzar sin volver a capítulos.

## Despliegue en Vercel

La app no necesita variables de entorno. La demo usa `localStorage`, por lo que
cada navegador tiene su propio progreso, La Fogata y cuentas simuladas.

### Desde el dashboard

1. Importar el repositorio `Zahir-R/Prompt_Engineers` en Vercel.
2. Framework preset: **Next.js**.
3. Root directory: `./`.
4. Install command: `pnpm install`.
5. Build command: `pnpm build`.
6. Node.js: 22 o 24 LTS; el proyecto declara `node >=20`.
7. Deploy desde `main`.

### Verificación posterior

- `/`, `/unidades`, `/unidad/unidad_sumas`, `/ejercicio/ejercicio_math_001`
- `/club`, `/entrar`, `/perfil`, `/panel`
- `/ruta` debe redirigir a `/unidades`
- Fallar dos veces abre el Modo Desglose con la intro de Tinta.
- Código de demo: `MATES-3A`.
- Revisar móvil, escritorio y que las fuentes carguen.

### Notas

- Si Vercel no acepta la versión de pnpm declarada, ajustar `packageManager` o
  la versión de Node en el proyecto.
- La demo no tiene backend ni foro compartido entre navegadores.
- Actualizar la URL pública aquí y en el SRS después del despliegue.

## Créditos

Construido para Abstracthon 2026. Datos de contexto: ERCE 2023, UNESCO.
