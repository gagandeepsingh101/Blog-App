import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { UserModel } from "../modal/User.modal.js";
import { UserResponseBody, UserType } from "../types.js";
import jwt from "jsonwebtoken";

export async function userRegisterController(req: Request<UserType>, res: Response<UserResponseBody>) {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            return res.status(203).json({
                success: false,
                message: "User already registered"
            })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new UserModel({ ...req.body, password: hashedPassword });
        await newUser.save();
        const UserResponseBody: UserResponseBody = {
            success: true,
            message: "New user registered successfully"
        };
        res.status(201).json(UserResponseBody);
    } catch (error: any) {
        console.log(error.message);
    }
}
export async function userLoginController(req: Request<UserType>, res: Response<UserResponseBody>) {
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
        if (!process.env.SECRET_TOKEN) {
            return res.status(503).json({ success: false, message: "Please provide a secret token in server" })
        }
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
        res.cookie("UserAuth", token, {
            httpOnly: true,
        }).status(200).json({
            success: true,
            token: token,
            message: user.name + " is login successfully"
        });
    } catch (error: any) {
        console.log(error.message);
    }
}
export async function userLogoutController(req: Request<UserType>, res: Response<UserResponseBody>) {
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
export async function userDataController(req: Request<UserType>, res: Response<UserResponseBody>) {
    try {
        const { _id } = req.body;
        const user = await UserModel.findById({ _id: _id });
        if (!user) {
            return res.status(203).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                joinedDate:user.createdAt
            },
            message: "fetched user info successfully"
        });
    } catch (error: any) {
        console.log(error.message);
    }
}