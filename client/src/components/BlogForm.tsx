import { SubmitHandler, useForm } from 'react-hook-form';
import { NewBlogType } from '../utils/type';
import { Dispatch, SetStateAction } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { BlogSchema } from '../utils/schema';

const BlogForm = ({ setNewBlog, newBlog, onSubmit }: {
    setNewBlog: Dispatch<SetStateAction<NewBlogType>>;
    newBlog: NewBlogType;
    onSubmit: SubmitHandler<NewBlogType>;
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<NewBlogType>({
        resolver: yupResolver(BlogSchema)
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setNewBlog(prev => ({
                    ...prev,
                    image: file,
                    previewImage: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-1/3 mx-auto h-full flex flex-col justify-center gap-2'
        >
            <label htmlFor='image' className='block text-lg font-semibold'>
                Upload Blog Post Image
            </label>
            <div className="flex justify-between items-center">
                <input
                    {...register('image')}
                    id="image"
                    type='file'
                    onChange={handleFileChange}
                    className='hidden'
                />
                <button
                    type="button"
                    className="w-fit px-3 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                    onClick={() => document.getElementById("image")?.click()}
                >
                    Browse
                </button>
                <p className='w-4/5'>{newBlog?.image ? (newBlog.image as File).name : "No File Selected"}</p>
            </div>
            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
            <label htmlFor='title' className='text-lg font-semibold'>
                Enter Blog Title
            </label>
            <input
                {...register('title')}
                value={newBlog.title || ''}
                onChange={(e) => setNewBlog(prev => ({ ...prev, title: e.target.value || '' }))}
                className={`w-full px-3 py-2 my-2 shadow-md focus:outline-none border rounded-md placeholder-red-400 ${errors.title ? 'border-red-500' : 'focus:border-blue-500'}`}
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            <label htmlFor='description' className='text-lg font-semibold'>
                Enter Blog Description
            </label>
            <textarea
                {...register('description')}
                value={newBlog.description || ''}
                onChange={(e) => setNewBlog(prev => ({ ...prev, description: e.target.value || '' }))}
                className={`w-full h-1/3 p-2 resize-none shadow-md focus:outline-none border rounded-md placeholder-red-400 ${errors.description ? 'border-red-500' : 'focus:border-blue-500'}`}
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            <button
                type='submit'
                className='w-full px-3 py-2 my-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none'
            >
                Create Blog
            </button>
        </form>
    );
};
export default BlogForm;
