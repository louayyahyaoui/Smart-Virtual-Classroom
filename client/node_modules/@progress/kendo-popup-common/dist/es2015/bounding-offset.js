import windowViewport from './window-viewport';

const boundingOffset = (element) => {
    if (!element.getBoundingClientRect) {
        const viewport = windowViewport(element);
        return {
            bottom: viewport.height,
            left: 0,
            right: viewport.width,
            top: 0
        };
    }

    const { bottom, left, right, top } = element.getBoundingClientRect();

    return {
        bottom,
        left,
        right,
        top
    };
};

export default boundingOffset;
