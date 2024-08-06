const controllers = require('../controllers/blogs')

module.exports = (app) => {
    //Get all blogs
    app.get("/", controllers.getAllBlogs);

    // //Get all Active blogs
    app.get("/activeblog", controllers.getActiveBlogs);

    // //Get single blog
    app.get("/:id", controllers.getBlogDetails);

    // //Insert blog
    app.post("/", controllers.createBlog);

    // //Delete blog
    app.delete("/:id", controllers.deleteBlog);

    // //Update blog
    app.put("/:id", controllers.updateBlog);

    return app;
};