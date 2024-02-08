import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { CgClose } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { useCreateNewBlogMutation } from '../services/blogApi';
import { NewBlogType, UserInfoType } from '../utils/type';
import { useUploadImageCloudinary } from '../utils/useUploadImageCloudinary';

const CreateBlog = () => {
    const userInfo = useSelector((state: { auth: UserInfoType }) => state.auth)
    const [createNewBlog] = useCreateNewBlogMutation();
    const uploadImageClouding = useUploadImageCloudinary;
    const [newBlog, setNewBlog] = useState<NewBlogType>({
        title: "",
        description: "",
        image: "",
        previewImage: "",
    });
    const navigate: NavigateFunction = useNavigate();
    const onSubmit: SubmitHandler<NewBlogType> = async () => {
        const imageUrl = await uploadImageClouding(newBlog.image);
        await createNewBlog({ title: newBlog.title, description: newBlog.description, image: imageUrl, authorName: userInfo.name, authorEmail: userInfo.email }).unwrap();
        setNewBlog({
            title: "",
            description: "",
            image: "",
            previewImage: "",
        })
    };

    return (
        <div className=' relative w-screen h-screen overflow-hidden p-2 bg-slate-100 flex flex-col justify-center items-center '>
            <CgClose onClick={() => {
                navigate("/");
            }} className='absolute top-5 right-5 text-3xl cursor-pointer hover:text-blue-500' />
            <div className='w-3/5 mx-auto h-fit mt-auto mb-0 text-3xl flex justify-between text-blue-500 font-bold '>
                <p>Preview</p>
                <p>Editor</p>
            </div>
            <div className='h-5/6 w-11/12 mx-auto my-auto bg-white rounded-xl p-2 flex'>
                <div className='w-1/2 px-5 py-2 h-full flex flex-col gap-3 border-r-2 border-black overflow-hidden overflow-y-scroll '>
                    {
                        newBlog.description === "" && newBlog.title === "" && newBlog.image === "" && newBlog.previewImage === "" ? "Preview Your Blog Along creating..." : <>
                            <img src={newBlog.previewImage} className='w-1/2 h-1/2' alt="" />
                            <h1 className=' w-full text-4xl h-fit font-bold'>{newBlog.title}</h1>
                            <p className='w-full h-1/3'>{newBlog.description}</p>
                        </>
                    }
                </div>
                <BlogForm newBlog={newBlog} setNewBlog={setNewBlog} onSubmit={onSubmit} />
            </div>
        </div>
    );
};

export default CreateBlog;
