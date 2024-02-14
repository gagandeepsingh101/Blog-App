import { SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { CgClose } from 'react-icons/cg';
import { useNavigate, useParams } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { useGetSpecificBlogQuery, useUpdateBlogMutation } from '../services/blogApi';
import { useAddImageCloud, useRemoveImageFromCloud } from '../utils/handleCloudinaryAction';
import { BlogAPIData, NewBlogType } from '../utils/type';
import { successToast } from '../utils/handleCustomToastShow';
import { Toaster } from 'react-hot-toast';

const UpdateBlog = () => {
    const uploadImage = useAddImageCloud; // Function to upload images to Cloudinary
    const deletePreviousImage = useRemoveImageFromCloud; // Function to delete images from Cloudinary
    const [categoryItems, setCategoryItems] = useState<string[]>([]); // State to store blog categories
    const { id } = useParams(); // Get blog ID from URL parameters
    const navigate = useNavigate(); // Function to navigate between routes
    const { data: response } = useGetSpecificBlogQuery(id as string); // Fetch specific blog data
    const [updateBlog] = useUpdateBlogMutation(); // Mutation to update blog data
    const [blogData, setBlogData] = useState<NewBlogType | null>(null); // State to store blog data

    // Populate blog data and category items when response data changes
    useEffect(() => {
        if (response?.success && response.data && response.data.length > 0) {
            const previousBlogData = response.data[0] as BlogAPIData;
            setBlogData({ ...(previousBlogData as NewBlogType), previewImage: "" });
            setCategoryItems(previousBlogData.category);
        }
    }, [response]);

    // Submit handler for updating blog data
    const onSubmit: SubmitHandler<NewBlogType> = async () => {
        try {
            if (blogData) {
                // Delete previous image from Cloudinary
                await deletePreviousImage((response?.data as unknown as BlogAPIData)?.image);
                // Upload new image to Cloudinary
                const imageUrl = await uploadImage(blogData.image as File);
                // Update blog data in the database
                await updateBlog({ id: id as string, data: { title: blogData.title, description: blogData.description, image: imageUrl, category: categoryItems } });
                // Show success toast message
                successToast("Blog updated successfully");
                // Navigate to home page after 3 seconds
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        } catch (error) {
            // Handle error
            console.error('Error updating blog:', error);
        }
    };

    return (
        <div className='relative w-screen h-fit overflow-scroll py-10 px-2 bg-slate-100 flex flex-col justify-center items-center lg:p-2 lg:h-screen'>
            {/* Toast component for displaying success messages */}
            <Toaster />
            {/* Close button to navigate back */}
            <CgClose onClick={() => navigate("/")} className='absolute top-2 right-2 text-3xl cursor-pointer hover:text-blue-500 lg:top-5 lg:right-5' />
            {/* Labels for preview and editor sections */}
            <div className='hidden mx-auto h-fit mt-auto mb-4 text-3xl justify-between text-blue-500 font-bold lg:flex lg:w-3/5'>
                <p>Preview</p>
                <p>Editor</p>
            </div>
            {/* Container for blog preview and editor */}
            <div className='h-5/6 w-11/12 mx-auto my-auto bg-white rounded-xl p-2 flex'>
                {/* Left section: Blog preview */}
                <div className='hidden w-1/2 px-5 py-2 h-full flex-col gap-3 border-r-2 border-black overflow-hidden overflow-y-scroll lg:flex'>
                    {blogData && (
                        <>
                            {/* Render blog preview */}
                            <img src={(blogData.image as File).name ? blogData.previewImage as string : blogData.image as string} className='w-1/2 h-1/2' alt="" />
                            {/* Render categories */}
                            <div className='flex gap-2'>
                                {categoryItems.map((category, idx) => (
                                    <span key={idx} className={`${(idx === 0 && "bg-red-200") || (idx === 1 && "bg-yellow-200") || (idx === 2 && "bg-blue-200")} max-w-32 flex items-center justify-between gap-2 px-3 py-2 rounded-xl`}>
                                        {category}
                                    </span>
                                ))}
                            </div>
                            {/* Render title and description */}
                            <h1 className='w-full text-4xl h-fit font-bold'>{blogData.title}</h1>
                            <p className='w-full h-1/3'>{blogData.description}</p>
                        </>
                    )}
                </div>
                {/* Right section: Blog editor */}
                <BlogForm
                    newBlog={blogData as NewBlogType}
                    setNewBlog={setBlogData as React.Dispatch<SetStateAction<NewBlogType>>}
                    onSubmit={onSubmit}
                    statusForm='Update'
                    categoryItems={categoryItems}
                    setCategoryItem={setCategoryItems}
                />
            </div>
        </div>
    );
}

export default UpdateBlog;
