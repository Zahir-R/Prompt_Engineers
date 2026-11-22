# LLM como herramienta de desarrollo

## Decisión

El LLM no forma parte del producto. Se usa en opencode/Claude para:

- revisar diseño,
- revisar accesibilidad,
- revisar pedagogía y microcopy,
- generar borradores de código y documentación,
- ejecutar QA visual.

## Reglas

- No enviar datos de menores.
- No incluir API keys en el cliente ni en el repositorio.
- Todo cambio generado se revisa y se prueba localmente.
- Las skills del proyecto son la fuente de criterio.

## Evaluación de una iteración

Antes de cerrar:

1. ¿Se cargaron las skills relevantes?
2. ¿Se respetaron los contratos compartidos?
3. ¿Pasó lint, typecheck y build?
4. ¿Se revisó móvil y escritorio?
5. ¿Se actualizó la bitácora o el ADR?
