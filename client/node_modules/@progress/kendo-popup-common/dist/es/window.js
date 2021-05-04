import ownerDocument from './owner-document';

var getWindow = function (element) { return ownerDocument(element).defaultView; };

export default getWindow;
