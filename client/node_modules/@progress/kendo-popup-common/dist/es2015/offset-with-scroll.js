import docElement from './document';
import offset from './offset';
import wnd from './window';

export default (element) => {
    let { top, left, height, width } = offset(element);

    if (width || height) {
        const documentElement = docElement(element);
        const win = wnd(element);

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
