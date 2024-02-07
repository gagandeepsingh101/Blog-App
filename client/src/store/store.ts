import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import { authApi } from "../services/authApi";
import { blogApi } from "../services/blogApi";
import blogSlice from "../features/blogSlice";
const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        auth: authSlice.reducer,
        blog: blogSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware, blogApi.middleware]),

},)
export default store;
