import React from 'react';
import { BiBookmark, BiEdit } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { useParams } from 'react-router-dom';
import { useGetSpecificBlogQuery } from '../services/blogApi';
import { BlogAPIData, BlogAPIResponse, UserInfoType } from '../utils/type';
import { useFormatDate } from '../utils/useFormatDate';
import { useDispatch, useSelector } from 'react-redux';
import { addBookMarkBlogs } from '../features/bookmarkSlice';

const SingleBlog: React.FC = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const { id: userId } = useSelector((state: { auth: UserInfoType }) => state.auth);
    const formatDate = useFormatDate;
    const { data: apiResponse, isLoading, isError } = useGetSpecificBlogQuery(id as string);

    if (!id || isLoading || isError || !apiResponse) {
        return null;
    }
    const { data } = apiResponse as BlogAPIResponse;
    const [blogData] = data as BlogAPIData[];

    return (
        <div className='w-full h-full flex flex-col justify-center items-center py-20 gap-5'>
            <div className=' flex w-11/12 mx-auto h-[10%]'>
                <h1 className='text-4xl font-bold w-11/12 h-full'>{blogData.title}</h1>
                <div className='w-1/12 flex justify-evenly'>
                    {
                        (userId !== blogData.authorId) ? <BiBookmark onClick={() => dispatch(addBookMarkBlogs(blogData))} className="text-3xl text-green-300 hover:text-green-600 cursor-pointer" />
                            : <>
                                <BiEdit className="text-3xl text-blue-300 hover:text-blue-600 cursor-pointer" />
                                <CgClose className="text-3xl text-red-300 hover:text-red-600 cursor-pointer" />
                            </>
                    }
                </div>
            </div>
            <img src={blogData.image} className=' max-w-10/12 h-3/4 rounded-xl ring-blue-500 ring-1 p-1 mx-auto' alt="" />
            <p className='w-8/12 mx-auto font-bold text-2xl flex justify-between text-[#00000068]'><span className='hover:underline hover:text-black'>@ {blogData.authorName}</span> <span>{formatDate(blogData.createdAt.toString())}</span></p>
            <p className='w-11/12 h-fit  my-5 mx-auto text-xl'>{blogData.description}</p>
        </div>
    );
};

export default SingleBlog;
