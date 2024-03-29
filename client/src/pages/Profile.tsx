import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaBirthdayCake } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteBlogMutation, useGetUserSpecificBlogsQuery } from "../services/blogApi";
import { BlogAPIData, UserInfoType } from '../utils/type';
import { useFormatDate } from "../utils/useFormatDate";
import { useNavigate } from "react-router-dom";
import { removeBookmarksBlog } from "../features/bookmarkSlice";
import { useRemoveImageFromCloud } from "../utils/handleCloudinaryAction";
import { successToast } from "../utils/handleCustomToastShow";

const Profile = () => {
    // Custom hooks and Redux hooks
    const deleteImage = useRemoveImageFromCloud;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [deleteUserBlog] = useDeleteBlogMutation();
    const { id, name, email, image, joinedDate } = useSelector((state: { auth: UserInfoType }) => state.auth);
    const bookMarkData = useSelector((state: { bookmarks: { bookmarksBlog: BlogAPIData[] | [] } }) => state.bookmarks).bookmarksBlog;
    const { data: userBlogs } = useGetUserSpecificBlogsQuery(id);
    const [userAction, setUserAction] = useState("userBlogs");
    const formatDate = useFormatDate;

    return (
        // Main container
        <div className='w-full h-[90%] flex p-4 flex-col items-center gap-10 overflow-x-hidden overflow-scroll lg:flex-row lg:overflow-hidden'>
            {/* Left panel with user information */}
            <div className='w-full lg:w-1/4 p-4 rounded-xl shadow-md mx-auto flex flex-col items-center justify-center gap-5 bg-white lg:h-4/5'>
                <img src={image} className='h-32 w-32 rounded-full md:w-40 md:h-40' alt="" />
                <p className='font-bold md:text-3xl'>{name}</p>
                <p className='md:text-xl text-slate-400'>{email}</p>
                <p className='flex flex-col md:flex-row items-center gap-3'>
                    <FaBirthdayCake className='w-5 h-5' /> <span> Joined On {joinedDate.toString()} </span>
                </p>
            </div>
            {/* Right panel with user blogs or bookmarked blogs */}
            <div className='w-full  px-4 py-2 flex flex-col bg-white justify-between items-center lg:w-2/3 lg:h-5/6'>
                {/* Tabs to switch between user blogs and bookmarked blogs */}
                <div className="w-full h-fit py-2 flex justify-evenly lg:h-[8%]">
                    <p onClick={() => setUserAction("userBlogs")} className={"cursor-pointer h-full w-fit px-2 flex items-center justify-center md:text-xl" + (userAction === "userBlogs" && " border-b-2 border-blue-500")}>User Blogs</p>
                    <p onClick={() => setUserAction("bookmarkblogs")} className={"cursor-pointer h-full w-fit px-2 flex items-center justify-center md:text-xl" + (userAction === "bookmarkblogs" && " border-b-2 border-blue-500")}>Bookmark Blogs</p>
                </div>
                {/* Container for displaying user or bookmarked blogs */}
                <div className="w-full h-[90%]  px-3 flex flex-col items-center gap-4 py-6 lg:overflow-y-scroll lg:overflow-x-hidden">
                    {/* Display user blogs */}
                    {userAction === "userBlogs" && ((userBlogs?.data as BlogAPIData[])?.length > 0 ? (userBlogs?.data?.map(blog => (
                        <div className="w-full h-fit px-1 py-2 rounded-xl flex flex-wrap items-center justify-between bg-blue-50 hover:bg-blue-100 lg:px-3" key={blog._id}>
                            {/* Display blog image */}
                            <img src={blog.image} className="w-2/12 h-32 py-4 " alt="" />
                            <div className="w-9/12 h-5/6 flex flex-col justify-evenly md:w-6/12">
                                {/* Display blog title */}
                                <p onClick={() => navigate("/blog/" + blog._id)} className="text-xl mb-2 font-bold hover:underline text-nowrap truncate">{blog.title}</p>
                                {/* Display blog categories */}
                                <div className='w-full flex flex-wrap gap-2 '>
                                    {blog.category.length > 0 && blog.category.map((category, idx) => (
                                        <span key={idx} className={`${(idx === 0 && "bg-red-200") || (idx === 1 && "bg-yellow-200 ") || (idx === 2 && "bg-blue-200 ")} text-sm w-fit text-nowrap flex items-center justify-between gap-2 px-2 md:py-1 rounded-xl md:max-w-32 lg:text-lg`}>
                                            {category}
                                        </span>
                                    ))}
                                </div>
                                {/* Display blog creation date */}
                                <span className="text-sm lg:text-lg">{formatDate(blog.createdAt)}</span>
                            </div>
                            <div className=" w-full h-fit flex  justify-evenly items-end md:flex-col md:w-3/12 md:h-5/6">
                                {/* Edit and delete buttons */}
                                <BiEdit onClick={() => navigate("/updateBlog/" + blog._id)} className="text-2xl text-blue-300 hover:text-blue-600 cursor-pointer lg:text-3xl"></BiEdit>
                                <FiDelete onClick={async (e) => {
                                    e.preventDefault();
                                    await deleteImage(blog.image)
                                    await deleteUserBlog(blog._id)
                                    successToast("Blog deleted successfully")
                                }} className="text-2xl text-red-300 hover:text-red-600 cursor-pointer lg:text-3xl"></FiDelete>
                            </div>
                        </div>))) : <p>No User Created blog present</p>)}
                    {/* Display bookmarked blogs */}
                    {userAction === "bookmarkblogs" && (bookMarkData.length > 0 ? bookMarkData?.map((blog: BlogAPIData) => (
                        <div className="w-full h-fit px-1 py-2 rounded-xl flex flex-wrap items-center justify-between bg-blue-50 hover:bg-blue-100 lg:px-3" key={blog._id}>
                            {/* Display blog image */}
                            <img src={blog.image} className="w-2/12 h-32 py-4 " alt="" />
                            <div className="w-9/12 h-5/6 flex flex-col justify-evenly md:w-6/12">
                                {/* Display blog title */}
                                <p onClick={() => navigate("/blog/" + blog._id)} className="text-xl mb-2 font-bold hover:underline text-nowrap truncate">{blog.title}</p>
                                {/* Display blog categories */}
                                <div className='w-full flex flex-wrap gap-2 '>
                                    {blog.category.length > 0 && blog.category.map((category, idx) => (
                                        <span key={idx} className={`${(idx === 0 && "bg-red-200") || (idx === 1 && "bg-yellow-200 ") || (idx === 2 && "bg-blue-200 ")} text-sm w-fit text-nowrap flex items-center justify-between gap-2 px-2 md:py-1 rounded-xl md:max-w-32 lg:text-lg`}>
                                            {category}
                                        </span>
                                    ))}
                                </div>
                                {/* Display blog creation date */}
                                <span className="text-sm lg:text-lg">{formatDate(blog.createdAt)}</span>
                            </div>
                            <div className=" w-full h-fit flex  justify-evenly items-end md:flex-col md:w-3/12 md:h-5/6">
                                {/* Delete button for bookmarked blogs */}
                                <FiDelete onClick={() => {
                                    dispatch(removeBookmarksBlog(blog._id))
                                    successToast("Bookmarks deleted successfully")
                                }} className="text-2xl text-red-300 hover:text-red-600 cursor-pointer lg:text-3xl"></FiDelete>
                            </div>
                        </div>)) : <p>No Bookmark blog present</p>)}
                </div>
            </div>
        </div>
    );
};
export default Profile;
