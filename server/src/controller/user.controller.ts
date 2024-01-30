import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { UserModel } from "../modal/User.modal.js";
import { LogOutRequestBody, LoginRequestBody, RegisterRequestBody, ResponseBody } from "../types.js";
import jwt from "jsonwebtoken";

export async function userRegisterController(req: Request<RegisterRequestBody>, res: Response<ResponseBody>) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new UserModel({ ...req.body, password: hashedPassword });
        await newUser.save();
        const responseBody: ResponseBody = {
            success: true,
            message: "New user registered successfully"
        };
        res.status(201).json(responseBody);
    } catch (error: any) {
        console.log(error.message);
    }
}
export async function userLoginController(req: Request<LoginRequestBody>, res: Response<ResponseBody>) {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(203).json({
                success: false,
                message: "User not found"
            });
        }
        const hasEqualPassword = await bcrypt.compare(req.body.password, user.password);
        if (!hasEqualPassword) {
            return res.status(203).json({
                success: false,
                message: "Invalid password or email address"
            });
        }
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN || "hjshdfdf5443589ejrer");
        res.cookie("UserAuth", token, {
            httpOnly: true,
        }).status(200).json({
            success: true,
            message: user.name + " is login successfully"
        });
    } catch (error: any) {
        console.log(error.message);
    }
}
export async function userLogoutController(req: Request<LogOutRequestBody>, res: Response<ResponseBody>) {
    try {
        const { _id } = req.body;
        const user = await UserModel.findById({ _id: _id });
        if (!user) {
            return res.status(203).json({
                success: false,
                message: "User not found"
            });
        }
        res.clearCookie("UserAuth").status(200).json({
            success: true,
            message: user.name + " is logout successfully"
        });
    } catch (error: any) {
        console.log(error.message);
    }
}