const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  metadata: {
    type: Object,
    required: false,
  },
  redirect_url: {
    type: String,
    required: false,
  },
  facebook_post: {
    type: String,
    required: false,
  },
  twitter_post: {
    type: String,
    required: false,
  },
  blog_id: {
    type: String,
    required: false,
    index: true
  },
  post_type: {
    type: String,
    required: false,
    default: 'simple_post'
  }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };