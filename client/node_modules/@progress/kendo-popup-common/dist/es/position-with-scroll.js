import offsetParentScrollPosition from './offset-parent-scroll-position';
import offsetParent from './offset-parent';
import position from './position';

export default function (element, parent, scale) {
    if ( scale === void 0 ) scale = 1;

    var offsetParentElement = parent ? offsetParent(parent) : null;
    var ref = position(element, offsetParentElement);
    var top = ref.top;
    var left = ref.left;
    var height = ref.height;
    var width = ref.width;
    var ref$1 = offsetParentScrollPosition(offsetParentElement, element);
    var x = ref$1.x;
    var y = ref$1.y;
    var ownerDocument = element.ownerDocument;
    var positionScale = offsetParentElement === ownerDocument.body || offsetParentElement === ownerDocument.documentElement ? 1 : scale;

    return {
        top: top + y * positionScale,
        left: left + x * positionScale,
        height: height,
        width: width
    };
};
