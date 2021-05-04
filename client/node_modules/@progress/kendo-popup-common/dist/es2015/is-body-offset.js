import offsetParent from './offset-parent';

const isBodyOffset = (element) => (offsetParent(element) === element.ownerDocument.body);

export default isBodyOffset;
