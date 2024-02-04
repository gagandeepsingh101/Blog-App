import { useSelector } from 'react-redux';
import { UserInfoType } from '../utils/type';
import { FaBookmark } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
const Profile = () => {
    const { name, username } = useSelector((state: { auth: UserInfoType }) => state.auth);
    return (
        <>
            <div className='w-full h-1/5 bg-black'></div>
            <div className='w-3/5 h-2/6 rounded-lg mx-auto  flex flex-col items-center justify-center gap-2 bg-white -translate-y-1/4'>
                <p className='font-bold text-3xl'>@{username}</p>
                <p className='text-xl text-slate-400'>{name}</p>
                <p className='flex items-center gap-3'>
                    <FaBirthdayCake className='w-5 h-5' /> <span> Joined On {"10-10-12"} </span>
                </p>
            </div>
            <div className='w-4/5 mx-auto h-1/5 flex justify-evenly items-center'>
                <div className='w-1/6 h-4/5 rounded-md bg-white flex flex-col gap-2 justify-center items-center'>
                    <FaBookmark className='w-7 h-7' />
                    <p>Total Bookmark : {"0"}</p>
                </div>
                <div className='w-1/6 h-4/5 rounded-md bg-white flex flex-col gap-2 justify-center items-center'>
                    <FaBookmark className='w-7 h-7' />
                    <p>Total Bookmark : {"0"}</p>
                </div>
                <div className='w-1/6 h-4/5 rounded-md bg-white flex flex-col gap-2 justify-center items-center'>
                    <FaBookmark className='w-7 h-7' />
                    <p>Total Bookmark : {"0"}</p>
                </div>
            </div>
        </>
    );
};

export default Profile;
