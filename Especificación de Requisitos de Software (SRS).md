# Especificación de Requisitos de Software (SRS)
## Proyecto: Plataforma de Nivelación Matemática con "Modo Desglose"
**Versión:** 1.3 — acceso docente e interactividad  
**Evento:** Abstracthon 2026 (MLSA - University Community, Bolivia)  
**Track Principal:** Educación  
**Público Objetivo:** Estudiantes de nivel primario (6 a 13 años), Docentes y Tutores/Padres.  
**Fecha Límite de Entrega:** Domingo 22 de Noviembre de 2026, 16:30 (Hora de Bolivia).  
**Estado del despliegue:** pendiente de URL pública en Vercel; importar `main` desde el dashboard.

### Changelog v1.3
- Se agrega acceso de educador con correo y clave simulada en `/entrar`.
- “Mi carnet” pasa a “Mi perfil” en la navegación.
- El creador docente usa plantillas de cinco pasos y permite editar explicaciones.
- Se agregan bloques Base10, recta numérica y fracciones interactivas.

### Changelog v1.2
- Se integra la hoja de ruta curricular N0–N6 con 7 niveles de dominio.
- Cada nivel tiene 5 ejercicios: 35 retos en total.
- Se agregan figuras dinámicas de fracciones, geometría y objetos contables.
- Se agregan meta diaria, racha semanal, resumen de clase y diagnóstico por estudiante.
- Se reemplazan textos de demo/desarrollo por microcopy para el usuario.

### Changelog v1.1
- Los cursos son públicos y no exigen cuenta.
- Se agrega cuenta opcional de estudiante con código de clase + alias.
- Se agregan unidades, progreso por capítulo, carnet, XP, racha, chispas e insignias.
- El Modo Desglose se gamifica con retos, chispas, sello de detective y bonus XP.
- Se agrega La Fogata: club de dudas por unidad con lectura pública y escritura con alias.
- Se agrega panel docente backstage para progreso, alias y moderación.
- Se documentan límites de la demo local y el despliegue en Vercel.

---

## 1. Introducción y Contexto del Proyecto

### 1.1 Propósito
Este documento define los requisitos funcionales, no funcionales, la arquitectura conceptual y los modelos de datos para la plataforma web de aprendizaje interactivo de matemática básica. El software está diseñado para nivelar las competencias matemáticas en niños de primaria mediante **demostraciones visuales, metáforas cotidianas y un motor interactivo de "Modo Desglose" (Anatomía del Procedimiento)**.

### 1.2 Problema y Sustento Educativo
Según los datos presentados en el informe **ERCE 2023 de la UNESCO** para Bolivia:
* En **sexto de primaria**, apenas el **9%** de los estudiantes alcanza el nivel mínimo de competencia en matemática (el 91% no logra dominar los conceptos básicos esperados).
* En **tercero de primaria**, solo el **35,8%** alcanza el nivel mínimo.

**Causa raíz identificada:** La enseñanza tradicional a menudo se limita a reglas abstractas y memorización mecánica. Cuando un estudiante comete un error aritmético o de comprensión, las herramientas convencionales le asignan una calificación negativa o una respuesta incorrecta genérica, sin explicitar en qué eslabón del razonamiento se rompió el procedimiento.

### 1.3 Solución Propuesta
Una plataforma dinámica donde:

1. **Cualquier visitante** puede explorar unidades, resolver ejercicios y abrir el Modo Desglose sin crear una cuenta.
2. **El estudiante** puede elegir un alias con un código de clase para guardar XP, racha, carnet, chispas e insignias.
3. **El Modo Desglose** se siente como una misión: retos cortos en pasos clave, chispas, sello de detective y bonus al resolver después de entender.
4. **La Fogata** permite leer dudas y pistas por unidad; para escribir se necesita alias.
5. **El docente** crea actividades, gestiona códigos y modera desde un panel backstage, sin aparecer en la navegación del estudiante.
6. **La hoja de ruta N0–N6** organiza el currículo oficial en niveles de dominio, con checkpoints y compuertas críticas.

---

## 2. Diferenciadores Clave frente al Mercado (Duolingo, Khan Academy, Coursera)

1. **Anatomía del Procedimiento ("Modo Desglose"):** Descompone la operación en partes lógicas identificadas por colores (Dato → Operación → Agrupación → Verificación).
2. **Desglose gamificado:** El estudiante predice pasos, gana chispas, recibe un sello de detective y obtiene un bonus de XP si resuelve después de usar la ayuda.
3. **Experiencia Infantil Amigable (No LMS Rígido):** Cursos públicos, carnet de aventuras, retos cortos y un club de dudas; no un aula digital obligatoria.
4. **Cuenta opcional y privada:** Código de clase + alias; sin correo de menores ni nombres reales.
5. **Docente backstage:** El docente crea, revisa y modera desde un panel separado; el estudiante no ve “Docente” en su navegación.
6. **Creación de Contenido por Docentes sin Código:** Formulario con vista previa del Modo Desglose.

---

## 3. Descripción General del Sistema

### 3.1 Roles de Usuario
* **Visitante:** Explora cursos, resuelve ejercicios y lee La Fogata sin cuenta. Su progreso se guarda localmente en el navegador.
* **Estudiante con alias (6–13 años):** Entra con código de clase + alias. Desbloquea XP, racha, carnet, chispas, pegatinas y escritura en La Fogata.
* **Docente / Tutor:** Trabaja en backstage. Crea actividades, gestiona códigos, revisa avance agregado y modera La Fogata.
* **Acompañante:** Puede consultar un resumen de avance desde el panel o un espacio secundario. No aparece en el header del estudiante.

### 3.2 Arquitectura del Sistema (Demo Hackathon)
```
[ Frontend: Next.js 16 App Router / React 19 / TypeScript / Tailwind 4 / Lucide ]
       │
       ├─► Contenido público: unidades, ejercicios y Modo Desglose
       ├─► Motor de ejercicios + anatomía gamificada
       ├─► Sesión demo: invitado / estudiante con alias / docente backstage
       ├─► Perfil, XP, racha, chispas, pegatinas e insignias
       ├─► La Fogata: club de dudas por unidad
       └─► Panel docente backstage: progreso, alias y moderación
```

**Persistencia:** `localStorage` para perfiles, sesión, progreso, anatomía, chispas, cosméticos, ejercicios creados y La Fogata. No hay backend ni autenticación real en esta versión.

### 3.3 Principios de Experiencia
- El estudiante debe sentir una aventura, no una extensión del colegio.
- El error no castiga; abre una pista.
- El color del desglose tiene significado pedagógico.
- El docente es infraestructura invisible, no un personaje del club.
- No se usan datos personales de menores.

---

## 4. Requisitos Funcionales (RF)

### 4.1 Módulo Estudiante (Interfaz de Aprendizaje)
* **RF-01: Interfaz de Reto Activo:** Presentar el problema con lenguaje sencillo, datos visibles y campo numérico o interacción equivalente.
* **RF-02: Activación del Modo Desglose:**
  * Disponible a demanda.
  * Se abre automáticamente después de 2 intentos fallidos, con una introducción amable.
  * Pausa el reto y muestra el procedimiento paso a paso.
* **RF-03: Retroalimentación Positiva e Inmediata:** Sin castigos, sin resta de puntos y con reintento asistido.
* **RF-04: Metáforas Visuales:** Bloques de decenas/unidades, agrupaciones y fracciones como apoyo concreto.
* **RF-04.1: Espacio interactivo:** El estudiante puede construir con Base10, avanzar en una recta numérica o pintar fracciones; el input numérico sigue disponible.

### 4.2 Módulo "Modo Desglose" (Motor de Anatomía)
* **RF-05: Mapeo de Pasos por Código de Colores:**
  * **Azul:** Datos iniciales.
  * **Naranja:** Transformación u operación.
  * **Verde:** Resultado intermedio o agrupación.
  * **Violeta:** Respuesta final.
  * **Amarillo:** Verificación.
* **RF-06: Explicación Textual y Visual:** Cada paso incluye una frase corta, operación destacada cuando corresponde y visual si aporta.
* **RF-06.1:** El desglose debe permitir navegación Anterior/Siguiente, cierre con Escape y foco visible.

### 4.3 Módulo Docente / Creador de Actividades
* **RF-07: Formulario de Creación sin Código:** Nivel, tipo de ejercicio, enunciado y valores. La respuesta se calcula automáticamente.
* **RF-08: Vista Previa en Tiempo Real:** El docente ve el ejercicio y su desglose antes de guardarlo.
* **RF-08.1: Plantillas pedagógicas:** Cada tipo genera cinco pasos (datos, estrategia, resolución, resultado y verificación), un reto y un visual coherente.
* **RF-08.2: Edición de explicaciones:** El docente puede ajustar el texto de cada paso sin romper la estructura.

### 4.4 Módulo Acompañante (Resumen para Tutores/Padres)
* **RF-09: Tarjeta de Diagnóstico:** Resumen de conceptos dominados y punto de apoyo. No se muestra en la navegación principal del estudiante.

### 4.5 Modo Desglose gamificado
* **RF-10: Retos en pasos clave:** Algunos pasos preguntan “¿qué crees que pasa?” antes de revelar la explicación.
* **RF-11: Recompensas del desglose:**
  * +1 chispa por primer acierto de un reto.
  * +2 chispas al completar un desglose por primera vez.
  * Sello visual “Detective de pasos”.
  * +5 XP si el estudiante resuelve el ejercicio después de completar el desglose, una sola vez.
* **RF-11.1:** Un fallo en el reto muestra una pista y revela la explicación sin bloquear.

### 4.6 Unidades y progreso
* **RF-12: Catálogo público:** Cualquier visitante puede ver unidades, hojas y ejercicios.
* **RF-13: Progreso por unidad:** Cada capítulo muestra hojas resueltas, porcentaje y estado completado.

### 4.7 Cuenta opcional, perfil y gamificación
* **RF-14: Cuenta con alias:** Código de clase + alias + avatar. Sin correo de estudiantes.
* **RF-14.1: Acceso docente:** Correo y clave simulada para entrar al panel de guía. No es autenticación real en la demo.
* **RF-15: Carnet:** XP, nivel, racha actual, mejor racha, hojas resueltas, chispas e insignias.
* **RF-16: Pegatinas cosméticas:** Lupa (3 chispas), Cohete (5) y Estrella (8); se compran una vez y se equipan en el avatar.
* **RF-17: Importación de invitado:** Al elegir alias, se ofrece traer progreso, anatomía y chispas locales.

### 4.8 La Fogata
* **RF-18: Club por unidad:** Cualquiera puede leer hilos; para crear o responder se necesita alias.
* **RF-19: Moderación:** Reportar, fijar, resolver y ocultar desde el panel docente. La moderación es backstage.

### 4.9 Panel docente backstage
* **RF-20: Panel de guía:** Ver estudiantes, avance, chispas, desgloses completados y hilos; crear alias; moderar La Fogata.
* **RF-21: Aislamiento de la experiencia:** El panel y el creador de actividades no se enlazan desde la navegación del estudiante.
* **RF-21.1: Creación interactiva:** El panel permite crear y previsualizar retos sin salir de la vista docente.
* **RF-21.2: Resumen por estudiante:** El docente puede abrir el diagnóstico de un estudiante desde la lista de la clase.

### 4.10 Hoja de ruta y figuras
* **RF-22: Ruta N0–N6:** Mostrar los 7 niveles de dominio, el nivel actual, el progreso, el checkpoint y las compuertas críticas.
* **RF-23: Cobertura por nivel:** Cada nivel debe tener 5 ejercicios practicables.
* **RF-24: Figuras dinámicas:** El desglose puede usar fracciones, geometría, objetos contables y agrupaciones visuales.
* **RF-25: Meta diaria:** Mostrar cuántas hojas se resolvieron hoy y una meta simple de 2 hojas.
* **RF-26: Interactivos de práctica:** Base10, recta numérica y fracciones deben actualizar el campo de respuesta y funcionar con teclado.
* **RF-27: Ejercicios docentes con nivel:** Los retos creados se asignan a N0–N6 y aparecen como hojas creadas por la guía.

---

## 5. Requisitos No Funcionales (RNF)

* **RNF-01 (Usabilidad UX/UI):** Interfaz infantil, tipografía legible, botones grandes y paleta accesible. Concepto de cuaderno de aventuras.
* **RNF-02 (Rendimiento):** Transiciones de pasos y animaciones breves; no deben superar 1 segundo entre pasos.
* **RNF-03 (Despliegue y Portabilidad):** Next.js listo para Vercel; responsive en móvil y escritorio.
* **RNF-04 (Restricciones del Evento):** Repositorio público, dependencias claras y README estructurado.
* **RNF-05 (Privacidad):** Solo alias y avatar. Sin correos, nombres reales ni datos sensibles de menores. El correo docente no es necesario en la demo.
* **RNF-06 (Accesibilidad):** WCAG AA, contraste, teclado, foco visible, `aria-live` y `prefers-reduced-motion`.
* **RNF-07 (Demo local):** Persistencia en `localStorage`; los datos no se comparten entre navegadores.
* **RNF-08 (Moderación):** La Fogata permite reportes y moderación docente; no hay mensajes directos ni imágenes.
* **RNF-09 (Alcance técnico):** Sin backend, autenticación real ni LLM dentro del producto en esta versión.

---

## 6. Modelo de Datos

### 6.1 Ejercicio
Se mantiene el esquema base y se agrega opcionalmente `reto` en pasos clave.

```json
{
  "id": "ejercicio_math_001",
  "categoria": "Adicion",
  "nivel": "Tercero_Primaria",
  "titulo": "Ayuda a juntar las manzanas",
  "enunciado": "Lucas tiene 17 manzanas y María le regala 15 más. ¿Cuántas manzanas tiene Lucas en total?",
  "datos": { "num1": 17, "num2": 15, "operacion": "+" },
  "respuesta_correcta": 32,
  "desglose_pasos": [
    {
      "paso": 1,
      "titulo": "Identificar los datos",
      "color_tag": "blue",
      "explicacion": "Lucas empieza con 17 y recibe 15. Debemos sumar ambos números.",
      "visual_state": { "tipo": "base10", "decenas": [10, 10], "unidades": [7, 5] }
    },
    {
      "paso": 2,
      "titulo": "Sumar las unidades",
      "color_tag": "orange",
      "explicacion": "Sumamos 7 + 5 = 12 unidades. Se forma 1 decena y quedan 2 unidades.",
      "operacion_destacada": "7 + 5 = 12",
      "reto": {
        "pregunta": "¿Qué ocurre cuando sumamos 7 + 5?",
        "opciones": [
          "Quedan 12 unidades sueltas",
          "Se forma 1 decena y quedan 2 unidades",
          "Se forma 1 decena y quedan 3 unidades"
        ],
        "correcta": 1,
        "pista": "12 tiene una decena completa y dos unidades sueltas."
      }
    }
  ],
  "metafora_grafica": "bloques_base_10"
}
```

### 6.2 Entidades
| Entidad | Campos principales |
| :--- | :--- |
| `UserProfile` | `id`, `role`, `alias`, `avatar`, `classId`, `xp`, `level`, `streakCurrent`, `streakBest`, `lastActivityDate`, `email?`, `password?` (docente demo) |
| `Classroom` | `id`, `name`, `code`, `teacherId` |
| `Unit` | `id`, `title`, `description`, `order`, `exerciseIds`, `accent`, `levelId` |
| `RoadmapLevel` | `id`, `order`, `title`, `baseYear`, `focus`, `canDo`, `checkpoint`, `criticalGate`, `components`, `unitIds` |
| `ProgressEntry` | `attempts`, `solved`, `lastAnswer`, `updatedAt` |
| `AnatomyEntry` | `steps`, `completed`, `updatedAt` |
| `ProfileCosmetics` | `owned`, `equipped` |
| `ClubThread` | `id`, `unitId`, `authorId`, `title`, `body`, `status`, `pinned`, `hidden`, `reported`, `createdAt` |
| `ClubReply` | `id`, `threadId`, `authorId`, `body`, `hidden`, `reported`, `createdAt` |

`ExerciseData.expresion` es opcional para mostrar formatos como `mcm(6, 8)`,
`1/2 + 1/4` o `2³`. `VisualState` admite `base10`, `agrupacion`, `fraccion`,
`geometria` y `canicas`.

### 6.3 Persistencia local
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

---

## 7. Guía de Implementación

### 7.1 Rutas
| Ruta | Propósito |
| :--- | :--- |
| `/` | Inicio del estudiante |
| `/hoja-de-ruta` | Camino N0–N6 y nivel actual |
| `/unidades` | Capítulos agrupados por nivel |
| `/unidad/[id]` | Ficha de unidad |
| `/ejercicio/[id]` | Reto activo |
| `/club` | La Fogata |
| `/club/[threadId]` | Hilo y respuestas |
| `/entrar` | Código de clase + alias |
| `/perfil` | Carnet, pegatinas e insignias |
| `/panel` | Panel docente backstage |
| `/docente` | Creador de actividades |

`/ruta` redirige a `/hoja-de-ruta` por compatibilidad.

### 7.2 Componentes principales
- `<ExerciseContainer />`
- `<MathProblemView />`
- `<DeconstructionModal />` / `<AnatomyPanel />`
- `<StepChallenge />`, `<SparkBurst />`, `<CompletionStamp />`
- `<UnitDetail />`, `<ClubBoard />`, `<ThreadDetail />`
- `<TeacherCreatorForm />`
- `<Avatar />`, `<CosmeticIcon />`

### 7.3 Estilos
Usar Tailwind CSS 4 con el lenguaje **cuaderno de aventuras**: papel cálido, tinta, bordes dibujados, sombras duras y doodles. Evitar gradientes de fondo, glassmorphism, filas de tres tarjetas idénticas y exceso de `rounded-3xl`.

### 7.4 Estado
Usar React Context + `localStorage`. La UI espera `ready` antes de mostrar datos persistidos para evitar mismatch de hidratación.

### 7.5 Testing
- Playwright + axe en escritorio y móvil.
- Smoke de cursos públicos, alias, carnet, La Fogata, panel y Modo Desglose.
- Verificación antes de entregar: `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test:e2e`.

---

## 8. Cronograma y Estado de Implementación

| Hito | Hora Límite | Estado / Entregable |
| :--- | :--- | :--- |
| **Construcción del Frontend MVP** | Domingo 22 - 12:30 | Completado: 4 ejercicios, unidades y Modo Desglose. |
| **Integración Módulo Docente** | Domingo 22 - 14:00 | Completado: creador, códigos, panel y moderación. |
| **Despliegue y GitHub Clean-up** | Domingo 22 - 15:30 | Código en `main`; despliegue Vercel pendiente. |
| **Cierre de Entregas Oficial** | Domingo 22 - 16:30 | Pendiente de URL pública. |
| **Pitch & Demo (4 min)** | Domingo 22 - 17:00 | Pendiente de ensayo final. |

### Estado técnico
- Cursos públicos: implementado.
- Hoja de ruta N0–N6: implementada.
- 35 ejercicios (5 por nivel): implementado.
- Figuras dinámicas: implementado.
- Cuenta opcional por alias: implementado.
- Unidades y progreso: implementado.
- Carnet, XP, racha, chispas e insignias: implementado.
- Pegatinas canjeables: implementado.
- Modo Desglose gamificado: implementado.
- La Fogata: implementado en demo local.
- Panel docente backstage: implementado.
- Acceso de educador con correo y clave simulada: implementado.
- Plantillas docentes de cinco pasos con explicaciones editables: implementado.
- Interactivos Base10, recta y fracciones: implementado.
- Meta diaria, racha semanal, resumen de clase y diagnóstico: implementado.
- Microcopy libre de textos de demo en la UI: implementado.
- Despliegue Vercel: pendiente.
- Cuentas reales y foro compartido: fuera de alcance de la demo.

---

## 9. Alcance de la Demo y Trabajo Futuro

### Incluido
- Demo local con `localStorage`.
- Cuenta simulada por código + alias.
- Foro local por navegador.
- Moderación docente simulada.
- Sin datos personales de menores.

### Fuera de alcance
- Backend y base de datos compartida.
- Autenticación real.
- Foro multiusuario real.
- Notificaciones, mensajes directos o imágenes.
- LLM dentro del producto.

### Trabajo futuro
- Supabase/Postgres + Auth + RLS.
- Foro compartido con moderación real.
- Retos configurables por docentes.
- Más pegatinas y personalización.
- Evaluación con niños y docentes.
- Actualizar el SRS con métricas de uso reales.

---

**Aprobado para desarrollo por el equipo de Abstracthon 2026.**
