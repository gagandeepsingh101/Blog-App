import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { CgClose } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { useCreateNewBlogMutation } from '../services/blogApi';
import { useAddImageCloud } from '../utils/handleCloudinaryAction';
import { NewBlogType, UserInfoType } from '../utils/type';

const CreateBlog = () => {
    const [categoryItems, setCategoryItems] = useState<string[]>([]);
    const userInfo = useSelector((state: { auth: UserInfoType }) => state.auth);
    const [createNewBlog] = useCreateNewBlogMutation();
    const uploadImageClouding = useAddImageCloud;
    const [newBlog, setNewBlog] = useState<NewBlogType>({
        title: "",
        description: "",
        image: "",
        previewImage: "",
        category: [],
    });
    const navigate: NavigateFunction = useNavigate();

    const onSubmit: SubmitHandler<NewBlogType> = async () => {
        if (newBlog.title && newBlog.description && newBlog.image && categoryItems.length > 0) {
            const imageUrl = await uploadImageClouding(newBlog.image);
            await createNewBlog({ title: newBlog.title, description: newBlog.description, image: imageUrl, authorName: userInfo.name, authorEmail: userInfo.email, category: categoryItems }).unwrap();
            setNewBlog({
                title: "",
                description: "",
                image: "",
                previewImage: "",
                category: []
            });
            setCategoryItems([]);
            navigate("/");
        } else {
            console.log('Please fill out all required fields.');
        }
    };

    return (
        <div className='relative w-screen h-fit overflow-scroll py-10 px-2  bg-slate-100 flex flex-col justify-center items-center lg:p-2 lg:h-screen'>
            <CgClose onClick={() => navigate("/")} className='absolute top-2 right-2 text-3xl cursor-pointer hover:text-blue-500 lg:top-5 lg:right-5' />
            <div className=' hidden mx-auto h-fit mt-auto mb-4 text-3xl justify-between text-blue-500 font-bold lg:flex lg:w-3/5'>
                <p>Preview</p> 
                <p>Editor</p>
            </div>
            <div className='h-5/6 w-11/12 mx-auto my-auto bg-white rounded-xl p-2 flex'>
                <div className='hidden w-1/2 px-5 py-2 h-full  flex-col gap-3 border-r-2 border-black overflow-hidden overflow-y-scroll lg:flex'>
                    {
                        newBlog.description === "" && newBlog.title === "" && newBlog.image === "" && newBlog.previewImage === "" ? "Preview Your Blog Along creating..." : <>
                            <img src={newBlog.previewImage} className='w-1/2 h-1/2' alt="" />
                            <div className='flex gap-2'>{
                                categoryItems.length > 0 && categoryItems.map((category, idx) => (<span className={`${(idx === 0 && "bg-red-200") || (idx === 1 && "bg-yellow-200 ") || (idx === 2 && "bg-blue-200 ")} max-w-32 flex items-center justify-between gap-2  px-3 py-2 rounded-xl`}>
                                    {category}
                                </span>))
                            }</div>
                            <h1 className='w-full text-4xl h-fit font-bold'>{newBlog.title}</h1>
                            <p className='w-full h-1/3'>{newBlog.description}</p>
                        </>
                    }
                </div>
                <BlogForm
                    newBlog={newBlog}
                    setNewBlog={setNewBlog}
                    onSubmit={onSubmit}
                    statusForm='Create'
                    setCategoryItem={setCategoryItems}
                    categoryItems={categoryItems}
                />
            </div>
        </div>
    );
};

export default CreateBlog;