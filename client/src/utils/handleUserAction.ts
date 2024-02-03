import { addUserInfo } from "../features/auth/authSlice";
import { loginUserActionType } from "./type";
import { useSetCookie } from "./useCookieSetter";
const setCookie = useSetCookie;


export const useLoginUserAction = async ({
    userData,  // Correct the parameter name here
    dispatch,
    loginUser,
    reset,
    profileData,
}: loginUserActionType): Promise<void> => {
    try {
        const { success, token } = await loginUser(userData).unwrap();
        if (success && token) {
            setCookie('UserAuth', token, 10);
            if (profileData?.data) {
                dispatch(addUserInfo(profileData.data));
            }
        }
    } catch (error) {
        console.error(error);
    } finally {
        reset();
    }
}