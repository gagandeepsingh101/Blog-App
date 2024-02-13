import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUserInfo } from '../features/authSlice';
import { clearBookmarksBlog } from '../features/bookmarkSlice';
import { useLoginUserMutation } from '../services/authApi';
import { useLoginUserAction } from '../utils/handleUserAction';
import { LoginSchema } from '../utils/schema';
import { UserLoginType } from '../utils/type';
const Login = () => {
  const [loginUser] = useLoginUserMutation();
  const handleLoginSubmit = useLoginUserAction;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginType>({
    resolver: yupResolver(LoginSchema),
    mode: 'all'
  });
  const onSubmit: SubmitHandler<UserLoginType> = async (userData) => {
    const data = await handleLoginSubmit({ userData, loginUser, reset });
    dispatch(addUserInfo(data));
    dispatch(clearBookmarksBlog());
    navigate("/");
  };
  return (
    <div className='h-screen w-screen bg-slate-100 py-5 flex flex-col items-center justify-evenly'>
      <h1 onClick={() => navigate("/")} className='cursor-pointer w-fit rounded-md font-bold text-center bg-black text-white px-3 py-2 text-xl md:text-2xl lg:text-3xl'>
        LOL
      </h1>
      <h3 className='w-fit  font-bold text-lg hover:underline md:text-xl lg:text-2xl'>
        Login to Lol Blog App
      </h3>
      <form
        action=''
        onSubmit={handleSubmit(onSubmit)}
        className=' w-fit mx-auto h-1/2 flex flex-col justify-center lg:w-[18%] '
      >
        <label htmlFor='email' className=' font-semibold lg:text-lg'>
          Email
        </label>
        <input
          {...register('email')}
          className={`w-full px-3 py-2 my-2 shadow-md focus:outline-none border rounded-md placeholder-red-400 ${errors.email?.message ? 'border-red-500' : 'focus:border-blue-500'}`}
        />
        <p className='text-red-500  h-16'>{errors.email && errors.email?.message}</p>
        <label htmlFor='password' className=' font-semibold lg:text-lg'>
          Password
        </label>
        <input
          {...register('password')}
          className={`w-full px-3 py-2 my-2 shadow-md focus:outline-none border rounded-md placeholder-red-400 ${errors.password?.message ? 'border-red-500' : 'focus:border-blue-500'}`}
        />
        <p className='text-red-500  h-16'>{errors.password?.message}</p>
        <button
          type='submit'
          className='my-4  font-bold text-blue-500 border border-blue-500 py-2 rounded-md w-fit px-5 mx-auto hover:bg-blue-500 hover:text-white lg:text-lg'
        >
          Login
        </button>
      </form>
      <p className='lg:text-lg'>
        New to <span className='font-bold'>LOL</span> blog App ? {' '}
        <span onClick={() => navigate("/register")} className='text-blue-600 cursor-pointer'>Register</span>
      </p>
    </div>
  );
};
export default Login;
