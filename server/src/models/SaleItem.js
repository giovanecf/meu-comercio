const mongoose = require("mongoose");

const SaleItemSchema = new mongoose.Schema({
  quantity: Number,
  subTotal: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductType",
  },
});

module.exports = mongoose.model("SaleItem", SaleItemSchema);
