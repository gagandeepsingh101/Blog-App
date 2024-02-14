import { Dispatch, SetStateAction } from 'react';
import { FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUserInfo } from '../../features/authSlice';
import { UserAuthKey } from '../../utils/constant';
import { BlogAPIData, UserInfoType } from '../../utils/type';
import { useSetCookie } from '../../utils/useCookieSetter';


const HeaderMenuBox = ({ isOpen, setIsOpen }: {
    isOpen: true,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
    const dispatch = useDispatch();
    const bookMarkData = useSelector((state: { bookmarks: { bookmarksBlog: BlogAPIData[] | [] } }) => state.bookmarks).bookmarksBlog;

    const setCookie = useSetCookie;
    const navigate = useNavigate();
    const { image } = useSelector((state: { auth: UserInfoType }) => state.auth)
    return (
        <>
            <div className='w-10 h-5/6 my-auto relative flex items-center justify-center text-blue-500'>
                <FaBookmark className='h-5/6  w-2/3 my-auto md:w-1/2' /> <sup className='font-bold absolute top-0 md:text-lg md:-top-2  -right-1'>{bookMarkData.length}</sup>
            </div>
            <button onClick={() => setIsOpen(!isOpen)}
                className='rounded-full  text-blue-500 text-center hover:ring-2 hover:ring-blue-500 transition-all duration-300 ease-in-out  h-fit w-10  lg:w-12'
            >
                <img src={image} className='rounded-full ' alt="" />
            </button>
            {isOpen && (
                <div
                    className=' w-1/2 h-48 right-0 top-14 bg-white absolute  border-2 shadow-md flex flex-col justify-evenly rounded-md   z-50 p-2 md:w-1/4 lg:h-64 lg:w-1/6 lg:top-[70px] lg:right-16 '
                >
                    <p onClick={() => {
                        navigate("/profile")
                        setIsOpen(!isOpen);
                    }} className=' w-full h-[30%] hover:bg-violet-100 hover:underline hover:text-violet-800 flex flex-col justify-center  py-2 text-md rounded-md px-5'>
                        Profile
                    </p>
                    <p onClick={() => navigate("/search/" + "All")} className=' w-full h-[30%] hover:bg-violet-100 hover:underline hover:text-violet-800 flex items-center text-md rounded-md px-5'>Search</p>
                    <p onClick={(e) => {
                        e.preventDefault();
                        dispatch(clearUserInfo());
                        setCookie("UserAuth", UserAuthKey, 0);
                        dispatch(clearUserInfo());
                        setIsOpen(!isOpen);
                        navigate("/");
                    }}
                        className=' w-full h-[30%] hover:bg-violet-100 hover:underline hover:text-violet-800 flex items-center text-md rounded-md px-5'>Sign Out</p>
                </div>
            )}
        </>
    );
};

export default HeaderMenuBox;
