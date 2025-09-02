import userModel from "../../models/user.model.js";
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
      message: "Profile updated successfully",
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
