# Blogging Platform - CRUD Console Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/run_on_Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Sequelize](https://img.shields.io/badge/ORM-Sequelize-0E3C54?style=flat-square)](https://sequelize.org/)
[![MySQL](https://img.shields.io/badge/MySQL-00000f?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Database Schema](#database-schema)
6. [Usage](#usage)
7. [Features](#features)
8. [Admin Commands](#admin-commands)
9. [Error Handling](#error-handling)
10. [Project Structure](#project-structure)
11. [Contributing](#contributing)
12. [License](#license)
13. [Demo](#demo)

---

## 📝 Project Overview

The **Blogging Platform** is a Node.js console (CLI) application that provides a complete content management system for blog posts and user management. Built with **Node.js**, **Sequelize ORM**, and **MySQL**, it demonstrates practical CRUD operations, authentication flows, and admin-level user management with role-based access control.

### Key Capabilities

- **User Authentication**: Registration and login with role-based access (admin/user roles)
- **Blog CRUD**: Create, read, update, and delete blog posts
- **User Management**: View all users, update user status (activate/deactivate), delete users
- **Search Functionality**: Search blogs by ID or title
- **Status Tracking**: User activation status affects login capability (deactivated users cannot login)
- **One-to-Many Relationship**: One user can create multiple blogs; each blog belongs to one user

---

## ⚙️ Prerequisites

- **Node.js** (v14 or higher)
- **MySQL** database server (v5.7 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)

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
- Seed default data if applicable

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
3. Search Blog (by ID/Title)
4. Update User Status
5. Delete User
6. Delete Blog
7. Admin Logout
```

### User Dashboard (after login as user)

```
1. View Your Blogs
2. Create Blog
3. Search Blog (by ID/Title)
4. Update Blog
5. Delete Blog
6. Logout
```

---

## 🗄️ Database Schema

### Users Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INT | PK, Auto Increment | Unique identifier |
| `firstName` | STRING | Not Null | User's first name |
| `lastName` | STRING | - | User's last name |
| `email` | STRING | Unique, Not Null | Login identifier |
| `password` | STRING | Not Null | Login credential |
| `isActive` | BOOLEAN | Default: true | Account status (true = active, false = deactivated) |
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
| **Registration** | Create account with first name, last name, email, and password |
| **Login** | Authenticate with credentials |
| **Dashboard** | View own blogs and create new posts |
| **Blog Management** | Create, update, delete own blogs |
| **Search** | Search blogs by ID or title |

### Admin Features

| Feature | Description |
|---------|-------------|
| **User Management** | View all users, update status (activate/deactivate), delete users |
| **Blog Management** | View all blogs from all users |
| **User Deletion** | Remove users from the system |
| **Status Awareness** | Admins warned if user already in requested state |

### Technical Features

- Sequelize ORM for database operations
- Input validation and error handling
- Status-based access control (deactivated users cannot login)
- Association-based querying with proper user name display

---

## 📖 Usage Examples

### Running the Application

```bash
node main.js
```

### Main Menu Options

```
1. View All Blogs - View all blogs in the system (no login required)
2. Register - Create a new user account
3. Login - Authenticate to access user/admin dashboard
```

### Admin Dashboard Options

```
1. View All Users - See complete list of all users in the system
2. View All Blogs - See all blogs from all users
3. Search Blog (by ID/Title) - Find a blog by ID or title search
4. Update User Status - Activate or deactivate a user by ID
5. Delete User - Remove a user from the system
6. Delete Blog - Remove a blog by ID
7. Admin Logout - Return to main menu
```

### User Dashboard Options

```
1. View Your Blogs - View blogs created by the logged-in user
2. Create Blog - Create a new blog post
3. Search Blog (by ID/Title) - Find a blog by ID or title
4. Update Blog - Update a blog by ID (title, content, category)
5. Delete Blog - Remove a blog by ID
6. Logout - Return to main menu
```

### User Login/Logout Behavior

- **Login**: Use email and password credentials
- **Deactivated Users**: Cannot login - system displays "User is deactivated"
- **Session**: User stays logged in until explicitly logs out
- **Admin Role**: Automatically redirected to admin dashboard on login

---

## 🎥 Demo

**Video Demonstration**: https://drive.google.com/file/d/1ysyHVZfalCWFSUdvFian14Cy0DULQxNT/view?usp=sharing

> **Video Walkthrough**: This video demonstrates the complete project including:
> - User registration and login
> - Creating and managing blogs
> - Admin features: viewing all users, all blogs, updating user status
> - Search functionality
> - User deactivation and its effect on login

---

## 🔧 Error Handling

The application implements comprehensive error handling:

- **Invalid inputs** display appropriate error messages
- **Deactivated users** cannot login (clear message: "User is deactivated")
- **User existence checks** before operations (e.g., "User not found")
- **Database operation feedback** (success/failure messages)
- **State-aware operations** (admin notified if user already activated/deactivated)
- **Input validation** for all user inputs

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

**Copyright © 2026 aonontojahan.vercel.app** — All rights reserved.

---

## 📹 Demo Video Guide

If the video link doesn't open, here's what the demonstration covers:

1. **0:00-0:30** - Application startup and main menu
2. **0:30-1:00** - User registration process
3. **1:00-1:30** - User login and dashboard
4. **1:30-2:00** - Creating a new blog post
5. **2:00-2:30** - Viewing user's blogs
6. **2:30-3:00** - Admin login and admin dashboard
7. **3:00-3:30** - Viewing all users and all blogs
8. **3:30-4:00** - Searching blogs by ID/Title
9. **4:00-4:30** - Updating user status (activate/deactivate)
10. **4:30-5:00** - Deleting users and blogs
11. **5:00-5:30** - User deactivation login block demonstration
12. **5:30-6:00** - Summary of all features

---