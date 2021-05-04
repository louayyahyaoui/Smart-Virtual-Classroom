import point from './align-point';

const align = (options) => {
    const { anchorRect, anchorAlign, elementRect, elementAlign, margin = {} } = options;
    const anchorHorizontal = anchorAlign.horizontal;
    const anchorVertical = anchorAlign.vertical;
    const elementHorizontal = elementAlign.horizontal;
    const elementVertical = elementAlign.vertical;

    let horizontalMargin = margin.horizontal || 0;
    let verticalMargin = margin.vertical || 0;

    let top = anchorRect.top;
    let left = anchorRect.left;

    if (anchorVertical === point.bottom) {
        top += anchorRect.height;
    }

    if (anchorVertical === point.center || anchorVertical === point.middle) {
        top += Math.round(anchorRect.height / 2);
    }

    if (elementVertical === point.bottom) {
        top -= elementRect.height;
        verticalMargin *= -1;
    }

    if (elementVertical === point.center || elementVertical === point.middle) {
        top -= Math.round(elementRect.height / 2);
        verticalMargin *= -1;
    }

    if (anchorHorizontal === point.right) {
        left += anchorRect.width;
    }

    if (anchorHorizontal === point.center || anchorHorizontal === point.middle) {
        left += Math.round(anchorRect.width / 2);
    }

    if (elementHorizontal === point.right) {
        left -= elementRect.width;
        horizontalMargin *= -1;
    }

    if (elementHorizontal === point.center || elementHorizontal === point.middle) {
        left -= Math.round(elementRect.width / 2);
        horizontalMargin *= -1;
    }

    return {
        top: top + verticalMargin,
        left: left + horizontalMargin
    };
};

export default align;
