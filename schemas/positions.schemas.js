import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    symbol: {
        type: String,
        required: true,
    },
    productType: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    avgPrice: {
        type: Number,
        required: true,
        default: 0,
    },
});


positionSchema.index({ user: 1, symbol: 1 }, { unique: true });

export default positionSchema;