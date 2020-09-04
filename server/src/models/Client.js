const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  cpf: String,
  name: String,
  phone: String,
  address: String,
  thumbnail: String, //caminho da foto
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Client", ClientSchema);
