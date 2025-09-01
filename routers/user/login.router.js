import express from "express"
import wrapError from "../../middleware/wrapError.js";
import {authMiddleware} from "../../middleware/auth.middleware.js";
import {userLogin, verifyLoginOtp, logoutUser} from "../../controller/user/user.login.js";

const router = express.Router();

// login router
router.post('/login', wrapError(userLogin));
router.post('/login/verify-otp', wrapError(verifyLoginOtp));

// logout router
router.post('/logout', authMiddleware, wrapError(logoutUser))
export default router;
