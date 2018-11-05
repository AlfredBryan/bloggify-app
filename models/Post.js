const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: {
    type: String,
    required: [true, "author is required"]
  },
  title: {
    type: String,
    required: [true, "enter post title please"]
  },
  post: {
    type: String,
    required: [true, "enter post field"]
  },
  likes_count: {
    type: Number,
    default: 0

  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    }
  ],

  date: { type: Date, default: Date.now }
}, { strict: false});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
