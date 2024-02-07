import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfoType } from "../utils/type";



const initialState: UserInfoType = {
    id: "",
    name: "",
    email: "",
    username: "",
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUserInfo: (_state, action: PayloadAction<UserInfoType>) => {
            return action.payload;
        },
        clearUserInfo: () => {
            return { id: "", email: "", username: "", name: "" };
        },
    },
});

export default authSlice;
export const { addUserInfo, clearUserInfo } = authSlice.actions;
