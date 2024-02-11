import mongoose, { Schema } from "mongoose";
import { BlogDocument, BlogModelTypes } from "../types.js";
import { UserModel } from "./User.modal.js";

const BlogSchema = new mongoose.Schema<BlogDocument, BlogModelTypes>({
    title: {
        type: String, // Change type declaration from "string" to String
        required: [true, "Please provide a title"]
    },
    description: {
        type: String, // Change type declaration from "string" to String
        required: [true, "Please provide a description"]
    },
    image: {
        type: String, // Change type declaration from "string" to String
        required: [true, "Please provide a blog image"]
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel
    },
    category: {
        type: [String], // Specify the type as an array of strings
        required: [true, "Please provide a category list"]
    },
    authorName: {
        type: String, // Change type declaration from "string" to String
        required: [true, "Please provide an author name"]
    },
    authorEmail: {
        type: String, // Change type declaration from "string" to String
        required: [true, "Please provide an author email address"]
    }
}, { timestamps: true });

export const BlogModel = mongoose.model<BlogDocument, BlogModelTypes>("BlogModel", BlogSchema);
