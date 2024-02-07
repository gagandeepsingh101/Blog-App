export const useFormatDate = () => {
    const dateString = '2024-02-07T04:16:50.095Z';
    const date: Date = new Date(dateString);

    const months: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    const formattedDate: string = `${month} ${day}, ${year}`;
    return formattedDate;
}