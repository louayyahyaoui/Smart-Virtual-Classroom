/* eslint-disable no-loop-func */

import parents from './parents';
import siblings from './siblings';

export default (anchor, container) => {
    const parentElements = parents(anchor);
    let containerElement = container;
    let siblingElements;
    let result;

    while (containerElement) {
        siblingElements = siblings(containerElement);

        result = parentElements.reduce(
            (list, p) => list.concat(siblingElements.filter(s => s === p)),
            []
        )[0];

        if (result) { break; }

        containerElement = containerElement.parentElement;
    }

    return result;
};

