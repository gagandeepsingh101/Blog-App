import { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// type Props = {}

const CreateBlog = () => {
    const [value, setValue] = useState<string>();
    function handleChange(content, delta, source, editor) {
        setValue(editor.getContents());
    }
    console.log(value)
    return (
        <div className='w-screen h-screen overflow-hidden p-2 bg-slate-100 flex flex-col justify-between'>
            <p className='uppercase bg-black text-white text-md px-3 py-2 h-fit w-fit font-bold rounded-lg transition-all duration-300 ease-in-out'>
                lol
            </p>
            <div className='w-3/5 h-[90%]  '>
                <textarea placeholder='New Blog Title Here' className='text-4xl px-3 placeholder:text-black resize-none focus:outline-none w-full h-12 ' />
                <ReactQuill
                    placeholder='Write something about Blog...' className='w-full h-4/5 bg-white' theme='snow' value={value} onChange={handleChange} modules={{
                        toolbar: [
                            [{ 'header': [1, 2, 3, 4, 5] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                            ['link', 'image'],
                            ['clean']
                        ],
                    }} formats={['header',
                        'bold', 'italic', 'underline', 'strike', 'blockquote',
                        'list', 'bullet', 'indent',
                        'link', 'image'
                    ]} ></ReactQuill>
            </div>
        </div>
    )
}
export default CreateBlog