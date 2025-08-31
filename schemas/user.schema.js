import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    unique: true,
    required: true,
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
  },

  password: {
    type: String,
    required: true,
  },

  profile: {
    type: String,
    default: "",
  },

  bankAccountNumber: {
    type: String,
    unique: true,
    required: true,
  },

  bankName: {
    type: String,
  },

  panCardNumber: {
    type: String,
    unique: true,
    required: true,
  },

  dematNumber: {
    type: String,
    unique: true,
  },

  supportCode: {
    type: String,
    unique: true,
  },

  segments: {
    type: [String],
    default: ["MF", "BSE", "NSE"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default userSchema;