const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const fileupload = require("express-fileupload");
const urlMetadata = require('url-metadata');

const { Post } = require("./models/post-model");
const { Blog } = require("./models/blog-model");

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.use('/uploads', express.static('uploads'));
app.use(fileupload());

var url = "mongodb://localhost:27017/mydb";

const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Centralized error handling middleware
function errorHandler(err, req, res, next) {
    console.error("errorHandler :: ", err.stack);
    res.status(500).json({ error: err.message });
}

app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect(url);
    } catch (error) {
        console.error("start error");
        console.error(error);
        process.exit(1);
    }
};

/* Socket START */
// Listen to sockets here instead of listening in routes/api.js
const connections = [];

io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log(' %s sockets is connected', connections.length); 

    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
    });

});

/* Socket END */

//Get all blogs
app.get("/blog", async (req, res) => {
    const allBlogs = await Blog.find();
    return res.status(200).json(allBlogs);
});

//Get all Active blogs
app.get("/activeblog", async (req, res) => {
    const allBlogs = await Blog.find({ publish: true });
    return res.status(200).json(allBlogs);
});


//Get single blog
app.get("/blog/:id", async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    return res.status(200).json(blog);
});

//Insert blog
app.post("/blog", async (req, res) => {
    try {
        const newBlog = new Blog({ ...req.body });
        const insertedBlog = await newBlog.save();
        return res.status(201).json(insertedBlog);
    } catch (err) {
        res.status(500).json(err.errors.message);
    }

});

//Delete blog
app.delete("/blog/:id", async (req, res) => {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    return res.status(200).json(deletedBlog);
});

//Update blog
app.put("/blog/:id", async (req, res) => {
    const { id } = req.params;
    await Blog.updateOne({ _id: id }, req.body);
    const updatedBlog = await Blog.findById(id);
    return res.status(200).json(updatedBlog);
});




//Get all post
app.get("/post", async (req, res) => {
    const allPosts = await Post.find();
    return res.status(200).json(allPosts);
});

//Get all post by blog_id
app.get("/postbyblog/:blogId", async (req, res) => {
    const { blogId } = req.params;
    const allPosts = await Post.find({ blog_id: blogId });
    return res.status(200).json(allPosts);
});

//Get single post
app.get("/post/:id", async (req, res) => {
    const { id } = req.params;
    const employee = await Post.findById(id);
    return res.status(200).json(employee);
});

//Insert post
app.post("/post", async (req, res) => {
    const newPost = new Post({ ...req.body });

    if (req.files) {
        let imageFile = req.files.image;
        let ext = path.extname(imageFile.name);
        let fileName = 'post-' + Math.random() + ext;
        newPost.image = fileName;
        uploadPath = __dirname + '/uploads/' + fileName;
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

    connections.forEach(function (socket) {
        socket.emit('NewPostAdded', insertedPost);
    });

    return res.status(201).json(insertedPost);
});


//Update post
app.put("/post/:id", async (req, res) => {
    const { id } = req.params;
    await Post.updateOne({ _id: id }, req.body);
    const updatedPost = await Post.findById(id);
    return res.status(200).json(updatedPost);
});

//Delete employee
app.delete("/post/:id", async (req, res) => {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    return res.status(200).json(deletedPost);
});


start();
const PORT = 5000;
server.listen(PORT);
