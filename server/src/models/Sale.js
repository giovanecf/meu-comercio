const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  total: Number,
  createAt: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

module.exports = mongoose.model("Sale", SaleSchema);
