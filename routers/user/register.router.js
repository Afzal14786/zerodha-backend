import express from "express";
import wrapError  from "../../middleware/wrapError.js";

import {
  phoneSignUp,
  verifyPhoneOtp,
  saveLeadAndVerifyOtp,
  setPasswordAndCreateAccount,
} from "../../controller/user/user.register.js";

const router = express.Router();

router.post("/signup", wrapError(phoneSignUp));
router.post("/open-account", wrapError(phoneSignUp));
router.post("/verify-mobile", wrapError(verifyPhoneOtp));
router.post("/lead-info", wrapError(saveLeadAndVerifyOtp));
router.post("/set-password", wrapError(setPasswordAndCreateAccount));

export default router;