# ADR-001: Lenguaje visual de cuaderno de aventuras

## Estado

Aceptado.

## Contexto

La primera versión usaba un lenguaje genérico de dashboard: gradientes de
fondo, tarjetas blancas, `backdrop-blur`, sombras suaves y filas de tarjetas.
No comunicaba infancia, juego ni matemática visual.

## Decisión

Adoptar un lenguaje de **cuaderno de aventuras matemáticas**:

- papel cálido y tinta oscura;
- bordes dibujados y sombras duras;
- mascota y doodles SVG propios;
- tipografía Fredoka + Nunito + Caveat para anotaciones;
- colores semánticos reservados al Modo Desglose;
- composición asimétrica con notas y cintas.

## Consecuencias

- Más trabajo de ilustración y componentes propios.
- Menos dependencia de plantillas y librerías visuales genéricas.
- Mejor diferenciación en la demo y coherencia con el público infantil.
- Los tokens y anti-patrones deben mantenerse en `docs/design/`.
