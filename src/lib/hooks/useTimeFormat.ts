
export default function useTimeFormat (date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit' 
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}