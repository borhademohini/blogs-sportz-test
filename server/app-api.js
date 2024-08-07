const express = require("express");
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");
const errorHandler = require('./middlewares/error_handler.js')

const PORT = process.env.PORT || 5000;

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

/* Routes Start */
const bRouter = express.Router();
const pRouter = express.Router();
const blogsRoutes = require('./routes/blogs.js')(bRouter, {});
const postsRoutes = require('./routes/posts.js')(pRouter, {});
app.use('/api/blogs', blogsRoutes);
app.use('/api/posts', postsRoutes);
/* Routes End */

app.use(errorHandler);

const server = require('http').createServer(app);
require('./modules/io.js').initialize(server);


var url = "mongodb://localhost:27017/mydb";
const startDB = async () => {
    try {
        await mongoose.connect(url);
    } catch (error) {
        console.error("start error");
        console.error(error);
        process.exit(1);
    }
};

startDB();
server.listen(PORT);
