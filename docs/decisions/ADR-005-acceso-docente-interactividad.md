# ADR-005: acceso docente e interactividad del estudiante

## Estado

Aceptado para la demo.

## Contexto

El docente solo entraba por `/panel`, los ejercicios creados no seguían el
formato de cinco pasos y la práctica del estudiante era principalmente lectura
más un campo numérico.

## Decisión

1. Agregar acceso de educador en `/entrar` con correo y clave simulada.
2. Renombrar “Mi carnet” a **“Mi perfil”** en la navegación.
3. Generar ejercicios docentes con plantillas de cinco pasos, reto, visual,
   verificación y respuesta calculada. El docente puede editar explicaciones.
4. Agregar tres interactivos: Base10, recta numérica y fracciones.
5. Mantener el input numérico como fuente de verdad para comprobar respuestas.
6. Conservar el tono cálido actual.

## Consecuencias

- El acceso docente es más claro, aunque sigue siendo demo local.
- Los ejercicios docentes mantienen consistencia pedagógica.
- La práctica requiere construir, moverse o pintar antes de comprobar.
- Los interactivos deben ser accesibles con teclado, no solo con arrastre.
