// User Authentication & CRUD Operations
// Handles user registration, login, and user management
// Imports User model from db.js for database operations
import { User } from "./db.js"

// Register a new user
// Creates a new user account with the provided details
// Returns the created user object, or null if user already exists
export async function userRegistration(firstName, lastName, email, password) {
    try {
        const existing = await User.findOne({ where: { email } })
        if (existing) {
            console.log("❌ User is already registered with this email")
            return null
        }
        const newUser = await User.create({ firstName, lastName, email, password })
        console.log(`✅ User registered successfully! ID: ${newUser.id}`)
        return newUser
    } catch (error) {
        console.error("❌ Error during registration:", error.message)
        throw error
    }
}

// Login a user
// Authenticates a user with email and password
// Returns the user object if successful, null if login fails
// Also checks if user account is deactivated
export async function userLogin(email, password) {
    try {
        const user = await User.findOne({ where: { email, password } })
        if (!user) {
            console.log("❌ Invalid email or password")
            return null
        }
        if (user.isActive === false) {
            console.log("🚫 User is deactivated. Login not allowed.")
            return null
        }
        console.log(`✅ Login successful! Welcome, ${user.firstName}`)
        return user
    } catch (error) {
        console.error("❌ Error during login:", error.message)
        throw error
    }
}

// Get all users
// Retrieves a list of all users in the system (admin feature)
// Excludes password from the returned data for security
// Returns an array of user objects
export async function getAllUsers() {
    try {
        const users = await User.findAll({ attributes: { exclude: ["password"] } })
        console.log("\n=== ALL USERS ===")
        console.table(users.map(u => ({
            ID: u.id,
            Name: `${u.firstName} ${u.lastName}`,
            Email: u.email,
            Role: u.role,
            IsActive: u.isActive ? "Active" : "Deactivated"
        })))
        return users
    } catch (error) {
        console.error("❌ Error fetching users:", error.message)
        throw error
    }
}

// Update user status
// Changes a user's active/deactive status
// Used by admin to activate or deactivate user accounts
// Returns the number of rows updated
export async function updateUserStatus(userId, isActive) {
    try {
        const user = await User.findByPk(userId)
        if (!user) {
            console.log("❌ User not found with ID:", userId)
            return 0
        }
        user.isActive = isActive
        await user.save()
        const status = isActive ? "activated" : "deactivated"
        console.log(`✅ User ${userId} has been ${status}`)
        if (isActive === false) {
            console.log("🚫 This user will not be able to log in until reactivated")
        }
        return 1
    } catch (error) {
        console.error("❌ Error updating user status:", error.message)
        throw error
    }
}

// Delete user
// Removes a user from the system (admin feature)
// Also removes associated blogs (or handles cascade deletion)
// Returns true if deletion was successful
export async function deleteUser(userId) {
    try {
        const user = await User.findByPk(userId)
        if (!user) {
            console.log("❌ User not found with ID:", userId)
            return false
        }
        // Delete the user record
        await user.destroy()
        console.log(`✅ User ID ${userId} has been deleted successfully`)
        return true
    } catch (error) {
        console.error("❌ Error deleting user:", error.message)
        throw error
    }
}