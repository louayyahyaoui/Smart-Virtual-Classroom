import parents from './parents';
import siblingContainer from './sibling-container';

export default function zIndex(anchor, container) {
    if (!anchor || !container) { return null; }

    var sibling = siblingContainer(anchor, container);

    if (!sibling) { return null; }

    var result = [ anchor ].concat(parents(anchor, sibling)).reduce(
        function (index, p) {
            var zIndexStyle = p.style.zIndex || window.getComputedStyle(p).zIndex;
            var current = parseInt(zIndexStyle, 10);
            return current > index ? current : index;
        },
        0
    );

    return result ? (result + 1) : null;
}