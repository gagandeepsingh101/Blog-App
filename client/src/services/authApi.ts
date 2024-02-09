import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, commonHeaders, getAuthorizationHeader } from "../utils/constant";
import { APIResponse, UserPayload } from "../utils/type";
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "users/" }),
    tagTypes: ["loginUser"],
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
            invalidatesTags: ["loginUser"]
        }),
        profileUserData: builder.query<APIResponse, string>({
            query: () => ({
                url: "userData",
                headers: {
                    ...commonHeaders,
                    ...getAuthorizationHeader(),
                },
            }),
            providesTags: ["loginUser"]
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
