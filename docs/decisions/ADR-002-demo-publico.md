# ADR-002: cursos públicos y cuentas de club

## Estado

Aceptado para la demo de Abstracthon 2026.

## Contexto

La app era una experiencia de práctica con progreso local. Se evaluó agregar
cuentas de estudiantes, XP, rachas, unidades y un foro. El riesgo era que la
plataforma se sintiera como una extensión obligatoria del colegio.

Además, el repo no tiene backend ni autenticación real, y el cierre del evento
es el mismo día.

## Decisión

1. **Los cursos son públicos.** Cualquier visitante puede ver unidades, resolver
   ejercicios y abrir el Modo Desglose sin cuenta.
2. **La cuenta es opcional.** Un alias desbloquea racha, XP, carnet y escritura
   en La Fogata.
3. **El alias se elige con un código de clase.** No se usan correos ni datos de
   menores.
4. **El docente es backstage.** No aparece en la navegación del estudiante. Solo
   crea contenido, gestiona alias, revisa avance y modera desde `/panel`.
5. **El foro se convierte en “La Fogata”.** Club por unidad, lectura pública y
   escritura con alias.
6. **Todo es demo local.** El estado se guarda en `localStorage` y no se comparte
   entre navegadores.

## Consecuencias

- Se preserva la sensación de aventura y no de LMS.
- La demo se puede probar sin fricción.
- No hay autenticación real ni multiusuario real todavía.
- Para producción se necesitará backend, RLS, moderación real y reglas de
  privacidad.
