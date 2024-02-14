// Function to filter blogs based on the specified filter type and search query
import { BlogAPIData } from "./type";

export const useFilterBlog = (filterType: string, allBlogs: BlogAPIData[], searchQuery?: string) => {
    // Filter by category if filterType is not "search"
    const filteredByCategory = filterType !== "search" && filterType !== "All"
        ? allBlogs.filter(blog => blog.category.includes(filterType))
        : allBlogs;

    // Search filter
    const filteredBySearch = filterType === "search" && searchQuery
        ? filteredByCategory?.filter(blog =>
            blog.category.includes(searchQuery) || // Filter by category
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || // Filter by title
            blog.description.toLowerCase().includes(searchQuery.toLowerCase()) || // Filter by description
            blog.authorName.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by author name
        )
        : filteredByCategory;

    return filteredBySearch;
};
