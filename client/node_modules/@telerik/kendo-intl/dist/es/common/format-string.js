var formatRegExp = /\{(\d+)}/g;

export default function formatString(format) {
    var values = arguments;

    return format.replace(formatRegExp, function (match, index) {
        var value = values[parseInt(index, 10) + 1];

        return value;
    });
}