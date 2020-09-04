const mongoose = require("mongoose");

const PaymentMethodSchema = new mongoose.Schema({
  method: String,
  value: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("PaymentMethod", PaymentMethodSchema);
