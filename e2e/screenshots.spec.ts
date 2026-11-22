import { test } from "@playwright/test";

const routes = [
  { path: "/", name: "inicio" },
  { path: "/ruta", name: "ruta" },
  { path: "/docente", name: "docente" },
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
