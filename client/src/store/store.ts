import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import { authApi } from "../services/authApi";
import { blogApi } from "../services/blogApi";
import blogSlice from "../features/blogSlice";
import bookmarksBlogSlice from "../features/bookmarkSlice";
const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [authSlice.name]: authSlice.reducer,
        [blogSlice.name]: blogSlice.reducer,
        [bookmarksBlogSlice.name]: bookmarksBlogSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware, blogApi.middleware]),

},)
export default store;
