import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8000/api/users/";

type UserPayload = {
    username?: string;
    name?: string;
    email: string;
    password: string;
};
const commonHeaders = {
    "Content-Type": "application/json",
};

const getAuthorizationHeader = () => ({
    Authorization: document.cookie,
});

export const authApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<object, UserPayload>({
            query: (data) => ({
                url: "register",
                method: "POST",
                body: data,
                headers: commonHeaders,
            }),
        }),
        loginUser: builder.mutation<object, UserPayload>({
            query: (data) => ({
                url: "login",
                method: "POST",
                body: data,
                headers: commonHeaders,
            }),
            
        }),
        profileUserData: builder.query<object, string>({
            query: () => ({
                url: "userData",
                headers: {
                    ...commonHeaders,
                    ...getAuthorizationHeader(),
                },
            }),
        }),
        logOutUser: builder.query<object, string>({
            query: () => ({
                url: "logout",
                headers: {
                    ...commonHeaders,
                    ...getAuthorizationHeader(),
                },
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useProfileUserDataQuery,
    useLogOutUserQuery,
} = authApi;
