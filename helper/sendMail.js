import dotenv from "dotenv";
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


const sendEmail = async (options) => {
  try {
    await transporter.sendMail({
      from: `"Support" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    console.log("Email sent successfully!");
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};


export default sendEmail;