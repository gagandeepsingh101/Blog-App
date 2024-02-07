import { useState } from "react";
import { FaBirthdayCake } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useGetUserSpecificBlogsQuery } from "../services/blogApi";
import { UserInfoType } from '../utils/type';
const Profile = () => {
    const { id, name, email, image, joinedDate } = useSelector((state: { auth: UserInfoType }) => state.auth);
    const { data: userBlogs } = useGetUserSpecificBlogsQuery(id);
    console.log(userBlogs);
    const [userAction, setUserAction] = useState("userBlogs");

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
                    {userAction === "userBlogs" && userBlogs?.data?.map(blog => (<div className="w-full h-1/3 px-3 py-2 rounded-xl flex items-center justify-between bg-blue-50" key={blog._id}>
                        <img src={blog.image} className="w-2/12 h-4/5 " alt="" />
                        <div className="w-7/12 h-5/6">
                            <p className="text-xl font-bold">{blog.title}</p>
                            <p>{blog.description}</p>
                        </div>
                        <div className="w-2/12 h-5/6"></div>
                    </div>))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
