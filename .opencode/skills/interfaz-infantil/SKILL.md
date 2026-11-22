---
name: interfaz-infantil
description: Use when editing student UI, landing pages, exercise screens, anatomy panels, or Tailwind styles. Enforces the warm "cuaderno de aventuras" visual system and blocks generic AI-looking layouts.
---

# Interfaz infantil: cuaderno de aventuras

## Antes de editar

1. Lee `docs/design/principios.md`, `docs/design/tokens.md` y
   `docs/design/anti-patrones.md`.
2. Revisa el estado actual de la pantalla en móvil y escritorio.
3. Propón el cambio visual antes de tocar muchos archivos.
4. Después de editar, sigue `qa-visual-playwright` y
   `accesibilidad-ninos`.

## Concepto

La aplicación debe sentirse como un **cuaderno de aventuras matemáticas** hecho
para un niño de 6 a 13 años, no como un dashboard SaaS.

- Papel cálido, tinta oscura, acentos coral, mostaza y turquesa.
- Bordes dibujados, sombras duras y ligeras rotaciones.
- Mascota propia y doodles SVG.
- Espacio para escribir, rayones, cintas y sellos.
- Jerarquía clara: una idea principal por pantalla.

## Reglas de composición

- Una acción principal por vista. Las secundarias se ven más pequeñas.
- Evita filas de tres tarjetas idénticas. Usa una ficha grande y notas
  secundarias asimétricas.
- Alterna bloques anchos con notas laterales tipo margen de cuaderno.
- Usa máximo dos niveles de sombra.
- Usa `rounded-[1.25rem_0.75rem_1.5rem_1rem]` o similar para bordes
  irregulares; no todo debe ser `rounded-3xl`.
- Rotaciones permitidas: `-rotate-1`, `rotate-1`, `rotate-2` con moderación.
- Cada pantalla debe tener un detalle propio: cinta, sticker, doodle o sello.

## Color

- Base: `paper`, `paper-deep`, `ink`.
- Acentos de marca: `coral`, `mustard`, `teal`, `sky`, `plum`.
- Los colores azul, naranja, verde, violeta y amarillo son **exclusivos del
  Modo Desglose**. No usarlos como decoración general.
- No usar gradientes radiales de fondo, glassmorphism ni `backdrop-blur`.
- El texto debe tener contraste suficiente; nunca usar color como única señal.

## Tipografía

- Display: Fredoka (`font-display`) para títulos y números grandes.
- Cuerpo: Nunito (`font-sans`) para lectura.
- Anotaciones: Caveat (`font-hand`) solo en notas, flechas o etiquetas.
- No usar mayúsculas sostenidas en párrafos.
- Tamaño base generoso: 16–18 px en móvil.

## Componentes

- `PaperCard`: ficha de papel con borde de tinta y sombra dura.
- `Sticker`: etiqueta tipo pegatina para estados y categorías.
- `Mascot`: personaje propio; no reemplazar por emojis.
- `Doodle`: estrellas, flechas y subrayados SVG.
- Botones: grandes, con borde visible y sombra dura; estados hover claros.
- Inputs: fondo papel, borde de tinta y foco azul visible.

## Microcopy y contenido

- Usa español con acentos y frases cortas.
- Nombres concretos y contexto boliviano.
- Nunca castigar el error: hablar de "intentar", "descubrir" y "revisar".
- Carga la skill `microcopy-es` para textos nuevos.

## Movimiento

- Transiciones de 150–300 ms.
- Movimiento intencional: aparecer una pista, sellar un paso, celebrar.
- Nada de animaciones infinitas decorativas.
- Respetar `prefers-reduced-motion`.

## Anti-patrones prohibidos

- Fondo con dos halos radiales azul/amarillo.
- Tarjetas blancas translúcidas con `backdrop-blur`.
- Héroe con título genérico y tarjetas de estadísticas.
- Tres tarjetas iguales como única sección.
- Iconos Lucide como única ilustración.
- Ilustraciones genéricas de IA o estilo "undraw".
- Emojis usados como mascota o iconografía principal.
- Paleta arcoíris decorativa sin significado.
- Texto en inglés o sin acentos.

## Checklist de salida

- ¿Se reconoce como cuaderno y no como plantilla?
- ¿Hay una mascota, doodle o detalle propio?
- ¿Los colores semánticos solo aparecen en el desglose?
- ¿Funciona en 360 px y en escritorio?
- ¿El foco es visible y el contraste es suficiente?
- ¿La pantalla se entiende sin explicación externa?
