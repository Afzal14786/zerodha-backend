import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  exchange: { type: String, required: true },
  type: { type: String, enum: ["EQ", "FUT", "OPT"], default: "EQ" },
  price: { type: Number, required: true },
  change: { type: Number, default: 0 },
  percentChange: { type: Number, default: 0 },
  open: { type: Number },
  high: { type: Number },
  low: { type: Number },
  prevClose: { type: Number },
  volume: { type: Number },
  lowerCircuit: { type: Number },
  upperCircuit: { type: Number },
  bids: [
    {
      price: Number,
      orders: Number,
      qty: Number,
    },
  ],
  offers: [
    {
      price: Number,
      orders: Number,
      qty: Number,
    },
  ],
  lastTradedTime: { type: Date, default: Date.now },
});

// add indexes for faster search
stockSchema.index({ symbol: "text", name: "text" });

const Stock = mongoose.model("Stock", stockSchema);
export default Stock;
