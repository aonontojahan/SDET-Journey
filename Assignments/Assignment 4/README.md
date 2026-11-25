# Blogging Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/run_on_Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Sequelize](https://img.shields.io/badge/ORM-Sequelize-0E3C54?style=flat-square)](https://sequelize.org/)

A console-based CRUD application for managing a blogging platform with user authentication, featuring role-based access control (admin/user), database operations via Sequelize ORM, and comprehensive admin dashboard functionality.

---

## 📖 Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Database Schema](#database-schema)
6. [Available Scripts](#available-scripts)
7. [Features](#features)
8. [Usage](#usage)
9. [Error Handling](#error-handling)
10. [Project Structure](#project-structure)
11. [Contributing](#contributing)
12. [License](#license)

---

## 📋 Project Overview

The **Blogging Platform** is a Node.js console application that provides a complete content management system for blog posts and user management. Built with **Sequelize ORM** and **MySQL**, it demonstrates practical CRUD operations, authentication flows, and admin-level user management.

### Key Capabilities

- **User Authentication**: Registration and login with role-based access
- **Blog CRUD**: Create, read, update, and delete blog posts
- **User Management**: Activate/deactivate users, view all users
- **Search Functionality**: Search blogs by ID or title
- **Status Tracking**: User activation status affects login capability

---

## ⚙️ Prerequisites

- **Node.js** (v14 or higher)
- **MySQL** database server (v5.7 or higher)
- **npm** (comes with Node.js)

---

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Assignments/Assignment\ 4
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_secure_password
DB_NAME=blogdb
```

> **⚠️ Security Note**: The `.env` file is listed in `.gitignore` and should never be committed to version control. The `.env.example` file provides a template with placeholder values.

### 4. Initialize the Database

Run the application to create database tables:

```bash
node main.js
```

On first run, this will:
- Authenticate the database connection
- Create the `users` and `blogs` tables
- Establish model associations

---

## 🗄️ Database Schema

### Users Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INT | PK, Auto Increment | Unique identifier |
| `firstName` | STRING | Not Null | User's first name |
| `lastName` | STRING | - | User's last name |
| `email` | STRING | Unique, Not Null | Login identifier |
| `password` | STRING | Not Null | Hashed password |
| `isActive` | BOOLEAN | Default: true | Account status |
| `role` | STRING | Default: "user" | User role (admin/user) |
| `createdAt` | DATE | - | Account creation timestamp |
| `updatedAt` | DATE | - | Last update timestamp |

### Blogs Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INT | PK, Auto Increment | Unique identifier |
| `userId` | INT | FK → users.id | Author reference |
| `blogTitle` | STRING | Not Null | Post title |
| `blog` | TEXT | - | Post content |
| `category` | STRING | - | Post category |
| `createdAt` | DATE | - | Creation timestamp |
| `updatedAt` | DATE | - | Last update timestamp |

### Relationships

- **One-to-Many**: One user can have many blogs
- **Foreign Key**: `blogs.userId` references `users.id`
- **Association Alias**: `user` (lowercase) on Blog model

---

## ✨ Features

### User Features

| Feature | Description |
|---------|-------------|
| **Registration** | Create account with name, email, and password |
| **Login** | Authenticate with credentials |
| **Dashboard** | View own blogs and create new posts |
| **Blog Management** | Create, update, delete own blogs |
| **Search** | Search blogs by ID or title |

### Admin Features

| Feature | Description |
|---------|-------------|
| **User Management** | View all users, update status (activate/deactivate) |
| **Blog Management** | View all blogs from all users |
| **User Deletion** | Remove users from the system |
| **Status Awareness** | Admins warned if user already in requested state |

### Technical Features

- Sequelize ORM for database operations
- Input validation and error handling
- Status-based access control (deactivated users cannot login)
- Association-based querying with proper user name display

---

## 🚀 Usage

### Running the Application

```bash
node main.js
```

### Main Menu

```
1. View All Blogs
2. Register
3. Login
```

### Admin Dashboard (after login as admin)

```
1. View All Users
2. View All Blogs
3. Search Blog
4. Update User Status
5. Delete User
6. Delete Blog
7. Admin Logout
```

### User Dashboard (after login as user)

```
1. View Your Blogs
2. Create Blog
3. Search Blog
4. Update Blog
5. Delete Blog
6. Logout
```

---

## 🔧 Error Handling

The application implements comprehensive error handling:

- **Invalid inputs** display appropriate error messages
- **Deactivated users** cannot login (clear message displayed)
- **User existence checks** before operations
- **Database operation feedback** (success/failure messages)
- **State-aware operations** (admin notified if user already activated/deactivated)

---

## 📁 Project Structure

```
Assignments/Assignment 4/
├── .env              # Environment variables (gitignored)
├ .env.example        # Template for environment variables
├── .gitignore        # Files excluded from git
├── main.js           # Main application entry point
├── package.json      # Project dependencies
├── package-lock.json # Lock file (gitignored)
├── Reports/          # Test reports
├── db.js             # Database configuration & models
├── userController.js # User authentication & CRUD
└── blogController.js # Blog CRUD & search operations
```

---

## 🤝 Contributing

### Guidelines

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Development Tips

- Follow the existing code style
- Test changes thoroughly before committing
- Update `.env.example` if adding new environment variables
- Ensure `.gitignore` includes all sensitive files

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---
*Generated with ❤️ using Node.js and Sequelize*


---

**Copyright © 2026 aonontojahan.vercel.app** — All rights reserved.