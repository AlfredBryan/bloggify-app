const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const logger = require("morgan");
require("dotenv").config();

const userRoutes = require("./routes/UserRoutes");
const PostRoutes = require("./routes/PostRoutes");

// Mail Services
const transport = {
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
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

// Setting Headers
app.use(cors());

// Adding the body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
/*app.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["authorization"];
  if (!token) return next(); //if no token, continue

  token = token.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Please register Log in using a valid email to submit posts"
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});*/

app.use("/api", userRoutes);
app.use("/api", PostRoutes);

// Connecting to Database
mongoose.set("useCreateIndex", true);
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

// Setting the port
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
