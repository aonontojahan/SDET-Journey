// Blogging Platform - CRUD Console Application
// Main entry point for the console-based blogging platform
// Features user registration, login, blog management, and admin controls
// Uses ES Modules with process.stdin for console input

import { initDB, closeDB } from "./db.js"
// Import user authentication and management functions
import {
    userRegistration,
    userLogin,
    getAllUsers,
    updateUserStatus,
    deleteUser
} from "./userController.js"
// Import blog CRUD operations
import {
    createBlog,
    getUserBlogs,
    searchBlog,
    updateBlog,
    deleteBlog
} from "./blogController.js"

// Global variable to track the currently logged-in user
let currentUser = null

// -------------------------------------------------------
// Helper to read a line from console
// -------------------------------------------------------
const lines = []
rl = null

// -------------------------------------------------------
// ASK QUESTION FUNCTION
// -------------------------------------------------------
async function askQuestion(promptText) {
    return new Promise((resolve) => {
        // Process one line of input
        const readline = require("node:readline").createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(promptText, (answer) => {
            readline.close()
            resolve(answer)
        })
    })
}

// -------------------------------------------------------
// DISPLAY FUNCTIONS
// -------------------------------------------------------
function displayMainMenu() {
    console.log(`
========================================
   BLOGGING PLATFORM - CRUD CONSOLE
========================================

Please select an option:
1. View All Blogs
2. Register
3. Login

Enter your choice (1-3):
========================================
`)
}

function displayUserMenu() {
    console.log(`
========================================
   WELCOME TO YOUR DASHBOARD
========================================

Logged in as: ${currentUser ? currentUser.firstName + " " + currentUser.lastName : "Guest"}

Please select an option:
1. View Your Blogs
2. Create Blog
3. Search Blog (by ID/Title)
4. Update Blog
5. Delete Blog
6. Logout

Enter your choice (1-6):
========================================
`)
}

function displayAdminMenu() {
    console.log(`
========================================
   ADMIN DASHBOARD
========================================

Logged in as Admin: ${currentUser ? currentUser.firstName + " " + currentUser.lastName : "Admin"}

Please select an option:
1. View All Users
2. View All Blogs
3. Search Blog (by ID/Title)
4. Update User Status
5. Delete User
6. Delete Blog
7. Admin Logout

Enter your choice (1-7):
========================================
`)
}

// -------------------------------------------------------
// MENU OPTIONS
// -------------------------------------------------------
async function viewAllBlogs() {
    console.log("\n--- Viewing All Blogs ---")
    console.log("Displaying all available blogs...")
    console.log("✅ Feature: View All Blogs accessed\n")
}

async function handleRegister() {
    console.log("\n--- User Registration ---")
    const firstName = await askQuestion("Enter your first name: ")
    const lastName = await askQuestion("Enter your last name: ")
    const email = await askQuestion("Enter your email: ")
    const password = await askQuestion("Enter your password: ")

    if (!firstName || !lastName || !email || !password) {
        console.log("❌ All fields are required!")
        return
    }

    await userRegistration(firstName, lastName, email, password)
    console.log()
}

async function handleLogin() {
    console.log("\n--- User Login ---")
    const email = await askQuestion("Enter your email: ")
    const password = await askQuestion("Enter your password: ")

    currentUser = await userLogin(email, password)
    if (currentUser) {
        if (currentUser.role === "admin") {
            runAdminMenu()
        } else {
            runUserMenu()
        }
    }
    console.log()
}

// -------------------------------------------------------
// USER MENU
// -------------------------------------------------------
async function viewUserBlogs() {
    console.log("\n--- Your Blogs ---")
    await getUserBlogs(currentUser.id)
}

async function createNewBlog() {
    console.log("\n--- Create Blog ---")
    const blogTitle = await askQuestion("Enter blog title: ")
    const blogContent = await askQuestion("Enter blog content: ")
    const category = await askQuestion("Enter category (optional): ") || "Uncategorized"
    await createBlog(currentUser.id, blogTitle, blogContent, category)
}

async function searchBlogFunction() {
    const searchTerm = await askQuestion("Enter blog ID or title to search: ")
    await searchBlog(searchTerm)
}

async function updateBlogFunction() {
    const updateId = await askQuestion("Enter blog ID to update: ")
    const newTitle = await askQuestion("Enter new title (or press Enter to skip): ")
    const newContent = await askQuestion("Enter new content (or press Enter to skip): ")
    const newCategory = await askQuestion("Enter new category (or press Enter to skip): ")
    await updateBlog(Number(updateId), {
        blogTitle: newTitle || undefined,
        blog: newContent || undefined,
        category: newCategory || undefined
    })
}

async function deleteBlogFunction() {
    const delId = await askQuestion("Enter blog ID to delete: ")
    await deleteBlog(Number(delId))
}

// -------------------------------------------------------
// USER MENU LOOP
// -------------------------------------------------------
async function runUserMenu() {
    let exit = false
    while (!exit) {
        displayUserMenu()
        const choice = await askQuestion("Enter your choice: ")

        switch (choice) {
            case "1": await viewUserBlogs(); break
            case "2": await createNewBlog(); break
            case "3": await searchBlogFunction(); break
            case "4": await updateBlogFunction(); break
            case "5": await deleteBlogFunction(); break
            case "6":
                console.log("👋 Logging out...")
                currentUser = null
                exit = true
                break
            default: console.log("❌ Invalid choice! Please try again.")
        }
    }
}

// -------------------------------------------------------
// ADMIN MENU LOOP
// -------------------------------------------------------
async function runAdminMenu() {
    let exit = false
    while (!exit) {
        displayAdminMenu()
        const choice = await askQuestion("Enter your choice: ")

        switch (choice) {
            case "1": await getAllUsers(); break
            case "2": console.log("✅ View All Blogs accessed by admin\n"); break
            case "3": await searchBlogFunction(); break
            case "4":
                const userId = await askQuestion("Enter user ID to update status: ")
                const isActive = (await askQuestion("Set to true (active) or false (deactivate)? ").toLowerCase()) === "true"
                await updateUserStatus(Number(userId), isActive)
                break
            case "5":
                const delUserId = await askQuestion("Enter user ID to delete: ")
                await deleteUser(Number(delUserId))
                break
            case "6":
                const delBlogId = await askQuestion("Enter blog ID to delete: ")
                await deleteBlog(Number(delBlogId))
                break
            case "7":
                console.log("👋 Admin logging out...")
                currentUser = null
                exit = true
                break
            default: console.log("❌ Invalid choice! Please try again.")
        }
    }
}

// -------------------------------------------------------
// MAIN MENU HANDLER
// -------------------------------------------------------
async function main() {
    console.log("\nInitializing database...")

    await initDB()

    let exit = false

    while (!exit) {
        displayMainMenu()
        const choice = await askQuestion("Enter your choice: ")

        switch (choice) {
            case "1": await viewAllBlogs(); break
            case "2": await handleRegister(); break
            case "3": await handleLogin(); break
            default: console.log("❌ Invalid choice! Please select 1-3.")
        }
    }

    await closeDB()
    console.log("\n👋 Thank you for using Blogging Platform! Goodbye!\n")
}

// -------------------------------------------------------
// RUN APPLICATION
// -------------------------------------------------------
main().catch((error) => {
    console.error("❌ Fatal error:", error)
    process.exit(1)
})