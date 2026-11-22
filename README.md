# Mates — Plataforma de Nivelación Matemática con Modo Desglose

Aplicación web para estudiantes de primaria (6–13 años) que explica matemática
básica paso a paso. Al fallar o pedir ayuda, el **Modo Desglose** descompone el
procedimiento en pasos con colores, explicaciones cortas y apoyo visual.

**Evento:** Abstracthon 2026 · MLSA University Community, Bolivia  
**Track:** Educación  
**Especificación completa:** [`Especificación de Requisitos de Software (SRS).md`](./Especificación%20de%20Requisitos%20de%20Software%20(SRS).md)

## Problema

Según ERCE 2023 de la UNESCO, solo el **9%** de estudiantes bolivianos de sexto
de primaria alcanza el nivel mínimo en matemática, y en tercero de primaria solo
el **35,8%**. La plataforma ataca la falta de explicación del procedimiento:
en lugar de solo marcar “incorrecto”, muestra dónde se rompió el razonamiento.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Lucide React
- Estado local con React Context + `localStorage`
- Sin backend para el MVP

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

## Rutas

| Ruta | Propósito |
| :--- | :--- |
| `/` | Inicio, presentación y ejercicios de práctica |
| `/ruta` | Ruta de aprendizaje por defecto + ejercicios extra |
| `/ejercicio/[id]` | Reto activo del estudiante |
| `/docente` | Creador de actividades sin código |

El botón **“Ver Diagnóstico para Acompañante”** del encabezado abre el resumen
para tutores/padres.

## Estructura

```text
src/
├── app/                      Rutas y layout global
├── components/
│   ├── anatomy/              Modo Desglose (motor visual)
│   ├── companion/            Diagnóstico para acompañante
│   ├── layout/               Encabezado
│   ├── route/                Ruta de aprendizaje
│   ├── student/              Reto activo del estudiante
│   └── teacher/              Creador de actividades
├── context/AppProvider.tsx   Estado global y persistencia
├── data/exercises.json       Ejercicios semilla
├── lib/                      Selectores, colores y utilidades
└── types/exercise.ts         Contratos compartidos
```

## Contratos compartidos

No cambiar estos archivos sin coordinar con el equipo; los cambios deben ser
aditivos.

- `src/types/exercise.ts`: `Exercise`, `DesgloseStep`, `VisualState`,
  `ProgressEntry`.
- `src/context/AppProvider.tsx`: ejercicios, progreso, intentos, alta de
  ejercicios y reinicio de progreso.
- `src/data/exercises.json`: ejercicios semilla.
- `src/lib/constants.ts`: `DEFAULT_PATH_IDS` y claves de `localStorage`.

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

## Estado y persistencia

`AppProvider` combina los ejercicios semilla con los creados por docentes y
guarda en `localStorage`:

- `mates:progress:v1`
- `mates:custom-exercises:v1`

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
4. Abrir PR hacia `main`; mantener los cambios de archivos compartidos pequeños.
5. No subir secretos ni `node_modules`.

## Flujo de demo

1. `/` → “Empezar la ruta”.
2. `/ruta` → abrir el primer ejercicio.
3. Fallar dos veces → el Modo Desglose se abre solo.
4. Navegar los pasos con Anterior/Siguiente.
5. Responder correctamente → progreso actualizado.
6. Abrir “Ver Diagnóstico para Acompañante”.
7. En `/docente`, crear un ejercicio y probarlo en `/ruta`.

## Despliegue

El proyecto está listo para Vercel o Netlify. En Vercel:

1. Importar el repositorio.
2. Framework preset: Next.js.
3. Build command: `pnpm build`.

## Créditos

Construido para Abstracthon 2026. Datos de contexto: ERCE 2023, UNESCO.
