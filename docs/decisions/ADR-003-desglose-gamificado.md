# ADR-003: Modo Desglose gamificado

## Estado

Aceptado para la demo.

## Contexto

El Modo Desglose explicaba bien el procedimiento, pero seguía siendo un modal
pasivo. Si se siente como “ayuda remedial”, el estudiante lo evita. Necesitamos
que abrirlo sea parte del juego y no una admisión de fracaso.

## Decisión

1. Convertir pasos clave en **mini retos** de predicción.
2. Dar **chispas** por primer acierto y por completar un desglose.
3. Mostrar un **sello de detective** al terminar.
4. Dar un **bonus de XP** al resolver el ejercicio después de completar su
   desglose, una sola vez.
5. Auto-abrir tras 2 fallos con una intro amable de Tinta.
6. No castigar errores dentro del reto: se revela la explicación igual.

## Consecuencias

- El estudiante interactúa antes de leer la explicación.
- Las chispas son cosméticas y no compran respuestas.
- El XP sigue ligado a resolver, no a hacer clic en “Siguiente”.
- Los ejercicios sin retos siguen funcionando con el modo pasivo.
- La gamificación debe respetar `prefers-reduced-motion` y no bloquear la
  lectura.
