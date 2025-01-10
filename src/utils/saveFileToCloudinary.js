import cloudinary from 'cloudinary';
import { CLOUDINARY } from '../constans/index.js';
import fs from 'node:fs/promises';

if (!CLOUDINARY.CLOUD_NAME || !CLOUDINARY.API_KEY || !CLOUDINARY.API_SECRET) {
  throw new Error('Cloudinary configuration is missing');
}

cloudinary.v2.config({
  secure: true,
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET,
});

const deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(
      `Failed to delete file: ${filePath}, error: ${error.message}`,
    );
  }
};

export const saveFileToCloudinary = async (
  file,
  folder = 'uploads',
  options = {},
) => {
  if (!file || !file.path) {
    throw new Error('File is not provided or invalid');
  }

  try {
    const uploadOptions = {
      folder,
      overwrite: true,
      transformation: [
        {
          width: 200,
          height: 200,
          crop: 'fill',
        },
      ],
      ...options,
    };

    const response = await cloudinary.v2.uploader.upload(
      file.path,
      uploadOptions,
    );
    console.log('Cloudinary upload response:', response);
    await deleteFile(file.path);
    return response.secure_url;
  } catch (error) {
    throw new Error(`Failed to upload file to Cloudinary: ${error.message}`);
  }
};
