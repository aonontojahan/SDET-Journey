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
let agentId = "";
let agentPhone = "";
let agentEmail = "";
let merchantId = "";
let merchantPhone = "";
let systemToken = "";
let agentToken = "";

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

  // TC06: Create Agent - positive flow
  it("Verify admin can create an agent", async () => {
    agentPhone = `017${generateRandomNumber(10000000, 99999999)}`;
    agentEmail = `aonontojahan+${generateRandomNumber(1000, 9999)}@gmail.com`;

    let response = await axios.post(`${baseUrl}/user/create`, {
      name: faker.person.fullName(),
      email: agentEmail,
      password: "1234",
      phone_number: agentPhone,
      nid: `${generateRandomNumber(1000000000000, 9999999999999)}`,
      role: "Agent",
    }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    }).catch(err => {
      console.error("Create agent error response:", err.response?.data);
      console.error("Status:", err.response?.status);
      throw err;
    });

    let { data, status } = response;
    console.log("Create agent response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(201);
    agentId = data.user?.id;
    console.log("Stored agentId:", agentId);
    console.log("Stored agentPhone:", agentPhone);
    console.log("Stored agentEmail:", agentEmail);
  });

  // TC07: Activate Agent - positive flow
  it("Verify admin can activate the agent", async () => {
    let response = await axios.patch(`${baseUrl}/user/update/${agentId}`, {
      status: "active",
    }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    });

    let { data, status } = response;
    console.log("Activate agent response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(200);
  });

  // TC08: Create Merchant - positive flow
  it("Verify admin can create a merchant", async () => {
    merchantPhone = `017${generateRandomNumber(10000000, 99999999)}`;

    let response = await axios.post(`${baseUrl}/user/create`, {
      name: faker.person.fullName(),
      email: `aonontojahan+${generateRandomNumber(1000, 9999)}@gmail.com`,
      password: "1234",
      phone_number: merchantPhone,
      nid: `${generateRandomNumber(1000000000000, 9999999999999)}`,
      role: "Merchant",
    }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    }).catch(err => {
      console.error("Create merchant error response:", err.response?.data);
      console.error("Status:", err.response?.status);
      throw err;
    });

    let { data, status } = response;
    console.log("Create merchant response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(201);
    merchantId = data.user?.id;
    console.log("Stored merchantId:", merchantId);
    console.log("Stored merchantPhone:", merchantPhone);
  });

  // TC09: Activate Merchant - positive flow
  it("Verify admin can activate the merchant", async () => {
    let response = await axios.patch(`${baseUrl}/user/update/${merchantId}`, {
      status: "active",
    }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    });

    let { data, status } = response;
    console.log("Activate merchant response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(200);
  });

  // TC10: SYSTEM Login - positive flow
  it("Verify system can login with correct creds", async () => {
    let response = await axios.post(`${baseUrl}/user/login`, {
      email: "system@dmoney.com",
      password: "1234",
    }, {
      headers: { "Content-Type": "application/json" },
    }).catch(err => {
      console.error("System login error response:", err.response?.data);
      console.error("Status:", err.response?.status);
      throw err;
    });

    let { data, status } = response;
    console.log("System login response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(200);
    expect(data.token).to.not.be.undefined;

    // Store system token for deposit test
    systemToken = data.token;
  });

  // TC11: SYSTEM Deposit to Agent - positive flow
  it("Verify system can deposit 5000 tk to agent", async () => {
    let response = await axios.post(`${baseUrl}/transaction/deposit`, {
      from_account: "SYSTEM",
      to_account: agentPhone,
      amount: 5000,
    }, {
      headers: {
        Authorization: `Bearer ${systemToken}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    }).catch(err => {
      console.error("Deposit error response:", err.response?.data);
      console.error("Status:", err.response?.status);
      throw err;
    });

    let { data, status } = response;
    console.log("Deposit response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(201);
    expect(data.trnxId).to.not.be.undefined;
  });

  // TC12: Agent Login - positive flow (OTP required)
  it("Verify agent can login with correct creds", async () => {
    let response = await axios.post(`${baseUrl}/user/login`, {
      email: agentEmail,
      password: "1234",
    }, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    }).catch(err => {
      console.error("Agent login error response:", err.response?.data);
      console.error("Status:", err.response?.status);
      throw err;
    });

    let { data, status } = response;
    console.log("Agent login response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(200);
    expect(data.otpRequired).to.equal(true);
  });

  // TC13: Agent OTP Verification - positive flow
  it("Verify agent can verify OTP and get token", async () => {
    let response = await axios.post(`${baseUrl}/user/verify-otp?env=dev`, {
      identifier: agentEmail,
      otp: "0000",
    }, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    }).catch(err => {
      console.error("OTP verify error response:", err.response?.data);
      console.error("Status:", err.response?.status);
      throw err;
    });

    let { data, status } = response;
    console.log("OTP verify response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(200);
    expect(data.token).to.not.be.undefined;
    expect(data.role).to.equal("Agent");

    // Store agent token for deposit test
    agentToken = data.token;
  });

  // TC14: Agent Deposit to Customer 1 - positive flow
  it("Verify agent can deposit 2000 tk to customer 1", async () => {
    let response = await axios.post(`${baseUrl}/transaction/deposit`, {
      from_account: agentPhone,
      to_account: customer1Phone,
      amount: 2000,
    }, {
      headers: {
        Authorization: `Bearer ${agentToken}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    }).catch(err => {
      console.error("Agent deposit error response:", err.response?.data);
      console.error("Status:", err.response?.status);
      throw err;
    });

    let { data, status } = response;
    console.log("Agent deposit response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(201);
    expect(data.trnxId).to.not.be.undefined;
    expect(Number(data.commission)).to.equal(50);
  });
});