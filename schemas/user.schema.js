import mongoose from "mongoose"

/**
 * @berif : Before Creating The Schema Some Of The Data We Are Generaing For Security And Testing Puspose .
 * Since This is a project only, so from user, we cannnot take `BankAccount`, `Demat(BO) Number, PanCard Number
 * and some data like segment[MF, BSE, NSE] is always static |`
 */


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

  phone: {
    type: String, // better keep it as String (to preserve leading 0s if any)
    unique: true,
    required: true,
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
  },

  password: {
    type: String,
    required: true,
  },

  profile: {
    type: String, // URL of Cloudinary image
    default: "",
  },

  // Auto-generated fields
  bankAccountNumber: {
    type: String,
    unique: true,
  },

  bankName: {
    type: String,
  },

  panCardNumber: {
    type: String,
    unique: true,
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