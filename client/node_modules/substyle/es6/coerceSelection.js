import { keys } from './utils';

var coerceSelection = function coerceSelection(select) {
  if (!select) {
    return [];
  } else if (typeof select === 'string') {
    return [select];
  } else if (!Array.isArray(select)) {
    var objSelect = select; // workaround for https://github.com/facebook/flow/issues/5781

    return keys(select).reduce(function (acc, key) {
      return acc.concat(objSelect[key] ? [key] : []);
    }, []);
  }

  return select;
};

export default coerceSelection;