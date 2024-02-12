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

    console.log(filteredBlogs);

    return (
        <div className="h-screen w-screen overflow-y-scroll flex flex-col gap-5 items-center bg-slate-100">

            <div className='w-full h-fit px-3 py-2 sticky top-0 bg-slate-100'>
                <button onClick={() => navigate("/")} className='  w-fit h-fit mx-auto text-4xl rounded-xl px-3 py-2 bg-black text-white'>LOL</button>
                <div className='w-1/2 mx-auto h-fit px-3 py-2 sticky top-0'>
                    <input
                        type="text"
                        placeholder="Search for blogs..."
                        className="w-10/12 px-4 py-2 mr-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        value={newSearchQuery}
                        onChange={handleInputChange}
                    />
                    <button
                        className="px-4 py-2 text-xl text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                </div>
            </div>
            <div className='w-1/2 h-fit'>
                {
                    filteredBlogs.map((blog: BlogAPIData) => (
                        <div onClick={() => navigate("/blog/" + blog._id)} key={blog._id} className='w-full my-4 mx-auto h-[25%] bgw overflow-hidden flex items-center justify-evenly cursor-pointer bg-white p-2 rounded-xl hover:bg-blue-100 hover:ring-2 hover:ring-blue-500'>
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
                                    <span>{formatDate(blog.updatedAt)}</span>
                                </p>
                                <p className='h-1/3 overflow-hidden line-clamp-2'>{blog.description}</p>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default SearchPage;
