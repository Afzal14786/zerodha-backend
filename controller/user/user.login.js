import bcrypt from "bcrypt";
import userModel from "../../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../../config/jwt.js";
import redis from "../../config/redisClint.js";
import sendEmail from "../../helper/sendMail.js";

const isTenDigitPhone = (input) => /^\d{10}$/.test(input);

export const userLogin = async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({
            success: false,
            message: "Phone/User ID & password are required.",
        });
    }

    try {
        let user;
        let loginType;

        if (isTenDigitPhone(identifier)) {
            user = await userModel.findOne({ phone: identifier.trim() });
            loginType = "phone";
        } else if (identifier.length === 7) {
            user = await userModel.findOne({ userId: identifier.trim() });
            loginType = "email";
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid identifier format. Must be a 7-digit User ID or a 10-digit phone number.",
            });
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password.",
            });
        }

        if (loginType === "email") {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            await redis.set(`otp:login:${identifier}`, otp, "EX", 300); // 5 min expiry
            await sendEmail(user.email, otp);

            return res.json({
                success: true,
                message: "OTP sent to your email.",
                auth_type: "email",
                identifier: user.userId,
            });
        }

        return res.json({
            success: true,
            message: "Password verified. Please verify OTP using Firebase.",
            auth_type: "phone",
            identifier: user.phone,
        });

    } catch (err) {
        console.error(`Error during login:`, err);
        return res.status(500).json({
            success: false,
            message: "Server error during login. Please try again later.",
        });
    }
};

export const verifyLoginOtp = async (req, res) => {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
        return res.status(400).json({
            success: false,
            message: "Phone/User ID and OTP are required.",
        });
    }

    try {
        let user;
        const isPhoneLogin = isTenDigitPhone(identifier);

        if (isPhoneLogin) {
            user = await userModel.findOne({ phone: identifier.trim() });
        } else if (identifier.length === 7) {
            user = await userModel.findOne({ userId: identifier.trim() });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid identifier format.",
            });
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        if (!isPhoneLogin) {
            // Email login OTP verification
            const storedOtp = await redis.get(`otp:login:${identifier}`);
            if (!storedOtp || storedOtp !== otp) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid or expired OTP.",
                });
            }
        } else {
            if (otp !== "verified") {
                return res.status(400).json({
                    success: false,
                    message: "Phone OTP not verified.",
                });
            }
        }

        // Issue tokens
        const accessToken = generateAccessToken({ id: user._id });
        const refreshToken = generateRefreshToken({ id: user._id });

        await redis.set(`refresh:${user._id}`, refreshToken, "EX", 7 * 24 * 3600);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 3600 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    userId: user.userId,
                    profile: user.profile,
                    bankAccountNumber: user.bankAccountNumber,
                    bankName: user.bankName,
                    panCardNumber: user.panCardNumber,
                    dematNumber: user.dematNumber,
                    supportCode: user.supportCode,
                },
                tokens: { accessToken },
            },
        });
    } catch (error) {
        console.error("Error during OTP verification:", error);
        return res.status(500).json({
            success: false,
            message: "Server error during OTP verification. Please try again.",
        });
    }
};

export const logoutUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await redis.del(`refresh:${userId}`);
        res.clearCookie("refreshToken");

        if (result === 1) {
            return res.status(200).json({
                success: true,
                message: "Logged out successfully!",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Session not found.",
            });
        }
    } catch (err) {
        console.error(`Error during logout:`, err);
        return res.status(500).json({
            success: false,
            message: "Server error during logout.",
        });
    }
};