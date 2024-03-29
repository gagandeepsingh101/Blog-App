export const emailValidate: RegExp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
export const passwordValidate: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

export const BASE_URL: string = import.meta.env.VITE_SERVER_URL as string | "http://localhost:8000/api/";


export const commonHeaders = {
    "Content-Type": "application/json",
};



export const getAuthorizationHeader = () => ({
    Authorization: document.cookie,
});

export const UserAuthKey: string = document.cookie.split(" ")[0].split("=")[1];
