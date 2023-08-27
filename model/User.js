const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Admin: {
      type: Number,
    },
    Editor: {
      type: Number,
    },
  },
  password: {
    type: String,
    rzquired: true,
  },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
