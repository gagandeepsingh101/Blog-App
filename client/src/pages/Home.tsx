import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BlogAPIData, BlogAPIResponse } from '../utils/type';
import { useFormatDate } from '../utils/useFormatDate';
import { useGetAllBlogQuery } from '../services/blogApi';
import { addBlogData } from '../features/blogSlice';

const Home: React.FC = () => {
    const { data: response } = useGetAllBlogQuery("");
    const dispatch = useDispatch();
    useEffect(() => {
        if (response && response.success) {
            const { data: blogData } = response as BlogAPIResponse;
            dispatch(addBlogData(blogData));
        }
    }, [dispatch, response])
    const navigate = useNavigate();
    const blogData = useSelector((state: { blog: BlogAPIData[] }) => state.blog);
    const formatTime = useFormatDate;

    const memoizedFormatTime = useMemo(() => formatTime, []);

    const getKey = (blog: BlogAPIData) => blog._id;

    const hasBlogData = Array.isArray(blogData) && blogData.length > 0;

    return (
        <div className='w-full h-[92%] overflow-y-scroll py-2'>
            {!hasBlogData && <p>No Blog Preview</p>}
            {hasBlogData && blogData.map((blog: BlogAPIData) => (
                <div onClick={() => navigate("/blog/" + blog._id)} key={getKey(blog)} className='w-8/12 my-4 mx-auto h-[25%] overflow-hidden flex items-center justify-evenly cursor-pointer bg-white p-2 rounded-xl hover:bg-blue-100 hover:ring-2 hover:ring-blue-500'>
                    <img src={blog.image} className='w-2/12 h-full py-3' alt="" />
                    <div className='w-8/12 h-full flex flex-col justify-between py-2'>
                        <h1 className='text-2xl font-bold'>{blog.title}</h1>
                        <p className='text-slate-500 flex justify-between overflow-hidden line-clamp-2'>
                            <span>@{blog.authorName}</span>
                            <span>{memoizedFormatTime(blog.updatedAt.split("T")[0])}</span>
                        </p>
                        <p className='h-1/2 overflow-hidden line-clamp-2'>{blog.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
