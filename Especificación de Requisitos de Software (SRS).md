# Especificación de Requisitos de Software (SRS)
## Proyecto: Plataforma de Nivelación Matemática con "Modo Desglose"
**Evento:** Abstracthon 2026 (MLSA - University Community, Bolivia)  
**Track Principal:** Educación  
**Público Objetivo:** Estudiantes de nivel primario (6 a 13 años), Docentes y Tutores/Padres.  
**Fecha Límite de Entrega:** Domingo 22 de Noviembre de 2026, 16:30 (Hora de Bolivia).  

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
1. **Los estudiantes (6–13 años)** resuelven ejercicios sin la presión de un aula tradicional o un LMS rígido. Al fallar o dudar, pueden activar el **"Modo Desglose"**, que disecciona el ejercicio en capas de colores, metáforas visuales y explicaciones paso a paso.
2. **Los docentes y tutores** pueden crear, editar y desplegar ejercicios o rutas de nivelación personalizadas mediante un panel intuitivo sin requerir conocimientos de programación.

---

## 2. Diferenciadores Clave frente al Mercado (Duolingo, Khan Academy, Coursera)

1. **Anatomía del Procedimiento ("Modo Desglose"):** A diferencia de apps que solo marcan "Correcto/Incorrecto", el sistema descompone la operación en partes lógicas identificadas por colores (ej. *Dato A $\rightarrow$ Operación $\rightarrow$ Agrupación $\rightarrow$ Verificación*).
2. **Diagnóstico del "Primer Paso Roto":** El sistema detecta exactamente dónde ocurrió el fallo (ej. planteamiento del problema vs. error en la tabla de sumar/multiplicar).
3. **Experiencia Infantil Amigable (No LMS Rígido):** Se eliminan las interfaces secas tipo Coursera/NetAcad. El niño experimenta retos cortos (2-4 minutos) centrados en la resolución visual, mientras que los reportes de avance se envían/resumen para el adulto en un panel separado.
4. **Creación de Contenido por Docentes sin Código:** El módulo docente transforma plantillas estáticas en actividades interactivas y visuales.

---

## 3. Descripción General del Sistema

### 3.1 Roles de Usuario
* **Estudiante (Niño 6–13 años):** Interactúa con la interfaz de retos, utiliza manipulativos visuales y consulta el Modo Desglose.
* **Docente / Tutor:** Crea lecciones, gestiona parámetros de ejercicios y revisa métricas consolidadas de nivelación.

### 3.2 Arquitectura del Sistema (Formato Hackathon MVP)
```
[ Frontend: React / Next.js / Tailwind CSS / Lucide Icons ]
       │
       ├─► Engine de Ejercicios (Estado local + Componentes Dinámicos)
       ├─► Módulo "Modo Desglose" (Visualizador paso a paso)
       └─► Panel Docente (Creador de JSON de Ejercicios)
```

---

## 4. Requisitos Funcionales (RF)

### 4.1 Módulo Estudiante (Interfaz de Aprendizaje)
* **RF-01: Interfaz de Reto Activo:** Debe presentar el problema utilizando lenguaje sencillo, gráficos ilustrativos y bloques de interacción drag-and-drop o campos numéricos.
* **RF-02: Activación del Modo Desglose:**
  * Debe estar disponible tanto a demanda del estudiante como sugerido automáticamente tras 2 intentos fallidos.
  * Debe pausar el reto y desplegar una guía animada/paso a paso del procedimiento.
* **RF-03: Retroalimentación Positiva e Inmediata:** La plataforma no usa castigos ni resta puntos por error. Promueve el reintento asistido.
* **RF-04: Metáforas Visuales:** Las cantidades numéricas deben asociarse a elementos gráficos manipulables (ej. bloques de decenas/unidades, porciones de pizzas, bolsas de agrupamiento).

### 4.2 Módulo "Modo Desglose" (Motor de Anatomía)
* **RF-05: Mapeo de Pasos por Código de Colores:**
  * **Color Azul:** Datos iniciales del problema.
  * **Color Naranja:** Transformación / Operación a aplicar.
  * **Color Verde:** Resultado intermedio o agrupación.
  * **Color Violeta/Amarillo:** Verificación y respuesta final.
* **RF-06: Explicación Textual y Visual:** Cada paso debe acompañar una frase corta explícita (ej. *"Primero juntamos las unidades: 7 + 5 = 12. Dejamos 2 y llevamos 1 a las decenas"*).

### 4.3 Módulo Docente / Creador de Actividades
* **RF-07: Formulario de Creación sin Código:** El docente debe poder seleccionar el tipo de ejercicio (ej. Suma con llevadas, Fracciones equivalentes, Conteo) e ingresar:
  1. Enunciado del problema.
  2. Valores numéricos / Opciones.
  3. Pasos del modo desglose asociados a los valores.
* **RF-08: Vista Previa en Tiempo Real:** El docente debe ver cómo se mostrará el ejercicio y su desglose al estudiante antes de guardarlo.

### 4.4 Módulo Acompañante (Resumen para Tutores/Padres)
* **RF-09: Tarjeta de Diagnóstico:** Muestra un resumen simplificado del desempeño:
  * Conceptos dominados.
  * Punto exacto donde requiere apoyo (ej. *"Confusión al llevar decenas en la adición"*).

---

## 5. Requisitos No Funcionales (RNF)

* **RNF-01 (Usabilidad UX/UI):** Interfaz adaptada a niños. Tipografía legible (ej. Fredoka, Nunito o Inter con tamaño amplio), botones grandes, paleta de colores vibrantes pero accesible.
* **RNF-02 (Rendimiento):** La carga de las animaciones y transiciones de los desgloses no debe superar 1 segundo entre pasos.
* **RNF-03 (Despliegue y Portabilidad):** Debe ser compatible con navegadores web móviles y de escritorio. El código debe estar listo para ejecutarse de forma estática o en Vercel/Netlify.
* **RNF-04 (Restricciones del Evento):** Repositorio público en GitHub con código fuente, dependencias claras y archivo `README.md` estructurado.

---

## 6. Modelo de Datos (Esquema JSON)

Para que el desarrollo frontend e IA procese dinámicamente los ejercicios y sus desgloses, se define la siguiente estructura estándar:

```json
{
  "id": "ejercicio_math_001",
  "categoria": "Adicion",
  "nivel": "Tercero_Primaria",
  "titulo": "Ayuda a juntar las manzanas",
  "enunciado": "Lucas tiene 17 manzanas y Maria le regala 15 mas. ¿Cuantas manzanas tiene Lucas en total?",
  "datos": {
    "num1": 17,
    "num2": 15,
    "operacion": "+"
  },
  "respuesta_correcta": 32,
  "desglose_pasos": [
    {
      "paso": 1,
      "titulo": "Identificar los datos",
      "color_tag": "blue",
      "explicacion": "Lucas empieza con 17 y recibe 15. Debemos sumar ambos numeros.",
      "visual_state": { "decenas": [10, 10], "unidades": [7, 5] }
    },
    {
      "paso": 2,
      "titulo": "Sumar las Unidades",
      "color_tag": "orange",
      "explicacion": "Sumamos 7 + 5 = 12 unidades. Como 12 es mayor a 9, se forma 1 nueva decena (10) y quedan 2 unidades sueltas.",
      "operacion_destacada": "7 + 5 = 12"
    },
    {
      "paso": 3,
      "titulo": "Sumar las Decenas",
      "color_tag": "green",
      "explicacion": "Sumamos la decena de 17 (1), la decena de 15 (1) y la nueva decena que llevamos (1). 1 + 1 + 1 = 3 decenas.",
      "operacion_destacada": "1 + 1 + 1 = 3"
    },
    {
      "paso": 4,
      "titulo": "Resultado Final",
      "color_tag": "purple",
      "explicacion": "Juntamos 3 decenas y 2 unidades. El resultado es 32 manzanas.",
      "resultado_final": 32
    }
  ],
  "metafora_grafica": "bloques_base_10"
}
```

---

## 7. Especificación para Agentes LLM y Código (Guía de Implementación)

### 7.1 Directivas para la Generación de Código (Cursor / Bolt.new / Lovable / Replit)
Al usar esta especificación como contexto para herramientas de IA de programación, se deben seguir las siguientes directivas estrictas:

1. **Estructura Componentizada:**
   * `<ExerciseContainer />`: Maneja el flujo general de la lección.
   * `<MathProblemView />`: Renderiza los números o gráficos manipulables.
   * `<DeconstructionModal />` o `<AnatomyPanel />`: El componente que renderiza el **Modo Desglose** con navegación paso a paso (Botones "Anterior" / "Siguiente").
   * `<TeacherCreatorForm />`: Formulario para añadir nuevos JSON de ejercicios a la lista local.
2. **Estilos:** Usar **Tailwind CSS**. Aplicar clases de bordes redondeados (`rounded-2xl`), sombras suaves (`shadow-lg`), y colores pastel/brillantes (`bg-blue-100`, `text-blue-700`, `bg-emerald-500`).
3. **Estado Global/Local:** Utilizar estado local de React (`useState`, `useContext`) para evitar dependencias complejas de backend durante la demo del Hackathon.
4. **Métricas de Presentación:** Incluir un botón en el encabezado llamado **"Ver Diagnóstico para Acompañante"** que muestre un modal rápido con el reporte simplificado para tutores.

---

## 8. Cronograma de Cierre y Entregables (Abstracthon 2026)

| Hito | Hora Límite | Estado / Entregable |
| :--- | :--- | :--- |
| **Construcción del Frontend MVP** | Domingo 22 - 12:30 | Aplicación web funcional con 2 ejercicios interactivos y Modo Desglose activo. |
| **Integración Módulo Docente / Creador** | Domingo 22 - 14:00 | Formulario básico para agregar 1 ejercicio personalizado a la lista. |
| **Despliegue y GitHub Clean-up** | Domingo 22 - 15:30 | Subir a GitHub con `README.md` detallado, capturas de pantalla y enlace de demo en vivo. |
| **Cierre de Entregas Oficial** | Domingo 22 - 16:30 | Confirmación de formulario de entrega en plataforma Abstracthon. |
| **Pitch & Demo (4 min)** | Domingo 22 - 17:00 en adelante | Presentación ante el jurado exponiendo la estadística UNESCO ERCE 2023, la solución visual y la demo interactiva. |

---
**Aprobado para desarrollo por el equipo de Abstracthon 2026.**