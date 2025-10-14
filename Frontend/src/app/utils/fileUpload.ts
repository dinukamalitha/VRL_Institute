import axios from "axios";

const getCloudinaryConfig = () => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || process.env.CLOUDINARY_UPLOAD_PRESET;
  return { cloudName, uploadPreset };
};

export const uploadToCloudinary = async (file: File, folder = "uploads"): Promise<string> => {
  const { cloudName, uploadPreset } = getCloudinaryConfig();
  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary environment variables are not configured");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return response.data.secure_url as string;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 413) throw new Error("File too large for Cloudinary preset limit.");
      if (status === 429) throw new Error("Upload rate limit exceeded, try again later.");
    }
    console.error("Cloudinary upload error:", error);
    throw new Error("Image upload failed");
  }
};
