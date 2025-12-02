const { v4: uuid } = require('uuid');
const cloudinary = require('../config/cloudinary');

const uploadImage = async (fileBuffer, folder = 'products') => {
  const uploadResponse = await cloudinary.uploader.upload(fileBuffer, {
    folder,
    public_id: uuid(),
    resource_type: 'image',
  });

  return {
    url: uploadResponse.secure_url,
    public_id: uploadResponse.public_id,
  };
};

const deleteImage = async (publicId) => {
  if (!publicId) return null;
  return cloudinary.uploader.destroy(publicId);
};

module.exports = { uploadImage, deleteImage };

