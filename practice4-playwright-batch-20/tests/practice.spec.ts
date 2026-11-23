import { test, expect } from "@playwright/test";

test('User Login', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole("textbox",{name:"you@example.com"}).fill("admin@test.com");
  await page.getByRole("textbox",{name:"Enter password"}).fill("1234");
  await page.getByRole("button",{name:"Login"}).click();

  await page.waitForURL(/dashboard/);
  await page.context().storageState({path:'auth.json'})

});

test("Double Click", async ({page}) =>{
    await page.goto("http://localhost:3000/dashboard/practice-components");
    await page.getByRole("button",{name:"Double Click Me"}).dblclick();
    await page.pause();
})

test.only("Right Click", async ({page}) =>{
    await page.goto("http://localhost:3000/dashboard/practice-components");
    await page.getByRole("button",{name:"Right Click Me"}).click({button:'right'});
    await page.pause();
})