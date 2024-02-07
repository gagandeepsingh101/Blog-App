import axios from "axios";
export const useUploadImageCloudinary = async (image: File | string) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "t2df2hze"); // Replace "your_upload_preset_here" with your actual upload preset
    data.append("cloud_name", "blog-site-110");

    try {
        const response = await axios.post("https://api.cloudinary.com/v1_1/blog-site-110/image/upload", data);
        if (response.status === 200) {
            return response.data.url
        }
        console.log(response);
        // Handle success
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        // Handle error
    }
}