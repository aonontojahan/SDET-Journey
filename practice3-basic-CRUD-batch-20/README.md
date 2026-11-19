# Basic CRUD with Node.js, Sequelize & MySQL

A beginner-friendly project demonstrating **Create, Read, Update, Delete (CRUD)** operations using **Node.js (ES Modules)**, **Sequelize ORM**, and **MySQL**.

---

## 📦 Prerequisites

- **Node.js** v18+
- **MySQL Server** running locally (or remote)
- **npm** (comes with Node.js)

---

## 🚀 Project Setup (Step by Step)

### 1. Initialize the project

```bash
npm init -y
```

### 2. Install dependencies

```bash
npm i sequelize mysql2 dotenv
```

> **Note:** This project uses **ES Modules** (`"type": "module"` in package.json), so all imports use `import`/`export` syntax with `.js` extensions.

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=practice3-basic-CRUD-batch-20
```

Replace values with your MySQL credentials.

### 4. Project Structure

```
practice3-basic-CRUD-batch-20/
├── db.js              # Database connection & User model
├── userController.js  # CRUD logic (register, list, search, update, delete)
├── main.js            # Entry point - runs the operations
├── package.json
├── .env               # Your DB credentials (NOT committed)
└── README.md
```

---

## 🗄️ Database Schema

The `User` model (`db.js`) defines:

| Field | Type | Constraints |
|-------|------|-------------|
| `id` | INTEGER | Auto-increment, Primary Key |
| `firstName` | STRING | Not null |
| `lastName` | STRING | Nullable |
| `email` | STRING | Not null, Unique |
| `phoneNumber` | STRING | Not null, Unique |
| `password` | STRING | Not null |
| `createdAt` / `updatedAt` | DATETIME | Auto-managed by Sequelize |

Table name: `users`

---

## 🧠 How the Code Works

### `db.js` — Database Setup

```js
import { DataTypes, Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: true
});

export const user = sequelize.define("User", { ... }); // Model definition

export async function initDB() { ... }   // Connect & sync tables
export async function closeDB() { ... }  // Close connection
```

- Loads credentials from `.env`
- Creates Sequelize instance
- Defines `User` model with validation
- Exports `initDB()` and `closeDB()` for lifecycle management

### `userController.js` — CRUD Operations

| Function | Description |
|----------|-------------|
| `userRegistration(firstName, lastName, email, phoneNumber, password)` | **CREATE** — Checks if email exists, then creates new user |
| `userList()` | **READ ALL** — Returns all users as JSON |
| `userSearch(searchTerm)` | **SEARCH** — Uses `Op.or` + `Op.like` to search across firstName, lastName, email, phoneNumber |
| `userUpdate(id, updates)` | **UPDATE** — Updates user by ID with provided fields |
| `userDelete(id)` | **DELETE** — Deletes user by ID |

> **Key Sequelize concepts used:**
> - `findOne({ where: { email } })` — Check duplicate
> - `create({ ... })` — Insert new record
> - `findAll({ where: { [Op.or]: [...] } })` — Search with OR across multiple fields
> - `update(updates, { where: { id } })` — Update by primary key
> - `destroy({ where: { id } })` — Delete by primary key

### `main.js` — Entry Point

```js
import { initDB, closeDB } from "./db.js";
import { userRegistration, userList, userSearch, userUpdate, userDelete } from "./userController.js";

await initDB();

// Example operations (uncomment to run):
await userRegistration("User7", "Test", "user7@test.com", "01723740701", "1234");
// await userList();
// await userSearch("User1");
// await userUpdate("1", { firstName: "Rahim", lastName: "Mia" });
// await userDelete("1");

await closeDB();
```

- Initializes DB connection
- Runs CRUD operations (comment/uncomment as needed)
- Closes DB connection cleanly

---

## ▶️ How to Run

### 1. Start MySQL

Ensure MySQL server is running and the database exists (Sequelize will create it if `DB_NAME` is valid and user has permissions).

```bash
# If database doesn't exist, create it first:
mysql -u root -p -e "CREATE DATABASE practice3-basic-CRUD-batch-20;"
```

### 2. Run the application

```bash
node main.js
```

**Expected output:**
```
◇ injected env (5) from .env
Executing (default): SELECT 1+1 AS result
Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES...
DB connected and Table is synched
Executing (default): INSERT INTO `users` ...
User is created Successfully
Executing (default): SELECT `id`, `firstName`, ... FROM `users` ...
[ { "id": 1, "firstName": "Rahim", ... }, ... ]
1
```

### 3. Test individual operations

Uncomment lines in `main.js` to test specific functions:

```js
// Create a user
await userRegistration("John", "Doe", "john@example.com", "01712345678", "password123");

// List all users
await userList();

// Search users (partial match on name, email, phone)
await userSearch("John");

// Update user with ID 1
await userUpdate("1", { firstName: "Jane", lastName: "Smith" });

// Delete user with ID 1
await userDelete("1");
```

---

## 🔑 Key Concepts for Students

### ES Modules (Important!)
- `"type": "module"` in `package.json` enables `import`/`export`
- **Always include `.js` extension** in local imports:
  ```js
  import { user } from "./db.js";        // ✅ Correct
  import { user } from "./db";           // ❌ Wrong in ESM
  ```

### Sequelize Operators
```js
import { Op } from "sequelize";

where: {
    [Op.or]: [
        { firstName: { [Op.like]: `%${term}%` } },
        { email: { [Op.like]: `%${term}%` } }
    ]
}
```
- `Op.or` — Combine conditions with OR logic
- `Op.like` — SQL LIKE pattern matching (`%` = wildcard)
- `Op.eq`, `Op.ne`, `Op.gt`, `Op.lt`, `Op.in`, `Op.between` — Other common operators

### Error Handling
- **Unique constraint violation** → `SequelizeUniqueConstraintError` (duplicate email/phone)
- **Connection errors** → Check `.env` credentials & MySQL status
- Always use `try/catch` in production code

---

## 📝 Common Issues & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `ERR_MODULE_NOT_FOUND` | Missing `.js` in import | Add `.js` extension |
| `Identifier 'dotenv' already declared` | Duplicate import | Remove duplicate line |
| `ReferenceError: ture is not defined` | Typo in `unique: true` | Fix to `true` |
| `SequelizeUniqueConstraintError` | Duplicate email/phone | Use different data or delete existing |
| `ECONNREFUSED` | MySQL not running | Start MySQL service |

---

## 📄 License

Educational project for learning CRUD with Node.js + Sequelize + MySQL.

---

## 👨‍💻 Author

Built as a part of SDET learning journey. Happy coding!

## © Copyright

Copyright © 2026 [Aononto Jahan](https://aonontojahan.vercel.app). All Rights Reserved.