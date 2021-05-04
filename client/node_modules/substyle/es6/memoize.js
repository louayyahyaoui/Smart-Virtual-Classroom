import coerceSelection from './coerceSelection';
var EMPTY = {};

var memoize = function memoize(substyle) {
  return function (select, defaultStyle) {
    var cacheKey = defaultStyle || EMPTY;
    substyle.memoize = substyle.memoize || new WeakMap();
    var mapEntry;

    if (!substyle.memoize.has(cacheKey)) {
      mapEntry = {};
      substyle.memoize.set(cacheKey, mapEntry);
    } else {
      mapEntry = substyle.memoize.get(cacheKey);
    }

    var selectHash = coerceSelection(select).join(' ');
    return selectHash in mapEntry ? mapEntry[selectHash] : mapEntry[selectHash] = substyle(select || [], defaultStyle);
  };
};

export default memoize;