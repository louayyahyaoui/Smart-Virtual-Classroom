import wnd from './window';
import getDocument from './document';
import scrollbarWidth from './scrollbar-width';

export default function windowViewport(element) {
    var win = wnd(element);
    var document = getDocument(element);
    var result = {
        height: win.innerHeight,
        width: win.innerWidth
    };

    if (document.scrollHeight - document.clientHeight > 0) {
        result.width -= scrollbarWidth();
    }

    return result;
}
