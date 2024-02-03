import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfoType } from "../../utils/type";



const initialState: UserInfoType = {
    name: "",
    email: "",
    username: "",
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUserInfo: (state, action: PayloadAction<UserInfoType>) => {
            return action.payload;
        },
        clearUserInfo: (state) => {
            return { email: "", username: "", name: "" };
        },
    },
});

export default authSlice; // Use .reducer to get the reducer function
export const { addUserInfo, clearUserInfo } = authSlice.actions;
