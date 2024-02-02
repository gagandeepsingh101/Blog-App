import { useLogOutUserQuery, useProfileUserDataQuery } from '../features/auth/authApi';
import { useSetCookie } from '../utils/useCookieSetter';

const Profile = () => {
    const { data: profileData, isFetching, isLoading, isSuccess } = useProfileUserDataQuery("");
    const setCookie = useSetCookie;
    const logOutUser = useLogOutUserQuery("");

    console.log(profileData, isFetching, isLoading, isSuccess);

    const handleLogout = () => {
        // Ensure that the query has been executed successfully before trying to log out
        if (logOutUser.isSuccess) {
            console.log('Logout response:', logOutUser.data);

            // Assuming that 'UserAuth' is the correct cookie name, modify if needed
            setCookie('UserAuth', document.cookie.split(" ")[0].split("=")[1], 0);  // Setting the cookie to expire immediately
        }
    };

    return (
        <div>
            Profile
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
