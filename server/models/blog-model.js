const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  publish: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = { Blog };