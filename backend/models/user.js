const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    require: true,
  },

  role: {
    type: String,
    required: true,
    default: "user",
  },

  avatar: {
    type: String,
    default: "/assets/avatars/default.png",
  },

  phone: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
