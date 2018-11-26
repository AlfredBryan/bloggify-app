const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    author: {
      type: String,
      required: [true, "author is required"],
      trim: true,
      uppercase: true
    },
    title: {
      type: String,
      required: [true, "enter post title please"],
      trim: true,
      uppercase: true
    },
    post: {
      type: String,
      required: [true, "enter post field"],
      trim: true
    },
    image: {
      type: String,
      required: [true],
      trim: true
    },
    likes_count: {
      type: Number,
      default: 0
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],

    date: { type: Date, default: Date.now }
  },
  { strict: false }
);

const Post = mongoose.model("Post", PostSchema);

Post.aggregate([{ $count: "comments" }]);

module.exports = Post;
