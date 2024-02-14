import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, commonHeaders, getAuthorizationHeader } from "../utils/constant";
import { BlogAPIResponse, NewBlogType } from "../utils/type";
export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "blogs/" }),
    tagTypes: ["BlogPOST","BlogPUT","BlogDELETE"],
    endpoints: (builder) => ({
        createNewBlog: builder.mutation<BlogAPIResponse, NewBlogType>({
            query: (data) => ({
                url: "createBlog",
                method: "POST",
                body: { ...data, createdAt: Date.now(), updatedAt: Date.now() },
                headers: {
                    ...commonHeaders,
                    ...getAuthorizationHeader(),
                },
            }),
            invalidatesTags:["BlogPOST"]
        }),
        deleteBlog: builder.mutation<BlogAPIResponse, string>({
            query: (params) => ({
                url: "deleteBlog/" + params,
                method: "DELETE",
                headers: {
                    ...commonHeaders,
                    ...getAuthorizationHeader(),
                }
            }),
            invalidatesTags:["BlogDELETE"]
        }),
        updateBlog: builder.mutation<BlogAPIResponse, { id: string, data: NewBlogType }>({
            query: ({ id, data }) => ({
                url: "updateBlog/" + id,
                method: "PUT",
                body: { ...data, _id: id },
                headers: {
                    ...commonHeaders,
                    ...getAuthorizationHeader(),
                }
            }),
            invalidatesTags:["BlogPUT"]
        }),

        getAllBlog: builder.query<BlogAPIResponse, string>({
            query: () => "getBlogs",
            providesTags:["BlogPUT","BlogDELETE","BlogPOST"]
        }),
        getUserSpecificBlogs: builder.query<BlogAPIResponse, string>({
            query: (params) => "getBlogs/specificUser/" + params,
            providesTags:["BlogDELETE","BlogPOST","BlogPUT"]
        }),
        getSpecificBlog: builder.query<BlogAPIResponse, string>({
            query: (params) => "getBlog/specificBlog/" + params,
            providesTags:["BlogDELETE","BlogPOST","BlogPUT"]
        }),
    }),
});
export const {
    useCreateNewBlogMutation,
    useGetAllBlogQuery,
    useGetUserSpecificBlogsQuery,
    useGetSpecificBlogQuery,
    useDeleteBlogMutation,
    useUpdateBlogMutation
} = blogApi;


