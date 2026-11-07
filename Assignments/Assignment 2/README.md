# Assignment 2 - DMoney Complete API Automation

## What is dMoney?

**dMoney** is a FinTech Mobile Financial Service (MFS) REST API platform (similar to bKash, Nagad, and Rocket). It provides digital wallet management, balance top-ups, peer-to-peer transfers, agent-assisted cash withdrawals, and merchant payment gateways.

The platform relies on a strict Role-Based Access Control (RBAC) architecture involving five distinct actor roles:
- **Admin**: Oversees the platform, provisions new accounts (Customer, Agent, Merchant), and handles account activation/suspension.
- **SYSTEM**: Internal core authority responsible for liquidity provisioning and funding agent float accounts.
- **Agent**: Financial intermediary that receives liquidity from the SYSTEM, performs customer deposits, and facilitates cash-out (withdrawals).
- **Customer**: End-user holding a mobile wallet who can receive deposits, transfer funds to other customers (P2P Send Money), withdraw cash via agents, and make merchant payments.
- **Merchant**: Commercial business entity that receives direct payments from customers for purchases and services.

This project implements an end-to-end automated test suite covering user lifecycle management, two-factor authentication (2FA OTP), multi-party financial transactions, balance audits, transaction fees, and robust negative scenario validations.

---

## Technology Used

- **Postman**: API request orchestration, pre-request dynamic data scripts, environment/collection variable chaining, and Chai BDD test assertions.
- **Newman**: Headless command-line collection runner for Postman, enabling automated test execution in local terminal and CI/CD pipelines.
- **newman-reporter-htmlextra**: Detailed, dashboard-style HTML test execution reporter featuring metrics, assertion results, request/response headers, and payloads.
- **Node.js & npm**: Runtime environment and package manager used to install runner libraries and execute automated test suites.
- **JavaScript (ES6+)**: Scripting language used for Postman pre-request data generation, response validations, and the `report.js` execution runner.
- **Git & GitHub**: Version control system utilizing `.gitignore` and `.gitkeep` to safeguard sensitive tokens and execution credentials.

---

## What the Collection Tests

The collection automates a full end-to-end financial lifecycle across 30 comprehensive test cases (both positive and negative flows):

1. **Authentication & Identity Verification**:
   - Admin credential validation with error handling on invalid passwords (401 Unauthorized).
   - SYSTEM account authentication for platform operations.
   - Multi-Factor Authentication (MFA) via 2FA OTP verification for Agent and Customer logins.
   - Negative testing for OTP verification with invalid/incorrect codes (`00000`).
   - Dynamic JWT token extraction and automated header injection across dependent calls.

2. **User Provisioning & Lifecycle Management**:
   - Administrative creation of Customer 1, Customer 2, Agent, and Merchant accounts.
   - Negative validation rejecting malformed or invalid phone numbers (400 Bad Request).
   - Account activation via PATCH requests to grant active transaction privileges.
   - Negative testing rejecting activation attempts with invalid or non-existent user IDs.

3. **Multi-tier Financial Transaction Workflows**:
   - **System Deposit to Agent**: SYSTEM loads ৳5,000 float balance into the Agent account.
   - **Agent Deposit to Customer 1**: Agent deposits ৳2,000 into Customer 1's wallet.
   - **Customer-to-Customer P2P Transfer**: Customer 1 sends ৳1,000 to Customer 2.
   - **Customer Cash-Out / Withdrawal**: Customer 2 withdraws ৳500 through the Agent.
   - **Customer Payment to Merchant**: Customer 1 makes a ৳400 payment to the Merchant.

4. **Negative Scenarios, Boundary Checks & Business Logic Enforcement**:
   - Rejection of negative deposit amounts from SYSTEM to Agent.
   - Rejection of negative deposit amounts from Agent to Customer.
   - Self-transfer prevention (rejecting Customer 1 sending money to own account).
   - Rejection of invalid/negative cash-out amounts.
   - Rejection of invalid/negative merchant payment amounts.
   - Verification that failed transactions do not generate transaction IDs (`trnxId`) and return appropriate error codes (400, 401, 404, 422).

---

## What the Collection API Tests

The automated collection comprises **30 test cases** with **100 assertions** validating status codes, response headers, schema payloads, error messages, fee calculations, and transaction IDs:

| TC # | Test Case Name | Method | Endpoint | Type | Key Assertions / Verifications |
|:---:|:---|:---:|:---|:---:|:---|
| **TC01** | Admin Login Wrong Password | `POST` | `/user/login` | Negative | Status `401`, error message returned, token is undefined |
| **TC02** | Admin Login | `POST` | `/user/login` | Positive | Status `200`, role is "Admin", stores `adminToken` |
| **TC03** | Create Customer with Invalid Phone | `POST` | `/user/create` | Negative | Status `400`, user is not created |
| **TC04** | Create Customer 1 | `POST` | `/user/create` | Positive | Status `201`, message "User created", stores `customer1Id` |
| **TC05** | Activate User with Invalid ID | `PATCH` | `/user/updat/94754785` | Negative | Status `400` or `404`, user is not activated |
| **TC06** | Activate Customer 1 | `PATCH` | `/user/update/{{customer1Id}}` | Positive | Status `200`, message "User updated successfully", status "active" |
| **TC07** | Create Customer 2 | `POST` | `/user/create` | Positive | Status `201`, message "User created", stores `customer2Id` |
| **TC08** | Activate Customer 2 | `PATCH` | `/user/update/{{customer2Id}}` | Positive | Status `200`, status is "active" |
| **TC09** | Create Agent | `POST` | `/user/create` | Positive | Status `201`, role is "Agent", stores `agentId` |
| **TC10** | Activate Agent | `PATCH` | `/user/update/{{agentId}}` | Positive | Status `200`, status is "active" |
| **TC11** | Create Merchant | `POST` | `/user/create` | Positive | Status `201`, role is "Merchant", stores `merchantId` |
| **TC12** | Activate Merchant | `PATCH` | `/user/update/{{merchantId}}` | Positive | Status `200`, status is "active" |
| **TC13** | SYSTEM Login | `POST` | `/user/login` | Positive | Status `200`, stores `systemToken` |
| **TC14** | SYSTEM Deposit to Agent | `POST` | `/transaction/deposit` | Positive | Status `201`, deposits ৳5,000, generates `trnxId` |
| **TC15** | SYSTEM Deposit with Invalid Amount | `POST` | `/transaction/deposit` | Negative | Status `400`, rejected negative amount (-100), no `trnxId` |
| **TC16** | Agent Login | `POST` | `/user/login` | Positive | Status `200`, verifies `otpRequired: true` |
| **TC17** | Verify Agent OTP | `POST` | `/user/verify-otp?env=dev` | Positive | Status `200`, role is "Agent", stores `agentToken` |
| **TC18** | Agent Deposit to Customer 1 | `POST` | `/transaction/deposit` | Positive | Status `201`, deposits ৳2,000, generates `trnxId` |
| **TC19** | Customer 1 Login | `POST` | `/user/login` | Positive | Status `200`, verifies `otpRequired: true` |
| **TC20** | Customer 1 OTP Verification | `POST` | `/user/verify-otp?env=dev` | Positive | Status `200`, stores `customer1Token` |
| **TC21** | Customer 1 sends ৳1,000 to Customer 2 | `POST` | `/transaction/sendmoney` | Positive | Status `201`, "Send money successful", verifies fee, balance, and `trnxId` |
| **TC22** | Customer sends money to own account | `POST` | `/transaction/sendmoney` | Negative | Status `400`, self-transfer rejected, no `trnxId` |
| **TC23** | Agent deposits invalid amount to Customer 1 | `POST` | `/transaction/sendmoney` | Negative | Status `400`, invalid amount (-100) rejected |
| **TC24** | Customer 2 Login | `POST` | `/user/login` | Positive | Status `200`, verifies `otpRequired: true` |
| **TC25** | Customer 2 OTP with Invalid OTP | `POST` | `/user/verify-otp?env=dev` | Negative | Rejects OTP "00000", non-200, error message returned |
| **TC26** | Customer 2 OTP Verification | `POST` | `/user/verify-otp?env=dev` | Positive | Status `200`, role "Customer", stores `customer2Token` |
| **TC27** | Customer 2 Cashout ৳500 from Agent | `POST` | `/transaction/withdraw` | Positive | Status `201`, "Withdraw successful", verifies fee, balance, and `trnxId` |
| **TC28** | Customer Cashout with invalid amount | `POST` | `/transaction/withdraw` | Negative | Status `400` or `422`, rejected invalid withdrawal, no `trnxId` |
| **TC29** | Customer 1 Payment to Merchant | `POST` | `/transaction/payment` | Positive | Status `201`, "Payment successful", pays ৳400, verifies fee and `trnxId` |
| **TC30** | Customer Payment with Invalid Amount | `POST` | `/transaction/payment` | Negative | Status `400`, rejected negative payment (-100), no `trnxId` |

---

## How to Run

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.0.0 or higher)
- npm (Node Package Manager)

### Step-by-Step Execution

1. **Navigate to the Assignment 2 directory**:
   ```bash
   cd "Assignments/Assignment 2"
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Run Newman automated test suite and generate HTML report**:
   ```bash
   node report.js
   ```
   *(Alternatively, run `npm test` or `npm run report`)*

4. **View the test report**:
   Open the generated HTML report in any web browser:
   ```bash
   Reports/report.html
   ```

> **Data Privacy & Security Note**:
> Generated test reports contain sensitive operational information, including dynamically generated phone numbers, emails, passwords, and bearer tokens. Therefore, `Reports/*.html` and `node_modules/` are explicitly excluded from version control via `.gitignore`. The `Reports/` directory is tracked using an empty `Reports/.gitkeep` file.

---

## Project Structure

```
Assignments/Assignment 2/
├── collection/
│   └── DMoney - Complete API Automation.postman_collection.json  # 30-request Postman test suite
├── Reports/
│   ├── .gitkeep                                                  # Preserves Reports folder in Git
│   └── report.html                                               # Generated Newman HTML test report (git-ignored)
├── .gitignore                                                    # Ignores node_modules, reports, and secrets
├── package.json                                                  # Dependencies and npm execution scripts
├── package-lock.json                                             # Dependency lockfile
├── report.js                                                     # Newman execution script with htmlextra reporter
└── README.md                                                     # Project documentation
```

---

## Documentation

### Official Postman API Documentation:
https://documenter.getpostman.com/view/43453967/2sBYHYuHrB

---

## Attachments

### Summary Report

<img width="1920" height="1733" alt="image" src="https://github.com/user-attachments/assets/d07e1edc-79f7-4964-9d6f-d34d2b39a0ae" />

