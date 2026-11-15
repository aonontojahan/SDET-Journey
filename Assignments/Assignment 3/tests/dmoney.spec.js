import { faker } from "@faker-js/faker";
import axios from "axios";
import { expect } from "chai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { generateRandomNumber } from "../utils/randomNumber.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

let access_token = process.env.access_token;
let baseUrl = process.env.baseUrl;

describe("dMoney Integration Testing", () => {
  
  // TC01: Admin login - positive flow
  it("Verify admin can login with correct creds", async () => {
    let response = await axios.post(`${baseUrl}/user/login`, {
      email: "admin@dmoney.com",
      password: "1234",
    }, {
      headers: { "Content-Type": "application/json" },
    });

    let { data, status } = response;
    console.log("Admin login response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(200);
    expect(data.token).to.not.be.undefined;

  });
});