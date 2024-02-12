import { BlogAPIData } from "./type";

export const useFilterBlog = (filterType: string, allBlogs: BlogAPIData[], searchQuery?: string) => {
    // Filter by category if filterType is not "search"
    const filteredByCategory = filterType !== "search" && filterType !== "All"
        ? allBlogs.filter(blog => blog.category.includes(filterType))
        : allBlogs;

    // Search filter
    const filteredBySearch = filterType === "search" && searchQuery
        ? filteredByCategory?.filter(blog =>
            blog.category.includes(searchQuery) ||
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.authorName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : filteredByCategory;

    return filteredBySearch;
}
