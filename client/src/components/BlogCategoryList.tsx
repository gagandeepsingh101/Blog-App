import { Dispatch, SetStateAction, useState } from 'react';
import { CgAdd, CgClose } from 'react-icons/cg';

type Props = {
    categoryItems: string[];
    setCategoryItem: Dispatch<SetStateAction<string[]>>;
};

const BlogCategoryList = ({ categoryItems, setCategoryItem }: Props) => {
    // State to manage input field value
    const [category, setCategory] = useState<string>("");

    return (
        <div className='my-2 w-full flex flex-col gap-4'>
            {/* Label for category */}
            <label htmlFor='category' className='text-lg font-semibold md:text-xl'>Category</label>
            <div className='flex gap-4 flex-col md:flex-row'>
                <div className='flex gap-2 overflow-x-scroll md:overflow-visible '>
                    {/* Render existing category items */}
                    {categoryItems?.length > 0 && categoryItems?.map((data, idx) => {
                        return (
                            <div key={idx} className={`${(idx === 0 && "bg-red-200") || (idx === 1 && "bg-yellow-200 ") || (idx === 2 && "bg-blue-200 ")} flex items-center justify-between gap-2  px-3 py-2 rounded-xl md:max-w-32 `}>
                                <span className='truncate max-w-24'>
                                    {data}
                                </span>
                                {/* Remove category item */}
                                <CgClose onClick={() => {
                                    setCategoryItem(prevArr => [...prevArr.filter((categoryItem) => categoryItem !== data)]);
                                }} className='w-4 font-bold text-slate-400 hover:text-black ' />
                            </div>
                        );
                    })}
                </div>
                <div className='flex w-full gap-4 items-center justify-center  '>
                    {/* Dropdown for selecting new category */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        disabled={categoryItems?.length === 3}
                        className='focus:outline-none h-fit border-2 border-blue-500 rounded-xl p-2 w-10/12 md:w-11/12'
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="DSA">DSA</option>
                        <option value="Web Dev">Web Dev</option>
                        <option value="Full Stack">Full Stack</option>
                        <option value="Java">JAVA</option>
                        <option value="Python">Pyhton</option>
                        <option value="C++">C++</option>
                    </select>
                    {/* Button to add new category */}
                    <button
                        type='button'
                        disabled={categoryItems?.length === 3}
                        onClick={() => {
                            // Add new category if not already present
                            if (category && !categoryItems.includes(category)) {
                                setCategoryItem(prevArr => [...prevArr, category]);
                                setCategory(""); // Reset input field after selection
                            }
                        }}
                        className='text-2xl text-slate-400 hover: hover:text-black'
                    >
                        <CgAdd className='w-fit h-fit' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogCategoryList;
