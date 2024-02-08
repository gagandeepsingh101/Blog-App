export const useFormatDate = (actualDate: string) => {
    const date: Date = new Date(actualDate);

    const months: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    const formattedDate: string = `${month} ${day}, ${year}`;
    return formattedDate;
}