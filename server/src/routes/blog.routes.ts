import { Router } from "express";
import { createNewBlog, updateBlog, deleteBlog, getAllBlog, getAllUserBlog, getSpecificBlog } from "../controller/blog.controller.js";

export const blogRouter: Router = Router();

blogRouter.get('/', async (req, res) => {
    try {
        res.json({ success: true });
    } catch (error: any) {
        console.log(error.message);
    }
});

blogRouter.post('/createBlog', createNewBlog);
blogRouter.put('/updateBlog/:id', updateBlog);
blogRouter.delete('/deleteBlog/:id', deleteBlog);
blogRouter.get('/getBlogs', getAllBlog);
blogRouter.get('/getBlogs/specificUser/:userId', getAllUserBlog)
blogRouter.get('/getBlog/specificBlog/:blogId', getSpecificBlog)
