import { NextFunction, Request, Response } from "express";
import { LogOutRequestBody, ResponseBody } from "../types.js";
import jwt, { JwtPayload } from "jsonwebtoken";
export const authUser = async (req: Request<LogOutRequestBody>, res: Response<ResponseBody>, next: NextFunction) => {
    try {
        const UserAuth = req.headers.cookie || req.headers["authorization"];
        const token = UserAuth?.split("=")[1]
        const publicKey = process.env.SECRET_TOKEN
        if (!UserAuth || !token || !publicKey) {
            return res.status(401).json({
                success: false,
                message: publicKey ? "Authentication Token is required" : "Authentication Token and Public Key is required"
            })
        }
        const decryptedData = jwt.verify(token, publicKey);
        const _id: string = (decryptedData as JwtPayload)._id;
        req.body._id = _id;
        next();
    } catch (error) {
        console.log(error)
    }
}