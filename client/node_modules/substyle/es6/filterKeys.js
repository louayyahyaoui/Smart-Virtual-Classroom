export var isModifier = function isModifier(key) {
  return key[0] === '&';
};
export var isElement = function isElement(key) {
  return !isModifier(key);
};