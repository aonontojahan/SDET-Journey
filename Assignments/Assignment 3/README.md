# Assignment 3 - Mocha + Chai Integration Testing for dMoney API

## Step 1: Admin Login

### Setup
```bash
npm install
```

### Run Test
```bash
npm test
```

### What This Does
- Logs in as admin (`admin@dmoney.com` / `1234`)
- Stores the JWT token in `.env` automatically
- Verifies token is returned in response

### Expected Output
```
dMoney Integration Testing
  ✔ Verify admin can login with correct creds (XXms)

1 passing (XXms)
```