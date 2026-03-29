import { expect, test } from "@playwright/test";

test("home page renders hero", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("courses catalog loads", async ({ page }) => {
  await page.goto("/courses");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
