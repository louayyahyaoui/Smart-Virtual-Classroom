import docElement from './document';
import offset from './offset';
import wnd from './window';

export default function (element) {
    var ref = offset(element);
    var top = ref.top;
    var left = ref.left;
    var height = ref.height;
    var width = ref.width;

    if (width || height) {
        var documentElement = docElement(element);
        var win = wnd(element);

        top += win.pageYOffset - documentElement.clientTop;
        left += win.pageXOffset - documentElement.clientLeft;
    }

    return {
        top: top,
        left: left,
        height: height,
        width: width
    };
};
