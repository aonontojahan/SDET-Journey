// User Authentication & CRUD Operations
import { User } from "./db.js"

// Register a new user
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
export async function updateUserStatus(userId, isActive) {
    try {
        const user = await User.findByPk(userId)
        if (!user) {
            console.log("❌ User not found with ID:", userId)
            return 0
        }
        // Check if user is already in the requested state
        const currentlyActive = user.isActive
        if (isActive && currentlyActive) {
            console.log(`ℹ️ User ${userId} is already activated`)
            return 1
        }
        if (!isActive && !currentlyActive) {
            console.log(`ℹ️ User ${userId} is already deactivated`)
            return 1
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