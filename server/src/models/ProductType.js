const mongoose = require("mongoose");

const ProductTypeSchema = new mongoose.Schema({
  description: String,
  costPrice: Number,
  sellPrice: Number,
  stock: Number,
  discount: Number,
  thumbnail: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("ProductType", ProductTypeSchema);
