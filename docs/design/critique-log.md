# Bitácora de crítica visual

Registrar cada iteración con fecha, pantalla, hallazgos y decisión.

## Formato

```md
## YYYY-MM-DD — Pantalla

Captura:
Problema:
Cambio aplicado:
Pendiente:
```

## 2026-11-21 — Rediseño de cuaderno

Problema: el sistema anterior era claro pero todavía usaba el patrón de hero con
tarjetas, fondos con halos y componentes excesivamente redondeados.

Cambio aplicado: tokens de papel, tinta, coral, mostaza y turquesa; mascota
Tinta; doodles; bordes dibujados; sombras duras; navegación tipo sticker; ruta
tipo juego de mesa; formulario docente como mesa de trabajo; modales de papel.

Capturas: `docs/design/screenshots/`.

Pendiente: validar con 2–3 niños y ajustar el tamaño de los controles en móvil.

## 2026-11-21 — Iteración inicial

Problema: la app usaba un lenguaje de dashboard: gradientes de fondo, tarjetas
blancas, `backdrop-blur`, filas de tarjetas y poca identidad propia.

Decisión: migrar a un sistema de cuaderno de aventuras con papel cálido,
tinta, bordes dibujados, sombras duras, mascota y doodles. Reservar los colores
semánticos para el Modo Desglose.

## 2026-11-22 — Cursos públicos y club

Problema: agregar cuentas podía convertir la app en un LMS escolar y alejar al
estudiante.

Cambio aplicado: cursos públicos, alias opcional con código de clase, progreso
de invitado, carnet con racha/XP, La Fogata por unidad y docente en backstage.

Decisión: el docente no aparece en la navegación ni en el club del estudiante.
La moderación vive en `/panel`.

Pendiente: validar con niños si el carnet y La Fogata se sienten como juego.

## 2026-11-22 — Desglose como misión

Problema: el Modal Desglose era útil pero pasivo; podía sentirse como ayuda
remedial.

Cambio aplicado: retos en pasos clave, chispas, sello de detective, intro
amable tras dos fallos y bonus de XP al resolver.

Decisión: premiar comprensión, no clics. Las chispas son cosméticas; el XP
extra se gana al resolver después del desglose.

Capturas: `desktop-desglose-reto.png`, `desktop-desglose-chispa.png`,
`desktop-desglose-sello.png`.

## 2026-11-22 — Pegatinas de Tinta

Cambio aplicado: tienda mínima en el carnet para canjear chispas por Lupa,
Cohete y Estrella. La pegatina equipada aparece en el avatar del carnet y del
header.

Decisión: cosméticos sin ventajas académicas. Comprar descuenta chispas una
sola vez.

## 2026-11-22 — Hoja de ruta N0–N6

Cambio aplicado: navegación “Ruta”, página `/hoja-de-ruta`, 7 niveles con 5
ejercicios, compuertas críticas, meta diaria y figuras dinámicas en el desglose.
También se reemplazaron textos de demo por microcopy de producto.

Decisión: no copiar el prototipo HTML; portar solo camino, meta/racha, resumen
de clase y diagnóstico. Las figuras React de Crismar se limpian y se integran.

## 2026-11-22 — Acceso docente e interactividad

Cambio aplicado: pestaña “Soy educador” en `/entrar`, renombre a “Mi perfil”,
plantillas docentes de cinco pasos con explicaciones editables y espacios
interactivos Base10, recta numérica y fracciones.

Decisión: la interactividad debe hacer pensar y no solo tocar. El input numérico
sigue siendo la comprobación final y los interactivos funcionan con teclado.
