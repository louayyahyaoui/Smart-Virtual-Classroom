function isFunction(fun) {
    return typeof(fun) === 'function';
}

export default function isDate(value) {
    return Boolean(value) && isFunction(value.getTime) && isFunction(value.getMonth);
}
