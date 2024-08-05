export const constants = {
    BASE_URL: 'http://localhost:5000',
    BLOG_URL: function () {
        return this.BASE_URL + '/blog';
    },
    POST_URL: function () {
        return this.BASE_URL + '/post';
    },
    POST_URL_BY_BLOG: function () {
        return this.BASE_URL + '/postbyblog/';
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