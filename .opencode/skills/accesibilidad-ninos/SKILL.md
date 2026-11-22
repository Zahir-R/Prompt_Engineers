---
name: accesibilidad-ninos
description: Use when reviewing or building UI for children, forms, modals, navigation, focus, color, motion, or touch interactions. Applies WCAG 2.2 AA with kid-friendly constraints.
---

# Accesibilidad para niños

## Objetivo

Que un niño pueda usar la app con teclado, lector de pantalla, baja visión,
movimiento reducido o dificultades de atención.

## Contraste y color

- Texto normal: mínimo 4.5:1.
- Texto grande: mínimo 3:1.
- No usar color como única señal; acompañar con texto o icono.
- Verificar estados hover, focus y deshabilitado.

## Teclado y foco

- Todo se puede usar sin ratón.
- Foco visible con `:focus-visible`.
- Orden de tabulación lógico.
- `Escape` cierra modales.
- Al abrir un modal, enfocar el botón de cierre o el primer control.
- Devolver el foco al elemento que abrió el modal.

## Tamaño y tacto

- Botones de al menos 44×44 px.
- Separación suficiente entre acciones.
- Inputs grandes y con etiqueta visible.
- Evitar acciones destructivas cerca de acciones frecuentes.

## Movimiento

- Respetar `prefers-reduced-motion`.
- Evitar animaciones automáticas e infinitas.
- Transiciones cortas y sin parpadeos.

## Lectura

- Texto amplio, interlineado cómodo.
- Evitar párrafos largos.
- Usar listas y pasos numerados.
- No usar solo iconos sin etiqueta.

## Modales y diálogos

- `role="dialog"`, `aria-modal="true"` y título asociado.
- Bloquear scroll del fondo.
- Cerrar con overlay y con botón visible.
- No atrapar al usuario sin salida.

## Checklist

- ¿Se puede completar el flujo solo con teclado?
- ¿El foco se ve en todo momento?
- ¿Los contrastes pasan?
- ¿Los botones son táctiles?
- ¿La información no depende solo del color?
- ¿El modal se cierra con Escape?
