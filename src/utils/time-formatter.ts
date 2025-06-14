export function timeFormatter(time: number, locale = navigator.language): string {
    let options: Intl.DateTimeFormatOptions = {};

    if (locale.toLowerCase() === "ru-ru") {
        options = { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", weekday: "short" };
    } else if (locale.toLowerCase() === "en-us") {
        options = { month: 'short', day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true };
    } else {
        options = { day: "numeric", hour: "2-digit", minute: "2-digit", month: 'short' };
    }

    return new Date(time).toLocaleString(locale, options);
}

