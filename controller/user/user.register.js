import bcrypt from "bcrypt";
import userModel from "../../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../../config/jwt.js";
import redis from "../../config/redisClint.js";
import generateUserImage from "../../helper/generateUserImage.js";
import {
  generateAccountNumber,
  generateBankName,
  generateDematNumber,
  generatePanCardNumber,
  generateSupportCode,
  generateUserId,
} from "../../helper/user.helper.js";
import sendOtpToEmail from "../../helper/sendOtpToEmail.js";
import admin from "../../config/firebaseAdmin.js";

/**
 * this function  normalize the phone number format
 */

const normalizePhone = (phone) => {
  if (phone.startsWith("+91")) {
    return phone.slice(-10);
  }
  return phone;
};

export const phoneSignUp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Phone is required",
    });
  }

  const tenDigitPhone = normalizePhone(phone);
  const existingUser = await userModel.findOne({ phone: tenDigitPhone });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  return res.json({
    success: true,
    message: "OTP sent to phone",
  });
};

export const verifyPhoneOtp = async (req, res) => {
  const { idToken } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const verifiedPhone = decodedToken.phone_number;

    if (!verifiedPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone number not found in token",
      });
    }

    const tenDigitPhone = normalizePhone(verifiedPhone);

    const existingUser = await userModel.findOne({ phone: tenDigitPhone });
    if (existingUser) {
      const accessToken = generateAccessToken({ id: existingUser._id });
      const refreshToken = generateRefreshToken({ id: existingUser._id });

      await redis.set(`refresh:${existingUser._id}`, refreshToken, 'EX', 7 * 24 * 3600);

      return res.json({
        success: true,
        userExists: true,
        message: "User already have an account with the same number.",
        data: {
          user: {
            id: existingUser._id,
            name: existingUser.name,
            userId: existingUser.userId,
            profile: existingUser.profile,
          },
          tokens: {
            accessToken,
            refreshToken
          },
        }
      });
    }

    await redis.set(`verified:phone:${verifiedPhone}`, "true", "EX", 600);

    return res.json({
      success: true,
      message: "Phone verified",
    });
    
  } catch (error) {
    console.error(`Error While Verifying OTP : ${error}`);
    return res.status(400).json({
      success: false,
      message: "Invalid or Expired OTP",
    });
  }
};

export const saveLeadAndVerifyOtp = async (req, res) => {
  const { step, phone, name, email, otp } = req.body;

  if (step === "sendOtp") {
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing details",
      });
    }

    // Use the phone number as received from the frontend for Redis key
    await redis.hset(`lead:${phone}`, 'name', name, 'email', email);
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    await redis.set(`otp:email:${email}`, emailOtp, "EX", 300);

    await sendOtpToEmail(email, emailOtp);

    return res.json({
      success: true,
      message: "Email OTP sent",
    });
  }

  if (step === "verifyOtp") {
    const storedOtp = await redis.get(`otp:email:${email}`);
    if (!storedOtp || storedOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired otp",
      });
    }

    await redis.set(`verified:email:${email}`, "true", "EX", 600);
    return res.json({
      success: true,
      message: "Email verified",
    });
  }

  return res.status(400).json({
    success: false,
    message: "Invalid or expired otp",
  });
};

export const setPasswordAndCreateAccount = async (req, res) => {
  const { phone, password } = req.body;
  
  const normalizedPhone = phone.startsWith("+") ? phone : `+91${phone}`;

  const phoneVerified = await redis.get(`verified:phone:${normalizedPhone}`);
  if (phoneVerified !== "true") {
    return res.status(400).json({
      success: false,
      message: "Phone not verified",
    });
  }

  // Check again to prevent duplicate accounts and ensure consistency
  const tenDigitPhone = normalizePhone(normalizedPhone);
  const existingUser = await userModel.findOne({ phone: tenDigitPhone });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists. Cannot create a new account.",
    });
  }
  
  const leadInfo = await redis.hgetall(`lead:${normalizedPhone}`);

  if (!leadInfo || !leadInfo.email || !leadInfo.name) {
    return res.status(400).json({
      success: false,
      message: "Lead info missing to complete",
    });
  }

  const emailVerification = await redis.get(`verified:email:${leadInfo.email}`);
  if (emailVerification !== "true") {
    return res.status(400).json({
      success: false,
      message: "Email not verified",
    });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = generateUserId();
    const bankAccountNumber = generateAccountNumber();
    const bankName = generateBankName();
    const dematNumber = generateDematNumber();
    const panCardNumber = generatePanCardNumber();
    const supportCode = generateSupportCode();
    
    let profileImage = null;
    try {
        profileImage = await generateUserImage(leadInfo.name);
    } catch (err) {
        console.error("Failed to generate user image, continuing without it.", err);
    }

    const newUser = new userModel({
      userId,
      name: leadInfo.name,
      email: leadInfo.email,
      phone: tenDigitPhone, 
      password: hashedPassword,
      profile: profileImage,
      bankAccountNumber,
      bankName,
      panCardNumber,
      dematNumber,
      supportCode,
    });

    await newUser.save();

    const accessToken = generateAccessToken({ id: newUser._id });
    const refreshToken = generateRefreshToken({ id: newUser._id });

    await redis.set(`refresh:${newUser._id}`, refreshToken, 'EX', 7 * 24 * 3600);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
        },
        tokens: { accessToken, refreshToken },
      },
    });

  } catch (err) {
    console.error("Mongoose Save Error:", err.name, err.message);
    console.error("Full Error Object:", err);
    
    return res.status(500).json({
      success: false,
      message: "Failed to create account. Please try again.",
    });
  }
};

/**
 * Just after creating the account, user navigate the accout-active page, for that page we need to display some data, like
 * User_ID and USer_Name, and Profile Image,
 */

export const getAccountActiveData = async(req, res)=> {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId).select("userId name profile");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }


    return res.json({
      success: true,
      data: user,
    });

  } catch(err) {
    console.error(`Error While Fetching The Data From MongoDB : ${err}`);
    return res.json({
      success: false,
      message: "Failed To Get Data",
    });
  }
}