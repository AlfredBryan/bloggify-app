const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const config = require("../config");

const router = express.Router();

router.get("/users", (req, res) => {
  res.send("Get Post");
});

router.get("/user/:id", (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => {
    res.send(user);
  });
});

router.post("/users/signup", (req, res) => {
  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  User.create(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      number: req.body.number,
      password: hashPassword
    },
    (err, user) => {
      if (err) return res.status(409).send({ message: "signup error" });
      console.log(user);
      //create token
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 5000
      });
      res.status(201).send({ token: token });
    }
  );
});

router.post("/users/login", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return res.status(500).send({ message: "login error" });
    if (!user) return res.status(404).send({ message: "user not found" });

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password,
      console.log(user)
    );
    if (!passwordIsValid)
      return res.status(403).send({ message: "login invalid" });
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 1500
    });
    res.status(200).send({
      token: token,
      message: "login successful",
      user: user
    });
  });
});

router.delete("/users/delete/:id", (req, res) => {
  User.findOneAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
});

router.put("/users/update/:id", (req, res, next) => {
  User.findOneAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
    if (err) return next(err);
    res.status(200).send({ user: user.username, message: "Update Successful" });
  });
});

module.exports = router;
