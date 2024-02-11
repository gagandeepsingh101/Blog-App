import { Dispatch, SetStateAction, useState } from 'react';
import { CgAdd, CgClose } from 'react-icons/cg';

type Props = {
    categoryItems: string[];
    setCategoryItem: Dispatch<SetStateAction<string[]>>;
};

const BlogCategoryList = ({categoryItems,setCategoryItem}: Props) => {
    const [category, setCategory] = useState<string>("");
    return (
        <div className='my-2 w-full flex flex-col gap-4'>
            <label htmlFor='category' className='text-lg font-semibold'>Category</label>
            <div className='flex gap-4'>
                <div className='flex gap-2'>
                    {categoryItems?.length > 0 && categoryItems?.map((data, idx) => {
                        return (
                            <div key={idx} className={`${(idx === 0 && "bg-red-200") || (idx === 1 && "bg-yellow-200 ") || (idx === 2 && "bg-blue-200 ")} max-w-32 flex items-center justify-between gap-2  px-3 py-2 rounded-xl`}>
                                <span className='truncate max-w-24'>
                                    {data}
                                </span>
                                <CgClose onClick={() => {
                                    setCategoryItem(prevArr => [...prevArr.filter((categoryItem) => categoryItem !== data)]);
                                }} className='w-4 font-bold text-slate-400 hover:text-black ' />
                            </div>
                        );
                    })}
                </div>
                <input placeholder='Add Upto 3 tags' disabled={categoryItems?.length === 3} type="text" className='focus:outline-none h-fit border-2 border-blue-500 rounded-xl p-2 w-11/12' value={category} onChange={(e) => setCategory(e.target.value)} />
                <button type='button' disabled={categoryItems?.length === 3} onClick={() => {
                    setCategoryItem(prevArr => {
                        if (prevArr.includes(category)) {
                            return prevArr
                        }
                        else {
                            return [...prevArr, category];
                        }
                    })
                }} className='text-2xl text-slate-400 hover: hover:text-black'><CgAdd className='w-fit h-fit ' /></button>
            </div>
        </div>
    );
};
export default BlogCategoryList;
