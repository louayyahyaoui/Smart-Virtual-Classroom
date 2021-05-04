import elementScrollPosition from './element-scroll-position';
import parentScrollPosition from './parent-scroll-position';

export default function (offsetParentElement, element) { return ( // eslint-disable-line no-arrow-condition
    offsetParentElement ? elementScrollPosition(offsetParentElement) : parentScrollPosition(element)
); };
