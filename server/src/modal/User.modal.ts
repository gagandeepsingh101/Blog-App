import mongoose, { Schema } from "mongoose";
import { UserDocument, UserModelTypes } from "../types.js";

const UserSchema= new mongoose.Schema<UserDocument, UserModelTypes>({
    name: {
        type: String,
        required: [true, "Please provide an actual name"],
    },
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
});

export const UserModel = mongoose.model<UserDocument, UserModelTypes>('UserModel', UserSchema);
export const connect = mongoose.connect;