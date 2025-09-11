import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  transactionId: {
    type: String,
    length: 20,
    required: true,
  },
  ISIN: {
    type: String,
    length: 12,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  tradeDate: {
    type: Date,
    default: Date.now
  },

});


export default orderSchema;