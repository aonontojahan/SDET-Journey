# dmoney-newman-b20

## What is dMoney?

dMoney is a mobile financial service (MFS) application. Users can send money, cash out, and pay bills. Admins manage users, such as create, search, suspend, activate, and delete. This project tests the dMoney REST API with an automated Postman collection.

## Technology Used

- **Postman collection** - contains the API requests and test scripts (`collection/dmoney-collection-b20.json`).
- **Newman** - the command-line runner for Postman collections.
- **newman-reporter-htmlextra** - creates a detailed HTML test report.
- **Node.js and npm** - run the project script and install the packages.
- **Git** - version control.

## What the Collection Tests

1. Admin Login (wrong credentials and valid credentials)
2. User List
3. Create User (existing user and new user)
4. Search User (wrong ID and valid ID)
5. User Activation (suspend and activate)
6. Delete User

## How to Run

### Prerequisites

- Node.js (version 16 or later) and npm must be installed.

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd dmoney-newman-b20
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Run the collection and create the report:
   ```bash
   node report.js
   ```
4. Open the report in a browser:
   ```
   Reports/report.html
   ```

> **Note:** `Reports/report.html` is in `.gitignore`. Git does not track the report.

## Project Structure

```
dmoney-newman-b20/
├── collection/
│   └── dmoney-collection-b20.json   # Postman collection
├── Reports/                         # HTML report output
├── report.js                        # Newman run script
└── package.json
```
## Documentation
https://documenter.getpostman.com/view/1844288/2sBYHVvz2r

## Attachment
<img width="957" height="896" alt="image" src="https://github.com/user-attachments/assets/719986a4-a5b9-44b2-a37b-6805506a6f64" />
<img width="957" height="613" alt="image" src="https://github.com/user-attachments/assets/0c40d03f-6084-4666-898b-91c8fca10a64" />
