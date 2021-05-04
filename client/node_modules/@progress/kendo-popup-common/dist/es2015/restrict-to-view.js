import alignPoint from './align-point';
import collision from './collision';

const fit = function(position, size, viewPortSize) {
    let output = 0;

    if (position + size > viewPortSize) {
        output = viewPortSize - (position + size);
    }

    if (position < 0) {
        output = -position;
    }

    return output;
};

const flip = function({ offset, size, anchorSize, viewPortSize, anchorAlignPoint, elementAlignPoint, margin }) {
    let output = 0;

    const isPositionCentered = elementAlignPoint === alignPoint.center || elementAlignPoint === alignPoint.middle;
    const isOriginCentered = anchorAlignPoint === alignPoint.center || anchorAlignPoint === alignPoint.middle;
    const marginToAdd = 2 * margin; //2x to keep margin after flip

    if (elementAlignPoint !== anchorAlignPoint && !isPositionCentered && !isOriginCentered) {
        const isBeforeAnchor = anchorAlignPoint === alignPoint.top || anchorAlignPoint === alignPoint.left;
        if (offset < 0 && isBeforeAnchor) {
            output = size + anchorSize + marginToAdd;
            if (offset + output + size > viewPortSize) {
                output = 0; //skip flip
            }
        } else if (offset >= 0 && !isBeforeAnchor) {
            if (offset + size > viewPortSize) {
                output += -(anchorSize + size + marginToAdd);
            }

            if (offset + output < 0) {
                output = 0; //skip flip
            }
        }
    }

    return output;
};

const restrictToView = (options) => {
    const { anchorRect, anchorAlign, elementRect, elementAlign, collisions, viewPort, margin = {} } = options;
    const { top: elementTop, left: elementLeft, height: elementHeight, width: elementWidth } = elementRect;
    const { height: viewPortHeight, width: viewPortWidth } = viewPort;
    const horizontalMargin = margin.horizontal || 0;
    const verticalMargin = margin.vertical || 0;

    let left = 0;
    let top = 0;

    const isHorizontalFlip = collisions.horizontal === collision.flip;
    const isVerticalFlip = collisions.vertical === collision.flip;

    if (collisions.vertical === collision.fit) {
        top += fit(elementTop, elementHeight, viewPortHeight);
    }

    if (collisions.horizontal === collision.fit) {
        left += fit(elementLeft, elementWidth, viewPortWidth);
    }

    if (isVerticalFlip) {
        top += flip({
            margin: verticalMargin,
            offset: elementTop,
            size: elementHeight,
            anchorSize: anchorRect.height,
            viewPortSize: viewPortHeight,
            anchorAlignPoint: anchorAlign.vertical,
            elementAlignPoint: elementAlign.vertical
        });
    }

    if (isHorizontalFlip) {
        left += flip({
            margin: horizontalMargin,
            offset: elementLeft,
            size: elementWidth,
            anchorSize: anchorRect.width,
            viewPortSize: viewPortWidth,
            anchorAlignPoint: anchorAlign.horizontal,
            elementAlignPoint: elementAlign.horizontal
        });
    }
    const flippedHorizontal = isHorizontalFlip && left !== 0;
    const flippedVertical = isVerticalFlip && top !== 0;

    return {
        flipped: flippedHorizontal || flippedVertical,
        flip: {
            horizontal: flippedHorizontal,
            vertical: flippedVertical
        },
        offset: {
            left: left,
            top: top
        }
    };
};

export default restrictToView;
