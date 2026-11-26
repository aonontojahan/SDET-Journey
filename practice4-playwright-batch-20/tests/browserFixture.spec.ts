import { BrowserContext, Page, expect, test } from '@playwright/test';
    let context: BrowserContext;
    let page: Page;

test.describe('Automation Practice', () => {
    test.describe.configure({ mode: 'serial' })
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({storageState:'auth.json'});
        page = await context.newPage();
        await page.goto("/dashboard/practice-components");
    })

    test.afterAll(async () =>{
        await context.close();
    })

    test("NextJS Date Time Picker", async () => {
      let dateTimeInput = await page.locator('[type = "datetime-local"]');
      await dateTimeInput.fill("2027-01-01T14:04");
    });
    
    test("Readonly Date Field", async () => {
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
    
    test("Set react datetime", async () => {
      let reactDatePicker = await page.getByPlaceholder("Select Date");
      await reactDatePicker.click();
      await reactDatePicker.press('Control+a');
      await reactDatePicker.fill('10/05/2026');
      await page.keyboard.press("Enter");
    });

})