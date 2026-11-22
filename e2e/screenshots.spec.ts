import { test } from "@playwright/test";

const routes = [
  { path: "/", name: "inicio" },
  { path: "/hoja-de-ruta", name: "hoja-de-ruta" },
  { path: "/unidades", name: "unidades" },
  { path: "/unidad/unidad_sumas", name: "unidad" },
  { path: "/club", name: "club" },
  { path: "/entrar", name: "entrar" },
  { path: "/perfil", name: "perfil" },
  { path: "/ejercicio/ejercicio_math_001", name: "ejercicio" },
];

for (const route of routes) {
  test(`captura de ${route.name}`, async ({ page }, testInfo) => {
    await page.goto(route.path);
    await page.waitForTimeout(400);
    await page.screenshot({
      path: `test-results/capturas/${testInfo.project.name}-${route.name}.png`,
      fullPage: true,
    });
  });
}
