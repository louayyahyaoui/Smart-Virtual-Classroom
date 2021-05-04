export function convertTimeZone(date, fromOffset, toOffset) {
    const fromLocalOffset = date.getTimezoneOffset();

    const offsetDate = new Date(date.getTime() + (fromOffset - toOffset) * 60000);

    const toLocalOffset = offsetDate.getTimezoneOffset();

    return new Date(offsetDate.getTime() + (toLocalOffset - fromLocalOffset) * 60000);
}

export function adjustDST(date, hours) {
    if (!hours && date.getHours() === 23) {
        date.setHours(date.getHours() + 2);
    }
}