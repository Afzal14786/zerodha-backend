import mongoose from "mongoose";
import crypto from "crypto"

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
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  
  // the token will expire within 10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; 

  // Return the plain-text token to be sent to the user
  return resetToken;
};

export default userSchema;