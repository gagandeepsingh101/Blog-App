import axios from "axios";
import CryptoJS from "crypto-js";
export const useAddImageCloud = async (image: File | string) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "t2df2hze");
    data.append("cloud_name", "blog-site-110");

    try {
        const response = await axios.post("https://api.cloudinary.com/v1_1/blog-site-110/image/upload", data);
        if (response.status === 200) {
            return response.data.url
        }
        console.log(response);
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
    }
}

export const useRemoveImageFromCloud = async (imageUrl: string) => {
    const generateSHA1 = (data: any) => {
        const hash = CryptoJS.SHA1(data); // Use CryptoJS
        return hash.toString(CryptoJS.enc.Hex); // Convert hash to hexadecimal string
    };
    const generateSignature = (publicId: string, apiSecret: string | undefined) => {
        const timestamp = new Date().getTime();
        return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    };
    try {
        const parts = imageUrl.split("/");

        // Extract the last part of the URL which contains the public ID
        const publicIdWithExtension = parts[parts.length - 1];

        // Remove the file extension to get just the public ID
        const publicId = publicIdWithExtension.split(".")[0];
        const timestamp = new Date().getTime();
        const signature = generateSHA1(generateSignature(publicId, import.meta.env.VITE_CLOUDINARY_API_SECRET));

        // Make a DELETE request to Cloudinary API
        const response = await axios.delete(`https://api.cloudinary.com/v1_1/blog-site-110/image/destroy`, {
            data: {
                public_id: publicId,
                signature: signature,
                api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
                timestamp: timestamp,
            }
        });

        console.log(response.data);
        // Handle success, maybe update UI accordingly
    } catch (error) {
        console.error('Error deleting image:', error);
        // Handle error, maybe show an error message
    }
}