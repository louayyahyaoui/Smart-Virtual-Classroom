"use strict";

exports.__esModule = true;
exports.useTabs = useTabs;
exports.useTabList = useTabList;
exports.useTab = useTab;
exports.useTabPanels = useTabPanels;
exports.useTabPanel = useTabPanel;
exports.useTabIndicator = useTabIndicator;
exports.useTabsContext = exports.TabsProvider = void 0;

var _clickable = require("@chakra-ui/clickable");

var _descendant = require("@chakra-ui/descendant");

var _hooks = require("@chakra-ui/hooks");

var _utils = require("@chakra-ui/utils");

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Tabs hooks that provides all the states, and accessibility
 * helpers to keep all things working properly.
 *
 * Its returned object will be passed unto a Context Provider
 * so all child components can read from it.
 * There is no document link yet
 * @see Docs https://chakra-ui.com/docs/components/useTabs
 */
function useTabs(props) {
  var defaultIndex = props.defaultIndex,
      onChange = props.onChange,
      index = props.index,
      isManual = props.isManual,
      isLazy = props.isLazy,
      _props$orientation = props.orientation,
      orientation = _props$orientation === void 0 ? "horizontal" : _props$orientation,
      htmlProps = _objectWithoutPropertiesLoose(props, ["defaultIndex", "onChange", "index", "isManual", "isLazy", "orientation"]);
  /**
   * We use this to keep track of the index of the focused tab.
   *
   * Tabs can be automatically activated, this means selection follows focus.
   * When we navigate with the arrow keys, we move focus and selection to next/prev tab
   *
   * Tabs can also be manually activated, this means selection does not follow focus.
   * When we navigate with the arrow keys, we only move focus NOT selection. The user
   * will need not manually activate the tab using `Enter` or `Space`.
   *
   * This is why we need to keep track of the `focusedIndex` and `selectedIndex`
   */


  var _React$useState = React.useState(defaultIndex != null ? defaultIndex : 0),
      focusedIndex = _React$useState[0],
      setFocusedIndex = _React$useState[1];

  var _useControllableState = (0, _hooks.useControllableState)({
    defaultValue: defaultIndex != null ? defaultIndex : 0,
    value: index,
    onChange: onChange
  }),
      selectedIndex = _useControllableState[0],
      setSelectedIndex = _useControllableState[1];
  /**
   * Sync focused `index` with controlled `selectedIndex` (which is the `props.index`)
   */


  React.useEffect(function () {
    if (!(0, _utils.isUndefined)(index)) {
      setFocusedIndex(index);
    }
  }, [index]);
  /**
   * Think of `useDescendants` as a register for the tab nodes.
   *
   * This manager is used to store only the tab nodes that are not disabled, and focusable.
   * If we have the following code
   *
   * ```jsx
   * <Tab>Tab 1</Tab>
   * <Tab isDisabled>Tab 2</Tab>
   * <Tab>Tab 3</Tab>
   * ```
   *
   * The manager will only hold references to "Tab 1" and "Tab 3", since `Tab 2` is disabled
   */

  var enabledDomContext = (0, _descendant.useDescendants)();
  /**
   * This manager is used to store all tab nodes whether disabled or not.
   * If we have the following code
   *
   * ```jsx
   * <Tab>Tab 1</Tab>
   * <Tab isDisabled>Tab 2</Tab>
   * <Tab>Tab 3</Tab>
   * ```
   *
   * The manager will only hold references to "Tab 1", "Tab 2" "Tab 3".
   *
   * We need this for correct indexing of tabs in event a tab is disabled
   */

  var domContext = (0, _descendant.useDescendants)();
  /**
   * generate a unique id or use user-provided id for
   * the tabs widget
   */

  var id = (0, _hooks.useId)(props.id, "tabs");
  return {
    id: id,
    selectedIndex: selectedIndex,
    focusedIndex: focusedIndex,
    setSelectedIndex: setSelectedIndex,
    setFocusedIndex: setFocusedIndex,
    isManual: isManual,
    isLazy: isLazy,
    orientation: orientation,
    enabledDomContext: enabledDomContext,
    domContext: domContext,
    htmlProps: htmlProps
  };
}

var _createContext = (0, _utils.createContext)({
  name: "TabsContext",
  errorMessage: "useTabsContext: `context` is undefined. Seems you forgot to wrap all tabs components within <Tabs />"
}),
    TabsProvider = _createContext[0],
    useTabsContext = _createContext[1];

exports.useTabsContext = useTabsContext;
exports.TabsProvider = TabsProvider;

/**
 * Tabs hook to manage multiple tab buttons,
 * and ensures only one tab is selected per time.
 *
 * @param props props object for the tablist
 */
function useTabList(props) {
  var _useTabsContext = useTabsContext(),
      setFocusedIndex = _useTabsContext.setFocusedIndex,
      focusedIndex = _useTabsContext.focusedIndex,
      orientation = _useTabsContext.orientation,
      enabledDomContext = _useTabsContext.enabledDomContext;

  var count = enabledDomContext.descendants.length;
  /**
   * Function to update the selected tab index
   */

  var setIndex = React.useCallback(function (index) {
    var tab = enabledDomContext.descendants[index];

    if (tab != null && tab.element) {
      tab.element.focus();
      setFocusedIndex(index);
    }
  }, [enabledDomContext.descendants, setFocusedIndex]);
  var onKeyDown = React.useCallback(function (event) {
    var nextTab = function nextTab() {
      return setIndex((focusedIndex + 1) % count);
    };

    var prevTab = function prevTab() {
      return setIndex((focusedIndex - 1 + count) % count);
    };

    var firstTab = function firstTab() {
      return setIndex(0);
    };

    var lastTab = function lastTab() {
      return setIndex(count - 1);
    };

    var isHorizontal = orientation === "horizontal";
    var isVertical = orientation === "vertical";
    var eventKey = (0, _utils.normalizeEventKey)(event);
    var keyMap = {
      ArrowRight: function ArrowRight() {
        return isHorizontal && nextTab();
      },
      ArrowLeft: function ArrowLeft() {
        return isHorizontal && prevTab();
      },
      ArrowDown: function ArrowDown() {
        return isVertical && nextTab();
      },
      ArrowUp: function ArrowUp() {
        return isVertical && prevTab();
      },
      Home: firstTab,
      End: lastTab
    };
    var action = keyMap[eventKey];

    if (action) {
      event.preventDefault();
      action(event);
    }
  }, [count, focusedIndex, orientation, setIndex]);
  return _extends({}, props, {
    role: "tablist",
    "aria-orientation": orientation,
    onKeyDown: (0, _utils.callAllHandlers)(props.onKeyDown, onKeyDown)
  });
}

/**
 * Tabs hook to manage each tab button.
 *
 * A tab can be disabled and focusable, or both,
 * hence the use of `useClickable` to handle this scenario
 */
function useTab(props) {
  var isDisabled = props.isDisabled,
      isFocusable = props.isFocusable,
      htmlProps = _objectWithoutPropertiesLoose(props, ["isDisabled", "isFocusable"]);

  var _useTabsContext2 = useTabsContext(),
      setSelectedIndex = _useTabsContext2.setSelectedIndex,
      isManual = _useTabsContext2.isManual,
      id = _useTabsContext2.id,
      setFocusedIndex = _useTabsContext2.setFocusedIndex,
      enabledDomContext = _useTabsContext2.enabledDomContext,
      domContext = _useTabsContext2.domContext,
      selectedIndex = _useTabsContext2.selectedIndex;

  var ref = React.useRef(null);
  /**
   * Think of `useDescendant` as the function that registers tab node
   * to the `enabledDomContext`, and returns its index.
   *
   * Tab is registered if it is enabled or focusable
   */

  var enabledIndex = (0, _descendant.useDescendant)({
    disabled: Boolean(isDisabled),
    focusable: Boolean(isFocusable),
    context: enabledDomContext,
    element: ref.current
  });
  /**
   * Registers all tabs (whether disabled or not)
   */

  var index = (0, _descendant.useDescendant)({
    context: domContext,
    element: ref.current
  });
  var isSelected = index === selectedIndex;

  var onClick = function onClick() {
    setFocusedIndex(enabledIndex);
    setSelectedIndex(index);
  };

  var onFocus = function onFocus() {
    var isDisabledButFocusable = isDisabled && isFocusable;
    var shouldSelect = !isManual && !isDisabledButFocusable;

    if (shouldSelect) {
      setSelectedIndex(index);
    }
  };

  var clickableProps = (0, _clickable.useClickable)(_extends({}, htmlProps, {
    ref: (0, _utils.mergeRefs)(ref, props.ref),
    isDisabled: isDisabled,
    isFocusable: isFocusable,
    onClick: (0, _utils.callAllHandlers)(props.onClick, onClick)
  }));
  var type = "button";
  return _extends({}, clickableProps, {
    id: makeTabId(id, index),
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type: type,
    "aria-selected": isSelected,
    "aria-controls": makeTabPanelId(id, index),
    onFocus: isDisabled ? undefined : (0, _utils.callAllHandlers)(props.onFocus, onFocus)
  });
}

/**
 * Tabs hook for managing the visibility of multiple tab panels.
 *
 * Since only one panel can be show at a time, we use `cloneElement`
 * to inject `selected` panel to each TabPanel.
 *
 * It returns a cloned version of its children with
 * all functionality included.
 */
function useTabPanels(props) {
  var context = useTabsContext();
  var id = context.id,
      selectedIndex = context.selectedIndex;
  var validChildren = (0, _utils.getValidChildren)(props.children);
  var children = validChildren.map(function (child, index) {
    return /*#__PURE__*/React.cloneElement(child, {
      isSelected: index === selectedIndex,
      id: makeTabPanelId(id, index),

      /**
       * Refers to the associated tab element, and also provides an accessible name to the tab panel.
       */
      "aria-labelledby": makeTabId(id, index)
    });
  });
  return _extends({}, props, {
    children: children
  });
}
/**
 * Tabs hook for managing the visible/hidden states
 * of the tab panel.
 *
 * @param props props object for the tab panel
 */


function useTabPanel(props) {
  var isSelected = props.isSelected,
      id = props.id,
      children = props.children,
      htmlProps = _objectWithoutPropertiesLoose(props, ["isSelected", "id", "children"]);

  var _useTabsContext3 = useTabsContext(),
      isLazy = _useTabsContext3.isLazy;

  return _extends({
    /**
     * Puts the tabpanel in the page `Tab` sequence.
     */
    tabIndex: 0
  }, htmlProps, {
    children: !isLazy || isSelected ? children : null,
    role: "tabpanel",
    hidden: !isSelected,
    id: id
  });
}
/**
 * Tabs hook to show an animated indicators that
 * follows the active tab.
 *
 * The way we do it is by measuring the DOM Rect (or dimensions)
 * of the active tab, and return that as CSS style for
 * the indicator.
 */


function useTabIndicator() {
  var context = useTabsContext();
  var selectedIndex = context.selectedIndex,
      orientation = context.orientation,
      domContext = context.domContext;
  var isHorizontal = orientation === "horizontal";
  var isVertical = orientation === "vertical"; // Get the clientRect of the selected tab

  var _React$useState2 = React.useState(function () {
    if (isHorizontal) return {
      left: 0,
      width: 0
    };
    if (isVertical) return {
      top: 0,
      height: 0
    };
    return undefined;
  }),
      rect = _React$useState2[0],
      setRect = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      hasMeasured = _React$useState3[0],
      setHasMeasured = _React$useState3[1]; // Update the selected tab rect when the selectedIndex changes


  (0, _hooks.useSafeLayoutEffect)(function () {
    var _tab$element;

    if ((0, _utils.isUndefined)(selectedIndex)) return undefined;
    var tab = domContext.descendants[selectedIndex];
    var tabRect = tab == null ? void 0 : (_tab$element = tab.element) == null ? void 0 : _tab$element.getBoundingClientRect(); // Horizontal Tab: Calculate width and left distance

    if (isHorizontal && tabRect) {
      var left = tabRect.left,
          width = tabRect.width;
      setRect({
        left: left,
        width: width
      });
    } // Vertical Tab: Calculate height and top distance


    if (isVertical && tabRect) {
      var top = tabRect.top,
          height = tabRect.height;
      setRect({
        top: top,
        height: height
      });
    } // Prevent unwanted transition from 0 to measured rect
    // by setting the measured state in the next tick


    var id = requestAnimationFrame(function () {
      setHasMeasured(true);
    });
    return function () {
      if (id) {
        cancelAnimationFrame(id);
      }
    };
  }, [selectedIndex, isHorizontal, isVertical, domContext.descendants]);
  return _extends({
    position: "absolute",
    transition: hasMeasured ? "all 200ms cubic-bezier(0, 0, 0.2, 1)" : "none"
  }, rect);
}

function makeTabId(id, index) {
  return id + "--tab-" + index;
}

function makeTabPanelId(id, index) {
  return id + "--tabpanel-" + index;
}
//# sourceMappingURL=use-tabs.js.map