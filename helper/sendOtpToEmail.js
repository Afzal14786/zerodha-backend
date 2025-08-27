import dotenv from "dotenv"
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendOtpToEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"Support" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "OTP Verification",
      html: `<p>Please Validate The OTP ${otp}</p>`,
    });
    return true;

  } catch (error) {
    console.error("Error sending OTP to email:", error);
    return false;
  }
};

export default sendOtpToEmail;
