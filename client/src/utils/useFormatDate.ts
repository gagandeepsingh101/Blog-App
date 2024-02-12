export const useFormatDate = (actualDate: string) => {
    const date: Date = new Date(actualDate);

    const months: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    let formattedDate: string = `${month} ${day}, ${year}`;

    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const ampm: string = hours >= 12 ? 'PM' : 'AM';
    const formattedHours: number = hours % 12 || 12;

    formattedDate += ` ${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

    return formattedDate;
}
