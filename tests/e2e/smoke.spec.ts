import { expect, test } from "@playwright/test";

test("renders the premium application shell", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /home/i }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Ideas worth keeping." })).toBeVisible();
  await expect(page.getByRole("search")).toBeVisible();
});

test("unknown routes provide a genuine recovery experience", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  await expect(page.getByRole("heading", { name: /wandered off the canvas/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /return home/i })).toBeVisible();
});
