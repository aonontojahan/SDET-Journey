import { test, expect } from "@playwright/test";

test.skip("User Login", async ({ page }) => {
  await page.goto('/');
  await page.getByRole("textbox", { name: "you@example.com" }).fill("admin@test.com");
  await page.getByRole("textbox", { name: "Enter password" }).fill("1234");

  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForURL(/dashboard/);
  await page.context().storageState({path: 'auth.json'});
});

test ("User Regestration", async( {page} )=>{
    await page.goto("/dashboard/add-user");
    await page.getByPlaceholder("John", {exact:true}).fill("Test");
    await page.getByPlaceholder("Doe").fill("User");

    await page.getByPlaceholder("john@example.com").fill("testuser@test.com");
    await page.getByPlaceholder("01500000000").fill("01723740704");
    await page.pause();
})