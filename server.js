const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const multer = require("multer");
//const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");
const logger = require("morgan");

const config = require("./config");
const userRoutes = require("./routes/UserRoutes");
const PostRoutes = require("./routes/PostRoutes");

// Set Storage Engine
/*const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function(req, file, cb) {
    const image = file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    cb(
      null,
      image
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
}*/

// Mail Services
const transport = {
  host: "smtp.gmail.com",
  auth: {
    user: config.USER,
    pass: config.PASSWORD
  }
};

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

const app = express();

app.use(logger("dev"));

app.use(express.static("./public"));

// Setting Headers
app.use(cors());

// Adding the body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Upload route
/*app.post("/post", (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(req.file);
      res.send("Success");
    }
  });
});*/

// Mail routes
app.post("/mail", (req, res) => {
  const mail = {
    from: req.body.name,
    to: "alfred.chimereze@gmail.com",
    subject: "Mail from Bloggify Contact",
    text: req.body.name + "\n" + req.body.email + "\n\n" + req.body.message
  };

  transporter.sendMail(mail, (error, data) => {
    if (error) {
      res.json({
        msg: "failed"
      });
    } else {
      res.json({
        msg: "success"
      });
    }
  });
});

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
const port = process.env.PORT || 6000;

// Starting the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
