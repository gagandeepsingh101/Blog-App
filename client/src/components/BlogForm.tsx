import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BlogSchema } from '../utils/schema';
import { NewBlogType } from '../utils/type';
import BlogCategoryList from './BlogCategoryList';

const BlogForm = ({ setNewBlog, newBlog, onSubmit, statusForm, setCategoryItem, categoryItems }: {
    setNewBlog: Dispatch<SetStateAction<NewBlogType>>;
    newBlog: NewBlogType;
    onSubmit: SubmitHandler<NewBlogType>;
    statusForm: string;
    categoryItems: string[];
    setCategoryItem: Dispatch<SetStateAction<string[]>>;
}) => {
    // Initialize react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm<NewBlogType>({
        resolver: yupResolver(BlogSchema) // Apply yup schema validation resolver
    });

    // Function to handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                // Update newBlog state with image file and preview image URL
                setNewBlog(prev => ({
                    ...prev,
                    image: file,
                    previewImage: reader.result as string,
                }));
            };
            reader.readAsDataURL(file); // Read file as data URL
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)} // Call onSubmit function when form is submitted
            className='w-11/12 mx-auto my-auto flex flex-col justify-center gap-4 lg:w-1/3 lg:h-[95%] lg:gap-2'
        >
            {/* Upload blog post image */}
            <label htmlFor='image' className='block font-semibold lg:text-xl'>
                Upload Blog Post Image
            </label>
            <div className="h-1/2 flex justify-between gap-2 items-center border border-blue-700 py-2 px-3 rounded-xl md:h-fit">
                {/* Hidden input for file selection */}
                <input
                    {...register('image')}
                    id="image"
                    type='file'
                    onChange={handleFileChange} // Call handleFileChange when file input changes
                    className='hidden'
                />
                {/* Button to trigger file input click */}
                <button
                    type="button"
                    className="w-fit px-3 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                    onClick={() => document.getElementById("image")?.click()} // Open file input on button click
                >
                    Browse
                </button>
                {/* Display selected file name or placeholder text */}
                <p className='w-4/5'>{newBlog?.image ? (newBlog.image as File).name === undefined ? "Already Upload File" : (newBlog.image as File).name : "No File Selected"}</p>
            </div>
            {/* Display file input validation error */}
            {errors.image && <p className="text-red-500">{errors.image.message}</p>}

            {/* Input field for blog title */}
            <label htmlFor='title' className='font-semibold lg:text-xl lg:mt-4'>
                Enter Blog Title
            </label>
            <input
                {...register('title')}
                value={newBlog?.title || ''}
                onChange={(e) => setNewBlog(prev => ({ ...prev, title: e.target.value || '' }))}
                className={`w-full px-3 py-2 my-2 shadow-md focus:outline-none border rounded-md placeholder-red-400 ${errors.title ? 'border-red-500' : 'focus:border-blue-500'}`}
            />
            {/* Display title input validation error */}
            <p className='text-red-500 h-10 lg:h-16'>{errors.title ? errors.title?.message : ""}</p>

            {/* Input field for blog description */}
            <label htmlFor='description' className='font-semibold lg:text-xl'>
                Enter Blog Description
            </label>
            <textarea
                {...register('description')}
                value={newBlog?.description || ''}
                onChange={(e) => setNewBlog(prev => ({ ...prev, description: e.target.value || '' }))}
                className={`w-full h-32 p-2 resize-none shadow-md focus:outline-none border rounded-md placeholder-red-400 lg:h-3/4 ${errors.description ? 'border-red-500' : 'focus:border-blue-500'}`}
            />
            {/* Display description input validation error */}
            <p className='text-red-500 h-5'>{errors.description ? errors.description.message : ""}</p>

            {/* Render category list component */}
            <BlogCategoryList setCategoryItem={setCategoryItem} categoryItems={categoryItems} />

            {/* Submit button */}
            <button
                type='submit'
                className='w-full px-3 py-2 my-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 lg:w-fit mx-auto lg:text-xl focus:outline-none'
            >
                {statusForm === "Create" && "Create Blog"}
                {statusForm === "Update" && "Update Blog"}
            </button>
        </form>
    );
};

export default BlogForm;
