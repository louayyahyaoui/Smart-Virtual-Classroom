"use strict";

exports.__esModule = true;
exports.useDescendant = useDescendant;
exports.useDescendants = useDescendants;

var _react = require("react");

var _hooks = require("@chakra-ui/hooks");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function useDescendant(props) {
  var context = props.context,
      element = props.element,
      indexProp = props.index,
      disabled = props.disabled,
      focusable = props.focusable,
      rest = _objectWithoutPropertiesLoose(props, ["context", "element", "index", "disabled", "focusable"]);

  var forceUpdate = (0, _hooks.useForceUpdate)();
  var register = context.register,
      unregister = context.unregister,
      descendants = context.descendants;
  (0, _hooks.useSafeLayoutEffect)(function () {
    if (!element) {
      forceUpdate();
    }
    /**
     * Don't register this descendant if it is disabled and not focusable
     */


    if (disabled && !focusable) return undefined;
    /**
     * else, register the descendant
     */

    register(_extends({
      element: element,
      disabled: disabled,
      focusable: focusable
    }, rest));
    /**
     * when it unmounts, unregister the descendant
     */

    return function () {
      if (element) {
        unregister(element);
      }
    }; // eslint-disable-next-line
  }, [element, disabled, focusable].concat(Object.values(rest)));
  var index = indexProp != null ? indexProp : descendants.findIndex(function (descendant) {
    return descendant.element === element;
  });
  return index;
}

function useDescendants() {
  var _useState = (0, _react.useState)([]),
      descendants = _useState[0],
      setDescendants = _useState[1];

  var register = (0, _react.useCallback)(function (_ref) {
    var element = _ref.element,
        rest = _objectWithoutPropertiesLoose(_ref, ["element"]);

    if (!element) return; // @ts-ignore

    setDescendants(function (prevDescendants) {
      if (prevDescendants.find(function (item) {
        return item.element === element;
      }) == null) {
        var index = prevDescendants.findIndex(function (item) {
          if (!item.element || !element) return false;
          return Boolean(item.element.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING);
        });

        var newItem = _extends({
          element: element
        }, rest);

        if (index === -1) {
          return [].concat(prevDescendants, [newItem]);
        }

        return [].concat(prevDescendants.slice(0, index), [newItem], prevDescendants.slice(index));
      }

      return prevDescendants;
    });
  }, []);
  var unregister = (0, _react.useCallback)(function (element) {
    if (!element) return;
    setDescendants(function (descendants) {
      return descendants.filter(function (descendant) {
        return element !== descendant.element;
      });
    });
  }, []);
  var context = (0, _react.useMemo)(function () {
    return {
      descendants: descendants,
      register: register,
      unregister: unregister
    };
  }, [descendants, register, unregister]);
  return context;
}
//# sourceMappingURL=use-descendant.js.map