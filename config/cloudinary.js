import {v2 as cloudinary} from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config( {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});

const storage = new CloudinaryStorage({ 
    cloudinary: cloudinary,
    params: {
        folder: "profile images",
        allowed_formats: ["jpg", "png", "jpeg", "webp"]
    }
});

export { cloudinary, storage };