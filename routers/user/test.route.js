import express from "express";
import sendOtpToEmail from "../../helper/sendOtpToEmail.js";
// import sendOTPtoPhone from "../../helper/sentOTPtoPhone.js";

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

// router.post("/phone-verify", async(req, res)=> {
//     const {phone} = req.body;
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     const success = await sendOTPtoPhone(phone, otp);

//     if (success) {
//         res.json({
//             success: true,
//             message: `OTP sent to ${phone}, otp`
//         });
//     } else {
//         res.status(500).json({
//             success: false,
//             message: "Failed to send otp via phone",
//         })
//     }
// });

export default router;
