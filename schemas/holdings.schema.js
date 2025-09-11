import mongoose from "mongoose";

const holdingSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    symbol: {
        type: String,
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
    },

    avgPrice: {
        type: Number,
        required: true,
    },

    lastUpdated: {
        type: Date,
        default: Date.now,
    }
});

/**
 * this will identify all the holdings uniquely inside the holding page
 */

holdingSchema.index({
    user: 1,
    symbol: 1,
}, {
    unique: true
});

export default holdingSchema; 