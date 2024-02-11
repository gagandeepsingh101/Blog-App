import { Model, ObjectId } from "mongoose"
import { Document } from "mongoose"

export interface UserResponseBody {
    success: boolean,
    token?: string,
    data?: {
        id: ObjectId
        image: string,
        name: string,
        email: string
        joinedDate: Date
    }
    message: string
}
export interface BlogResponseBody {
    success: boolean,
    message: string,
    data?: Array<Object>,
}

export interface RequestBody {
    success: boolean,
    message: string
}
export interface UserType {
    name?: string,
    image?: string,
    email: string,
    password?: string
}
export interface authProtect {
    _id: string,
}

export interface BlogRequestBody {
    "title": string,
    "description": string,
    "image": string
}
export interface BlogRequestParams {
    _id: string,
}

export interface Blog {
    title: string,
    description: string,
    image: string,
    category: []
    authorId: ObjectId,
    authorName: string
    authorEmail: string
    createdAt: Date;
    updatedAt: Date;
}
export interface BlogDocument extends Blog, Document { };
export interface BlogModelTypes extends Model<BlogDocument> { };

export interface User {
    name: string;
    image: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserDocument extends User, Document { }
export interface UserModelTypes extends Model<UserDocument> { }


