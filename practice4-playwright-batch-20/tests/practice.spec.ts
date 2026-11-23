import { test, expect } from "@playwright/test";

test.only('User Login', async ({ page }) => {
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

test("Right Click", async ({page}) =>{
    await page.goto("http://localhost:3000/dashboard/practice-components");
    await page.getByRole("button",{name:"Right Click Me"}).click({button:'right'});
    await page.pause();
})

test.only("Open New Tab", async ({page,context}) =>{
    await page.goto("http://localhost:3000/dashboard/practice-components");
    const newPagePromise = context.waitForEvent('page');
    await page.getByRole("button",{name:"Open New Tab"}).click();
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain("example.com");
    await page.pause();
})