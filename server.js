const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const config = require("./config");
const userRoutes = require("./routes/UserRoutes");
const PostRoutes = require("./routes/PostRoutes");

// Set Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
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

const app = express();

app.use(express.static("./public"));

// Setting Headers
app.use(cors());

// Upload route
app.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(req.file);
      res.send("Success");
    }
  });
});

// Adding the body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Adding the routes
app.use("/api", userRoutes);
app.use("/api", PostRoutes);

// Connecting to Database
mongoose.set("useCreateIndex", true);
mongoose.connect(
  config.url,
  { useNewUrlParser: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

// Setting the port
const port = process.env.PORT || 4000;

// Starting the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
