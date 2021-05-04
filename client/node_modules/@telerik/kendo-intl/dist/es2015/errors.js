import errorDetails from './error-details';

const formatRegExp = /\{(\d+)}?\}/g;

class IntlError {
    constructor({ name, message }) {
        if (!name || !message) {
            throw new Error("{ name: string, message: string } object is required!");
        }

        this.name = name;
        this.message = message;
    }

    formatMessage(...values) {
        const flattenValues = flatten(values);

        const formattedMessage = this.message.replace(formatRegExp, function(match, index) {
            return flattenValues[parseInt(index, 10)];
        });

        return `${this.name}: ${formattedMessage}`;
    }

    error(...values) {
        return new Error(this.formatMessage(values));
    }
}

const flatten = function(arr) {
    return arr.reduce((a, b) => a.concat(b), []);
};

const toIntlErrors = function(errors) {
    const predicate = function(prev, name) {
        prev[name] = new IntlError({ name, message: errors[name] });
        return prev;
    };

    return Object.keys(errors).reduce(predicate, {});
};

const errors = toIntlErrors(errorDetails);

export {
    errors,
    IntlError,
    toIntlErrors
};
