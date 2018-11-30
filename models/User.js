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
    required: [true, "last_name is required"]
  },
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username has been taken"]
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already exists"]
  },
  number: {
    type: Number,
    unique: [true, "email already exists"]
  },
  image: {
    type: String,
    required: [true],
    trim: true
  },
  password: {
    type: String,
    required: [true, "password is required"]
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
