import ownerDocument from './owner-document';

const getWindow = (element) => ownerDocument(element).defaultView;

export default getWindow;
