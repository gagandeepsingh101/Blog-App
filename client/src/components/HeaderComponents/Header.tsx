import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { UserInfoType } from '../../utils/type';
import HeaderMenuBox from './HeaderMenuBox';

const Header: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const userInfo = useSelector((state: { auth: UserInfoType }) => state.auth)
  const { register, handleSubmit, reset } = useForm<{ search: string }>();
  const onSubmit: SubmitHandler<{ search: string }> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className='w-full h-[8%] bg-white shadow-md flex justify-evenly items-center px-5 py-2 gap-4'>
      <div className='w-5/12 h-full flex gap-4 '>
        <p className='uppercase bg-black text-white text-xl px-3 py-2 h-fit w-fit font-bold rounded-lg transition-all duration-300 ease-in-out'>
          lol
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-[58%] flex justify-center items-center h-full border-2 pl-3 border-[#00000017] rounded-lg focus-within:border-blue-500 transition-all duration-300 ease-in-out'
        >
          <input
            {...register('search')}
            className='w-[87%] h-full py-3 focus-within:outline-none transition-all duration-300 ease-in-out'
          />
          <button
            type='submit'
            className='w-[13%] h-full flex items-center justify-center rounded-md hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 ease-in-out'
          >
            <CiSearch className='text-3xl' />
          </button>
        </form>
      </div>
      <div className='w-5/12 h-full flex justify-end gap-4'>
        {
          document.cookie && userInfo ? <>
            <button
            onClick={()=>navigate("/createBlog")}
              type='button'
              className='w-1/4 rounded-md border text-blue-500 border-blue-500 text-center hover:bg-blue-500 hover:text-white font-bold transition-all duration-300 ease-in-out'
            >
              Create Post
            </button>
            <HeaderMenuBox></HeaderMenuBox>

          </> : <>
            <button
              onClick={() => navigate('/login')}
              type='button'
              className='w-2/12 rounded-md text-center hover:bg-violet-100 hover:text-violet-500 hover:underline transition-all duration-300 ease-in-out'
            >
              LogIn
            </button>
            <button
              onClick={() => navigate('/register')}
              type='button'
              className='w-1/4 rounded-md border text-blue-500 border-blue-500 text-center hover:bg-blue-500 hover:text-white font-bold transition-all duration-300 ease-in-out'
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
