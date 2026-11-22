import { expect, test } from "@playwright/test";

test("la portada abre y muestra las fichas", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Las mates se aprenden/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Empezar la ruta/i })).toBeVisible();
  await expect(page.getByText("Fichas para hoy")).toBeVisible();
});

test("la ruta lista los ejercicios semilla", async ({ page }) => {
  await page.goto("/ruta");
  await expect(page.getByRole("heading", { name: /Tu camino de/i })).toBeVisible();
  await expect(page.getByText("Ayuda a juntar las manzanas")).toBeVisible();
  await expect(page.getByText("Ayuda a repartir los caramelos")).toBeVisible();
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
