import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaBirthdayCake } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserSpecificBlogsQuery } from "../services/blogApi";
import { BlogAPIData, UserInfoType } from '../utils/type';
import { useFormatDate } from "../utils/useFormatDate";
import { useNavigate } from "react-router-dom";
import { removeBookmarksBlog } from "../features/bookmarkSlice";
const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id, name, email, image, joinedDate } = useSelector((state: { auth: UserInfoType }) => state.auth);
    const bookMarkData = useSelector((state: { bookmarks: { bookmarksBlog: BlogAPIData[] | [] } }) => state.bookmarks).bookmarksBlog;
    const { data: userBlogs } = useGetUserSpecificBlogsQuery(id);
    const [userAction, setUserAction] = useState("userBlogs");
    const formatDate = useFormatDate;
    return (
        <div className='w-full h-[90%] flex p-4 flex-row items-center justify-evenly'>
            <div className='w-1/4 h-4/5 rounded-xl shadow-md mx-auto   flex flex-col items-center justify-center gap-5 bg-white'>
                <img src={image} className='w-40 h-40 rounded-full' alt="" />
                <p className='font-bold text-3xl'>{name}</p>
                <p className='text-xl text-slate-400'>{email}</p>
                <p className='flex items-center gap-3'>
                    <FaBirthdayCake className='w-5 h-5' /> <span> Joined On {joinedDate.toString()} </span>
                </p>
            </div>
            <div className='w-2/3 mx-auto h-5/6 flex flex-col bg-white justify-between items-center'>
                <div className="w-full h-[8%] flex justify-evenly">
                    <p onClick={() => setUserAction("userBlogs")} className={" cursor-pointer h-full w-fit text-xl px-2 flex items-center justify-center " + (userAction === "userBlogs" && " border-b-2 border-blue-500")}>User Blogs</p>
                    <p onClick={() => setUserAction("bookmarkblogs")} className={" cursor-pointer h-full w-fit px-2 text-xl flex items-center justify-center" + (userAction === "bookmarkblogs" && " border-b-2 border-blue-500")}>Bookmark Blogs</p>
                </div>
                <div className="w-full h-[90%] overflow-y-scroll overflow-x-hidden px-3 flex flex-col gap-4 ">
                    {userAction === "userBlogs" && (userBlogs?.data?.length > 0 ? (userBlogs?.data?.map(blog => (<div  className="w-full h-1/3 px-3 py-2 rounded-xl flex items-center justify-between bg-blue-50 hover:bg-blue-100" key={blog._id}>
                        <img src={blog.image} className="w-2/12 h-32 py-4 " alt="" />
                        <div className="w-7/12 h-5/6">
                            <p onClick={() => navigate("/blog/" + blog._id)} className="text-xl font-bold hover:underline">{blog.title}</p>
                            <p className="overflow-hidden line-clamp-4">{blog.description}</p>
                        </div>
                        <div className="w-2/12 h-5/6 flex flex-col justify-between items-end">
                            {formatDate(blog.createdAt.split("T")[0])}
                            <BiEdit className="text-3xl text-blue-300 hover:text-blue-600 cursor-pointer"></BiEdit>
                            <FiDelete className="text-3xl text-red-300 hover:text-red-600 cursor-pointer"></FiDelete>
                        </div>
                    </div>))) : <p>No User Created blog present</p>)}
                    {userAction === "bookmarkblogs" && (bookMarkData.length > 0 ? bookMarkData?.map((blog: BlogAPIData) => (<div className="w-full h-1/3 px-3 py-2 rounded-xl flex items-center justify-between bg-blue-50 hover:bg-blue-100" key={blog._id}>
                        <img src={blog.image} className="w-2/12 h-32 py-4 " alt="" />
                        <div className="w-7/12 h-5/6">
                            <p onClick={() => navigate("/blog/" + blog._id)} className="text-xl font-bold hover:underline">{blog.title}</p>
                            <p className="overflow-hidden line-clamp-4">{blog.description}</p>
                        </div>
                        <div className="w-2/12 h-5/6 flex flex-col justify-between items-end">
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
