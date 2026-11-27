import { Locator, Page } from "@playwright/test"

export interface UserData{
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    birthDate: string,
    city: string,
    profileImage: string
}

export class UserPage{
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly bloodGroupDropdown: Locator;
    readonly passwordInput: Locator;
    readonly birthDateInput: Locator;
    readonly cityDropdown: Locator;
    readonly maleGenderCheckbox: Locator;
    readonly termsCheckbox: Locator;
    readonly photoInput: Locator;
    readonly createUserButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.firstNameInput = page.getByPlaceholder("John", { exact: true });
        this.lastNameInput = page.getByPlaceholder("Doe");
        this.emailInput = page.getByPlaceholder("john@example.com");
        this.phoneInput = page.getByPlaceholder("01500000000");
        this.bloodGroupDropdown = page.getByRole('combobox').first();
        this.passwordInput = page.getByPlaceholder("Create a password");
        this.birthDateInput = page.getByPlaceholder("MM/dd/yyyy");
        this.cityDropdown = page.getByRole('combobox').nth(1);
        this.maleGenderCheckbox = page.locator('#genderMale');
        this.termsCheckbox = page.locator("[type = checkbox]");
        this.photoInput = page.locator("#photoInput");
        this.createUserButton = page.getByRole("button", { name: "Create USer" });
    }

    async visitPage(){
        await this.page.goto("/dashboard/add-user")
    }
    async createUSer(userModel:UserData){
        await this.firstNameInput.fill(userModel.firstName);
        await this.lastNameInput.fill(userModel.lastName);
        await this.emailInput.fill(userModel.email);
        await this.phoneInput.fill(userModel.phoneNumber);
        await this.bloodGroupDropdown.press("ArrowDown");
        await this.passwordInput.fill(userModel.password);
        await this.birthDateInput.click();
        await this.birthDateInput.press('Control+a');
        await this.birthDateInput.fill(userModel.birthDate);
        await this.page.keyboard.press("Enter");
        await this.cityDropdown.selectOption(userModel.city);
        await this.maleGenderCheckbox.check();
        await this.termsCheckbox.check();
        await this.photoInput.setInputFiles(userModel.profileImage);
        await this.createUserButton.click();
    }
}