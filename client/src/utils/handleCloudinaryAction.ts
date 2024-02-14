import axios from "axios";
import CryptoJS from "crypto-js";

// Custom hook to add an image to Cloudinary
export const useAddImageCloud = async (image: File | string) => {
    // Create a new FormData object to hold the image data
    const data = new FormData();
    // Append the image file to the FormData object
    data.append("file", image);
    // Add upload preset and cloud name as required parameters
    data.append("upload_preset", "t2df2hze");
    data.append("cloud_name", "blog-site-110");

    try {
        // Send a POST request to Cloudinary API to upload the image
        const response = await axios.post("https://api.cloudinary.com/v1_1/blog-site-110/image/upload", data);
        // If the request is successful, return the URL of the uploaded image
        if (response.status === 200) {
            return response.data.url;
        }
        // Log the response for debugging purposes
        // console.log(response);
    } catch (error) {
        // Log and handle errors if the request fails
        // console.error("Error uploading image to Cloudinary:", error);
    }
};

// Custom hook to remove an image from Cloudinary
export const useRemoveImageFromCloud = async (imageUrl: string) => {
    // Function to generate SHA1 hash using CryptoJS library
    const generateSHA1 = (data: any) => {
        const hash = CryptoJS.SHA1(data); // Use CryptoJS to generate SHA1 hash
        return hash.toString(CryptoJS.enc.Hex); // Convert hash to hexadecimal string
    };

    // Function to generate signature for Cloudinary request
    const generateSignature = (publicId: string, apiSecret: string | undefined) => {
        const timestamp = new Date().getTime(); // Get current timestamp
        return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    };

    try {
        const parts = imageUrl.split("/"); // Split the URL into parts

        // Extract the last part of the URL which contains the public ID
        const publicIdWithExtension = parts[parts.length - 1];

        // Remove the file extension to get just the public ID
        const publicId = publicIdWithExtension.split(".")[0];

        // Generate signature using public ID and API secret
        const signature = generateSHA1(generateSignature(publicId, import.meta.env.VITE_CLOUDINARY_API_SECRET));

        // Make a DELETE request to Cloudinary API to delete the image
        const response = await axios.delete(`https://api.cloudinary.com/v1_1/blog-site-110/image/destroy`, {
            data: {
                public_id: publicId, // Specify the public ID of the image to be deleted
                signature: signature, // Include the signature in the request
                api_key: import.meta.env.VITE_CLOUDINARY_API_KEY, // Include API key
                timestamp: new Date().getTime(), // Include current timestamp
            }
        });

        // Log the response data for debugging purposes
        // console.log(response.data);
        // Handle success, maybe update UI accordingly
    } catch (error) {
        // Log and handle errors if the request fails
        // console.error('Error deleting image:', error);
        // Handle error, maybe show an error message
    }
};
