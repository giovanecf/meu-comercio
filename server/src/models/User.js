const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  login: String,
  password: String,
  name: String,
  thumbnail: String, //caminho da foto
});

module.exports = mongoose.model("User", UserSchema);
