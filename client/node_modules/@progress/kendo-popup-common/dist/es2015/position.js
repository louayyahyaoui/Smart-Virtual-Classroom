import offsetParent from './offset-parent';
import offsetRect from './offset';
import wnd from './window';

const position = (element, parent) => {
    const win = wnd(element);
    const elementStyles = win.getComputedStyle(element);
    const offset = offsetRect(element);
    const parentElement = parent || offsetParent(element);

    const ownerDocument = element.ownerDocument;
    const useRelative = parentElement !== ownerDocument.body && parentElement !== ownerDocument.documentElement;

    let parentOffset = { top: 0, left: 0 };

    if (elementStyles.position !== "fixed" && useRelative) {
        const parentStyles = win.getComputedStyle(parentElement);

        parentOffset = offsetRect(parentElement);
        parentOffset.top += parseInt(parentStyles.borderTopWidth, 10);
        parentOffset.left += parseInt(parentStyles.borderLeftWidth, 10);
    }

    return {
        top: offset.top - parentOffset.top,
        left: offset.left - parentOffset.left,
        height: offset.height,
        width: offset.width
    };
};

export default position;
