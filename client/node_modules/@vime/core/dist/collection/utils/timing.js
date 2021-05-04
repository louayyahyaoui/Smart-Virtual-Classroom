import { isUndefined } from './unit';
export const debounce = (func, wait = 1000, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const context = this;
    const later = function delayedFunctionCall() {
      timeout = undefined;
      if (!immediate)
        func.apply(context, args);
    };
    const callNow = immediate && isUndefined(timeout);
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow)
      func.apply(context, args);
  };
};
