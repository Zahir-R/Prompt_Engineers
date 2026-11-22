import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", name: "portada" },
  { path: "/unidades", name: "unidades" },
  { path: "/unidad/unidad_sumas", name: "unidad" },
  { path: "/club", name: "club" },
  { path: "/entrar", name: "entrar" },
  { path: "/perfil", name: "perfil" },
  { path: "/docente", name: "docente" },
  { path: "/ejercicio/ejercicio_math_001", name: "ejercicio" },
];

for (const route of routes) {
  test(`sin violaciones críticas en ${route.name}`, async ({ page }) => {
    await page.goto(route.path);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();

    const serious = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );

    expect(
      serious,
      serious.map((violation) => `${violation.id}: ${violation.help}`).join("\n"),
    ).toEqual([]);
  });
}
