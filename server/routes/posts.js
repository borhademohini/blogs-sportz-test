const controllers = require('../controllers/posts');

module.exports = (app) => {
    //Get all post
    app.get("/", controllers.getAllPosts);

    // //Get all Active post
    app.get("/postsbyblog/:blogid", controllers.getPostsByBlogs);

    // //Get single post
    app.get("/:id", controllers.getPostDetails);

    // //Insert post
    app.post("/", controllers.createPost);

    // //Delete post
    app.delete("/:id", controllers.deletePost);

    // //Update post
    app.put("/:id", controllers.updatePost);

    return app;
};