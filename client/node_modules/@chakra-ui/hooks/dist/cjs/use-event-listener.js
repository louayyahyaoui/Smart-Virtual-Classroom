"use strict";

exports.__esModule = true;
exports.useEventListener = useEventListener;

var React = _interopRequireWildcard(require("react"));

var _utils = require("@chakra-ui/utils");

var _useCallbackRef = require("./use-callback-ref");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * React hook to manage browser event listeners
 *
 * @param event the event name
 * @param handler the event handler function to execute
 * @param doc the dom environment to execute against (defaults to `document`)
 * @param options the event listener options
 */
function useEventListener(event, handler, env, options) {
  if (env === void 0) {
    env = _utils.isBrowser ? document : null;
  }

  var fn = (0, _useCallbackRef.useCallbackRef)(handler);
  React.useEffect(function () {
    if (!env) return undefined;

    var listener = function listener(event) {
      fn(event);
    };

    env.addEventListener(event, listener, options);
    return function () {
      env.removeEventListener(event, listener, options);
    };
  }, [event, env, options, fn]);
  return function () {
    var _env;

    (_env = env) == null ? void 0 : _env.removeEventListener(event, fn, options);
  };
}
//# sourceMappingURL=use-event-listener.js.map