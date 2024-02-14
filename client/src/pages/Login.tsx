import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUserInfo } from '../features/authSlice';
import { useLoginUserMutation } from '../services/authApi';
import { successToast } from '../utils/handleCustomToastShow';
import { useLoginUserAction } from '../utils/handleUserAction';
import { LoginSchema } from '../utils/schema';
import { NewBlogType, UserLoginType } from '../utils/type';

const Login = () => {
  // Initialize login user mutation and handle login action hook
  const [loginUser] = useLoginUserMutation();
  const handleLoginSubmit = useLoginUserAction;

  // Initialize navigation and redux dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Initialize react-hook-form with login schema resolver
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginType>({
    resolver: yupResolver(LoginSchema),
    mode: 'all'
  });

  // Handle form submission
  const onSubmit: SubmitHandler<UserLoginType> = async (userData) => {
    // Call login action and wait for response
    const data: NewBlogType = await handleLoginSubmit({ userData, loginUser, reset });
    // Dispatch user info to redux store
    dispatch(addUserInfo(data));
    // Show success toast
    successToast("User Login Successfully");
    // Navigate to home page after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000)
  };

  return (
    <div className='h-screen w-screen bg-slate-100 py-5 flex flex-col items-center justify-evenly'>
      <Toaster />
      {/* DEV Logo */}
      <img onClick={() => navigate('/')} src={"../../../public/favicon.ico"} className='w-12 h-12 md:w-16 md:h-16 lg:h-18 lg:w-18' alt="" />
      {/* Login Header */}
      <h3 className='w-fit font-bold text-lg hover:underline md:text-xl lg:text-2xl'>
        Login to Lol Blog App
      </h3>
      {/* Login Form */}
      <form
        action=''
        onSubmit={handleSubmit(onSubmit)}
        className='w-fit mx-auto h-1/2 flex flex-col justify-center lg:w-[18%] '
      >
        {/* Email Input */}
        <label htmlFor='email' className='font-semibold lg:text-lg'>
          Email
        </label>
        <input
          {...register('email')}
          className={`w-full px-3 py-2 my-2 shadow-md focus:outline-none border rounded-md placeholder-red-400 ${errors.email?.message ? 'border-red-500' : 'focus:border-blue-500'}`}
        />
        <p className='text-red-500 h-16'>{errors.email && errors.email?.message}</p>
        {/* Password Input */}
        <label htmlFor='password' className='font-semibold lg:text-lg'>
          Password
        </label>
        <input
          {...register('password')}
          className={`w-full px-3 py-2 my-2 shadow-md focus:outline-none border rounded-md placeholder-red-400 ${errors.password?.message ? 'border-red-500' : 'focus:border-blue-500'}`}
        />
        <p className='text-red-500 h-16'>{errors.password?.message}</p>
        {/* Submit Button */}
        <button
          type='submit'
          className='my-4 font-bold text-blue-500 border border-blue-500 py-2 rounded-md w-fit px-5 mx-auto hover:bg-blue-500 hover:text-white lg:text-lg'
        >
          Login
        </button>
      </form>
      {/* Register Link */}
      <p className='lg:text-lg'>
        New to <span className='font-bold'>LOL</span> blog App ? {' '}
        <span onClick={() => navigate("/register")} className='text-blue-600 cursor-pointer'>Register</span>
      </p>
    </div>
  );
};

export default Login;
