# Mates — Estado actual, necesidades y futuro

**Última actualización:** 22 de noviembre de 2026  
**Demo pública:** <https://prompt-engineers-psi.vercel.app/>  
**Estado:** frontend completo para demo; backend pendiente para producción.

---

## 1. Qué tenemos hoy

### Experiencia del estudiante
- Cursos públicos: se puede practicar sin crear cuenta.
- Hoja de ruta N0–N6 con 7 niveles de dominio.
- 5 ejercicios por nivel: **35 retos** en total.
- Modo Desglose con colores semánticos, explicaciones y verificación.
- Desglose gamificado: retos en pasos clave, chispas, sello de detective y bonus de XP.
- Interactivos de práctica:
  - bloques Base10 con arrastre y botones;
  - recta numérica con deslizador y botones;
  - fracciones con arrastre, clic y botones.
- Carnet/perfil con XP, racha, chispas, insignias y pegatinas.
- Botón **Siguiente reto** al resolver: avanza sin volver a capítulos.
- La Fogata: club local de dudas por unidad, con lectura pública.
- Acceso de estudiante con código de clase + alias.

### Experiencia del docente
- Acceso con correo y clave simulada.
- Panel backstage con resumen de clase y diagnóstico por estudiante.
- Creador de actividades con plantillas pedagógicas de cinco pasos.
- Creación de **rutas docentes** con actividades existentes o nuevas.
- Publicación local de una ruta para la clase.
- Reordenamiento de actividades.
- La ruta publicada aparece en **“Rutas de mi clase”** para estudiantes del mismo navegador.

### Calidad técnica
- Next.js 16, React 19, TypeScript estricto, Tailwind 4.
- 80+ tests e2e/axe en escritorio y móvil.
- Despliegue en Vercel.
- SRS, README, ADRs y capturas de referencia.

---

## 2. Qué funciona y qué es local

| Área | Estado actual | Límite |
| :--- | :--- | :--- |
| Cursos oficiales N0–N6 | Funciona | Contenido estático |
| Progreso del estudiante | Funciona | `localStorage` por navegador |
| Cuentas de estudiante | Funcionan | Código + alias, sin servidor |
| Acceso docente | Funciona | Correo/clave simulados |
| Rutas docentes | Funcionan | Solo en el navegador del docente |
| Publicación a la clase | Funciona localmente | No viaja a otros dispositivos |
| La Fogata | Funciona localmente | No es multiusuario real |
| Diagnóstico docente | Funciona | Datos locales del navegador |
| XP, racha, chispas | Funcionan localmente | No se sincronizan |
| Modo Desglose | Funciona | Sin dependencia de backend |

### Por qué un ejercicio creado por un docente no aparece a los estudiantes

El docente crea la actividad y la ruta en el `localStorage` de **su navegador**. El estudiante entra desde otro navegador o dispositivo y tiene otro `localStorage`. Sin una base de datos compartida, el contenido no puede viajar entre navegadores.

En la versión actual, una ruta publicada se ve para estudiantes **solo en el mismo navegador**. Para una publicación real se necesita backend, autenticación y permisos por clase.

---

## 3. Qué necesitamos para producción

### Backend y base de datos
- Supabase/Postgres o equivalente.
- Tablas:
  - `profiles` (docente/estudiante, alias, clase, rol).
  - `classrooms`.
  - `teacher_routes`.
  - `route_exercises`.
  - `exercises`.
  - `exercise_progress`.
  - `anatomy_progress`.
  - `xp_events`, `sparks`, `cosmetics`.
  - `forum_threads`, `forum_posts`, `reports`, `moderation_actions`.
- Migraciones y seed de los 35 ejercicios.

### Autenticación y permisos
- Docentes: correo y contraseña reales.
- Estudiantes: código de clase + alias + PIN creado por el docente.
- Sin correo de menores.
- RLS:
  - docente ve y gestiona su clase;
  - estudiante ve rutas publicadas de su clase y su propio progreso;
  - nadie accede a datos de otra clase.
- Funciones server-side para crear estudiantes y validar PIN.

### Rutas docentes reales
- Crear ruta.
- Agregar actividades existentes o nuevas.
- Ordenar actividades.
- Guardar borrador.
- Publicar a una clase.
- Despublicar y archivar.
- Los retos docentes no cuentan en el progreso oficial N0–N6; la ruta tiene progreso propio.

### La Fogata real
- Persistencia compartida.
- Lectura pública y escritura autenticada.
- Reportes.
- Moderación docente.
- Sin mensajes directos ni imágenes en la primera versión.

### Sincronización
- Progreso, intentos, XP, racha, chispas y cosméticos por cuenta.
- Importación del progreso de invitado al entrar.
- Continuidad entre dispositivos.

### Privacidad y seguridad
- Minimización de datos.
- Sin nombres reales ni correos de menores.
- Política de retención.
- Consentimiento/gestión del adulto responsable.
- Moderación y canales de reporte.

### Contenido y pedagogía
- Revisión de los 35 ejercicios con docentes.
- Más ejercicios por nivel.
- Validación de errores comunes y checkpoints.
- Evaluación con niños y docentes.

### Analítica docente
- Avance por estudiante.
- Errores frecuentes.
- Actividades pendientes.
- Uso del Modo Desglose.
- Exportación de reportes.

---

## 4. Arrastre y manipulación

### Implementado
- Base10: arrastrar decenas/unidades al tablero; botones +/− como alternativa.
- Fracciones: arrastrar piezas a la barra; clic en partes como alternativa.
- Recta numérica: deslizador nativo arrastrable y botones de salto.
- Todo tiene alternativa de teclado o botones.

### Pendiente
- Arrastrar objetos a grupos para multiplicación/división.
- Cuadrícula de área manipulable.
- Fusión de fracciones arrastrando una fracción sobre otra.
- Mejor feedback táctil en dispositivos móviles.

---

## 5. Futuro del proyecto

### Fase 1 — Demo actual
- Frontend estático.
- `localStorage`.
- Backend no requerido.
- Demo pública en Vercel.

### Fase 2 — Backend mínimo
- Supabase + Postgres.
- Auth docente.
- Alias + PIN para estudiantes.
- Progreso sincronizado.
- Migración de progreso local.

### Fase 3 — Rutas docentes reales
- Crear ruta.
- Publicar a clase.
- Estudiantes ven rutas publicadas.
- Progreso separado de N0–N6.
- Analítica básica.

### Fase 4 — Comunidad
- La Fogata multiusuario.
- Reportes y moderación.
- Notificaciones.
- Controles de seguridad para menores.

### Fase 5 — Producto educativo
- Más contenido por nivel.
- Diagnóstico más preciso.
- Analítica avanzada.
- Evaluación con aulas reales.
- Accesibilidad y rendimiento a escala.

---

## 6. Cómo probar la demo actual

### Estudiante
1. Entrar a <https://prompt-engineers-psi.vercel.app/entrar>.
2. Código de clase: `MATES-3A`.
3. Elegir alias y avatar.
4. Resolver un reto y usar **Siguiente reto**.
5. Probar Base10, recta o fracciones.
6. Ver el perfil y La Fogata.
7. Ver **Rutas de mi clase** si hay una ruta publicada en ese navegador.

### Docente
1. En `/entrar`, elegir **Soy educador**.
2. Correo: `ana@mates.club`.
3. Clave: `mates2026`.
4. En el panel, abrir **Mis rutas**.
5. Crear una ruta, agregar una actividad existente o nueva.
6. Publicar la ruta.
7. Cambiar a un estudiante en el mismo navegador para verla en **Rutas de mi clase**.

---

## 7. Limitaciones conocidas

- Todo el estado de cuentas, rutas y foro vive en `localStorage`.
- No hay backend, base de datos ni autenticación real.
- Los datos no se comparten entre navegadores ni dispositivos.
- El acceso docente es simulado.
- La publicación de rutas es local.
- La Fogata no es multiusuario real.
- El creador de rutas es local y no reemplaza todavía una API de producción.
- No se ingresan datos reales de menores.

---

## 8. Próximo paso recomendado

1. Crear proyecto Supabase.
2. Modelar tablas y RLS.
3. Migrar los 35 ejercicios.
4. Implementar auth docente y estudiante.
5. Sincronizar progreso.
6. Publicar rutas docentes reales.
7. Conectar La Fogata.
8. Probar con una clase piloto.
