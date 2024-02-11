import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogAPIData } from "../utils/type";

interface AuthState {
    blogData: Array<BlogAPIData> | BlogAPIData[]; // Define the shape of your state
}

const initialState: AuthState = {
    blogData: [], // Initial state should have an empty array
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        addBlogData: (_state, action: PayloadAction<BlogAPIData>) => {
            return action.payload;
        },
        clearBlogData: (state) => {
            (state.blogData as BlogAPIData[]).length = 0; // Reset the blogData array
        },
    },
});

export default blogSlice; // export the reducer
export const { addBlogData, clearBlogData, updateBlogData } = blogSlice.actions;
