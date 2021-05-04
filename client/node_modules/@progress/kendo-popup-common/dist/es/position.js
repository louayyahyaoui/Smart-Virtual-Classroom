import offsetParent from './offset-parent';
import offsetRect from './offset';
import wnd from './window';

var position = function (element, parent) {
    var win = wnd(element);
    var elementStyles = win.getComputedStyle(element);
    var offset = offsetRect(element);
    var parentElement = parent || offsetParent(element);

    var ownerDocument = element.ownerDocument;
    var useRelative = parentElement !== ownerDocument.body && parentElement !== ownerDocument.documentElement;

    var parentOffset = { top: 0, left: 0 };

    if (elementStyles.position !== "fixed" && useRelative) {
        var parentStyles = win.getComputedStyle(parentElement);

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
