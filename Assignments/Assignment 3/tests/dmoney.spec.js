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

// Store created user details for use in subsequent tests
let customer1Id = "";
let customer1Phone = "";
let customer2Id = "";
let customer2Phone = "";

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

    // Update in-memory token for subsequent tests in this run
    access_token = data.token;
  });

  // TC02: Create Customer 1 - positive flow
  it("Verify admin can create customer 1", async () => {
    customer1Phone = `017${generateRandomNumber(10000000, 99999999)}`;

    let response = await axios.post(`${baseUrl}/user/create`, {
      name: faker.person.fullName(),
      email: `aonontojahan+${generateRandomNumber(1000, 9999)}@gmail.com`,
      password: "1234",
      phone_number: customer1Phone,
      nid: `${generateRandomNumber(1000000000000, 9999999999999)}`,
      role: "Customer",
    }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    }).catch(err => {
      console.error("Create customer 1 error response:", err.response?.data);
      console.error("Status:", err.response?.status);
      throw err;
    });

    let { data, status } = response;
    console.log("Create customer 1 response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(201);
    customer1Id = data.user?.id;
    console.log("Stored customer1Id:", customer1Id);
    console.log("Stored customer1Phone:", customer1Phone);
  });

  // TC03: Activate Customer 1 - positive flow
  it("Verify admin can activate customer 1", async () => {
    let response = await axios.patch(`${baseUrl}/user/update/${customer1Id}`, {
      status: "active",
    }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    });

    let { data, status } = response;
    console.log("Activate customer 1 response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(200);
  });

  // TC04: Create Customer 2 - positive flow
  it("Verify admin can create customer 2", async () => {
    customer2Phone = `017${generateRandomNumber(10000000, 99999999)}`;

    let response = await axios.post(`${baseUrl}/user/create`, {
      name: faker.person.fullName(),
      email: `aonontojahan+${generateRandomNumber(1000, 9999)}@gmail.com`,
      password: "1234",
      phone_number: customer2Phone,
      nid: `${generateRandomNumber(1000000000000, 9999999999999)}`,
      role: "Customer",
    }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    }).catch(err => {
      console.error("Create customer 2 error response:", err.response?.data);
      console.error("Status:", err.response?.status);
      throw err;
    });

    let { data, status } = response;
    console.log("Create customer 2 response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(201);
    customer2Id = data.user?.id;
    console.log("Stored customer2Id:", customer2Id);
    console.log("Stored customer2Phone:", customer2Phone);
  });

  // TC05: Activate Customer 2 - positive flow
  it("Verify admin can activate customer 2", async () => {
    let response = await axios.patch(`${baseUrl}/user/update/${customer2Id}`, {
      status: "active",
    }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    });

    let { data, status } = response;
    console.log("Activate customer 2 response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(200);
  });
});