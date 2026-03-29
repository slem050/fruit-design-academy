import { expect, test } from "@playwright/test";

test("home page renders hero", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("courses catalog loads", async ({ page }) => {
  await page.goto("/courses");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("not-found page renders", async ({ page }) => {
  await page.goto("/this-route-does-not-exist-404");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
