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
    // Fetch all blog data
    const { data: response } = useGetAllBlogQuery("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State for filter type and random quote
    const [filterType, setFilterType] = useState<string>("All");
    const [randomQuote, setRandomQuote] = useState<{ author: string, content: string }>({ author: "", content: "", });

    // Generate a random quote on component mount
    const randomQuoteGenerator = useRandomQuoteGenerator;
    
    // Dispatch fetched blog data to Redux store
    useEffect(() => {
        if (response && response.success) {
            const { data: blogData } = response as BlogAPIResponse;
            dispatch(addBlogData(blogData as BlogAPIData[]));
            randomQuoteGenerator(setRandomQuote);
        }
    }, [dispatch, randomQuoteGenerator, response]);

    // Select blog data from Redux store
    const blogData = useSelector((state: { blog: {blogData:BlogAPIData[]} }) => state.blog.blogData);

    // Memoize date formatting function
    const formatTime = useFormatDate;
    const memoizedFormatTime = useMemo(() => formatTime, [formatTime]);

    // Function to get unique key for each blog
    const getKey = (blog: BlogAPIData) => blog._id;

    // Filter blog data based on selected filter type
    const filterBlog = useFilterBlog;
    const filteredBlogData = Array.isArray(blogData) ? filterBlog(filterType, blogData) : [];

    return (
        <div className='relative w-full h-screen flex justify-evenly overflow-y-scroll'>
            {/* Filter section */}
            <div className='w-11/12 mx-auto h-full py-2 lg:w-7/12'>
                <div className='w-full px-5 sticky left-0 top-2 bg-gray-200 rounded-xl overflow-scroll flex items-center gap-5 justify-center h-20 md:w-full lg:overflow-hidden lg:w-10/12 lg:mx-auto lg:text-lg'>
                    {/* Filter buttons */}
                    <span onClick={() => { setFilterType("All") }} className={'ml-96 px-4 py-2 border w-fit text-center h-fit rounded-xl cursor-pointer md:ml-0 lg:text-lg ' + (filterType === "All" ? "bg-blue-500 text-white" : "border-blue-500")}>All</span>
                    <span onClick={() => { setFilterType("DSA") }} className={'px-4 py-2 border w-fit text-center h-fit rounded-xl cursor-pointer lg:text-lg ' + (filterType === "DSA" ? "bg-blue-500 text-white" : "border-blue-500")}>DSA</span>
                    <span onClick={() => { setFilterType("Web Dev") }} className={'px-4 py-2 w-fit text-center border h-fit rounded-xl cursor-pointer lg:text-lg ' + (filterType === "Web Dev" ? "bg-blue-500 text-white" : "border-blue-500")}>WebDev</span>
                    <span onClick={() => { setFilterType("Full Stack") }} className={'px-4 py-2 w-fit text-center border h-fit rounded-xl cursor-pointer lg:text-lg ' + (filterType === "Fullstack" ? "bg-blue-500 text-white" : "border-blue-500")}>FullStack</span>
                    <span onClick={() => { setFilterType("Python") }} className={'px-4 py-2 w-fit text-center border h-fit rounded-xl cursor-pointer lg:text-lg ' + (filterType === "Python" ? "bg-blue-500 text-white" : "border-blue-500")}>Python</span>
                    <span onClick={() => { setFilterType("Java") }} className={'px-4 py-2 w-fit text-center border h-fit rounded-xl cursor-pointer lg:text-lg ' + (filterType === "Java" ? "bg-blue-500 text-white" : "border-blue-500")}>Java</span>
                    <span onClick={() => { setFilterType("C++") }} className={'px-4 py-2 w-fit text-center border h-fit rounded-xl cursor-pointer lg:text-lg ' + (filterType === "C++" ? "bg-blue-500 text-white" : "border-blue-500")}>C++</span>
                </div>
                {/* Display filtered blog posts */}
                <div className='w-full flex flex-col pb-16'>
                    {/* Show message if no blog present */}
                    {!response?.success && <div className='w-full h-4/5 flex items-center justify-center'>
                        <p className='text-lg text-blue-600 font-semibold md:text-xl lg:text-2xl'>No Blog Present Please Create </p>
                    </div>}
                    {/* Map through filtered blog data and display */}
                    {response?.success && filteredBlogData.length > 0 && filteredBlogData.map((blog: BlogAPIData) => (
                        <div onClick={() => navigate("/blog/" + blog._id)} key={getKey(blog)} className='text-sm w-11/12 my-4 mx-auto h-40 overflow-hidden flex items-center justify-evenly cursor-pointer bg-white lg:text-base lg:p-2 rounded-xl hover:bg-blue-100 hover:ring-2 hover:ring-blue-500'>
                            {/* Display blog information */}
                            <img src={blog.image} className='w-3/12 h-full py-3' alt="" />
                            <div className='w-8/12 h-full flex flex-col gap-2 justify-center lg:py-2'>
                                <h1 className='text-lg text-nowrap truncate font-bold md:text-xl'>{blog?.title}</h1>
                                <div className='w-full flex gap-2 overflow-x-scroll overflow-y-hidden md:overflow-hidden'>
                                    {blog?.category?.length > 0 && blog?.category.map((category, idx) => (
                                        <span key={idx} className={`${(idx === 0 && "bg-red-200") || (idx === 1 && "bg-yellow-200 ") || (idx === 2 && "bg-blue-200 ")} max-w-32 flex items-center justify-between gap-2 px-2 md:py-1 rounded-xl`}>
                                            {category}
                                        </span>
                                    ))}
                                </div>
                                <p className='w-fit text-slate-500 flex flex-col gap-2 justify-between line-clamp-2'>
                                    <span>@{blog?.authorName}</span>
                                    <span>{memoizedFormatTime(blog?.updatedAt)}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                    {/* Show message if no filtered blog found */}
                    {
                        response?.success && filteredBlogData.length === 0 && <div className='w-full h-4/5 flex items-center justify-center'>
                            <p className='text-lg text-blue-600 font-semibold md:text-xl lg:text-2xl'>No Filtered Blog Found </p>
                        </div>
                    }
                </div>
            </div>
            {/* Random quote section */}
            <div className='hidden sticky top-0 w-4/12 h-full items-center justify-center my-auto py-3 flex-col gap-6 lg:flex'>
                <h1 className='w-full h-fit text-2xl text-center font-semibold'>Random Quote</h1>
                <div className='w-full h-fit flex flex-col items-center justify-center'>
                    <p className='text-xl font-semibold text-blue-500'>{randomQuote.author}</p>
                    <p className='w-10/12 text-lg font-thin mx-auto text-center'>{randomQuote.content}</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
