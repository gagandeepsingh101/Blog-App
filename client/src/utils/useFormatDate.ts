// Function to format a date string into a readable format
export const useFormatDate = (actualDate: string) => {
    // Convert the date string to a Date object
    const date: Date = new Date(actualDate);

    // Array of month names
    const months: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Get the month name, day, and year from the date object
    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    // Construct the formatted date string with month, day, and year
    let formattedDate: string = `${month} ${day}, ${year}`;

    // Get hours, minutes, and AM/PM from the date object
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const ampm: string = hours >= 12 ? 'PM' : 'AM';
    const formattedHours: number = hours % 12 || 12;

    // Append hours, minutes, and AM/PM to the formatted date string
    formattedDate += ` ${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

    // Return the formatted date string
    return formattedDate;
};
