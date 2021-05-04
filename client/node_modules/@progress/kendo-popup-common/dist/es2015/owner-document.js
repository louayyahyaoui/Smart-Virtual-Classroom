export default function ownerDocument(element) {
    return element.ownerDocument || element.document || element;
}
