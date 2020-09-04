const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  barCode: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductType",
  },
});

module.exports = mongoose.model("Product", ProductSchema);
