import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { UserData, UserPage } from "../pages/UserPage.pom";
import { LoginData, UserLogin } from "../pages/UserLogin.pom";

test.describe.configure({ mode: 'serial' });

test('User Login', async ({ page }) => {
    const userLogin = new UserLogin(page);

    const loginData: LoginData = {
        email: "admin@test.com",
        password: "1234"
    };

    await userLogin.visitPage();
    await userLogin.login(loginData);
    await userLogin.saveStorageState('auth.json');
})

test("Create User", async ({ page }) => {
    const userPage = new UserPage(page);
    const userModel: UserData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: '01' + faker.string.numeric(9),
        password: '1234',
        birthDate: '06/14/2001',
        city: "Dhaka",
        profileImage: "resources/aonontojahan'soptimize.png"
    };

    await userPage.visitPage();
    await userPage.createUSer(userModel);
})