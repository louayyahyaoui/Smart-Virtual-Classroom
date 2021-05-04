import ownerDocument from './owner-document';

const getDocument = (element) => ownerDocument(element).documentElement;

export default getDocument;
