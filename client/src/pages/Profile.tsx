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

const Profile = () => {
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
        <div className=' relative w-full h-[90%] flex p-4 flex-col items-center  gap-10  overflow-x-hidden overflow-scroll lg:justify-evenly lg:flex-row'>
            <div className=' sticky top-0  w-full py-3 rounded-xl shadow-md mx-auto   flex flex-col items-center justify-center gap-5 bg-white md:w-7/12 md:h-fit lg:w-1/4 lg:h-4/5'>
                <img src={image} className=' h-32 w-32 rounded-full md:w-40 md:h-40' alt="" />
                <p className='font-bold md:text-3xl'>{name}</p>
                <p className='md:text-xl text-slate-400'>{email}</p>
                <p className=' flex flex-col md:flex-row items-center gap-3'>
                    <FaBirthdayCake className='w-5 h-5' /> <span> Joined On {joinedDate.toString()} </span>
                </p>
            </div>
            <div className='w-11/12 fixed top-[60%]  rounded-xl mx-auto h-[35%] flex flex-col bg-white justify-between items-center md:top-[63%] lg:w-2/3'>
                <div className="w-full h-fit py-2  flex justify-evenly lg:h-[8%]">
                    <p onClick={() => setUserAction("userBlogs")} className={" cursor-pointer h-full w-fit  px-2 flex items-center justify-center md:text-xl" + (userAction === "userBlogs" && " border-b-2 border-blue-500")}>User Blogs</p>
                    <p onClick={() => setUserAction("bookmarkblogs")} className={" cursor-pointer h-full w-fit px-2  flex items-center justify-center md:text-xl" + (userAction === "bookmarkblogs" && " border-b-2 border-blue-500")}>Bookmark Blogs</p>
                </div>
                <div className="w-full h-[90%]  overflow-y-scroll overflow-x-hidden px-3 flex flex-col items-center justify-center gap-4 py-6 lg:h-[90%] ">
                    {userAction === "userBlogs" && ((userBlogs?.data as BlogAPIData[])?.length > 0 ? (userBlogs?.data?.map(blog => (<div className="w-full h-fit px-3 py-2 rounded-xl flex items-center justify-between bg-blue-50 hover:bg-blue-100 lg:h-1/3" key={blog._id}>
                        <img src={blog.image} className="w-2/12 h-32 py-4 " alt="" />
                        <div className="w-6/12 h-5/6">
                            <p onClick={() => navigate("/blog/" + blog._id)} className="text-xl mb-2 font-bold hover:underline">{blog.title}</p>
                            <p className="overflow-hidden line-clamp-3">{blog.description}</p>
                        </div>
                        <div className="w-3/12 h-5/6 flex flex-col justify-evenly items-end lg:justify-between">
                            <span className="hidden lg:block">{formatDate(blog.createdAt)}</span>
                            <BiEdit onClick={() => navigate("/updateBlog/" + blog._id)} className="text-2xl text-blue-300 hover:text-blue-600 cursor-pointer lg:text-3xl"></BiEdit>
                            <FiDelete onClick={async (e) => {
                                e.preventDefault();
                                await deleteImage(blog.image)
                                await deleteUserBlog(blog._id)
                            }} className="text-2xl text-red-300 hover:text-red-600 cursor-pointer lg:text-3xl"></FiDelete>
                        </div>
                    </div>))) : <p>No User Created blog present</p>)}
                    {userAction === "bookmarkblogs" && (bookMarkData.length > 0 ? bookMarkData?.map((blog: BlogAPIData) => (<div className="w-full h-1/3 px-3 py-2 rounded-xl flex items-center justify-between bg-blue-50 hover:bg-blue-100" key={blog._id}>
                        <img src={blog.image} className="w-2/12 h-32 py-4 " alt="" />
                        <div className="w-7/12 h-5/6">
                            <p onClick={() => navigate("/blog/" + blog._id)} className="text-xl font-bold hover:underline">{blog.title}</p>
                            <p className="overflow-hidden line-clamp-3">{blog.description}</p>
                        </div>
                        <div className="w-3/12 h-5/6 flex flex-col justify-between items-end">
                            {formatDate(blog.createdAt.split("T")[0])}
                            <FiDelete onClick={() => {
                                dispatch(removeBookmarksBlog(blog._id))
                            }} className="text-3xl text-red-300 hover:text-red-600 cursor-pointer"></FiDelete>
                        </div>
                    </div>)) : <p>No Bookmark blog present</p>)}
                </div>
            </div>
        </div>
    );
};

export default Profile;
