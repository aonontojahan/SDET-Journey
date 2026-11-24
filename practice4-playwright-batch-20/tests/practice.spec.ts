import { test, expect } from "@playwright/test";

test("User Login", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("textbox", { name: "you@example.com" }).fill("admin@test.com");
  await page.getByRole("textbox", { name: "Enter password" }).fill("1234");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState();
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
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.getByRole("button", { name: "Open New Tab" }).click(),
  ]);
  await newPage.waitForLoadState();
  expect(newPage.url()).toContain("example.com");
  await newPage.close();
});

test("Open New Window", async ({ page, context }) => {
  await page.goto("http://localhost:3000/dashboard/practice-components");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.getByRole("button", { name: "Open New Window" }).click(),
  ]);
  await newPage.waitForLoadState();
  expect(newPage.url()).toContain("example.com");
  await newPage.close();
});

test("Open Modal", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard/practice-components");
  await page.getByRole("button", { name: "Open Modal" }).click();
  await page.getByRole("button", { name: "Close" }).first().click();
  const actualValue = await page.getByText("Modal Closed!").textContent();
  expect(actualValue?.includes("Modal Closed")).toBeTruthy();
});

test("NextJS Date Time Picker", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard/practice-components");
  let dateTimeInput = await page.locator('[type = "datetime-local"]');
  await dateTimeInput.fill("2027-01-01T14:04");
});

test("Readonly Date Field", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard/practice-components");
  const readOnlyElem = await page.locator("[readonly]").elementHandle();
  await readOnlyElem.evaluate((el) => {
    const input = el as HTMLInputElement;
    input.removeAttribute("readonly");
    input.value = '2024-01-05';
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
  let value = await readOnlyElem.getProperty('value');
  expect(await value.jsonValue()).toBe('2024-01-05');
});

test("Set react datetime", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard/practice-components");
  let reactDatePicker = await page.getByPlaceholder("Select Date");
  await reactDatePicker.click();
  await reactDatePicker.press('Control+a');
  await reactDatePicker.fill('10/05/2026');
  await page.keyboard.press("Enter");
});

test("iFrame test", async ({ page }) => {
  await page.goto("/dashboard/practice-components");
  const iFrame = await page.frameLocator('iframe');
  let headerValue = await iFrame.getByRole("heading", { name: "Welcome Back" }).textContent();
  console.log(headerValue);
  await expect(headerValue?.includes("Welcome Back"));
});