import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../services/authApi';
import { RegisterSchema } from '../utils/schema';
import { UserRegistrationType } from '../utils/type';
import { useState } from 'react';
import { useUploadImageCloudinary } from '../utils/useUploadImageCloudinary';

const Register = () => {
  const uploadImageCloudinary = useUploadImageCloudinary;
  const [registerUser] = useRegisterUserMutation();
  const [image, setImage] = useState<File | string>("");
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistrationType>({
    resolver: yupResolver(RegisterSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file || "");
  };

  const onSubmit: SubmitHandler<UserRegistrationType> = async (userData) => {
    try {
      const imageUrl = await uploadImageCloudinary(image);
      const response = await registerUser({ ...userData, image: imageUrl }).unwrap();
      console.log(response.message);
    } catch (error) {
      console.log(error);
    } finally {
      setImage("");
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
      <form onSubmit={handleSubmit(onSubmit)} className='w-[18%] mx-auto h-[75%] flex flex-col'>
        <div className="flex justify-between items-center">
          <input
            id="image"
            type='file'
            onChange={handleImageChange}
            className='hidden'
          />
          <button
            type="button"
            className="w-fit px-3 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            onClick={() => document.getElementById("image")?.click()}
          >
            Browse
          </button>
          <p>{image instanceof File && image.name}</p>
        </div>
        {['name', 'email', 'password'].map((field) => (
          <div key={field}>
            <label htmlFor={field} className='text-lg font-semibold'>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              {...register(field)}
              className={`w-full px-3 py-2 my-2 shadow-md focus:outline-none border rounded-md placeholder-red-400 ${
                errors[field]?.message ? 'border-red-500' : 'focus:border-blue-500'
              }`}
            />
            <p className='text-red-500 h-16'>{errors[field]?.message}</p>
          </div>
        ))}
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
