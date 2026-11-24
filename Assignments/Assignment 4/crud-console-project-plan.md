# CRUD Console Project Plan

## Context
Creating a CRUD console application for batch 20 SDET assignment. The project requires a Node.js application with MySQL database, featuring user authentication, blog management, and admin capabilities.

## Requirements Summary

### Database
- Database name: `blogdb`
- Two tables:
  - `users`: id, firstname, lastname, email, password, isActive (default: true), role (default: user) and  user; for an admin, manually update the value to admin, createAt, updateAt
  - `blogs`: id, userId, blogTitle, blog, category, createAt, updateAt
- Relationship: The relationship between users and blogs is one-to-many: One user can create multiple blogs.
Each blog belongs to one user.
The userId field in the blogs table should reference the corresponding user's id.

### User Journey
- When the application starts, the following options should be displayed in the console:

View All Blogs
Login
Register
The user can select an option to continue.

Any user can register and log in to the system. After login, the user can create blogs. A single user can create multiple blogs.

After login:

If the user has no blogs, display "No blogs are found" in the console.
If the user has created blogs, display all blog titles created by that user.
The user can search for a blog by blog ID or blog title, and the matching blog should be displayed in the console.
The user can update a blog using its blog ID.
The user can delete a blog using its blog ID.

### Admin Journey
- After logging in with an admin account, the admin can:

View the complete user list by calling the allUsers() function.
View all blogs from all users by calling the allUsersBlog() function.
Search for any blog by blog ID or blog title.
Update a user's isActive status.
If isActive is set to false, that user must not be able to log in. The console should display:
 "User is deactivated"
Delete any user.
Delete any blog.

### Tech Stack
- Node.js
- JavaScript
- MySQL

### Submission Requirements
- Add node_modules and .env to .gitignore
- Write README.md with project description, setup instructions, database information, features, and usage instructions
- Record demo video with voice explanation
- Add video link inside README.md

## Plan Phases

### Phase 1: Project Setup
- Initialize Node.js project with `npm init -y`
- Install dependencies: mysql2, sequelize, dotenv
- Create .env file with database configuration
- Create .gitignore with node_modules and .env

### Phase 2: Database Setup
- Create SQL migrations/tables for users and blogs tables
- Establish relationships between users and blogs

### Phase 3: Application Logic
- User authentication (register, login)
- Blog CRUD operations (create, read, update, delete)
- Admin capabilities (view all users, update user status, delete users/blogs)

### Phase 4: CLI Interface
- Console menu system for user and admin journeys
- Input validation and error handling

### Phase 5: Documentation
- Write comprehensive README.md
- Record demo video
- Add video link to README.md

## Critical Files to Create
1. package.json (initialized)
2. .env (database configuration)
3. .gitignore
4. db.js (database connection and models)
5. userController.js (user CRUD operations)
6. blogController.js (blog CRUD operations)
7. auth.js (authentication middleware)
8. main.js (entry point with CLI menu)
9. README.md (project documentation)

## Dependencies
- mysql2: MySQL driver for Node.js
- sequelize: ORM for database operations
- dotenv: Environment variable configuration

## Verification
- Test database table creation
- Test user registration and login
- Test blog creation and management
- Test admin functions
- Verify .gitignore excludes node_modules and .env