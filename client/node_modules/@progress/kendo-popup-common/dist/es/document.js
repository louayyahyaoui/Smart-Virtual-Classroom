import ownerDocument from './owner-document';

var getDocument = function (element) { return ownerDocument(element).documentElement; };

export default getDocument;
