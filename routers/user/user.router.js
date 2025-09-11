import express from "express";
import multer from "multer";

import wrapError from "../../middleware/wrapError.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { refreshMiddleware } from "../../middleware/refresh.middleware.js";
import {storage} from "../../config/cloudinary.js"

import { getAccountActiveData} from "../../controller/user/user.register.js";
import {updateProfileImage, changePassword, forgotPassoword, resetPassword, forgotUserId} from "../../controller/user/user.updateProfile.js";
import {logoutUser} from "../../controller/user/user.login.js";

const router = express.Router();
const upload = multer({storage});

/**
 * these two are here because they are not required any 
 * authentication
 */
router.post("/forgot-password", wrapError(forgotPassoword));
router.post("/forgot-userId", wrapError(forgotUserId));
router.post("/reset-password/:token", wrapError(resetPassword));

router.use(refreshMiddleware);
router.use(authMiddleware);


router.get("/profile", wrapError(getAccountActiveData));
router.post("/profile/upload", upload.single("profile"), updateProfileImage);
router.post("/profile/update-password", wrapError(changePassword));
router.post("/logout", wrapError(logoutUser));

export default router;