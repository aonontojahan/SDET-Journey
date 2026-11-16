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
let customer1Token = "";
let customer1Email = "";
let customer2Email = "";
let customer2Token = "";

describe("dMoney Integration Testing", () => {
  
  // TC01: Admin login with wrong password - negative flow
  it("Verify admin login is rejected with wrong password", async () => {
    let response = await axios.post(`${baseUrl}/user/login`, {
      email: "admin@dmoney.com",
      password: "wrongpassword",
    }, {
      validateStatus: () => true,
      headers: { "Content-Type": "application/json" },
    });

    let { data, status } = response;
    console.log("Wrong password login response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(401);
    expect(data.token).to.be.undefined;
  });

  // TC02: Create customer with invalid phone number - negative flow
  it("Verify customer creation is rejected with invalid phone", async () => {
    // Get a fresh admin token (the .env token may be expired)
    let loginRes = await axios.post(`${baseUrl}/user/login`, {
      email: "admin@dmoney.com",
      password: "1234",
    }, { headers: { "Content-Type": "application/json" } });
    let freshToken = loginRes.data.token;

    let response = await axios.post(`${baseUrl}/user/create`, {
      name: faker.person.fullName(),
      email: `aonontojahan+${generateRandomNumber(1000, 9999)}@gmail.com`,
      password: "1234",
      phone_number: "123",
      nid: `${generateRandomNumber(1000000000000, 9999999999999)}`,
      role: "Customer",
    }, {
      validateStatus: () => true,
      headers: {
        Authorization: `Bearer ${freshToken}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    });

    let { data, status } = response;
    console.log("Invalid phone create response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(400);
    expect(data.user).to.be.undefined;
  });

  // TC03: Create customer with invalid email - negative flow
  it("Verify customer creation is rejected with invalid email", async () => {
    // Get a fresh admin token (the .env token may be expired)
    let loginRes = await axios.post(`${baseUrl}/user/login`, {
      email: "admin@dmoney.com",
      password: "1234",
    }, { headers: { "Content-Type": "application/json" } });
    let freshToken = loginRes.data.token;

    let response = await axios.post(`${baseUrl}/user/create`, {
      name: faker.person.fullName(),
      email: "invalid-email",
      password: "1234",
      phone_number: `017${generateRandomNumber(10000000, 99999999)}`,
      nid: `${generateRandomNumber(1000000000000, 9999999999999)}`,
      role: "Customer",
    }, {
      validateStatus: () => true,
      headers: {
        Authorization: `Bearer ${freshToken}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    });

    let { data, status } = response;
    console.log("Invalid email create response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(400);
    expect(data.user).to.be.undefined;
  });

  // TC04: Activate user with invalid ID - negative flow
  it("Verify activation is rejected with invalid user ID", async () => {
    // Get a fresh admin token (the .env token may be expired)
    let loginRes = await axios.post(`${baseUrl}/user/login`, {
      email: "admin@dmoney.com",
      password: "1234",
    }, { headers: { "Content-Type": "application/json" } });
    let freshToken = loginRes.data.token;

    let response = await axios.patch(`${baseUrl}/user/update/999999999`, {
      status: "active",
    }, {
      validateStatus: () => true,
      headers: {
        Authorization: `Bearer ${freshToken}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    });

    let { data, status } = response;
    console.log("Invalid ID activate response:", data);
    console.log("Status code:", status);

    expect(status).to.oneOf([400, 404]);
  });

  // TC05: Admin login - positive flow
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

  // TC06: Create Customer 1 - positive flow
  it("Verify admin can create customer 1", async () => {
    customer1Phone = `017${generateRandomNumber(10000000, 99999999)}`;
    customer1Email = `aonontojahan+${generateRandomNumber(1000, 9999)}@gmail.com`;

    let response = await axios.post(`${baseUrl}/user/create`, {
      name: faker.person.fullName(),
      email: customer1Email,
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
    console.log("Stored customer1Email:", customer1Email);
  });

  // TC07: Activate Customer 1 - positive flow
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

  // TC08: Create Customer 2 - positive flow
  it("Verify admin can create customer 2", async () => {
    customer2Phone = `017${generateRandomNumber(10000000, 99999999)}`;
    customer2Email = `aonontojahan+${generateRandomNumber(1000, 9999)}@gmail.com`;

    let response = await axios.post(`${baseUrl}/user/create`, {
      name: faker.person.fullName(),
      email: customer2Email,
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
    console.log("Stored customer2Email:", customer2Email);
  });

  // TC09: Activate Customer 2 - positive flow
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

  // TC10: Create Agent - positive flow
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

  // TC12: Activate Agent - positive flow
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

  // TC13: Create Merchant - positive flow
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

  // TC14: Activate Merchant - positive flow
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

  // TC15: SYSTEM Login - positive flow
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

  // TC16: SYSTEM Deposit to Agent - positive flow
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

  // TC17: Agent Login - positive flow (OTP required)
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

  // TC18: Agent OTP Verification - positive flow
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

  // TC19: Agent Deposit to Customer 1 - positive flow
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

  // TC20: Customer 1 Login - positive flow (OTP required)
  it("Verify customer 1 can login with correct creds", async () => {
    let response = await axios.post(`${baseUrl}/user/login`, {
      email: customer1Email,
      password: "1234",
    }, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    }).catch(err => {
      console.error("Customer 1 login error response:", err.response?.data);
      console.error("Status:", err.response?.status);
      throw err;
    });

    let { data, status } = response;
    console.log("Customer 1 login response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(200);
    expect(data.otpRequired).to.equal(true);
  });

  // TC21: Customer 1 OTP Verification - positive flow
  it("Verify customer 1 can verify OTP and get token", async () => {
    let response = await axios.post(`${baseUrl}/user/verify-otp?env=dev`, {
      identifier: customer1Email,
      otp: "0000",
    }, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    }).catch(err => {
      console.error("Customer 1 OTP verify error response:", err.response?.data);
      console.error("Status:", err.response?.status);
      throw err;
    });

    let { data, status } = response;
    console.log("Customer 1 OTP verify response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(200);
    expect(data.token).to.not.be.undefined;
    expect(data.role).to.equal("Customer");

    // Store customer 1 token for sendmoney test
    customer1Token = data.token;
  });

  // TC22: Customer 1 sends 1000 tk to Customer 2 - positive flow
  it("Verify customer 1 can send 1000 tk to customer 2", async () => {
    let response = await axios.post(`${baseUrl}/transaction/sendmoney`, {
      from_account: customer1Phone,
      to_account: customer2Phone,
      amount: 1000,
    }, {
      headers: {
        Authorization: `Bearer ${customer1Token}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    }).catch(err => {
      console.error("Send money error response:", err.response?.data);
      console.error("Status:", err.response?.status);
      throw err;
    });

    let { data, status } = response;
    console.log("Send money response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(201);
    expect(data.trnxId).to.not.be.undefined;
    expect(data.fee).to.exist;
    expect(Number(data.fee)).to.be.at.least(0);
  });

  // TC23: Customer 2 Login - positive flow (OTP required)
  it("Verify customer 2 can login with correct creds", async () => {
    let response = await axios.post(`${baseUrl}/user/login`, {
      email: customer2Email,
      password: "1234",
    }, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    }).catch(err => {
      console.error("Customer 2 login error response:", err.response?.data);
      console.error("Status:", err.response?.status);
      throw err;
    });

    let { data, status } = response;
    console.log("Customer 2 login response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(200);
    expect(data.otpRequired).to.equal(true);
  });

  // TC24: Customer 2 OTP Verification - positive flow
  it("Verify customer 2 can verify OTP and get token", async () => {
    let response = await axios.post(`${baseUrl}/user/verify-otp?env=dev`, {
      identifier: customer2Email,
      otp: "0000",
    }, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    }).catch(err => {
      console.error("Customer 2 OTP verify error response:", err.response?.data);
      console.error("Status:", err.response?.status);
      throw err;
    });

    let { data, status } = response;
    console.log("Customer 2 OTP verify response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(200);
    expect(data.token).to.not.be.undefined;
    expect(data.role).to.equal("Customer");

    // Store customer 2 token for withdraw test
    customer2Token = data.token;
  });

  // TC25: Customer 2 Cashout 500 tk from Agent - positive flow
  it("Verify customer 2 can cashout 500 tk from agent", async () => {
    let response = await axios.post(`${baseUrl}/transaction/withdraw`, {
      from_account: customer2Phone,
      to_account: agentPhone,
      amount: 500,
    }, {
      headers: {
        Authorization: `Bearer ${customer2Token}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    }).catch(err => {
      console.error("Cashout error response:", err.response?.data);
      console.error("Status:", err.response?.status);
      throw err;
    });

    let { data, status } = response;
    console.log("Cashout response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(201);
    expect(data.trnxId).to.not.be.undefined;
    expect(data.fee).to.exist;
    expect(Number(data.fee)).to.be.at.least(0);
  });

  // TC26: Customer 2 Payment to Merchant - positive flow
  it("Verify customer 2 can pay 400 tk to merchant", async () => {
    let response = await axios.post(`${baseUrl}/transaction/payment`, {
      from_account: customer2Phone,
      to_account: merchantPhone,
      amount: 400,
    }, {
      headers: {
        Authorization: `Bearer ${customer2Token}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    }).catch(err => {
      console.error("Payment error response:", err.response?.data);
      console.error("Status:", err.response?.status);
      throw err;
    });

    let { data, status } = response;
    console.log("Payment response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(201);
    expect(data.trnxId).to.not.be.undefined;
    expect(data.fee).to.exist;
    expect(Number(data.fee)).to.be.at.least(0);
  });

  // TC27: SYSTEM deposit with negative amount - negative flow
  it("Verify SYSTEM deposit is rejected with negative amount", async () => {
    let response = await axios.post(`${baseUrl}/transaction/deposit`, {
      from_account: "SYSTEM",
      to_account: agentPhone,
      amount: -100,
    }, {
      validateStatus: () => true,
      headers: {
        Authorization: `Bearer ${systemToken}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    });

    let { data, status } = response;
    console.log("Negative deposit response:", data);
    console.log("Status code:", status);

    expect(status).to.oneOf([400, 422]);
    expect(data.trnxId).to.be.undefined;
  });

  // TC28: Self-transfer rejection - negative flow
  it("Verify send money to own account is rejected", async () => {
    let response = await axios.post(`${baseUrl}/transaction/sendmoney`, {
      from_account: customer1Phone,
      to_account: customer1Phone,
      amount: 100,
    }, {
      validateStatus: () => true,
      headers: {
        Authorization: `Bearer ${customer1Token}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    });

    let { data, status } = response;
    console.log("Self-transfer response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(400);
    expect(data.trnxId).to.be.undefined;
  });

  // TC29: Cashout with invalid amount - negative flow
  it("Verify cashout is rejected with invalid amount", async () => {
    let response = await axios.post(`${baseUrl}/transaction/withdraw`, {
      from_account: customer2Phone,
      to_account: agentPhone,
      amount: -500,
    }, {
      validateStatus: () => true,
      headers: {
        Authorization: `Bearer ${customer2Token}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    });

    let { data, status } = response;
    console.log("Invalid cashout response:", data);
    console.log("Status code:", status);

    expect(status).to.oneOf([400, 422]);
    expect(data.trnxId).to.be.undefined;
  });

  // TC30: Payment with invalid amount - negative flow
  it("Verify payment is rejected with invalid amount", async () => {
    let response = await axios.post(`${baseUrl}/transaction/payment`, {
      from_account: customer2Phone,
      to_account: merchantPhone,
      amount: -100,
    }, {
      validateStatus: () => true,
      headers: {
        Authorization: `Bearer ${customer2Token}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    });

    let { data, status } = response;
    console.log("Invalid payment response:", data);
    console.log("Status code:", status);

    expect(status).to.equal(400);
    expect(data.trnxId).to.be.undefined;
  });

  // TC31: Agent OTP verification with wrong code - negative flow
  it("Verify agent OTP verification is rejected with wrong code", async () => {
    let response = await axios.post(`${baseUrl}/user/verify-otp?env=dev`, {
      identifier: agentEmail,
      otp: "00000",
    }, {
      validateStatus: () => true,
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    });

    let { data, status } = response;
    console.log("Wrong OTP response:", data);
    console.log("Status code:", status);

    expect(status).to.not.equal(200);
    expect(data.token).to.be.undefined;
  });

  // TC32: Agent deposit with negative amount - negative flow
  it("Verify agent deposit is rejected with negative amount", async () => {
    let response = await axios.post(`${baseUrl}/transaction/deposit`, {
      from_account: agentPhone,
      to_account: customer1Phone,
      amount: -100,
    }, {
      validateStatus: () => true,
      headers: {
        Authorization: `Bearer ${agentToken}`,
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    });

    let { data, status } = response;
    console.log("Agent negative deposit response:", data);
    console.log("Status code:", status);

    expect(status).to.oneOf([400, 422]);
    expect(data.trnxId).to.be.undefined;
  });

  // TC33: Customer 2 OTP verification with wrong code - negative flow
  it("Verify customer 2 OTP verification is rejected with wrong code", async () => {
    let response = await axios.post(`${baseUrl}/user/verify-otp?env=dev`, {
      identifier: customer2Email,
      otp: "00000",
    }, {
      validateStatus: () => true,
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-SECRET-KEY": "ROADTOSDET",
      },
    });

    let { data, status } = response;
    console.log("Customer 2 wrong OTP response:", data);
    console.log("Status code:", status);

    expect(status).to.not.equal(200);
    expect(data.token).to.be.undefined;
  });
});