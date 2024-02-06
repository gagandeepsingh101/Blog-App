import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../services/authApi';
import { RegisterSchema } from '../utils/schema';
import { UserRegistrationType } from '../utils/type';
const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistrationType>({
    resolver: yupResolver(RegisterSchema),
  });
  const onSubmit: SubmitHandler<UserRegistrationType> = async (userData) => {
    try {
      const response = await registerUser(userData).unwrap();
      console.log(response.message);
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }

  };

  return (
    <div className='h-screen w-screen bg-slate-100 py-5 flex flex-col items-center justify-evenly'>
      <h1 onClick={() => navigate("/")} className='cursor-pointer w-fit rounded-md text-3xl font-bold text-center bg-black text-white px-3 py-2'>
        LOL
      </h1>
      <h3 className='w-fit text-2xl font-bold hover:underline'>
        Register to Lol Blog App
      </h3>
      <form
        action=''
        onSubmit={handleSubmit(onSubmit)}
        className='w-[18%] mx-auto h-[75%] flex flex-col '
      >
        <label htmlFor='username' className='text-lg font-semibold'>
          Username
        </label>
        <input
          {...register('username')}
          className={`w-full px-3 py-2 my-2 shadow-md focus:outline-none border rounded-md placeholder-red-400 ${errors.username?.message ? 'border-red-500' : 'focus:border-blue-500'}`}
        />
        <p className='text-red-500  h-16'>{errors.username?.message}</p>
        <label htmlFor='name' className='text-lg font-semibold'>
          Name
        </label>
        <input
          {...register('name')}
          className={`w-full px-3 py-2 my-2 shadow-md focus:outline-none border rounded-md placeholder-red-400 ${errors.name?.message ? 'border-red-500' : 'focus:border-blue-500'}`}
        />
        <p className='text-red-500  h-16'>{errors.name?.message}</p>
        <label htmlFor='email' className='text-lg font-semibold'>
          Email
        </label>
        <input
          {...register('email')}
          className={`w-full px-3 py-2 my-2 shadow-md focus:outline-none border rounded-md placeholder-red-400 ${errors.email?.message ? 'border-red-500' : 'focus:border-blue-500'}`}
        />
        <p className='text-red-500  h-16'>{errors.email?.message}</p>
        <label htmlFor='password' className='text-lg font-semibold'>
          Password
        </label>
        <input
          {...register('password')}
          className={`w-full px-3 py-2 my-2 shadow-md focus:outline-none border rounded-md placeholder-red-400 ${errors.password?.message ? 'border-red-500' : 'focus:border-blue-500'}`}
        />
        <p className='text-red-500  h-16'>{errors.password?.message}</p>
        <button
          type='submit'
          className='my-4 text-lg font-bold text-blue-500 border border-blue-500 py-2 rounded-md w-fit px-5 mx-auto hover:bg-blue-500 hover:text-white'
        >
          Register
        </button>
      </form>
      <p className='text-lg'>
        Already registered in <span className='font-bold'>LOL</span> blog App ?
        <span onClick={() => navigate("/login")} className='text-blue-600 cursor-pointer'>Log In</span>
      </p>
    </div>
  );
};

export default Register;
