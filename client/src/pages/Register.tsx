import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../services/authApi';
import { useAddImageCloud } from '../utils/handleCloudinaryAction';
import { RegisterSchema } from '../utils/schema';
import { UserRegistrationType } from '../utils/type';
import { errorToast, successToast } from '../utils/handleCustomToastShow';

const Register = () => {
  // Hooks for handling user registration
  const uploadImageCloudinary = useAddImageCloud;
  const [registerUser] = useRegisterUserMutation();
  const [image, setImage] = useState<File | string>("");
  const navigate = useNavigate();

  // Form handling using react-hook-form
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistrationType>({
    resolver: yupResolver(RegisterSchema),
  });

  // Function to handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file || "");
  };

  // Function to handle form submission
  const onSubmit: SubmitHandler<UserRegistrationType> = async (userData) => {
    try {
      // Upload image to cloudinary and register user
      if (image) {
        const imageUrl = await uploadImageCloudinary(image);
        const response = await registerUser({ ...userData, image: imageUrl }).unwrap();
        successToast(response.message || "User successfully registered"); // Fixed typo in logical OR operator
        setTimeout(() => {
          navigate("/login");
        })
      }
      else{
        errorToast("Please provide all fields");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Reset image and form fields
      setImage("");
      reset();
    }
  };

  return (
    // Registration form
    <div className='h-fit w-screen bg-slate-100 py-5 flex flex-col gap-6 items-center justify-evenly md:overflow-y-scroll lg:h-screen lg:overflow-hidden'>
      {/* Header */}
      <h1 onClick={() => navigate("/")} className='cursor-pointer w-fit rounded-md font-bold text-center bg-black text-white px-3 py-2 text-xl md:text-2xl lg:text-3xl'>
        LOL
      </h1>
      {/* Registration title */}
      <h3 className='w-fit font-bold text-lg hover:underline md:text-xl lg:text-2xl'>
        Register to Lol Blog App
      </h3>
      {/* Registration form */}
      <form onSubmit={handleSubmit(onSubmit)} className='mx-auto h-fit flex flex-col lg:h-[75%] lg:w-[18%]'>
        {/* Profile image upload */}
        <div className="flex justify-between items-center gap-2 border rounded-xl my-3 border-blue-400 px-3 py-2">
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
          {/* Display selected image name */}
          <p>{image === "" ? "Profile Image" : (image as File).name}</p>
        </div>
        {/* Form inputs for name, email, and password */}
        {['name', 'email', 'password'].map((field) => (
          <div key={field}>
            <label htmlFor={field} className='text-lg font-semibold'>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              {...register(field as "name" | "password" | "email")}
              className={`w-full px-3 py-2 shadow-md focus:outline-none border rounded-md placeholder-red-400 ${errors[field as "name" | "password" | "email"]?.message ? 'border-red-500' : 'focus:border-blue-500'
                }`}
            />
            {/* Display validation errors */}
            <p className='text-red-500 h-10 lg:h-16'>{errors[field as "name" | "password" | "email"]?.message}</p>
          </div>
        ))}
        {/* Submit button */}
        <button
          type='submit'
          className=' text-lg font-bold text-blue-500 border border-blue-500 py-2 rounded-md w-fit px-5 mx-auto hover:bg-blue-500 hover:text-white'
        >
          Register
        </button>
      </form>
      {/* Link to login page */}
      <p className='lg:text-lg'>
        Already registered in <span className='font-bold'>LOL</span> blog App ?
        <span onClick={() => navigate("/login")} className='text-blue-600 cursor-pointer'>Log In</span>
      </p>
    </div>
  );
};
export default Register;
