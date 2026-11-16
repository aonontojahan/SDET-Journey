# Assignment 3 - Mocha + Chai Integration Testing for dMoney API

## What is dMoney?

dMoney is a mobile financial service platform that provides digital banking and money transfer capabilities. It supports a multi-role ecosystem — **Admin**, **Customer**, **Agent**, **Merchant**, and **SYSTEM** — each with distinct permissions and transaction privileges. Core services include user registration and activation, role-based authentication with OTP verification, deposits, cashouts, send-money, and merchant payments, all secured via JWT bearer tokens and an `X-AUTH-SECRET-KEY` header.

## Overview

This project delivers end-to-end integration tests for the dMoney REST API using **Mocha** as the test runner, **Chai** as the assertion library, and **axios** for HTTP requests. The suite validates the complete business workflow — from admin authentication and user lifecycle management (create, activate) through role-specific logins, OTP verification, and a full transaction chain (deposit → send money → cashout → payment). It covers **21 positive-flow** and **11 negative-flow** test cases, ensuring both happy-path correctness and robust input validation.

## Prerequisites

- Node.js (v18+)
- npm
- dMoney API server running at `http://localhost:5000`

## Setup

```bash
npm install
```

## Run Tests

```bash
npm test
```

## Test Coverage (32 Test Cases)

### Positive Flow (21)

| TC  | Scenario |
|-----|----------|
| TC01 | Verify admin login with correct creds |
| TC02 | Verify admin can create customer 1 |
| TC03 | Verify admin can activate customer 1 |
| TC04 | Verify admin can create customer 2 |
| TC05 | Verify admin can activate customer 2 |
| TC06 | Verify admin can create an agent |
| TC07 | Verify admin can activate the agent |
| TC08 | Verify admin can create a merchant |
| TC09 | Verify admin can activate the merchant |
| TC10 | Verify system can login with correct creds |
| TC11 | Verify system can deposit 5000 tk to agent |
| TC12 | Verify agent can login with correct creds |
| TC13 | Verify agent can verify OTP and get token |
| TC14 | Verify agent can deposit 2000 tk to customer 1 (assert commission) |
| TC15 | Verify customer 1 can login with correct creds |
| TC16 | Verify customer 1 can verify OTP and get token |
| TC17 | Verify customer 1 can send 1000 tk to customer 2 (assert service fee) |
| TC18 | Verify customer 2 can login with correct creds |
| TC19 | Verify customer 2 can verify OTP and get token |
| TC20 | Verify customer 2 can cashout 500 tk from agent (assert service fee) |
| TC21 | Verify customer 2 can pay 400 tk to merchant (assert service fee) |

### Negative Flow (11)

| TC  | Scenario | Expected Status |
|-----|----------|-----------------|
| TC22 | Verify admin login is rejected with wrong password | 401 |
| TC23 | Verify customer creation is rejected with invalid phone | 400 |
| TC24 | Verify customer creation is rejected with invalid email | 400 |
| TC25 | Verify activation is rejected with invalid user ID | 400/404 |
| TC26 | Verify SYSTEM deposit is rejected with negative amount | 400 |
| TC27 | Verify send money to own account is rejected | 400 |
| TC28 | Verify cashout is rejected with invalid amount | 400 |
| TC29 | Verify payment is rejected with invalid amount | 400 |
| TC30 | Verify agent OTP verification is rejected with wrong code | 400 |
| TC31 | Verify agent deposit is rejected with negative amount | 400 |
| TC32 | Verify customer 2 OTP verification is rejected with wrong code | 400 |

## Console Output Image

<img width="1920" height="7638" alt="dMoney test output" src="https://github.com/user-attachments/assets/3222f6ba-c053-478d-8da2-fa0876782998" />

## Key Implementation Notes

- Negative-flow tests use `validateStatus: () => true` so error responses are captured for assertions instead of throwing.
- The `.env` admin token may expire, so tests requiring auth obtain a fresh token via admin login.
- Phone numbers are randomly generated (`017` + 8 digits).
- Emails use format `aonontojahan+${random}@gmail.com`.
- OTP verification uses dev OTP `0000` at `/user/verify-otp?env=dev`.
- Admin token is fetched fresh on each run and stored in-memory.

## Project Structure

```
Assignment 3/
├── tests/
│   └── dmoney.spec.js
├── utils/
│   └── randomness.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Notes

- `.env` and `node_modules/` are excluded from version control.

## Copyright

Copyright © 2026 Aononto Jahan. All Rights Reserved.

This project is created for educational and academic purposes as part of the SDET API Testing Assignment.

Unauthorized copying, modification, distribution, or reproduction of this project's content without prior permission from the author is prohibited.

Author: Aononto Jahan