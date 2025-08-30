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

export const phoneSignUp = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Phone is required",
    });
  }

  const existingUser = await userModel.findne({ phone });
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

    await redis.hSet(`lead:${phone}`, { name, email });
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    await redis.Ex(`otp:email:${email}`, 300, emailOtp);

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

    await redis.set(`verified:email:${email}`, "true", { EX: 600 });
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
  const phoneVerified = await redis.get(`verified:phone:${phone}`);
  if (phoneVerified !== "true") {
    return res.status(400).json({
      success: false,
      message: "Phone not verified",
    });
  }

  const leadInfo = await redis.hGetAll(`lead:${phone}`);
  if (!leadInfo || !leadInfo.email) {
    return res.status(400).json({
      success: false,
      message: "Lead info missing",
    });
  }

  const emailVerification = await redis.get(`verified:email:${leadInfo.email}`);
  if (emailVerification !== "true") {
    return res.status(400).json({
      success: false,
      message: "Email not verified",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = generateUserId();
  const accountNumber = generateAccountNumber();
  const bankName = generateBankName();
  const dematNumber = generateDematNumber();
  const pancardNumber = generatePanCardNumber();
  const supportCode = generateSupportCode();
  const profileImage = generateUserImage(leadInfo.name);

  const newUser = new userModel({
    userId,
    name: leadInfo.name,
    email: leadInfo.email,
    phone,
    password: hashedPassword,
    profile: profileImage,
    accountNumber,
    bankName,
    pancardNumber,
    dematNumber,
    supportCode,
  });

  await newUser.save();

  const accessToken = generateAccessToken({ id: newUser._id });
  const refreshToken = generateRefreshToken({ id: newUser._id });

  await redis.set(`refresh:${newUser._id}`, refreshToken, {
    EX: 7 * 24 * 3600,
  });

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
};
