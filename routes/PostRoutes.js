const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const Post = require("../models/Post");
const Comment = require("../models/Comment");

let newFile
// Set Storage Engine
const storage = multer.diskStorage({
  destination: "../public/uploads",
  filename: function(req, file, cb) {
    newFile =
      file.fieldname + "_" + Date.now() + path.extname(file.originalname);
    cb(null, newFile);
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("image");

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

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
  console.log(req.body);
  if (req.file) {
    upload(req, res, err => {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log(req.file);
        res.send("Success");
      }
    });
  }
  console.log(req.body);
  Post.create(
    {
      author: req.body.author,
      title: req.body.title,
      post: req.body.post,
      newImage: newFile,
      likes_count: req.body.likes_count
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

// Adding or Removing A Like to A single Post
router.post("/post/:id/like", (req, res) => {
  Post.findOne({ _id: req.params.id }).then(post => {
    if (req.body.like_type == "increment") {
      post.likes_count += 1;
    }
    if (req.body.like_type == "decrement") {
      post.likes_count -= 1;
    }
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
