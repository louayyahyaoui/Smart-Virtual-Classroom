import documentElement from './document';

const offsetParent = (element) => {
    let offsetParent = element.offsetParent;

    while (offsetParent && offsetParent.style.position === "static") {
        offsetParent = offsetParent.offsetParent;
    }

    return offsetParent || documentElement(element);
};

export default offsetParent;
