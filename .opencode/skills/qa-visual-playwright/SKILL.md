---
name: qa-visual-playwright
description: Use before closing any visual change or demo. Runs Playwright and axe checks, captures mobile and desktop screenshots, and verifies public courses, alias access, La Fogata, profile, and the backstage panel.
---

# QA visual con Playwright

## Preparación

Si es la primera vez:

```bash
pnpm exec playwright install chromium
```

## Flujo

1. Ejecutar `pnpm lint`, `pnpm typecheck`, `pnpm build`.
2. Ejecutar `pnpm test:e2e`. Este comando compila y sirve producción en el
   puerto 3000; no requiere `pnpm dev`.
3. Revisar estas rutas:
   - `/`
   - `/hoja-de-ruta`
   - `/ruta/ruta_clase_repaso`
   - `/unidades`
   - `/unidad/unidad_sumas`
   - `/club`
   - `/entrar` (estudiante y educador)
   - `/perfil`
   - `/ejercicio/ejercicio_math_001`
   - `/panel`
4. Capturar en dos tamaños:
   - móvil: Pixel 7
   - escritorio: 1440×900
5. Verificar:
   - Un invitado puede abrir unidades y ejercicios sin cuenta.
   - Un invitado puede leer La Fogata pero no publicar.
   - Código `MATES-3A` + alias crea/entra a un perfil.
   - Correo `ana@mates.club` + clave `mates2026` entra al panel docente.
   - El progreso de invitado se importa al entrar.
   - Solo cuentas de estudiante ganan XP y racha.
  - El reto del desglose muestra chispa, el sello aparece al terminar y el
    bonus de detective se suma al resolver.
   - El perfil muestra racha, XP, insignias, chispas y pegatinas.
   - Base10, recta y fracciones actualizan el campo de respuesta.
   - Base10 y fracciones admiten arrastre con mouse/touch y alternativa de teclado.
   - El docente crea una ruta, agrega actividades y la publica a su clase.
   - La ruta muestra N0–N6 y cada nivel tiene 5 ejercicios.
   - Las figuras de fracciones, geometría y objetos se ven bien en móvil.
   - El docente entra a `/panel`, crea alias y modera sin aparecer en la UI del
     estudiante.
   - El header del estudiante no muestra “Docente” ni diagnóstico.

## Revisión visual

- ¿Se ve como cuaderno y no como LMS?
- ¿El docente está fuera de la navegación del estudiante?
- ¿Hay filas de tres tarjetas idénticas? Si sí, rediseñar.
- ¿Hay `backdrop-blur` o gradientes de fondo? Si sí, quitar.
- ¿Los colores semánticos están solo en el desglose?
- ¿La UI evita textos de demo/desarrollo?
- ¿El texto tiene acentos y contraste suficiente?

## Accesibilidad

Usar `@axe-core/playwright` en las rutas principales. El test falla solo en
`critical`/`serious`: contraste, nombres accesibles, landmarks, encabezados y
botones sin texto accesible.

## Cierre

Adjuntar capturas en `docs/design/screenshots/` o en el PR. No cerrar un cambio
visual sin revisar móvil y escritorio.
