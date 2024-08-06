
const { Posts } = require("../models/post-model");
const path = require('path');
const urlMetadata = require('url-metadata');
const socket = require('../modules/io');

module.exports = {
    getAllPosts: async (req, res) => {
        try {
            const allPosts = await Posts.find();
            return res.status(200).json(allPosts);
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    getPostsByBlogs: async (req, res) => {
        console.log("Inside listing ::");
        try {
            const { blogid } = req.params;
            const allPosts = await Posts.find({ blog_id: blogid }).sort({ 'updatedAt': -1 });
            return res.status(200).json(allPosts);
        }
        catch (err) {
            console.log("listing error :: ", err);
            res.status(500).send(err)
        }
    },
    getPostDetails: async (req, res) => {
        try {
            const { id } = req.params;
            const employee = await Posts.findById(id);
            return res.status(200).json(employee);
        }
        catch (err) {
            res.status(500).send(err)
        }
    },   
    createPost: async (req, res) => {
        try {
            const newPost = new Posts({ ...req.body });

            if (req.files) {
                let imageFile = req.files.image;
                let ext = path.extname(imageFile.name);
                let fileName = 'post-' + Math.random() + ext;
                newPost.image = fileName;
                uploadPath = process.cwd() + '/uploads/' + fileName;
                let response = await imageFile.mv(uploadPath);
            }

            if (newPost.url) {
                async function fetchMetaData() {
                    try {
                        const url = newPost.url;
                        const metadata = await urlMetadata(url);
                        newPost.metadata = metadata;
                        newPost.redirect_url = url;
                    } catch (err) {
                        console.log("metadata error ::", err);
                    }
                }
                await fetchMetaData();
            }

            const insertedPost = await newPost.save();

            // connections.forEach(function (socket) {
            //     socket.emit('NewPostAdded', insertedPost);
            // });
             //get the io instance
             const io = socket.getInstance();
             io.emit('NewPostAdded', insertedPost);

            return res.status(201).json(insertedPost);
        }
        catch (err) {
            console.log("error :: ", err);
            return res.status(200).send(err)
        }
    },
    deletePost: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedPost = await Posts.findByIdAndDelete(id);
            return res.status(200).json(deletedPost);
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    updatePost: async (req, res) => {
        try {
            const { id } = req.params;
            await Posts.updateOne({ _id: id }, req.body);
            const updatedPost = await Posts.findById(id);
            return res.status(200).json(updatedPost);
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

}