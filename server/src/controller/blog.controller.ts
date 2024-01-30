import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { BlogModel } from "../modal/Blog.modal.js";
import { BlogRequestBody, ResponseBody, ResponseWithDataBody } from "../types.js";
export async function createNewBlog(req: Request<BlogRequestBody>, res: Response<ResponseBody>) {
    try {
        const UserAuth = req.headers.cookie || req.headers["authorization"];
        const userToken = UserAuth?.split("=")[1];
        const publicKey = process.env.SECRET_TOKEN;
        if (!userToken || !publicKey) {
            return res.json({
                success: false,
                message: publicKey ? "First login to create new blog" : "Internal Server Error"
            });
        }
        const descryptedData = jwt.verify(userToken, publicKey);
        const _id = (descryptedData as JwtPayload)._id; 
        const newBlog = new BlogModel({ ...req.body, authorId: _id });
        await newBlog.save();
        res.status(201).json({
            success: true,
            message: "New Blog was created successfully"
        });

    } catch (error) {
        console.log(error);
    }

}
export async function updateBlog(req: Request<{ id: string; }, {}, BlogRequestBody>, res: Response<ResponseBody>) {
    try {
        const UserAuth = req.headers.cookie || req.headers["authorization"];
        const userToken = UserAuth?.split("=")[1];
        const publicKey = process.env.SECRET_TOKEN;
        if (!userToken || !publicKey) {
            return res.json({
                success: false,
                message: publicKey ? "First login to create new blog" : "Internal Server Error"
            });
        }
        const _id: string = req.params.id;
        const blog = await BlogModel.findByIdAndUpdate({ _id: _id }, { ...req.body });
        if (!blog) {
            return res.json({ success: false, message: "Couldn't find blog" })
        }
        res.status(201).json({
            success: true,
            message: "blog updated successfully"
        });

    } catch (error) {
        console.log(error);
    }
}
export async function deleteBlog(req: Request<{ id: string }>, res: Response<ResponseBody>) {
    try {
        const UserAuth = req.headers.cookie || req.headers["authorization"];
        const userToken = UserAuth?.split("=")[1];
        const publicKey = process.env.SECRET_TOKEN;
        if (!userToken || !publicKey) {
            return res.json({
                success: false,
                message: publicKey ? "First login to create new blog" : "Internal Server Error"
            });
        }
        const _id: string = req.params.id;
        const blog = await BlogModel.findByIdAndDelete({ _id: _id });
        if (!blog) {
            return res.json({ success: false, message: "Couldn't find blog" })
        }
        res.status(201).json({
            success: true,
            message: "Blog deleted successfully"
        });

    } catch (error) {
        console.log(error);
    }
}
export async function getAllBlog(req: Request, res: Response<ResponseWithDataBody>) {
    try {
        const blog = await BlogModel.find({});
        if (blog.length === 0) {
            return res.json({ success: false, message: "No previous blog present", data: [] })
        }
        res.status(200).json({
            success: true,
            message: "Fetched all blog data successfully",
            data: blog
        });

    } catch (error) {
        console.log(error);
    }
}
export async function getAllUserBlog(req: Request<{ userId: string }>, res: Response<ResponseWithDataBody>) {
    try {
        const blog = await BlogModel.find({ authorId: req.params.userId });
        if (blog.length === 0) {
            return res.json({ success: false, message: "No previous blog present", data: [] })
        }
        res.status(200).json({
            success: true,
            message: "Fetched all blog data successfully",
            data: blog
        });

    } catch (error) {
        console.log(error);
    }
}
export async function getSpecificBlog(req: Request<{ blogId: string }>, res: Response<ResponseWithDataBody>) {
    try {
        const blog = await BlogModel.find({ _id: req.params.blogId });
        if (blog.length === 0) {
            return res.json({ success: false, message: "No previous blog present", data: [] })
        }
        res.status(200).json({
            success: true,
            message: "Fetched all blog data successfully",
            data: blog
        });

    } catch (error) {
        console.log(error);
    }
}