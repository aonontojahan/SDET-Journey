import { DataTypes, Sequelize } from "sequelize"
import dotenv from "dotenv"
dotenv.config()

// Create Sequelize instance with environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false, // Set to true if you want to see SQL queries in console
})

// Initialize database connection and sync tables
export async function initDB() {
    try {
        await sequelize.authenticate()
        console.log("Database connected successfully ✅")
        await sequelize.sync({ alter: true }) // Create tables if they don't exist; alter if they do
        console.log("Tables synced successfully ✅")
    } catch (error) {
        console.error("Database connection failed ❌", error)
    }
}

export async function closeDB() {
    try {
        await sequelize.close()
        console.log("Database connection closed ✅")
    } catch (error) {
        console.error("Error closing database ❌", error)
    }
}

// Define User model
export const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "user", // default role is 'user'; manually update to 'admin' for admins
    },
    createAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updateAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "users",
    timestamps: true 
})

// Define Blog model
export const Blog = sequelize.define("Blog", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    blogTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    blog: {
        type: DataTypes.TEXT, // Use TEXT for longer blog content
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updateAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "blogs",
    timestamps: true,
})

// Define Relationship: One-to-Many
// One User can have many Blogs
// Each Blog belongs to one User
// The userId field in Blogs table references the User's id
Blog.associate = (models) => {
    Blog.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
    })
}

User.associate = (models) => {
    User.hasMany(models.Blog, {
        foreignKey: "userId",
        as: "blogs",
    })
}

// Export initialized models for use in controllers
export { sequelize }