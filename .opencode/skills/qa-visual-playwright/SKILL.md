---
name: qa-visual-playwright
description: Use before closing any visual change or demo. Runs Playwright and axe checks, captures screenshots at mobile and desktop sizes, and verifies the anatomy modal, progress, and hydration.
---

# QA visual con Playwright

## Preparación

Si es la primera vez:

```bash
pnpm exec playwright install chromium
```

## Flujo

1. Ejecutar `pnpm lint`, `pnpm typecheck`, `pnpm build`.
2. Levantar `pnpm dev` en una terminal.
3. Revisar estas rutas:
   - `/`
   - `/ruta`
   - `/docente`
   - `/ejercicio/ejercicio_math_001`
   - `/ejercicio/ejercicio_math_002`
4. Capturar en dos tamaños:
   - móvil: 360×800
   - escritorio: 1440×900
5. Verificar:
   - El Modo Desglose abre con el botón.
   - Fallar dos veces abre el desglose automáticamente.
   - Anterior/Siguiente/Terminar funcionan.
   - `Escape` cierra el modal.
   - El diagnóstico del acompañante abre y cierra.
   - El docente guarda un ejercicio y aparece en la ruta.
   - No hay errores de hidratación en consola.

## Revisión visual

- ¿Se ve como cuaderno y no como plantilla?
- ¿Hay una mascota o doodle propio?
- ¿Los colores semánticos están solo en el desglose?
- ¿Hay tres tarjetas idénticas? Si sí, rediseñar.
- ¿Hay `backdrop-blur` o gradientes de fondo? Si sí, quitar.
- ¿El texto tiene acentos y se lee con claridad?
- ¿El foco es visible?

## Accesibilidad automatizada

Usar `@axe-core/playwright` en las rutas principales y revisar:

- contraste,
- nombres accesibles,
- landmarks,
- orden de encabezados,
- botones sin texto accesible.

## Cierre

Adjuntar capturas en `docs/design/critique-log.md` o en el PR. No cerrar un
cambio visual sin haber revisado móvil y escritorio.
