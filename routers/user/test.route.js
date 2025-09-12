import express from "express";
import sendOtpToEmail from "../../helper/sendOtpToEmail.js";

const router = express.Router();

router.post("/test-email-otp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const success = await sendOtpToEmail(email, otp);

  if (success) {
    res.json({ success: true, message: `OTP sent to ${email}`, otp }); // return otp only for dev/testing
  } else {
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});


export default router;
