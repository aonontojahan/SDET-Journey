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
    await page.waitForTimeout(1000);
    let cbBloodGroup = await page.getByRole('combobox').first();
    await cbBloodGroup.press("ArrowDown");
    await page.getByPlaceholder("Create a password").fill('1234');

    //await page.getByPlaceholder("MM/dd/yyyy").fill("06/14/2001");
    let birthDate = await page.getByPlaceholder("MM/dd/yyyy");
    await birthDate.click();
    await birthDate.press('Control+a');
    await birthDate.fill('06/14/2001');
    await page.keyboard.press("Enter");
    await page.getByRole('combobox').nth(1).selectOption("Dhaka");
    await page.locator('#genderMale').check();
    await page.locator("[type = checkbox]").check();
    await page.locator("#photoInput").setInputFiles("resources/aonontojahan'soptimize.png");


    await page.pause();
})