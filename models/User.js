const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "first_name is required"],
    trim: true,
    uppercase: true
  },
  lastName: {
    type: String,
    required: [true, "last_name is required"],
    trim: true,
    uppercase: true
  },
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username has been taken"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already exists"],
    trim: true
  },
  number: {
    type: Number,
    unique: [true, "email already exists"],
    trim: true
  },
  image: {
    type: String,
    required: [true],
    trim: true
  },
  password: {
    type: String,
    required: [true, "password is required"],
    trim: true
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model("user", UserSchema);

module.exports = User;
