import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIResponse, UserPayload } from "../utils/type";
import { BASE_URL, commonHeaders, getAuthorizationHeader } from "../utils/constant";
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL+"users/" }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<APIResponse, UserPayload>({
            query: (data) => ({
                url: "register",
                method: "POST",
                body: data,
                headers: commonHeaders,
            }),
        }),
        loginUser: builder.mutation<APIResponse, UserPayload>({
            query: (data) => ({
                url: "login",
                method: "POST",
                body: data,
                headers: commonHeaders,
            }),
        }),
        profileUserData: builder.query<APIResponse, string>({
            query: () => ({
                url: "userData",
                headers: {
                    ...commonHeaders,
                    ...getAuthorizationHeader(),
                },
            }),
        }),
        logOutUser: builder.query<APIResponse, string>({
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
