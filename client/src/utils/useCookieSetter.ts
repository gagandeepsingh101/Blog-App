// Function to set a cookie with the provided key, value, and expiry duration in days
export const useSetCookie = (key: string, value: string, days: number) => {
    // Create a new Date object representing the expiration date
    const expirationDate: Date = new Date();
    expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000); // Add days to the current time in milliseconds

    // Convert the expiration date to a UTC string
    const expires: string = expirationDate.toUTCString();

    // Set the cookie with the provided key, value, and expiry date
    document.cookie = `${key}=${value}; expires=${expires}; path=/`;
};
