import offsetParentScrollPosition from './offset-parent-scroll-position';
import offsetParent from './offset-parent';
import position from './position';

export default (element, parent, scale = 1) => {
    const offsetParentElement = parent ? offsetParent(parent) : null;
    const { top, left, height, width } = position(element, offsetParentElement);
    const { x, y } = offsetParentScrollPosition(offsetParentElement, element);
    const ownerDocument = element.ownerDocument;
    const positionScale = offsetParentElement === ownerDocument.body || offsetParentElement === ownerDocument.documentElement ? 1 : scale;

    return {
        top: top + y * positionScale,
        left: left + x * positionScale,
        height: height,
        width: width
    };
};
