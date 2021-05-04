import wnd from './window';
import getDocument from './document';
import scrollbarWidth from './scrollbar-width';

export default function windowViewport(element) {
    const win = wnd(element);
    const document = getDocument(element);
    const result = {
        height: win.innerHeight,
        width: win.innerWidth
    };

    if (document.scrollHeight - document.clientHeight > 0) {
        result.width -= scrollbarWidth();
    }

    return result;
}
