import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogAPIData } from '../utils/type';
import { useFilterBlog } from '../utils/useFilterBlog';
import { useFormatDate } from '../utils/useFormatDate';

const SearchPage = () => {
    const allBlogs = useSelector((state: { blog: BlogAPIData[] }) => state.blog);
    const [filteredBlogs, setFilteredBlogs] = useState<BlogAPIData[]>([]);
    const searchBlog = useFilterBlog;
    const { searchQuery } = useParams<{ searchQuery: string }>();
    const [newSearchQuery, setNewSearchQuery] = useState(searchQuery || '');
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSearchQuery(e.target.value);
    };
    const formatDate = useFormatDate;

    const handleSearch = () => {
        if (Array.isArray(allBlogs) && newSearchQuery.length > 0) {
            const filtered = searchBlog("search", allBlogs, newSearchQuery);
            setFilteredBlogs(filtered);
        }
        navigate("/search/" + newSearchQuery);
    };

    useEffect(() => {
        if (Array.isArray(allBlogs) && newSearchQuery) {
            const filtered = searchBlog("search", allBlogs, newSearchQuery);
            setFilteredBlogs(filtered);
        }
    }, []);

    return (
        <div className="min-h-screen w-full overflow-y-scroll flex flex-col items-center bg-gray-100">

            <div className='w-full px-3 py-2 sticky top-0 bg-gray-100'>
                <button onClick={() => navigate("/")} className=' rounded-xl text-lg px-3 py-2 bg-black text-white md:text-xl lg:text-2xl'>LOL</button>
                <div  className=' mt-5 w-11/12 mx-auto flex items-center md:w-10/12 lg:w-1/2'>
                    <input
                        type="text"
                        placeholder="Search for blogs..."
                        className="w-10/12 px-4 py-2 mr-2 text-lg text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        value={newSearchQuery}
                        onChange={handleInputChange}
                    />
                    <button
                        className="px-4 py-2 text-lg text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                </div>
            </div>
            <div className=' mx-auto md:w-10/12 lg:w-7/12'>
                {
                    filteredBlogs.map((blog: BlogAPIData) => (
                        <div onClick={() => navigate("/blog/" + blog._id)} key={blog._id} className='text-sm w-11/12 my-4 mx-auto h-40 overflow-hidden flex items-center justify-evenly cursor-pointer bg-white lg:text-base lg:p-2 rounded-xl hover:bg-blue-100 hover:ring-2 hover:ring-blue-500'>
                            <img src={blog.image} className='w-3/12 h-full py-3' alt="" />
                            <div className='w-8/12 h-full flex flex-col gap-2 justify-center lg:py-2'>
                                <h1 className='text-lg font-bold md:text-xl lg:text-2xl'>{blog.title}</h1>
                                <div className='w-full flex gap-2 overflow-x-scroll overflow-y-hidden md:overflow-hidden'>
                                    {blog.category.length > 0 && blog.category.map((category, idx) => (
                                        <span key={idx} className={`${(idx === 0 && "bg-red-200") || (idx === 1 && "bg-yellow-200 ") || (idx === 2 && "bg-blue-200 ")} max-w-32 flex items-center justify-between gap-2 px-2 md:py-1 rounded-xl`}>
                                            {category}
                                        </span>
                                    ))}
                                </div>
                                <p className='w-fit text-slate-500 flex flex-col gap-2 justify-between line-clamp-2'>
                                    <span>@{blog.authorName}</span>
                                    <span>{formatDate(blog.updatedAt)}</span>
                                </p>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default SearchPage;
