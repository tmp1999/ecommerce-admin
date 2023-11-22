// cloudinaryApi.ts
import axios from 'axios';
import FormData from 'form-data';

const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
};

const uploadImage = async (imageFile: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${cloudinaryConfig.apiSecret}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

const updateImage = async (publicId: string, newImageFile: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', newImageFile);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${cloudinaryConfig.apiSecret}`,
        },
        params: {
          public_id: publicId,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating image:', error);
    throw error;
  }
};

const getImage = async (publicId: string): Promise<any> => {
  try {
    const response = await axios.get(
      `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${publicId}`
    );

    return response.data;
  } catch (error) {
    console.error('Error getting image:', error);
    throw error;
  }
};

const deleteImage = async (publicId: string): Promise<void> => {
  try {
    await axios.delete(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/delete_by_token`,
      {
        data: { public_ids: [publicId] },
        headers: {
          Authorization: `Bearer ${cloudinaryConfig.apiSecret}`,
        },
      }
    );

    console.log('Image deleted successfully');
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

export { uploadImage, updateImage, getImage, deleteImage };
