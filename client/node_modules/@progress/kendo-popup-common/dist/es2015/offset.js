const rectOfHiddenElement = (element) => {
    const { display, left, position } = element.style;

    element.style.display = '';
    element.style.left = '-10000px';
    element.style.position = 'absolute';

    const rect = element.getBoundingClientRect();

    element.style.display = display;
    element.style.left = left;
    element.style.position = position;

    return rect;
};

const offset = (element) => {
    let rect = element.getBoundingClientRect();
    let { left, top } = rect;

    if (!rect.height && !rect.width) {
        rect = rectOfHiddenElement(element);
    }

    return {
        top: top,
        left: left,
        height: rect.height,
        width: rect.width
    };
};

export default offset;
