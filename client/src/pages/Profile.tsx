import { useDispatch, useSelector } from 'react-redux';
import { useLogOutUserQuery, useProfileUserDataQuery } from '../features/auth/authApi';
import { useSetCookie } from '../utils/useCookieSetter';
import { useEffect } from 'react';
import { addUserInfo, clearUserInfo } from '../features/auth/authSlice';

const Profile = () => {
    const setCookie = useSetCookie;
    const logOutUser = useLogOutUserQuery("");
    const dispatch = useDispatch();
    const { data: userData, isSuccess } = useProfileUserDataQuery("");
    const { name, email, username } = useSelector(state => state.auth);
    useEffect(() => {
        if (isSuccess && userData && userData.data) {
            dispatch(addUserInfo(userData.data))
        }
    }, [dispatch, isSuccess, userData])


    const handleLogout = () => {
        // Ensure that the query has been executed successfully before trying to log out
        if (logOutUser.isSuccess) {
            console.log(logOutUser.data.message);
            dispatch(clearUserInfo());
            // Assuming that 'UserAuth' is the correct cookie name, modify if needed
            setCookie('UserAuth', document.cookie.split(" ")[0].split("=")[1], 0);  // Setting the cookie to expire immediately
        }
    };


    return (
        <div>
            Profile
            <p>{name && name}</p>
            <p>{username && username}</p>
            <p>{email && email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
