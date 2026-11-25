// Blog CRUD Operations
import { Blog, User, Op } from "./db.js"

// Create a new blog post
export async function createBlog(userId, blogTitle, blog, category) {
    try {
        const newBlog = await Blog.create({
            userId,
            blogTitle,
            blog,
            category
        })
        console.log(`✅ Blog created successfully! ID: ${newBlog.id}`)
        console.log(`   Title: "${blogTitle}"`)
        return newBlog
    } catch (error) {
        console.error("❌ Error creating blog:", error.message)
        throw error
    }
}

// Get all blogs for a specific user
export async function getUserBlogs(userId) {
    try {
        const blogs = await Blog.findAll({
            where: { userId },
            order: [["createAt", "DESC"]],
            include: [{ model: User, as: "user", attributes: ["firstName", "lastName"] }]
        })
        if (blogs.length === 0) {
            console.log("📝 No blogs found for this user.")
            return []
        }
        console.log(`\n=== YOUR BLOGS (${blogs.length}) ===`)
        blogs.forEach((blog, index) => {
            console.log(`\n${index + 1}. ID: ${blog.id}`)
            console.log(`   Title: "${blog.blogTitle}"`)
            console.log(`   Category: ${blog.category || "Uncategorized"}`)
            console.log(`   Created: ${blog.createAt}`)
        })
        return blogs
    } catch (error) {
        console.error("❌ Error fetching your blogs:", error.message)
        throw error
    }
}

// Search blogs by ID or title
export async function searchBlog(searchTerm) {
    try {
        let blogs

        // Try searching by ID first (if the input is numeric)
        if (!isNaN(searchTerm)) {
            const blogById = await Blog.findByPk(Number(searchTerm))
            if (blogById) {
                console.log("\n=== BLOG FOUND BY ID ===")
                console.log(`ID: ${blogById.id}`)
                console.log(`Title: "${blogById.blogTitle}"`)
                console.log(`User ID: ${blogById.userId}`)
                console.log(`Content: ${blogById.blog || "No content"}`)
                console.log(`Category: ${blogById.category || "Uncategorized"}`)
                console.log(`Created: ${blogById.createAt}`)
                return [blogById]
            }
        }

        // Search by title using partial match
        blogs = await Blog.findAll({
            where: {
                blogTitle: {
                    [Op.like]: `%${searchTerm}%`
                }
            },
            include: [{ model: User, as: "user", attributes: ["firstName", "lastName"] }]
        })

        if (blogs.length === 0) {
            console.log("❌ No blogs found matching your search term.")
            return []
        }

        console.log(`\n=== SEARCH RESULTS for "${searchTerm}" ===`)
        blogs.forEach((blog, index) => {
            console.log(`\n${index + 1}. ID: ${blog.id}`)
            console.log(`   Title: "${blog.blogTitle}"`)
            console.log(`   User: ${blog.user ? blog.user.firstName + " " + blog.user.lastName : "Unknown"}`)
            console.log(`   Category: ${blog.category || "Uncategorized"}`)
        })

        return blogs
    } catch (error) {
        console.error("❌ Error searching blogs:", error.message)
        throw error
    }
}

// Update a blog by ID
export async function updateBlog(blogId, updates) {
    try {
        const blog = await Blog.findByPk(blogId)
        if (!blog) {
            console.log("❌ Blog not found with ID:", blogId)
            return 0
        }

        // Update allowed fields: title, content, and category
        // Only update if new values are provided (not empty/undefined)
        if (updates.blogTitle) blog.blogTitle = updates.blogTitle
        if (updates.blog) blog.blog = updates.blog
        if (updates.category) blog.category = updates.category

        await blog.save()

        return 1
    } catch (error) {
        console.error("❌ Error updating blog:", error.message)
        throw error
    }
}

// Delete a blog by ID
export async function deleteBlog(blogId) {
    try {
        const blog = await Blog.findByPk(blogId)
        if (!blog) {
            console.log("❌ Blog not found with ID:", blogId)
            return false
        }

        // Destroy the blog record from database
        await blog.destroy()
        console.log(`✅ Blog ID ${blogId} has been deleted successfully`)
        return true
    } catch (error) {
        console.error("❌ Error deleting blog:", error.message)
        throw error
    }
}