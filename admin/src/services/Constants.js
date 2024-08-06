export const constants = {
    BASE_URL: 'http://localhost:5000/api',
    BLOG_URL: function () {
        return this.BASE_URL + '/blogs';
    },
    POST_URL: function () {
        return this.BASE_URL + '/posts';
    },
    POST_URL_BY_BLOG: function () {
        return this.BASE_URL + '/posts/postsbyblog/';
    },
    DEFAULT_MODE: 'add',
    API_METHOD: {
        add: 'POST',
        edit: 'PUT'
    },
    POST_TYPES: {
        simple_post: "Title & Description",
        image_post: "Title & Description with Image",
        metadata_post: "Scraped Page Metadata",
        facebook_post: "Facebook Post",
        twitter_post: "Twitter Post"
    }
}