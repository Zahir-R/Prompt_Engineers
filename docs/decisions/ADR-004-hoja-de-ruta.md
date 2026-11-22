# ADR-004: hoja de ruta N0–N6

## Estado

Aceptado para la demo.

## Contexto

La plataforma tenía unidades y ejercicios, pero no un camino curricular visible.
El documento `hoja-de-ruta-matematica-primaria-bolivia.md` reorganiza el
currículo oficial en 7 niveles de dominio.

## Decisión

1. Integrar la ruta N0–N6 como **“Mi ruta”**.
2. Cada nivel tiene **5 ejercicios** (35 en total).
3. La ruta muestra nivel actual, progreso, checkpoint y compuertas críticas.
4. No bloquea niveles: recomienda un orden, pero permite explorar.
5. Reutilizar las figuras dinámicas de `src/components/figures/` para conteo,
   multiplicación, reparto, fracciones, geometría y objetos.
6. Reemplazar textos de demo/desarrollo por microcopy útil para el usuario.

## Consecuencias

- El estudiante entiende el camino completo, no solo una lista de capítulos.
- El docente tiene una referencia curricular para crear actividades.
- El contenido crece a 35 ejercicios y requiere revisión pedagógica por lotes.
- Las figuras de Crismar se integran selectivamente, sin el motor vanilla
  duplicado.
