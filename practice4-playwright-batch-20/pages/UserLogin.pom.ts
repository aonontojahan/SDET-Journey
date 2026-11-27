import { Locator, Page } from "@playwright/test"

export interface LoginData{
    email: string,
    password: string
}

export class UserLogin{
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.emailInput = page.getByRole("textbox", { name: "you@example.com" });
        this.passwordInput = page.getByRole("textbox", { name: "Enter password" });
        this.loginButton = page.getByRole("button", { name: "Login" });
    }

    async visitPage(){
        await this.page.goto('/');
    }

    async login(loginData: LoginData){
        await this.emailInput.fill(loginData.email);
        await this.passwordInput.fill(loginData.password);
        await this.loginButton.click();
        await this.page.waitForURL(/dashboard/);
    }

    async saveStorageState(path: string){
        await this.page.context().storageState({ path });
    }
}