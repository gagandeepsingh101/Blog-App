import mongoose, { Schema } from "mongoose";
import { UserDocument, UserModelTypes } from "../types.js";

const UserSchema = new mongoose.Schema<UserDocument, UserModelTypes>({
    name: {
        type: String,
        required: [true, "Please provide an actual name"],
    },
    image: {
        type: String,
        required: [true, "Please provide a user profile image"],
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
}, { timestamps: true });

export const UserModel = mongoose.model<UserDocument, UserModelTypes>('UserModel', UserSchema);
export const connect = mongoose.connect;