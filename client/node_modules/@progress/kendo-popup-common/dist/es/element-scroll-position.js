import scrollPosition from './scroll-position';

export default function (element) {
    if (element === (element.ownerDocument || {}).body) {
        return scrollPosition(element);
    }

    return {
        x: element.scrollLeft,
        y: element.scrollTop
    };
};
