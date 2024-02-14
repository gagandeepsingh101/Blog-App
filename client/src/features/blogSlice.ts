import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogAPIData } from "../utils/type";

interface BookmarkType {
    blogData: BlogAPIData[];
}

const initialState: BookmarkType = {
    blogData: []
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        addBlogData: (state, action: PayloadAction<BlogAPIData[]>) => {
            (state.blogData as BlogAPIData[]).length = 0; // Reset the blogData array
            state.blogData.push(...action.payload);
        },
        clearBlogData: (state) => {
            (state.blogData as BlogAPIData[]).length = 0; // Reset the blogData array
        },
    },
});

export default blogSlice; // export the reducer
export const { addBlogData, clearBlogData } = blogSlice.actions;
