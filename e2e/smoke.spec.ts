import { expect, test, type Locator, type Page } from "@playwright/test";

async function dragByMouse(page: Page, source: Locator, target: Locator) {
  const sourceBox = await source.boundingBox();
  const targetBox = await target.boundingBox();
  if (!sourceBox || !targetBox) throw new Error("No se pudo medir el arrastre");
  await page.mouse.move(
    sourceBox.x + sourceBox.width / 2,
    sourceBox.y + sourceBox.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    sourceBox.x + sourceBox.width / 2 + 16,
    sourceBox.y + sourceBox.height / 2 + 12,
    { steps: 5 },
  );
  await page.mouse.move(
    targetBox.x + targetBox.width / 2,
    targetBox.y + targetBox.height / 2,
    { steps: 20 },
  );
  await page.mouse.up();
  await page.waitForTimeout(200);
}

test("la portada invita a explorar sin cuenta", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Las mates se aprenden/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Explorar unidades/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Elegir mi alias/i })).toBeVisible();
  await expect(page.getByText(/Capítulos de N0/i)).toBeVisible();
});

test("las unidades son públicas y listan sus hojas", async ({ page }) => {
  await page.goto("/unidades");
  await expect(
    page.getByRole("heading", { name: /Capítulos por/i }),
  ).toBeVisible();
  await expect(page.getByText("Sumas que cruzan el 10")).toBeVisible();
  await expect(page.getByText("Restas con préstamo")).toBeVisible();
  await expect(page.getByText("El gran desafío")).toBeVisible();
});

test("un invitado puede abrir una unidad y un ejercicio", async ({ page }) => {
  await page.goto("/unidad/unidad_sumas");
  await expect(page.getByText("Hojas de este capítulo")).toBeVisible();
  await page.getByRole("link", { name: /Abrir/i }).first().click();
  await expect(page.getByLabel(/Mi respuesta es/i)).toBeVisible();
  await expect(page.getByText(/Estás practicando como visitante/i)).toBeVisible();
});

test("la Fogata se puede leer sin cuenta", async ({ page }) => {
  await page.goto("/club");
  await expect(page.getByRole("heading", { name: /La Fogata/i })).toBeVisible();
  await expect(page.getByText("¿Por qué llevamos una decena?")).toBeVisible();
  await expect(page.getByText(/Elegir alias para participar/i)).toBeVisible();
});

test("un estudiante puede crear su alias y entrar a su carnet", async ({ page }) => {
  await page.goto("/entrar");
  await page.getByLabel(/Código de clase/i).fill("MATES-3A");
  await page.getByLabel(/Tu alias/i).fill("Tester");
  await page.getByRole("button", { name: /Entrar al club/i }).click();
  await expect(page).toHaveURL(/\/perfil$/);
  await expect(page.getByRole("heading", { name: "Tester" })).toBeVisible();
  await expect(page.getByText(/Carnet de aventuras/i)).toBeVisible();
});

test("un estudiante con alias puede abrir una duda", async ({ page }) => {
  await page.goto("/entrar");
  await page.getByLabel(/Código de clase/i).fill("MATES-3A");
  await page.getByLabel(/Tu alias/i).fill("Curioso");
  await page.getByRole("button", { name: /Entrar al club/i }).click();
  await page.goto("/club");
  await page.getByRole("button", { name: /Preguntar a la Fogata/i }).click();
  await page.getByLabel(/Tu pregunta/i).fill("¿Cómo sumo si me paso de 10?");
  await page.getByLabel(/Cuéntanos un poco más/i).fill("No entiendo qué pasa con la decena que llevamos.");
  await page.getByRole("button", { name: /Publicar en La Fogata/i }).click();
  await expect(page.getByText(/Tu duda ya está en La Fogata/i)).toBeVisible();
  await expect(page.getByText("¿Cómo sumo si me paso de 10?")).toBeVisible();
});

test("el docente ve el formulario y la vista previa", async ({ page }) => {
  await page.goto("/docente");
  await expect(page.getByRole("heading", { name: /Escribe una/i })).toBeVisible();
  await page.getByLabel("Título").fill("Problema de prueba");
  await page.getByLabel("Enunciado").fill("Ana tiene 12 manzanas y recibe 8 más.");
  await page.getByLabel("Número 1").fill("12");
  await page.getByLabel("Número 2").fill("8");
  await expect(page.getByText(/Respuesta correcta calculada: 20/i)).toBeVisible();
  await expect(page.getByText(/vista previa en tiempo real/i)).toBeVisible();
  await page.getByText(/Editar explicaciones de los pasos/i).click();
  await expect(page.getByRole("textbox", { name: /Paso 1:/i })).toBeVisible();
});

test("el panel de guía está detrás del telón", async ({ page }) => {
  await page.goto("/panel");
  await page.getByRole("button", { name: /Entrar como Profe Ana/i }).click();
  await expect(page.getByText(/Estudiantes del club/i)).toBeVisible();
  await expect(page.getByText(/Moderar La Fogata/i)).toBeVisible();
});

test("dos fallos abren el Modo Desglose y se puede cerrar", async ({ page }) => {
  await page.goto("/ejercicio/ejercicio_math_001");
  const answer = page.getByLabel(/Mi respuesta es/i);
  const submit = page.getByRole("button", { name: /Comprobar/i });

  await answer.fill("31");
  await submit.click();
  await answer.fill("30");
  await submit.click();

  const dialog = page.getByRole("dialog", { name: /Modo desglose/i });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/Tinta encontró una pista/i)).toBeVisible();
  await dialog.getByRole("button", { name: /Cerrar Modo Desglose/i }).click();
  await expect(dialog).toBeHidden();
});

test("responder bien marca el ejercicio como completado", async ({ page }) => {
  await page.goto("/ejercicio/ejercicio_math_001");
  await page.getByLabel(/Mi respuesta es/i).fill("32");
  await page.getByRole("button", { name: /Comprobar/i }).click();
  await expect(page.getByText(/¡Muy bien!/i)).toBeVisible();
  await expect(page.getByText(/Completado/i)).toBeVisible();
});

test("un estudiante gana XP y racha al resolver", async ({ page }) => {
  await page.goto("/entrar");
  await page.getByLabel(/Código de clase/i).fill("MATES-3A");
  await page.getByLabel(/Tu alias/i).fill("Aventurero");
  await page.getByRole("button", { name: /Entrar al club/i }).click();
  await page.goto("/ejercicio/ejercicio_math_001");
  await page.getByLabel(/Mi respuesta es/i).fill("32");
  await page.getByRole("button", { name: /Comprobar/i }).click();
  await expect(page.getByText(/Ganaste .* XP y tu racha/i)).toBeVisible();
  await page.goto("/perfil");
  await expect(page.getByText("15 XP").first()).toBeVisible();
  await expect(page.getByText(/racha/).first()).toBeVisible();
});


test("el detective resuelve retos y gana el bonus", async ({ page }) => {
  await page.goto("/entrar");
  await page.getByLabel(/Código de clase/i).fill("MATES-3A");
  await page.getByLabel(/Tu alias/i).fill("Detective");
  await page.getByRole("button", { name: /Entrar al club/i }).click();
  await page.goto("/ejercicio/ejercicio_math_001");
  await page.getByRole("button", { name: /Ver Modo Desglose/i }).click();
  const dialog = page.getByRole("dialog", { name: /Modo desglose/i });
  await dialog.getByRole("button", { name: /Siguiente/i }).click();
  await expect(
    dialog.getByText(/¿Qué ocurre cuando sumamos 7 \+ 5\?/i),
  ).toBeVisible();
  await dialog
    .getByRole("button", { name: "Se forma 1 decena y quedan 2 unidades" })
    .click();
  await expect(dialog.getByText(/¡Chispa! \+1/i)).toBeVisible();
  await dialog.getByRole("button", { name: /Siguiente/i }).click();
  await dialog.getByRole("button", { name: /Siguiente/i }).click();
  await dialog.getByRole("button", { name: /Terminar/i }).click();
  await expect(dialog.getByText(/Sello de detective/i)).toBeVisible();
  await dialog.getByRole("button", { name: /Ahora inténtalo tú/i }).click();
  await page.getByLabel(/Mi respuesta es/i).fill("32");
  await page.getByRole("button", { name: /Comprobar/i }).click();
  await expect(page.getByText(/Resuelto con ayuda/i)).toBeVisible();
});

test("se pueden canjear y equipar pegatinas con chispas", async ({ page }) => {
  await page.goto("/entrar");
  await page.getByLabel(/Código de clase/i).fill("MATES-3A");
  await page.getByLabel(/Tu alias/i).fill("Sofía");
  await page.getByRole("button", { name: /Entrar al club/i }).click();
  await page.goto("/perfil");
  await page.getByRole("button", { name: "Canjear Lupa" }).click();
  await expect(page.getByText(/Canjeaste Lupa/i)).toBeVisible();
  await page.getByRole("button", { name: "Equipar Lupa" }).click();
  await expect(page.getByText(/Lupa equipada/i)).toBeVisible();
  await expect(page.getByText("Equipada", { exact: true })).toBeVisible();
});


test("la hoja de ruta muestra los niveles N0 a N6", async ({ page }) => {
  await page.goto("/hoja-de-ruta");
  await expect(
    page.getByRole("heading", { name: /Mi ruta de/i }),
  ).toBeVisible();
  for (const level of ["N0", "N1", "N2", "N3", "N4", "N5", "N6"]) {
    await expect(page.getByText(level, { exact: true }).first()).toBeVisible();
  }
  await expect(page.getByText(/Compuertas críticas/i)).toBeVisible();
  await page.getByRole("link", { name: /Practicar N0/i }).click();
  await expect(page).toHaveURL(/\/unidad\/unidad_n0$/);
});

test("la interfaz no muestra textos de desarrollo", async ({ page }) => {
  for (const route of ["/", "/entrar", "/club", "/perfil"]) {
    await page.goto(route);
    const body = await page.locator("body").innerText();
    expect(body).not.toMatch(/demo local|de demostración|reiniciar demo/i);
  }
});

test("el panel docente crea retos y abre el resumen de un estudiante", async ({
  page,
}) => {
  await page.goto("/panel");
  await page.getByRole("button", { name: /Entrar como Profe Ana/i }).click();
  await page.getByRole("button", { name: "Mis rutas" }).click();
  await expect(
    page.getByRole("heading", { name: /Crear una ruta para mi clase/i }),
  ).toBeVisible();
  await page.getByLabel("Título de la nueva ruta").fill("Ruta de prueba");
  await page.getByRole("button", { name: "Crear ruta" }).click();
  await expect(page.getByText(/Ruta creada como borrador/i)).toBeVisible();
  await page.getByLabel("Actividad existente").selectOption({ index: 1 });
  await page.getByRole("button", { name: "Agregar" }).click();
  await expect(page.getByText(/Actividad agregada a la ruta/i)).toBeVisible();
  await page.getByText(/Crear una actividad nueva/i).click();
  await page.getByLabel("Título", { exact: true }).fill("Actividad nueva de prueba");
  await page.getByLabel("Enunciado").fill("Ana tiene 10 manzanas y recibe 5 más.");
  await page.getByLabel("Número 1").fill("10");
  await page.getByLabel("Número 2").fill("5");
  await page.getByRole("button", { name: /Guardar ejercicio/i }).click();
  await expect(page.getByText(/Actividad nueva agregada a la ruta/i)).toBeVisible();
  await expect(page.getByText("Actividad nueva de prueba").first()).toBeVisible();
  await page.getByRole("button", { name: "Publicar ruta" }).click();
  await expect(page.getByText(/Ruta publicada para la clase/i)).toBeVisible();
  await page.getByRole("button", { name: "Mi clase" }).click();
  await page.getByRole("button", { name: /Ver resumen/i }).first().click();
  const dialog = page.getByRole("dialog", { name: /Resumen/i });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: /Cerrar diagnóstico/i }).click();
  await expect(dialog).toBeHidden();
});


test("un educador entra con correo y clave", async ({ page }) => {
  await page.goto("/entrar");
  await page.getByRole("tab", { name: /Soy educador/i }).click();
  await page.getByLabel(/Correo docente/i).fill("ana@mates.club");
  await page.getByLabel(/Clave/i).fill("mates2026");
  await page.getByRole("button", { name: /Entrar al panel de guía/i }).click();
  await expect(page).toHaveURL(/\/panel$/);
  await expect(page.getByText(/Estudiantes del club/i)).toBeVisible();
});

test("el estudiante construye con bloques Base10", async ({ page }) => {
  await page.goto("/ejercicio/ejercicio_math_001");
  for (let i = 0; i < 3; i += 1) {
    await page.getByRole("button", { name: "Agregar una decena" }).click();
  }
  for (let i = 0; i < 2; i += 1) {
    await page.getByRole("button", { name: "Agregar una unidad" }).click();
  }
  await expect(page.getByLabel(/Mi respuesta es/i)).toHaveValue("32");
  await page.getByRole("button", { name: /Comprobar/i }).click();
  await expect(page.getByText(/¡Muy bien!/i)).toBeVisible();
});

test("el estudiante avanza en la recta numérica", async ({ page }) => {
  await page.goto("/ejercicio/ejercicio_math_031");
  for (let i = 0; i < 3; i += 1) {
    await page.getByRole("button", { name: "Avanzar 1" }).click();
  }
  await expect(page.getByLabel(/Mi respuesta es/i)).toHaveValue("3");
});

test("el estudiante pinta una fracción", async ({ page }) => {
  await page.goto("/ejercicio/ejercicio_math_023");
  await page.getByRole("button", { name: "Parte 1" }).click();
  await page.getByRole("button", { name: "Parte 2" }).click();
  await page.getByRole("button", { name: "Parte 3" }).click();
  await expect(page.getByLabel(/Mi respuesta es/i)).toHaveValue("0.75");
});


test("el estudiante ve la ruta publicada de su clase", async ({ page }) => {
  await page.goto("/entrar");
  await page.getByLabel(/Código de clase/i).fill("MATES-3A");
  await page.getByLabel(/Tu alias/i).fill("Sofía");
  await page.getByRole("button", { name: /Entrar al club/i }).click();
  await page.goto("/hoja-de-ruta");
  await expect(page.getByText(/Rutas de mi clase/i)).toBeVisible();
  await expect(page.getByText("Repaso de sumas y restas")).toBeVisible();
});

test("después de resolver aparece el siguiente reto", async ({ page }) => {
  await page.goto("/ejercicio/ejercicio_math_001");
  await page.getByLabel(/Mi respuesta es/i).fill("32");
  await page.getByRole("button", { name: /Comprobar/i }).click();
  const next = page.getByRole("link", { name: /Siguiente reto/i });
  await expect(next).toBeVisible();
  await next.click();
  await expect(page).toHaveURL(/\/ejercicio\/ejercicio_math_003$/);
});

test("se puede arrastrar una decena al tablero Base10", async ({ page }) => {
  await page.goto("/ejercicio/ejercicio_math_001");
  await dragByMouse(
    page,
    page.getByRole("button", { name: "Arrastrar Decena" }),
    page.getByText("Arrastra los bloques aquí"),
  );
  await expect(page.getByLabel(/Mi respuesta es/i)).toHaveValue("10");
});

test("se puede arrastrar una pieza a la barra de fracciones", async ({
  page,
}) => {
  await page.goto("/ejercicio/ejercicio_math_023");
  await dragByMouse(
    page,
    page.getByRole("button", { name: "Arrastrar una parte" }).first(),
    page.getByRole("group", { name: /Fracción con 4 partes/i }),
  );
  await expect(page.getByLabel(/Mi respuesta es/i)).toHaveValue("0.25");
});
