import { SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { CgClose } from 'react-icons/cg';
import { useNavigate, useParams } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { useGetSpecificBlogQuery, useUpdateBlogMutation } from '../services/blogApi';
import { useAddImageCloud } from '../utils/handleCloudinaryAction';
import { BlogAPIData, NewBlogType } from '../utils/type';

const UpdateBlog = () => {
    const uploadImage = useAddImageCloud;
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: response } = useGetSpecificBlogQuery(id as string);
    const [updateBlog] = useUpdateBlogMutation();
    const [blogData, setNewBlogData] = useState<NewBlogType>();

    useEffect(() => {
        if (response && response.success === true) {
            const { data } = response;
            if (data && data.length > 0) {
                const previousBlogData = data[0] as BlogAPIData;
                setNewBlogData({ ...(previousBlogData as NewBlogType), previewImage: "" });
            }
        }
    }, [response]);

    const onSubmit: SubmitHandler<NewBlogType> = async () => {
        try {
            if (blogData) {
                const imageUrl = await uploadImage(blogData?.image as File);
                const response = await updateBlog({ id: id as string, data: { title: blogData.title, description: blogData.description, image: imageUrl } });
                navigate("/");
                document.location.reload();
                console.log(response);
            }
        } catch (error) {
            // Handle error
            console.error('Error updating blog:', error);
        }
    };

    return (
        <div className=' relative w-screen h-screen overflow-hidden p-2 bg-slate-100 flex flex-col justify-center items-center '>
            <CgClose onClick={() => { navigate("/"); }} className='absolute top-5 right-5 text-3xl cursor-pointer hover:text-blue-500' />
            <div className='w-3/5 mx-auto h-fit mt-auto mb-0 text-3xl flex justify-between text-blue-500 font-bold '>
                <p>Preview</p>
                <p>Editor</p>
            </div>
            <div className='h-5/6 w-11/12 mx-auto my-auto bg-white rounded-xl p-2 flex'>
                <div className='w-1/2 px-5 py-2 h-full flex flex-col gap-3 border-r-2 border-black overflow-hidden overflow-y-scroll '>
                    {blogData && (
                        <>
                            <img src={(blogData.image as File).name ? blogData.previewImage as string : blogData.image as string} className='w-1/2 h-1/2' alt="" />
                            <h1 className=' w-full text-4xl h-fit font-bold'>{blogData?.title}</h1>
                            <p className='w-full h-1/3'>{blogData?.description}</p>
                        </>
                    )}
                </div>
                <BlogForm newBlog={blogData as NewBlogType} setNewBlog={setNewBlogData as React.Dispatch<SetStateAction<NewBlogType>>} onSubmit={onSubmit} statusForm='Update' />
            </div>
        </div>
    );
}

export default UpdateBlog;
