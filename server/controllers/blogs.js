
const { Blog } = require("../models/blog-model");

module.exports = {
    getAllBlogs: async (req, res) => {
        try {
            const allBlogs = await Blog.find();
            return res.status(200).send(allBlogs);
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    getActiveBlogs: async (req, res) => {
        try {
            const allBlogs = await Blog.find({ publish: true });
            res.status(200).json(allBlogs);
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    getBlogDetails: async (req, res) => {
        try {
            const { id } = req.params;
            const blog = await Blog.findById(id);
            return res.status(200).json(blog);
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    createBlog: async (req, res) => {
        try {
            const newBlog = new Blog({ ...req.body });
            const insertedBlog = await newBlog.save();
            return res.status(201).json(insertedBlog);
        } catch (err) {
            res.status(500).json(err.errors.message);
        }
    },
    deleteBlog: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedBlog = await Blog.findByIdAndDelete(id);
            return res.status(200).json(deletedBlog);
        } catch (err) {
            res.status(500).json(err.errors.message);
        }
    },
    updateBlog: async (req, res) => {
        try {
            const { id } = req.params;
            await Blog.updateOne({ _id: id }, req.body);
            const updatedBlog = await Blog.findById(id);
            return res.status(200).json(updatedBlog);
        } catch (err) {
            res.status(500).json(err.errors.message);
        }
    }

}