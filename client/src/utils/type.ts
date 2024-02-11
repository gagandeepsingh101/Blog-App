import { Action, Dispatch, SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { UseFormReset } from "react-hook-form";


export type UserRegistrationType = {
    name: string;
    email: string;
    password: string;
}

export type UserLoginType = {
    email: string;
    password: string;
}
export type APIResponse = {
    success: boolean;
    message: string;
    token?: string
    data?: {
        joinedDate: string | Date;
        id: string;
        image: string;
        name: string;
        email: string;
    };
};

export type UserPayload = {
    image?: string;
    name?: string;
    email: string;
    password: string;
};
export interface UserInfoType {
    id: string;
    name: string;
    email: string;
    image: string;
    joinedDate: string | Date;
}

export type loginUserActionType = {
    userData: UserLoginType;
    loginUser: (
        body: UserPayload,
        options?: {
            onMutate?: () => Promise<void>;
            onSuccess?: (result: { data: APIResponse } | { error: FetchBaseQueryError | SerializedError }) => void;
            onError?: (error: unknown) => void;
        }
    ) => Promise<{ data: APIResponse }>;
    reset: UseFormReset<UserLoginType>;
};


export type NewBlogType = {
    title: string,
    image: File | string,
    description: string,
    category: string[],
    previewImage?: string
    authorName?: string
    authorEmail?: string
}
export type BlogAPIData = {
    authorEmail: string,
    authorId: string,
    authorName: string,
    category: string[],
    createdAt: string,
    description: string,
    image: string,
    title: string,
    updatedAt: string,
    _id: string
};

export type BlogAPIResponse = {
    success: boolean;
    message: string;
    token?: string
    data?: BlogAPIData[]
};