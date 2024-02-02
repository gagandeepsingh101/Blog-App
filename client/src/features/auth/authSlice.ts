import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserInfo {
    name: string,
    email: string,
    username: string,
}
const initialState: UserInfo = {
    name: "",
    email: "",
    username: "",
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUserInfo: (state: UserInfo, item: PayloadAction<UserInfo>) => {
            state = item.payload;
        },
        clearUserInfo: () => {
            return { email: "", username: "", name: "" }
        }
    }
});

export default authSlice;
export const { addUserInfo, clearUserInfo } = authSlice.actions
