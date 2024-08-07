
const { Posts } = require("../models/post-model");
const path = require('path');
const urlMetadata = require('url-metadata');
const socket = require('../modules/io');

module.exports = {
    getAllPosts: async (req, res, next) => {
        try {
            const allPosts = await Posts.find();
            return res.status(200).json(allPosts);
        }
        catch (err) {
            next(err);
        }
    },
    getPostsByBlogs: async (req, res, next) => {
        try {
            const { blogid } = req.params;
            const allPosts = await Posts.find({ blog_id: blogid }).sort({ 'updatedAt': -1 });
            return res.status(200).json(allPosts);
        }
        catch (err) {
            next(err);
        }
    },
    getPostDetails: async (req, res, next) => {
        try {
            const { id } = req.params;
            const employee = await Posts.findById(id);
            return res.status(200).json(employee);
        }
        catch (err) {
            next(err);
        }
    },   
    createPost: async (req, res, next) => {
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
            next(err);
        }
    },
    deletePost: async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedPost = await Posts.findByIdAndDelete(id);
            return res.status(200).json(deletedPost);
        }
        catch (err) {
            next(err);
        }
    },
    updatePost: async (req, res, next) => {
        try {
            const { id } = req.params;
            await Posts.updateOne({ _id: id }, req.body);
            const updatedPost = await Posts.findById(id);
            return res.status(200).json(updatedPost);
        }
        catch (err) {
            next(err);
        }
    }

}