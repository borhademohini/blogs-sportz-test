const express = require("express");
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");
const errorHandlerMiddleware = require('./middlewares/error_handler.js');
const headerMiddleware = require('./middlewares/headers.js');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(headerMiddleware);
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

app.use(errorHandlerMiddleware);

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
