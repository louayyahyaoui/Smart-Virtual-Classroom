import parents from './parents';
import siblingContainer from './sibling-container';

export default function zIndex(anchor, container) {
    if (!anchor || !container) { return null; }

    const sibling = siblingContainer(anchor, container);

    if (!sibling) { return null; }

    const result = [ anchor ].concat(parents(anchor, sibling)).reduce(
        (index, p) => {
            const zIndexStyle = p.style.zIndex || window.getComputedStyle(p).zIndex;
            const current = parseInt(zIndexStyle, 10);
            return current > index ? current : index;
        },
        0
    );

    return result ? (result + 1) : null;
}