const formatRegExp = /\{(\d+)}/g;

export default function formatString(format) {
    const values = arguments;

    return format.replace(formatRegExp, (match, index) => {
        const value = values[parseInt(index, 10) + 1];

        return value;
    });
}