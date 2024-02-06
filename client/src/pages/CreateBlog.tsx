import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CgClose } from 'react-icons/cg';
import { NewBlogType } from '../utils/type';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const [newBlog, setNewBlog] = useState<NewBlogType>({
        title: "",
        description: "",
        image: "",
        previewImage: "",
    });
    const navigate: NavigateFunction = useNavigate();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<NewBlogType>();
    const onSubmit: SubmitHandler<NewBlogType> = (userData) => {
    };
    return (
        <div className=' relative w-screen h-screen overflow-hidden p-2 bg-slate-100 flex flex-col justify-center items-center '>
            <CgClose onClick={() => {
                reset();
                navigate("/");
            }} className='absolute top-5 right-5 text-3xl cursor-pointer hover:text-blue-500' />
            <div className='w-3/5 mx-auto h-fit mt-auto mb-0 text-3xl flex justify-between text-blue-500 font-bold '>
                <p>Preview</p>
                <p>Editor</p>
            </div>
            <div className='h-5/6 w-11/12 mx-auto my-auto bg-white rounded-xl p-2 flex'>
                <div className='w-1/2 h-full flex flex-col gap-3 border-r-2 border-black overflow-hidden overflow-y-scroll '>
                    {
                        newBlog.description === "" && newBlog.title === "" && newBlog.image === "" && newBlog.previewImage === "" ? "Preview Your Blog Along creating..." : <>
                            <img src={newBlog.previewImage} className='w-1/2 h-1/2' alt="" />
                            <h1 className=' w-full text-4xl h-fit font-bold'>{newBlog.title}</h1>
                            <p className='w-full h-1/3'>{newBlog.description}</p>
                        </>
                    }
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='w-1/3 mx-auto h-full flex flex-col justify-center gap-2 '
                >
                    <label htmlFor='image' className='block text-lg font-semibold'>
                        Upload Blog Post Image
                    </label>
                    <div className="flex justify-between items-center">
                        <input
                            {...register('image')}
                            id="image"
                            type='file'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        setNewBlog((prevChange) => ({
                                            ...prevChange,
                                            image: (e.target.files as FileList)[0],
                                            previewImage: reader.result as string,
                                        }));
                                    };
                                    reader.readAsDataURL(e.target.files[0]);
                                }
                            }}
                            className={`hidden`}
                        />
                        <button type="button" className=" w-fit px-3 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none" onClick={() => document.getElementById("image")?.click()}>
                            Browse
                        </button>
                        <p className='w-4/5'>{newBlog?.image ? (newBlog.image as File).name : "No File Selected"}</p>
                    </div>
                    <label htmlFor='title' className='text-lg font-semibold'>
                        Enter Blog Title
                    </label>
                    <input
                        value={newBlog.title || ''}
                        onChange={(e) => setNewBlog((prevChange) => ({
                            ...prevChange,
                            title: e.target.value || '',
                        }))}
                        className={`w-full px-3 py-2 my-2 shadow-md focus:outline-none border rounded-md placeholder-red-400 ${errors.title?.message ? 'border-red-500' : 'focus:border-blue-500'}`}
                    />
                    <label htmlFor='description' className='text-lg font-semibold'>
                        Enter Blog Description
                    </label>
                    <textarea
                        {...register('description')}
                        value={newBlog.description || ''}
                        onChange={(e) => setNewBlog((prevChange) => ({
                            ...prevChange,
                            description: e.target.value || '',
                        }))}
                        className={`w-full h-1/3 p-2 resize-none shadow-md focus:outline-none border rounded-md placeholder-red-400 ${errors.description?.message ? 'border-red-500' : 'focus:border-blue-500'}`}
                    />
                    <button type='submit' className='w-full px-3 py-2 my-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none'>
                        Create Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
