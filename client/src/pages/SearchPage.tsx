import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogAPIData } from '../utils/type';
import { useFilterBlog } from '../utils/useFilterBlog';
import { useFormatDate } from '../utils/useFormatDate';
import { Toaster } from 'react-hot-toast';
import logo from '/public/favicon.ico';

const SearchPage = () => {
    // State and hooks initialization
    const allBlogs = useSelector((state: { blog:{blogData: BlogAPIData[]} }) => state.blog.blogData);
    const [filteredBlogs, setFilteredBlogs] = useState<BlogAPIData[]>([]);
    const searchBlog = useFilterBlog;
    const { searchQuery } = useParams<{ searchQuery: string }>();
    const [newSearchQuery, setNewSearchQuery] = useState(searchQuery || '');
    const navigate = useNavigate();
    const formatDate = useFormatDate;

    // Event handler for input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSearchQuery(e.target.value);
    };

    // Function to handle search
    const handleSearch = () => {
        if (Array.isArray(allBlogs) && newSearchQuery.length > 0) {
            const filtered = searchBlog("search", allBlogs, newSearchQuery);
            setFilteredBlogs(filtered);
        }
        navigate("/search/" + newSearchQuery);
    };

    // Effect for initial search
    useEffect(() => {
        if (Array.isArray(allBlogs) && newSearchQuery) {
            const filtered = searchBlog("search", allBlogs, newSearchQuery);
            setFilteredBlogs(filtered);
        }
    }, []);

    return (
        // Search page layout
        <div className="min-h-screen w-full flex flex-col items-center bg-gray-100">
            <Toaster />
            {/* Header and search input */}
            <div className='w-full px-3 py-2 sticky top-0 bg-gray-100'>
                <img onClick={() => navigate('/')} src={logo} className='w-12 h-12 md:w-16 md:h-16 lg:h-20 lg:w-20' alt="" />
                <div className='mt-5 w-11/12 mx-auto flex items-center md:w-10/12 lg:w-1/2'>
                    {/* Search input */}
                    <input
                        type="text"
                        placeholder="Search for blogs..."
                        className="w-10/12 px-4 py-2 mr-2 text-lg text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        value={newSearchQuery}
                        onChange={handleInputChange}
                    />
                    {/* Search button */}
                    <button
                        className="px-4 py-2 text-lg text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>
            {/* Display filtered blogs */}
            <div className='mx-auto md:w-10/12 lg:w-7/12'>
                {filteredBlogs.map((blog: BlogAPIData) => (
                    <div onClick={() => navigate("/blog/" + blog._id)} key={blog._id} className='text-sm w-11/12 my-4 mx-auto h-40 overflow-hidden flex items-center justify-evenly cursor-pointer bg-white lg:text-base lg:p-2 rounded-xl hover:bg-blue-100 hover:ring-2 hover:ring-blue-500'>
                        <img src={blog.image} className='w-3/12 h-full py-3' alt="" />
                        <div className='w-8/12 h-full flex flex-col gap-2 justify-center lg:py-2'>
                            <h1 className='text-lg font-bold md:text-xl lg:text-2xl'>{blog.title}</h1>
                            <div className='w-full flex gap-2 overflow-x-scroll overflow-y-hidden md:overflow-hidden'>
                                {/* Display blog categories */}
                                {blog.category.length > 0 && blog.category.map((category, idx) => (
                                    <span key={idx} className={`${(idx === 0 && "bg-red-200") || (idx === 1 && "bg-yellow-200 ") || (idx === 2 && "bg-blue-200 ")} max-w-32 flex items-center justify-between gap-2 px-2 md:py-1 rounded-xl`}>
                                        {category}
                                    </span>
                                ))}
                            </div>
                            <p className='w-fit text-slate-500 flex flex-col gap-2 justify-between line-clamp-2'>
                                {/* Display author name and date */}
                                <span>@{blog.authorName}</span>
                                <span>{formatDate(blog.updatedAt)}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
