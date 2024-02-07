import { Action, Dispatch, SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { UseFormReset } from "react-hook-form";


export type UserRegistrationType = {
    username: string;
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
        id: string;
        username: string;
        name: string;
        email: string;
    };
};

export type UserPayload = {
    username?: string;
    name?: string;
    email: string;
    password: string;
};
export interface UserInfoType {
    id:string;
    name: string;
    email: string;
    username: string;
}

export type loginUserActionType = {
    userData: UserLoginType;
    dispatch: Dispatch<Action<"auth/addUserInfo">>;
    loginUser: (
        body: UserPayload,
        options?: {
            onMutate?: () => Promise<void>;
            onSuccess?: (result: { data: APIResponse } | { error: FetchBaseQueryError | SerializedError }) => void;
            onError?: (error: unknown) => void;
        }
    ) => Promise<{ data: APIResponse }>;
    reset: UseFormReset<UserLoginType>;
    profileData: APIResponse | undefined;
};

export type NewBlogType = {
    title: string,
    image: File | string,
    description: string,
    previewImage?: string
}