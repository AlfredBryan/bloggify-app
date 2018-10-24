const express = require("express");
const router = express.Router();

const Post = require("../models/Post");
const Comment = require("../models/Comment");


// Getting All Post
router.get("/post", (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      res.status(404).send("Post not found");
      return;
    }
    res.status(201).send(posts);
  });
});

// Adding a New Post
router.post("/post", (req, res) => {
  Post.create(
    {
      author: req.body.author,
      title: req.body.title,
      post: req.body.post,
      likes: req.body.likes
    },
    (err, post) => {
      if (err) return res.status(505).send(err);

      res.status(200).send(post);
    }
  );
});

// Getting a single Post with it's Comment
router.get("/post/:id", (req, res, next) => {
  Post.findById({ _id: req.params.id })
    .populate({ path: "comments", model: Comment })
    .exec((err, post) => {
      if (err) return res.status(505).send(err);

      res.send(post);
    });
});

// Adding A New Comment to A single Post
router.post("/post/:id", (req, res) => {
  Post.findOne({ _id: req.params.id }).then(post => {
    let comment = new Comment({
      comment: req.body.comment
    });
    post.comments.push(comment);
    comment.save(error => {
      if (error) return res.send(error);
    });
    post.save((error, post) => {
      if (error) return res.send(error);
      res.send(post);
    });
  });
});

// Getting a Single Post
router.get("/post/:id", (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then(post => {
    res.send(post);
  });
});

router.post("/posts/:id/act", (req, res) => {
  const action = req.body.action;
  const counter = action === "Like" ? 1 : -1;
  Post.update(
    { _id: req.params.id },
    { $inc: { likes_counter: counter } },
    {},
    (err, numberAffected) => {
      pusher.trigger();
      res.send("");
    }
  );
});

router.get("/comment/:id", (req, res) => {
  Comment.findOne({ _id: req.params.id }).then(comment => {
    res.send(comment.info.count());
  });
});

router.get("/amount/:id", (req, res, next) => {
  Post.findById({ _id: req.params.id })
    .populate({ path: "comments", model: Comment })
    .exec((err, post) => {
      if (err) return res.status(505).send(err);

      res.send(post);
    });
});
module.exports = router;
