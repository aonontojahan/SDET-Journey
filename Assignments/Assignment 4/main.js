// Blogging Platform - CRUD Console Application

import { initDB, closeDB } from "./db.js"
import { Blog, User } from "./db.js"
import {
    userRegistration,
    userLogin,
    getAllUsers,
    updateUserStatus,
    deleteUser
} from "./userController.js"
import {
    createBlog,
    getUserBlogs,
    searchBlog,
    updateBlog,
    deleteBlog
} from "./blogController.js"

let currentUser = null

// Readline Interface (ES Module compatible)
const { createInterface } = await import("node:readline")
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
})

// Question Function - Reads single line input
function askQuestion(promptText) {
    return new Promise((resolve) => {
        rl.question(promptText, (answer) => {
            resolve(answer)
        })
    })
}

// Display Functions

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
----------------------------------------
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
----------------------------------------
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
----------------------------------------
`)
}

// Menu Functions
async function viewAllBlogs() {
    console.log("\n--- Viewing All Blogs ---")
    try {
        const blogs = await Blog.findAll({
            order: [["createAt", "DESC"]],
            include: [{ model: User, as: "user" }]
        })
        if (blogs.length === 0) {
            console.log("📝 No blogs found in the system.")
        } else {
            console.log(`\n=== ALL BLOGS (${blogs.length}) ===`)
            // Use for...of to properly handle async/await
            let index = 1
            for (const blog of blogs) {
                console.log(`\n${index}. ID: ${blog.id}`)
                console.log(`   Title: "${blog.blogTitle}"`)
                // Fetch user name using getUser() method
                const user = await blog.getUser()
                const userName = user ? user.firstName + " " + user.lastName : "Unknown"
                console.log(`   User: ${userName}`)
                console.log(`   Category: ${blog.category || "Uncategorized"}`)
                console.log(`   Created: ${blog.createAt}`)
                index++
            }
        }
    } catch (error) {
        console.error("❌ Error fetching blogs:", error.message)
    }
    console.log()
}

// User registration - registers a new user and auto-logs them in
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

    const newUser = await userRegistration(firstName, lastName, email, password)
    if (newUser) {
        console.log("\n✅ Registration successful!\n")
        // Auto-login with the just-registered credentials
        currentUser = await userLogin(email, password)
        if (currentUser) {
            if (currentUser.role === "admin") {
                await runAdminMenu()
            } else {
                await runUserMenu()
            }
        }
    }
}

// User login - shows dashboard menu in a loop until logout
async function handleLogin() {
    console.log("\n--- User Login ---")
    const email = await askQuestion("Enter your email: ")
    const password = await askQuestion("Enter your password: ")

    currentUser = await userLogin(email, password)
    if (currentUser) {
        // Show the appropriate dashboard menu in a loop
        if (currentUser.role === "admin") {
            await runAdminMenu()
        } else {
            await runUserMenu()
        }
    }
    console.log()
    // After logout, return to main menu
}

// View user's blogs
async function viewUserBlogs() {
    console.log("\n--- Your Blogs ---")
    await getUserBlogs(currentUser.id)
}

// Create a new blog
async function createNewBlog() {
    console.log("\n--- Create Blog ---")
    const blogTitle = await askQuestion("Enter blog title: ")
    const blogContent = await askQuestion("Enter blog content: ")
    const category = await askQuestion("Enter category (optional): ") || "Uncategorized"

    // Check if title or content is empty or only whitespace
    if (!blogTitle || !blogContent.trim()) {
        console.log("❌ Title and content are required to create a blog!")
        return
    }

    await createBlog(currentUser.id, blogTitle, blogContent, category)
}

// Search for a blog
async function searchBlogFunction() {
    const searchTerm = await askQuestion("Enter blog ID or title to search: ")
    await searchBlog(searchTerm)
}

// Update a blog
async function updateBlogFunction() {
    const updateId = await askQuestion("Enter blog ID to update: ")
    const newTitle = await askQuestion("Enter new title (or press Enter to skip): ")
    const newContent = await askQuestion("Enter new content (or Enter to skip): ")
    const newCategory = await askQuestion("Enter new category (or press Enter to skip): ")
    await updateBlog(Number(updateId), {
        blogTitle: newTitle || undefined,
        blog: newContent || undefined,
        category: newCategory || undefined
    })
    // Check if any actual updates were made
    const blog = await Blog.findByPk(updateId)
    if (blog.blogTitle !== newTitle || blog.blog !== newContent || blog.category !== newCategory) {
        console.log(`\n🔗 Blog ID ${updateId} has been updated successfully\n`)
    } else {
        console.log(`\nℹ️ No changes were made to Blog ID ${updateId}\n`)
    }
}

// Delete a blog
async function deleteBlogFunction() {
    const delId = await askQuestion("Enter blog ID to delete: ")
    const delBlog = await Blog.findByPk(Number(delId))
    if (delBlog) {
        await deleteBlog(Number(delId))
        console.log(`\n✅ Blog ID ${delId} has been deleted successfully\n`)
    } else {
        console.log(`\n❌ Blog ID ${delId} not found! No blog was deleted.\n`)
    }
}

// User Menu Loop (returns to main menu on logout)
async function runUserMenu() {
    let localExit = false
    while (!localExit) {
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
                localExit = true
                break
            default: console.log("❌ Invalid choice! Please try again.")
        }
    }
    // Function ends - returns to handleLogin() which returns to main()
}

// Admin Menu Loop (returns to main menu on logout)
async function runAdminMenu() {
    let localExit = false
    while (!localExit) {
        displayAdminMenu()
        const choice = await askQuestion("Enter your choice: ")

        switch (choice) {
            case "1": await getAllUsers(); break
            case "2": // View all blogs from all users
                try {
                    const blogs = await Blog.findAll({
                        order: [["createAt", "DESC"]],
                        include: [{ model: User, as: "user", attributes: ["firstName", "lastName"] }]
                    })
                    console.log("\n=== ALL BLOGS FROM ALL USERS ===")
                    if (blogs.length === 0) {
                        console.log("📝 No blogs found in the system.")
                    } else {
                        blogs.forEach((blog, index) => {
                            console.log(`\n${index + 1}. ID: ${blog.id}`)
                            console.log(`   Title: "${blog.blogTitle}"`)
                            console.log(`   User: ${blog.User ? blog.User.firstName + " " + blog.User.lastName : "Unknown"}`)
                            console.log(`   Category: ${blog.category || "Uncategorized"}`)
                            console.log(`   Created: ${blog.createAt}`)
                        })
                    }
                } catch (error) {
                    console.error("❌ Error fetching blogs:", error.message)
                }
                break
            case "3": await searchBlogFunction(); break
            case "4":
                const userId = await askQuestion("Enter user ID to update status: ")
                const answer = await askQuestion("Set to true (active) or false (deactivate)? ")
                const isActive = answer.toLowerCase() === "true"
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
                localExit = true
                break
            default: console.log("❌ Invalid choice! Please try again.")
        }
    }
    // Function ends - returns to handleLogin() which returns to main()
}

// MAIN ENTRY POINT
async function main() {
    console.log("\nInitializing database...")

    await initDB()

    // Show main menu until user chooses login
    let exitApp = false
    while (!exitApp) {
        displayMainMenu()
        const choice = await askQuestion("Enter your choice: ")

        switch (choice) {
            case "1": await viewAllBlogs(); break
            case "2": await handleRegister(); break
            case "3":
                await handleLogin()
                // After handleLogin returns (after logout),
                // the while loop continues and shows main menu again
                break
            default: console.log("❌ Invalid choice! Please select 1-3.")
        }
    }

    await closeDB()
    console.log("\n👋 Thank you for using Blogging Platform! Goodbye!\n")
}


// Run Application
main().catch((error) => {
    console.error("❌ Fatal error:", error)
    rl.close()
    process.exit(1)
})