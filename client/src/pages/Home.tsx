// Home.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import { BlogAPIData } from '../utils/type';
import { useFormatDate } from '../utils/useFormatDate';

const Home: React.FC = () => {
    const blogData = useSelector((state: { blog: BlogAPIData[] }) => state.blog);
    const formatTime = useFormatDate;

    // Check if blogData is not an array or if it's empty
    const hasBlogData = Array.isArray(blogData) && blogData.length > 0;

    return (
        <div className='h-[92%] w-full flex flex-col gap-10 py-4 '>
            {!hasBlogData && <p>No Blog Preview</p>}
            {hasBlogData && blogData.map((blog: BlogAPIData) => (
                <div key={blog._id} className='w-8/12 mx-auto h-[25%] flex items-center justify-evenly cursor-pointer bg-white p-2 rounded-xl hover:bg-blue-100 hover:ring-2 hover:ring-blue-500'>
                    <img src={blog.image} className='w-2/12 h-full py-3' alt="" />
                    <div className='w-8/12 h-full flex flex-col justify-between py-2'>
                        <h1 className='text-2xl font-bold'>{blog.title}</h1>
                        <p className='text-slate-500 flex justify-between'>
                            <span>@{blog.authorName}</span>
                            <span>{formatTime(blog.updatedAt.split("T")[0])}</span>
                        </p>
                        <p className='h-1/2'>{blog.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
