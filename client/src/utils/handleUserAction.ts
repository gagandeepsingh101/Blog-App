import { loginUserActionType } from "./type";
import { useSetCookie } from "./useCookieSetter";

// Import the useSetCookie hook
const setCookie = useSetCookie;

// Function to handle user login action
export const useLoginUserAction = async ({
    userData,
    loginUser, // Function to login user
    reset, // Function to reset form
}: loginUserActionType): Promise<{ joinedDate: string | Date; id: string; image: string; name: string; email: string; } | undefined> => {
    try {
        // Attempt to login user and get response
        const response = await loginUser(userData);
        const { success, token, data } = response.data;
        if (success && token) {
            // If login is successful and token is received, set cookie with token
            setCookie('UserAuth', token, 10); // Set cookie with name 'UserAuth' and expiry time of 10 minutes
            return data; // Return user data
        }
    } catch (error) {
        // Handle error if login fails
        // console.error(error); // Log error to console
    } finally {
        // Reset form fields regardless of success or failure
        reset(); // Reset form fields
    }
}
