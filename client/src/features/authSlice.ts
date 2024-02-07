import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfoType } from "../utils/type";



const initialState: UserInfoType = {
    id: "",
    name: "",
    email: "",
    image: "",
    joinedDate: "",
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUserInfo: (_state, action: PayloadAction<UserInfoType>) => {
            return action.payload;
        },
        clearUserInfo: () => {
            return { id: "", email: "", image: "", name: "", joinedDate: "" };
        },
    },
});

export default authSlice;
export const { addUserInfo, clearUserInfo } = authSlice.actions;
