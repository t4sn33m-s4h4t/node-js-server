const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    }
    // featuredImage: {
    //   required: false,
    // },
    // categories: {
    //   type: Array,
    //   required: true,
    // },
  }
);

module.exports = mongoose.model("Post", PostSchema);
