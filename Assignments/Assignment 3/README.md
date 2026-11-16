# Assignment 3 - Mocha + Chai Integration Testing for dMoney API

## Overview
End-to-end integration tests for the dMoney Mobile Financial Service REST API using Mocha + Chai + axios.

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

## Test Coverage (21 Test Cases)

| TC  | Scenario |
|-----|----------|
| TC01 | Admin login |
| TC02 | Create Customer 1 |
| TC03 | Activate Customer 1 |
| TC04 | Create Customer 2 |
| TC05 | Activate Customer 2 |
| TC06 | Create Agent |
| TC07 | Activate Agent |
| TC08 | Create Merchant |
| TC09 | Activate Merchant |
| TC10 | SYSTEM login |
| TC11 | SYSTEM deposit 5000 tk to agent |
| TC12 | Agent login (OTP required) |
| TC13 | Agent OTP verification |
| TC14 | Agent deposit 2000 tk to customer 1 (assert commission) |
| TC15 | Customer 1 login (OTP required) |
| TC16 | Customer 1 OTP verification |
| TC17 | Customer 1 sends 1000 tk to customer 2 (assert service fee) |
| TC18 | Customer 2 login (OTP required) |
| TC19 | Customer 2 OTP verification |
| TC20 | Customer 2 cashout 500 tk from agent (assert service fee) |
| TC21 | Customer 2 pays 400 tk to merchant (assert service fee) |

## Test Output

### Console Output Screenshot
! <img width="1261" height="6314" alt="image" src="https://github.com/user-attachments/assets/18ea8671-0081-4b0a-af0b-92b3879181cc" />


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
- Phone numbers are randomly generated (017 + 8 digits)
- Emails use format `aonontojahan+${random}@gmail.com`
- OTP verification uses dev OTP `0000` at `/user/verify-otp?env=dev`
- Admin token is fetched fresh on each run and stored in-memory
- `.env` and `node_modules/` are excluded from version control
