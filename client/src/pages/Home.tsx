import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BlogAPIData, BlogAPIResponse } from '../utils/type';
import { useFormatDate } from '../utils/useFormatDate';
import { useGetAllBlogQuery } from '../services/blogApi';
import { addBlogData } from '../features/blogSlice';
import { useFilterBlog } from '../utils/useFilterBlog';
import { useRandomQuoteGenerator } from '../utils/useRandomQuotesGenerator';

const Home: React.FC = () => {
    const { data: response } = useGetAllBlogQuery("");
    const dispatch = useDispatch();
    const [filterType, setFilterType] = useState<string>("All");
    const randomQuoteGenerator = useRandomQuoteGenerator;
    const [randomQuote, setRandomQuote] = useState<{ author: string, content: string }>({ author: "", content: "", });
    useEffect(() => {
        randomQuoteGenerator(setRandomQuote);
    }, [randomQuoteGenerator]);

    useEffect(() => {
        if (response && response.success) {
            const { data: blogData } = response as BlogAPIResponse;
            dispatch(addBlogData(blogData));
        }
    }, [dispatch, response]);

    console.log(randomQuote);

    const navigate = useNavigate();
    const blogData = useSelector((state: { blog: BlogAPIData[] }) => state.blog);
    const formatTime = useFormatDate;
    const memoizedFormatTime = useMemo(() => formatTime, [formatTime]);
    const getKey = (blog: BlogAPIData) => blog._id;
    const filterBlog = useFilterBlog;
    const filteredBlogData = Array.isArray(blogData) ? filterBlog(filterType, blogData) : [];

    return (
        <div className='w-full h-[92%] flex justify-evenly overflow-y-scroll'>
            <div className='w-7/12 h-full  py-2'>
                {!response?.success && <p>No Blog Preview</p>}
                {response?.success && filteredBlogData.length > 0 ? filteredBlogData.map((blog: BlogAPIData) => (
                    <div onClick={() => navigate("/blog/" + blog._id)} key={getKey(blog)} className='w-10/12 my-4 mx-auto h-[25%] overflow-hidden flex items-center justify-evenly cursor-pointer bg-white p-2 rounded-xl hover:bg-blue-100 hover:ring-2 hover:ring-blue-500'>
                        <img src={blog.image} className='w-2/12 h-full py-3' alt="" />
                        <div className='w-8/12 h-full flex flex-col justify-between py-2'>
                            <h1 className='text-2xl font-bold'>{blog.title}</h1>
                            <div className='flex gap-2'>
                                {blog.category.length > 0 && blog.category.map((category, idx) => (
                                    <span key={idx} className={`${(idx === 0 && "bg-red-200") || (idx === 1 && "bg-yellow-200 ") || (idx === 2 && "bg-blue-200 ")} max-w-32 flex items-center justify-between gap-2  px-2 py-1 rounded-xl`}>
                                        {category}
                                    </span>
                                ))}
                            </div>
                            <p className='text-slate-500 flex justify-between overflow-hidden line-clamp-2'>
                                <span>@{blog.authorName}</span>
                                <span>{memoizedFormatTime(blog.updatedAt)}</span>
                            </p>
                            <p className='h-1/3 overflow-hidden line-clamp-2'>{blog.description}</p>
                        </div>
                    </div>
                )) : <p>No Filtered Blog Found</p>}
            </div>
            <div className=' sticky top-0 w-3/12 h-full py-3 flex flex-col gap-10'>
                <div className=' w-full h-1/3 bg-white px-3 flex flex-col justify-evenly py-2 rounded-xl'>
                    <h1 className=' w-full h-1/3 text-3xl font-semibold'>Category</h1>
                    <p className='w-full h-1/2 flex flex-wrap'>
                        <span onClick={() => { setFilterType("All") }} className={'text-lg px-3 py-2 border h-fit mx-3 rounded-xl cursor-pointer ' + (filterType === "All" ? "bg-blue-500 text-white" : "border-blue-500")}>All</span>
                        <span onClick={() => { setFilterType("DSA") }} className={'text-lg px-3 py-2 border h-fit mx-3 rounded-xl cursor-pointer ' + (filterType === "DSA" ? "bg-blue-500 text-white" : "border-blue-500")}>DSA</span>
                        <span onClick={() => { setFilterType("Web Dev") }} className={'text-lg px-3 py-2 border h-fit mx-3 rounded-xl cursor-pointer ' + (filterType === "Web Dev" ? "bg-blue-500 text-white" : "border-blue-500")}>Web Dev</span>
                        <span onClick={() => { setFilterType("Fullstack") }} className={'text-lg px-3 py-2 border h-fit mx-3 rounded-xl cursor-pointer ' + (filterType === "Fullstack" ? "bg-blue-500 text-white" : "border-blue-500")}>FullStack</span>
                        <span onClick={() => { setFilterType("Python") }} className={'text-lg px-3 py-2 border h-fit mx-3 rounded-xl cursor-pointer ' + (filterType === "Python" ? "bg-blue-500 text-white" : "border-blue-500")}>Python</span>
                        <span onClick={() => { setFilterType("Java") }} className={'text-lg px-3 py-2 border h-fit mx-3 rounded-xl cursor-pointer ' + (filterType === "Java" ? "bg-blue-500 text-white" : "border-blue-500")}>Java</span>
                        <span onClick={() => { setFilterType("C++") }} className={'text-lg px-3 py-2 border h-fit mx-3 rounded-xl cursor-pointer ' + (filterType === "C++" ? "bg-blue-500 text-white" : "border-blue-500")}>C++</span>
                    </p>
                </div>
                <div className='w-full max-h-full bg-white py-3 flex flex-col gap-5 rounded-xl'>
                    <h1 className=' w-full h-1/4 text-2xl text-center font-semibold'>Random Quote</h1>
                    <div className=' w-full h-1/2 flex flex-col items-center justify-center'>
                        <p className='text-xl font-semibold text-blue-500'>{randomQuote.author}</p>
                        <p className='w-10/12 text-lg font-thin mx-auto text-center'>{randomQuote.content}</p>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default Home;