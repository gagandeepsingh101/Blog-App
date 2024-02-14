import React from 'react';
import { BiBookmark, BiEdit } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addBookMarkBlogs } from '../features/bookmarkSlice';
import { useDeleteBlogMutation, useGetSpecificBlogQuery } from '../services/blogApi';
import { useRemoveImageFromCloud } from '../utils/handleCloudinaryAction';
import { BlogAPIData, BlogAPIResponse, UserInfoType } from '../utils/type';
import { useFormatDate } from '../utils/useFormatDate';
import { successToast } from '../utils/handleCustomToastShow';

const SingleBlog: React.FC = () => {
    // Hooks
    const deleteImage = useRemoveImageFromCloud; // Hook to delete image from cloud
    const dispatch = useDispatch(); // Hook to dispatch actions
    const { id } = useParams<{ id: string }>(); // Get route parameter
    const { id: userId } = useSelector((state: { auth: UserInfoType }) => state.auth); // Get user ID from state
    const formatDate = useFormatDate; // Hook to format date
    const { data: apiResponse, isLoading, isError } = useGetSpecificBlogQuery(id as string); // Query to get specific blog
    const [deleteBlog] = useDeleteBlogMutation(); // Mutation to delete a blog
    const navigate = useNavigate(); // Hook for navigation

    // If loading, error, or no data, return null
    if (!id || isLoading || isError || !apiResponse) {
        return null;
    }

    // Extract blog data from API response
    const { data } = apiResponse as BlogAPIResponse;
    const [blogData] = data as BlogAPIData[];

    return (
        <div className='w-full h-[93%] py-4 flex flex-col justify-between items-center gap-5 overflow-y-scroll'>
            {/* Blog title and action buttons */}
            <div className='flex w-11/12 mx-auto items-center justify-between'>
                <h1 className='text-lg font-bold w-4/5 lg:text-3xl'>{blogData.title}</h1>
                <div className='w-1/5 flex gap-2 justify-end'>
                    {/* Check if the user is the author of the blog */}
                    {userId !== blogData.authorId ? (
                        // If not, display bookmark icon
                        <BiBookmark
                            onClick={() => {
                                dispatch(addBookMarkBlogs(blogData)); // Dispatch action to add blog to bookmarks
                                successToast("Bookmark added successfully"); // Show success toast
                            }}
                            className="text-3xl text-green-300 hover:text-green-600 cursor-pointer"
                        />
                    ) : (
                        // If user is the author, display edit and delete icons
                        <>
                            <BiEdit
                                onClick={() => navigate("/updateBlog/" + blogData._id)} // Navigate to update blog page
                                className="text-3xl text-blue-300 hover:text-blue-600 cursor-pointer"
                            />
                            <CgClose
                                onClick={async (e) => {
                                    e.preventDefault();
                                    await deleteImage(blogData.image); // Delete blog image from cloud
                                    await deleteBlog(blogData._id); // Delete the blog
                                    successToast("Blog deleted successfully"); // Show success toast
                                    navigate("/"); // Navigate to home page
                                }}
                                className="text-3xl text-red-300 hover:text-red-600 cursor-pointer"
                            />
                        </>
                    )}
                </div>
            </div>

            {/* Blog categories */}
            <div className='flex gap-3 w-5/6'>
                {blogData?.category.map((categoryItem: string, idx: number) => (
                    <span
                        key={idx}
                        className={`max-w-32 flex items-center justify-between gap-2 px-3 py-2 rounded-xl truncate ${idx === 0 ? "bg-red-200" : idx === 1 ? "bg-yellow-200" : idx === 2 ? "bg-blue-200" : ""}`}
                    >
                        {categoryItem}
                    </span>
                ))}
            </div>

            {/* Blog image */}
            <img src={blogData.image} className='max-w-full h-4/5 rounded-xl ring-blue-500 ring-1 p-1 mx-auto' alt="" />

            {/* Blog author and creation date */}
            <p className='w-11/12 mx-auto font-bold flex flex-col justify-between gap-1 text-gray-600 md:w-8/12 md:flex-row lg:text-xl'>
                <span className='hover:underline hover:text-black'>@ {blogData.authorName}</span>
                <span>{formatDate(blogData.createdAt.toString())}</span>
            </p>

            {/* Blog description */}
            <p className='w-11/12 mb-5 mx-auto text-lg text-gray-800 bg-white p-2 rounded-xl'>{blogData.description}</p>
        </div>
    );
};

export default SingleBlog;
