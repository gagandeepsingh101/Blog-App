import mongoose, { Schema } from "mongoose";
import { BlogDocument, BlogModelTypes } from "../types.js";
import { UserModel } from "./User.modal.js";


const BlogSchema: Schema<BlogDocument, BlogModelTypes> = new mongoose.Schema({
    title: {
        type: "string",
        required: [true, "Please provide a title"]
    },
    description: {
        type: "string",
        required: [true, "Please provide a description"]
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel
    }
})

export const BlogModel = mongoose.model<BlogDocument, BlogModelTypes>("BlogModel", BlogSchema)