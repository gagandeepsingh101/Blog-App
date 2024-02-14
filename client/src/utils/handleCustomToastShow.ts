import toast from "react-hot-toast";

// Function to display success toast
export const successToast = (message: string) => {
    toast.success(message, {
        position: "bottom-right", // Position the toast at the bottom-right corner
        style: {
            border: "1px solid #3b82f6", // Border style
            padding: '16px', // Padding
            color: '#3b82f6', // Text color
        },
        iconTheme: {
            primary: '#3b82f6', // Primary icon color
            secondary: '#FFFAEE', // Secondary icon color
        },
    });
}

// Function to display error toast
export const errorToast = (message: string) => {
    toast.error(message, {
        position: "bottom-right", // Position the toast at the bottom-right corner
        style: {
            border: "1px solid #3b82f6", // Border style
            padding: '16px', // Padding
            color: '#3b82f6', // Text color
        },
        iconTheme: {
            primary: '#3b82f6', // Primary icon color
            secondary: '#FFFAEE', // Secondary icon color
        },
    });
}
