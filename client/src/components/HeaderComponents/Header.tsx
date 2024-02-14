import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { UserInfoType } from '../../utils/type';
import HeaderMenuBox from './HeaderMenuBox';

const Header: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const [isOpen,setIsOpen]=useState<boolean>(false);
  const { pathname } = useLocation();
  const userInfo = useSelector((state: { auth: UserInfoType }) => state.auth)
  const { register, handleSubmit, reset } = useForm<{ search: string }>();
  const onSubmit: SubmitHandler<{ search: string }> = (data) => {
    if (pathname !== "/search/" + data.search && data.search.length > 0) {
      navigate("/search/" + data.search);
    }
    reset();
  };

  return (
    <div className='w-full h-[8%] z-50 bg-white shadow-md sticky top-0 left-0 flex justify-evenly items-center px-5 md:py-1 lg:py-2 gap-4'>
      <div className='w-5/12 h-full flex gap-4 '>
        <p onClick={() => {
          
          navigate('/');

          
        }} className='uppercase bg-black text-white  h-fit w-fit font-bold rounded-lg transition-all duration-300 ease-in-out my-auto px-3 py-2  md:text-lg  lg:text-xl lg:px-3 lg:py-2'>
          lol
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=' hidden  justify-center  items-center  my-auto border-2 pl-3  border-[#00000017] rounded-lg focus-within:border-blue-500 focus-within:bg-blue-50 transition-all duration-300 ease-in-out md:flex md:h-5/6 lg:h-full lg:w-[58%] '
        >
          <input
            {...register('search')}
            className=' h-4/5 bg-transparent focus-within:outline-none transition-all duration-300 ease-in-out md:w-[80%] lg:w-[87%]'
          />
          <button
            type='submit'
            className=' h-full flex items-center justify-center focus:outline-none rounded-md hover:bg-blue-100 hover:text-blue-900 transition-all duration-300 ease-in-out md:w-[20%] lg:w-[13%]'
          >
            <CiSearch className='md:text-2xl lg:text-3xl' />
          </button>
        </form>
      </div>
      <div className=' w-11/12 flex justify-end gap-4 md:w-7/12 lg:w-5/12 md:h-5/6 lg:h-full '>
        {
          document.cookie && userInfo ? <>
            <button
              onClick={() => navigate("/createBlog")}
              type='button'
              className='text-sm w-2/3 rounded-md border text-blue-500 border-blue-500 text-center hover:bg-blue-500 hover:text-white font-bold transition-all duration-300 ease-in-out focus:outline-none md:w-1/4 lg:w-1/5 lg:text-lg '
            >
              Create Post
            </button>
            <HeaderMenuBox isOpen={isOpen} setIsOpen={setIsOpen}></HeaderMenuBox>

          </> : <>
            <button
              onClick={() => navigate('/login')}
              type='button'
              className=' w-1/3 py-2  rounded-md text-center hover:bg-violet-100 hover:text-violet-500 hover:underline transition-all duration-300 ease-in-out focus:outline-none md:w-1/6 lg:w-2/12 lg:text-lg'
            >
              LogIn
            </button>
            <button
              onClick={() => navigate('/register')}
              type='button'
              className=' w-2/3 py-2 text-sm rounded-md border text-blue-500 border-blue-500 text-center hover:bg-blue-500 hover:text-white font-bold transition-all duration-300 ease-in-out focus:outline-none md:w-4/12 lg:w-1/4 lg:text-lg'
            >
              Create Account
            </button>
          </>
        }
      </div>
    </div>
  );
};

export default Header;
