import docElement from './document';
import wnd from './window';

export default function scrollPosition(element) {
    const documentElement = docElement(element);
    const win = wnd(element);

    return {
        x: win.pageXOffset || documentElement.scrollLeft || 0,
        y: win.pageYOffset || documentElement.scrollTop || 0
    };
}
