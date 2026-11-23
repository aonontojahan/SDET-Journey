import { test, expect } from "@playwright/test";

test("User Login", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("textbox", { name: "you@example.com" }).fill("admin@test.com");
  await page.getByRole("textbox", { name: "Enter password" }).fill("1234");
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL(/dashboard/);
  await page.context().storageState({ path: "auth.json" });
});

test("Double Click", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard/practice-components");
  await page.getByRole("button", { name: "Double Click Me" }).dblclick();
});

test("Right Click", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard/practice-components");
  await page.getByRole("button", { name: "Right Click Me" }).click({ button: "right" });
});

test("Open New Tab", async ({ page, context }) => {
  await page.goto("http://localhost:3000/dashboard/practice-components");
  const newPagePromise = context.waitForEvent("page");
  await page.getByRole("button", { name: "Open New Tab" }).click();
  const newPage = await newPagePromise;
  await newPage.waitForLoadState();
  expect(newPage.url()).toContain("example.com");
  await newPage.close();
});

test("Open New Window", async ({ page, context }) => {
  await page.goto("http://localhost:3000/dashboard/practice-components");
  const newPagePromise = context.waitForEvent("page");
  await page.getByRole("button", { name: "Open New Window" }).click();
  const newPage = await newPagePromise;
  await newPage.waitForLoadState();
  expect(newPage.url()).toContain("example.com");
  await newPage.close();
});

test.only("Open Modal", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard/practice-components");
  await page.getByRole("button", { name: "Open Modal" }).click();
  await page.getByRole("button", { name: "Close" }).nth(0).click();
  const actualValue = await page.getByText("Modal Closed!").textContent();
  expect(actualValue?.includes("Modal Closed")).toBeTruthy();
});
