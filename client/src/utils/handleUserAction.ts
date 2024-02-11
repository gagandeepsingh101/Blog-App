import { loginUserActionType } from "./type";
import { useSetCookie } from "./useCookieSetter";
const setCookie = useSetCookie;


export const useLoginUserAction = async ({
    userData,  // Correct the parameter name here
    dispatch,
    loginUser,
    reset,
}: loginUserActionType): Promise<void> => {
    try {
        const { success, token, data } = await loginUser(userData).unwrap();
        if (success && token) {
            setCookie('UserAuth', token, 10);
            return data;
        }
    } catch (error) {
        console.error(error);
    } finally {
        reset();
    }
}