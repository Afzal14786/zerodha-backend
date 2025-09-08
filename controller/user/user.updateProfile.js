import userModel from "../../models/user.model.js";
import bcrypt from "bcrypt";
import sendEmail from "../../helper/sendMail.js";
// this will update the profile image
export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file || !req.file.path) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    // Cloudinary URL will be in req.file.path automatically (multer-storage-cloudinary)
    const imageUrl = req.file.path;

    const user = await userModel.findByIdAndUpdate(
      userId,
      { profile: imageUrl },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Profile image updated successfully",
      profileUrl: user.profile,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    return res.status(500).json({
      success: false,
      message: "Error uploading profile image",
    });
  }
};

// implementing update Password

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide both . Old & New Password",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect old password",
      });
    }

    // if match then has the new passworf
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error(`Error while updating the password : ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// implement reset password

export const forgotPassoword = async (req, res) => {
  try {
    const { userId, email } = req.body;
    const user = await userModel.findOne({ userId, email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with provided userid or email",
      });
    }

    const resetToken = user.createPasswordResetToken();
    await user.save();

    const resetUrl = `http://localhost:5174/reset-password/${resetToken}`;
    const message = `Please use the following link to reset your password: ${resetUrl}`;

    await sendEmail({
      to: user.email,
      subject: "Kite Clone Password Reset Request",
      text: message,
    });

    return res.status(200).json({
      success: true,
      message: "A password reset link has been sent to your email.",
    });
  } catch (err) {
    console.error(`Error while forgotPassword : ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Now if user, forgot the userId then just take
 *
 * emailId => from user and check in the ID
 *
 *    => If user find, the send user's user id and a login link to the dashboard
 */


export const forgotUserId = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "With this email user not found",
      });
    }

    // else get the user's userId and set over the email
    const message = `Your user id is ${user.userId}`;
    
    // now send the main
    await sendEmail({
      to: user.email,
      subject: `Kite clone user ID recovery`,
      text:  message,
    });

    return res.status(200).json({
      success: true,
      message: "UserId send in your registered email id",
    });

  } catch (err) {
    console.error(`Error while resetting the userid : ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
