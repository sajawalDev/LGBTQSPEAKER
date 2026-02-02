import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Existing upload (base64 / file path)
 * Used by navbar logos etc.
 */
export const uploadToCloudinary = async (file, folder = "navbar_logos") => {
  return await cloudinary.uploader.upload(file, {
    folder,
  });
};

/**
 * NEW: Upload from buffer (FormData file)
 * Used by Images admin section
 */
export const uploadBufferToCloudinary = (buffer, folder = "website-images") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error) reject(error);
        resolve(result);
      })
      .end(buffer);
  });
};

/**
 * NEW: Delete image by public_id
 */
export const deleteFromCloudinary = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};
