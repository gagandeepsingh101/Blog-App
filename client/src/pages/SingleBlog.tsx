import React from 'react';
import { BiBookmark, BiEdit } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteBlogMutation, useGetSpecificBlogQuery } from '../services/blogApi';
import { BlogAPIData, BlogAPIResponse, UserInfoType } from '../utils/type';
import { useFormatDate } from '../utils/useFormatDate';
import { useDispatch, useSelector } from 'react-redux';
import { addBookMarkBlogs } from '../features/bookmarkSlice';
import { useRemoveImageFromCloud } from '../utils/handleCloudinaryAction';

const SingleBlog: React.FC = () => {
    const deleteImage = useRemoveImageFromCloud
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const { id: userId } = useSelector((state: { auth: UserInfoType }) => state.auth);
    const formatDate = useFormatDate;
    const { data: apiResponse, isLoading, isError } = useGetSpecificBlogQuery(id as string);
    const [deleteBlog] = useDeleteBlogMutation();
    const navigate = useNavigate();

    if (!id || isLoading || isError || !apiResponse) {
        return null;
    }
    const { data } = apiResponse as BlogAPIResponse;
    const [blogData] = data as BlogAPIData[];

    return (
        <div className='w-full h-full flex flex-col justify-center items-center py-20 gap-5 overflow-y-scroll'>
            <div className=' flex w-11/12 mx-auto h-[10%]'>
                <h1 className='text-4xl font-bold w-11/12 h-full'>{blogData.title}</h1>
                <div className='w-1/12 flex justify-evenly'>
                    {
                        (userId !== blogData.authorId) ? <BiBookmark onClick={() => dispatch(addBookMarkBlogs(blogData))} className="text-3xl text-green-300 hover:text-green-600 cursor-pointer" />
                            : <>
                                <BiEdit onClick={() => navigate("/updateBlog/" + blogData._id)} className="text-3xl text-blue-300 hover:text-blue-600 cursor-pointer" />
                                <CgClose onClick={async (e) => {
                                    e.preventDefault();
                                    await deleteImage(blogData.image)
                                    await deleteBlog(blogData._id)
                                    navigate("/");
                                }} className="text-3xl text-red-300 hover:text-red-600 cursor-pointer" />
                            </>
                    }
                </div>
            </div>
            <img src={blogData.image} className=' max-w-10/12 h-3/4 rounded-xl ring-blue-500 ring-1 p-1 mx-auto' alt="" />
            <div className=' flex gap-3'>
                {
                    (blogData?.category as string[])?.map((categoryItem:string,idx:number)=>(
                        <span key={idx+100} className={`${(idx === 0 && "bg-red-200") || (idx === 1 && "bg-yellow-200 ") || (idx === 2 && "bg-blue-200 ")} max-w-32 flex items-center justify-between gap-2  px-3 py-2 rounded-xl truncate`}>
                            {categoryItem}
                        </span>
                    ))
                }
            </div>
            <p className='w-8/12 mx-auto font-bold text-2xl flex justify-between text-[#00000068]'><span className='hover:underline hover:text-black'>@ {blogData.authorName}</span> <span>{formatDate(blogData.createdAt.toString())}</span></p>
            <p className='w-11/12 h-fit  my-5 mx-auto text-xl'>{blogData.description}</p>
        </div>
    );
};

export default SingleBlog;
