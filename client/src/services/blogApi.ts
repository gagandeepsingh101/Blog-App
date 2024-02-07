import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, commonHeaders, getAuthorizationHeader } from "../utils/constant";
import { APIResponse, NewBlogType } from "../utils/type";
export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "blogs/" }),
    endpoints: (builder) => ({
        createNewBlog: builder.mutation<APIResponse, NewBlogType>({
            query: (data) => ({
                url: "createBlog",
                method: "POST",
                body: data,
                headers: {
                    ...commonHeaders,
                    ...getAuthorizationHeader(),
                },

            }),
        }),
    }),
});

export const {
    useCreateNewBlogMutation
} = blogApi;
