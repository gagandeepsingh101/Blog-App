import { useState } from 'react';
import { FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUserInfo } from '../../features/authSlice';
import { UserAuthKey } from '../../utils/constant';
import { BlogAPIData, UserInfoType } from '../../utils/type';
import { useSetCookie } from '../../utils/useCookieSetter';


const HeaderMenuBox = () => {
    const dispatch = useDispatch();
    const bookMarkData = useSelector((state: { bookmarks: { bookmarksBlog: BlogAPIData[] | [] } }) => state.bookmarks).bookmarksBlog;
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const setCookie = useSetCookie;
    const navigate = useNavigate();
    const { image } = useSelector((state: { auth: UserInfoType }) => state.auth)
    return (
        <>
            <div className='w-10 h-full relative flex items-center justify-center text-blue-500 cursor-pointer'>
                <FaBookmark className='h-2/3 w-1/2' /> <sup className='font-bold absolute -top-2 text-lg -right-1'>{bookMarkData.length}</sup>
            </div>
            <button onClick={toggleMenu}
                className='w-12 h-fit rounded-full p-1 text-blue-500 text-center hover:ring-2 hover:ring-blue-500 transition-all duration-300 ease-in-out'
            >
                <img src={image} className='rounded-full ' alt="" />
            </button>
            {isOpen && (
                <div
                    className=' bg-white absolute top-[70px] right-16 border-2 shadow-md flex flex-col justify-evenly rounded-md w-1/6 h-64 z-50 p-2'
                >
                    <p onClick={() => {
                        navigate("/profile")
                        toggleMenu();
                    }} className=' w-full h-[30%] hover:bg-violet-100 hover:underline hover:text-violet-800 flex flex-col  py-2 text-md rounded-md px-5'>
                        <span className='w-full h-1/2 font-bold'>Profile</span>
                    </p>
                    <p className=' w-full h-[30%] hover:bg-violet-100 hover:underline hover:text-violet-800 flex items-center text-md rounded-md px-5'>BookMark</p>
                    <p onClick={(e) => {
                        e.preventDefault();
                        dispatch(clearUserInfo());
                        setCookie("UserAuth", UserAuthKey, 0);
                        navigate("/");
                        window.location.reload();
                    }}
                        className=' w-full h-[30%] hover:bg-violet-100 hover:underline hover:text-violet-800 flex items-center text-md rounded-md px-5'>Sign Out</p>
                </div>
            )}
        </>
    );
};

export default HeaderMenuBox;
