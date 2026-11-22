import { expect, test } from "@playwright/test";

test("la portada invita a explorar sin cuenta", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Las mates se aprenden/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Explorar unidades/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Elegir mi alias/i })).toBeVisible();
  await expect(page.getByText("Capítulos del cuaderno")).toBeVisible();
});

test("las unidades son públicas y listan sus hojas", async ({ page }) => {
  await page.goto("/unidades");
  await expect(
    page.getByRole("heading", { name: /Capítulos del/i }),
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
  await page.getByLabel("Respuesta correcta").fill("20");
  await expect(page.getByText(/vista previa en tiempo real/i)).toBeVisible();
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
