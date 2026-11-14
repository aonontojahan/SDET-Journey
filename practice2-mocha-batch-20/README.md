# Practice 2 - Mocha Batch 20

A Mocha + Chai testing project covering unit tests and API integration tests.

## Project Structure

```
practice2-mocha-batch-20/
├── utils/
│   ├── calc.js              # Math utility functions (sum, sub)
│   └── randomNumber.js      # Random number generator utility
├── tests/
│   ├── calc.test.js         # Unit tests for calc.js
│   └── dmoney_api.test.js   # Integration tests for dMoney API
├── .env                     # Environment variables
├── .mocharc.json            # Mocha configuration
├── package.json             # Project dependencies and scripts
└── README.md                # This file
```

## Prerequisites

- Node.js (v18+)
- npm

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```env
   baseUrl=http://localhost:5000
   access_token=your_jwt_token_here
   ```

## Running Tests

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npx mocha tests/calc.test.js
npx mocha tests/dmoney_api.test.js
```

## Test Files

### 1. calc.test.js (Unit Tests)
Tests the math utility functions:
- Verify sum of two numbers
- Verify subtraction of two numbers

### 2. dmoney_api.test.js (Integration Tests)
Tests the dMoney API endpoints:
- Verify admin can login with correct credentials
- Create new customer
- Verify admin can search user by ID

## Key Concepts Covered

- **Mocha**: Test runner for JavaScript
- **Chai**: Assertion library for test assertions
- **ESM Modules**: Using `import`/`export` syntax (`"type": "module"`)
- **dotenv**: Loading environment variables from `.env`
- **axios**: Making HTTP requests for API testing
- **faker**: Generating fake test data
- **Custom utilities**: Reusable helper functions (`randomNumber.js`)

## Test Output Example

```
  dMoney integrtion testing
    ✔ Verify admin can login with correct creds (54ms)
    ✔ Create new customer (119ms)
    ✔ Verify that admin can search with userId (63ms)

  Calculation Test
    ✔ Verify the sum of two numbers
    ✔ Verify the sub of two numbers

  5 passing (242ms)
```

## Notes

- The dMoney API tests require the backend server running at `http://localhost:5000`
- The login test automatically fetches a fresh JWT token for subsequent tests
- Environment variables are loaded from `.env` using dotenv with explicit path resolution