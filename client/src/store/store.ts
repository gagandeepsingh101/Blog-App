import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import { authApi } from "../services/authApi";
const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),

},)
export default store;
