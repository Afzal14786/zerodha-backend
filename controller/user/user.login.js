import bcrypt from "bcrypt";
import userModel from "../../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../../config/jwt.js";
import redis from "../../config/redisClint.js";
import sendOtpToEmail from "../../helper/sendOtpToEmail.js";
import { normalizePhone } from "../../controller/user/user.register.js";

export const userLogin = async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({
            success: false,
            message: "Phone/User ID & password are required",
        });
    }

    try {
        let user;
        let otpSentVia;
        
        if (identifier.length === 7) { 
            user = await userModel.findOne({ userId: identifier });
            otpSentVia = "email";
        } else {
            
            let tenDigitPhone = normalizePhone(identifier);
            user = await userModel.findOne({ phone: tenDigitPhone });
            otpSentVia = "phone";
        }

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await redis.set(`otp:login:${identifier}`, otp, "EX", 300);

        if (otpSentVia === "email") {
            await sendOtpToEmail(user.email, otp);
            return res.json({
                success: true,
                message: `OTP sent to email.`,
                auth_type: "email",
                identifier: user.userId
            });
        } else {
            return res.json({
                success: true,
                message: `OTP sent to your phone.`,
                auth_type: "phone",
                identifier: user.phone
            });
        }
    } catch(err) {
        console.error(`Error while login: ${err}`);
        return res.status(400).json({
            success: false,
            message: `Something went wrong while login`
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
        if (identifier.length === 7) {
            user = await userModel.findOne({ userId: identifier });
        } else {
            const tenDigitPhone = normalizePhone(identifier);
            user = await userModel.findOne({ phone: tenDigitPhone });
        }
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const storedOtp = await redis.get(`otp:login:${identifier}`);
        if (!storedOtp || storedOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP.",
            });
        }

        const accessToken = generateAccessToken({ id: user._id });
        const refreshToken = generateRefreshToken({ id: user._id });

        await redis.set(`refresh:${user._id}`, refreshToken, "EX", 7 * 24 * 3600);

        return res.status(200).json({
            success: true,
            message: "Logged in successfully!",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    userId: user.userId,
                    profile: user.profile,
                },
                tokens: { accessToken, refreshToken },
            },
        });

    } catch (error) {
        console.error("Error during OTP verification:", error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred. Please try again.",
        });
    }
};

// now logout the user
export const logoutUser = async(req, res)=> {
    try {
        const userId = req.user.id;
        // let delete the user id
        const result = await redis.del(`refresh:${userId}`);
        if (result === 1) {
            return res.status(200).json({
                success: true,
                message: "Logged out successfully!",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "User session not found!",
            });
        }
    } catch(err) {
        console.log(`Error while logout: ${err}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error While Logout The User!",
        });
    }
}
