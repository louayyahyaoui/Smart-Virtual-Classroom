export default function pad(number, digits = 2, right = false) {
    const count = digits - String(number).length;
    let result = number;

    if (count > 0) {
        const padString = new Array(count + 1).join("0");
        result = right ? number + padString : padString + number;
    }

    return result;
}