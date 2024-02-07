import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, commonHeaders, getAuthorizationHeader } from "../utils/constant";
import { BlogAPIResponse, NewBlogType } from "../utils/type";
export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "blogs/" }),
    endpoints: (builder) => ({
        createNewBlog: builder.mutation<BlogAPIResponse, NewBlogType>({
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
        getAllBlog: builder.query<BlogAPIResponse, string>({
            query: () => "getBlogs",
        }),
        getUserSpecificBlogs: builder.query<BlogAPIResponse, string>({
            query: (params) => "getBlogs/specificUser/" + params,
        }),
    }),
});

export const {
    useCreateNewBlogMutation,
    useGetAllBlogQuery,
    useGetUserSpecificBlogsQuery
} = blogApi;


