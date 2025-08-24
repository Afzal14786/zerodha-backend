import jdenticon from "jdenticon";
import cloudinary from "../config/cloudinary.js";

/**
 * Generate an avatar SVG based on user's name and upload to Cloudinary.
 *
 * @param {string} name - The user's name
 * @returns {Promise<string>} - The Cloudinary URL of the uploaded avatar
 */
export const generateAvatarFromName = async (name) => {
  try {
    // Generate SVG string
    const svg = jdenticon.toSvg(name, 200);

    // Convert SVG to base64
    const svgBase64 = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

    // Upload to Cloudinary
    const result = await cloudinary.v2.uploader.upload(svgBase64, {
      folder: "user_avatars",    // Cloudinary folder
      public_id: `avatar-${name.replace(/\s+/g, "_").toLowerCase()}`, 
      overwrite: true,
      resource_type: "image",
    });

    return result.secure_url; // Return Cloudinary image URL
  } catch (error) {
    console.error("Error generating avatar:", error);
    return null;
  }
};
