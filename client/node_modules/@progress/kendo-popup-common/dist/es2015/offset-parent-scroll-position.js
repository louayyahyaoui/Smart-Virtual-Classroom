import elementScrollPosition from './element-scroll-position';
import parentScrollPosition from './parent-scroll-position';

export default (offsetParentElement, element) => ( // eslint-disable-line no-arrow-condition
    offsetParentElement ? elementScrollPosition(offsetParentElement) : parentScrollPosition(element)
);
