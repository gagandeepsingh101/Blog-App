import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BlogAPIData } from "../utils/type";

interface BookmarkType {
    bookmarksBlog: BlogAPIData[];
}

const initialState: BookmarkType = {
    bookmarksBlog: []
};

const bookmarksBlogSlice = createSlice({
    name: "bookmarks",
    initialState,
    reducers: {
        addBookMarkBlogs: (state, action: PayloadAction<BlogAPIData>) => {
            if (state.bookmarksBlog.find(bookmark => bookmark._id === action.payload._id)) {
                alert("Already added");
                return;
            }

            state.bookmarksBlog.push(action.payload);
        },
        removeBookmarksBlog: (state, action: PayloadAction<string>) => {
            state.bookmarksBlog = [...state.bookmarksBlog.filter(blog => blog._id !== action.payload)];
        },
        clearBookmarksBlog: (state) => {
            state.bookmarksBlog.length = 0;
        }
    }
});

export default bookmarksBlogSlice;
export const { addBookMarkBlogs, removeBookmarksBlog,clearBookmarksBlog } = bookmarksBlogSlice.actions;
