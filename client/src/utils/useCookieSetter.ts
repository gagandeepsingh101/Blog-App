export const useSetCookie = (key: string, value: string, days: number) => {
    const expirationDate: Date = new Date();
    expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);
    const expires: string = expirationDate.toUTCString();

    document.cookie = `${key}=${value}; expires=${expires}; path=/`;
};