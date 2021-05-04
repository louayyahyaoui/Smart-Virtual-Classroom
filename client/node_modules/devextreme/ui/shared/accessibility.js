/**
 * DevExtreme (ui/shared/accessibility.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.subscribeVisibilityChange = subscribeVisibilityChange;
exports.unsubscribeVisibilityChange = unsubscribeVisibilityChange;
exports.hiddenFocus = hiddenFocus;
exports.registerKeyboardAction = registerKeyboardAction;
exports.restoreFocus = restoreFocus;
exports.selectView = selectView;
exports.setTabIndex = setTabIndex;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _index = require("../../events/utils/index");
var _extend = require("../../core/utils/extend");
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _common = require("../../core/utils/common");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var FOCUS_STATE_CLASS = "dx-state-focused";
var FOCUS_DISABLED_CLASS = "dx-cell-focus-disabled";
var FOCUSED_ROW_SELECTOR = ".dx-row-focused";
var GRID_ROW_SELECTOR = ".dx-datagrid-rowsview .dx-row";
var GRID_CELL_SELECTOR = "".concat(GRID_ROW_SELECTOR, " > td");
var TREELIST_ROW_SELECTOR = ".dx-treelist-rowsview .dx-row";
var TREELIST_CELL_SELECTOR = "".concat(TREELIST_ROW_SELECTOR, " > td");
var viewItemSelectorMap = {
    groupPanel: [".dx-datagrid-group-panel .dx-group-panel-item[tabindex]"],
    columnHeaders: [".dx-datagrid-headers .dx-header-row > td.dx-datagrid-action", ".dx-treelist-headers .dx-header-row > td.dx-treelist-action"],
    filterRow: [".dx-datagrid-headers .dx-datagrid-filter-row .dx-editor-cell .dx-texteditor-input", ".dx-treelist-headers .dx-treelist-filter-row .dx-editor-cell .dx-texteditor-input"],
    rowsView: ["".concat(FOCUSED_ROW_SELECTOR), "".concat(GRID_ROW_SELECTOR, "[tabindex]"), "".concat(GRID_CELL_SELECTOR, "[tabindex]"), "".concat(GRID_CELL_SELECTOR), "".concat(TREELIST_ROW_SELECTOR, "[tabindex]"), "".concat(TREELIST_CELL_SELECTOR, "[tabindex]"), "".concat(TREELIST_CELL_SELECTOR)],
    footer: [".dx-datagrid-total-footer .dx-datagrid-summary-item", ".dx-treelist-total-footer .dx-treelist-summary-item"],
    filterPanel: [".dx-datagrid-filter-panel .dx-icon-filter", ".dx-treelist-filter-panel .dx-icon-filter"],
    pager: [".dx-datagrid-pager [tabindex]", ".dx-treelist-pager [tabindex]"]
};
var isMouseDown = false;
var isHiddenFocusing = false;
var focusedElementInfo = null;

function processKeyDown(viewName, instance, event, action, $mainElement, executeKeyDown) {
    var isHandled = fireKeyDownEvent(instance, event.originalEvent, executeKeyDown);
    if (isHandled) {
        return
    }
    var keyName = (0, _index.normalizeKeyName)(event);
    if ("enter" === keyName || "space" === keyName) {
        saveFocusedElementInfo(event.target, instance);
        action && action({
            event: event
        })
    } else {
        if ("tab" === keyName) {
            $mainElement.addClass(FOCUS_STATE_CLASS)
        } else {
            selectView(viewName, instance, event)
        }
    }
}

function saveFocusedElementInfo(target, instance) {
    var $target = (0, _renderer.default)(target);
    var ariaLabel = $target.attr("aria-label");
    var $activeElements = getActiveAccessibleElements(ariaLabel, instance.element());
    var targetIndex = $activeElements.index($target);
    focusedElementInfo = (0, _extend.extend)({}, {
        ariaLabel: ariaLabel,
        index: targetIndex
    }, {
        viewInstance: instance
    })
}

function getActiveAccessibleElements(ariaLabel, viewElement) {
    var $viewElement = (0, _renderer.default)(viewElement);
    var $activeElements;
    if (ariaLabel) {
        $activeElements = $viewElement.find('[aria-label="'.concat(ariaLabel, '"][tabindex]'))
    } else {
        $activeElements = $viewElement.find("[tabindex]")
    }
    return $activeElements
}

function findFocusedViewElement(viewSelectors) {
    for (var index in viewSelectors) {
        var selector = viewSelectors[index];
        var $focusViewElement = (0, _renderer.default)(selector).first();
        if ($focusViewElement.length) {
            return $focusViewElement
        }
    }
}

function fireKeyDownEvent(instance, event, executeAction) {
    var args = {
        event: event,
        handled: false
    };
    if (executeAction) {
        executeAction(args)
    } else {
        instance._createActionByOption("onKeyDown")(args)
    }
    return args.handled
}

function onDocumentVisibilityChange() {
    isHiddenFocusing = "visible" === _dom_adapter.default.getDocument().visibilityState
}

function subscribeVisibilityChange() {
    _events_engine.default.on(_dom_adapter.default.getDocument(), "visibilitychange", onDocumentVisibilityChange)
}

function unsubscribeVisibilityChange() {
    _events_engine.default.off(_dom_adapter.default.getDocument(), "visibilitychange", onDocumentVisibilityChange)
}

function hiddenFocus(element) {
    isHiddenFocusing = true;
    element.focus();
    isHiddenFocusing = false
}

function registerKeyboardAction(viewName, instance, $element, selector, action, executeKeyDown) {
    if (instance.option("useLegacyKeyboardNavigation")) {
        return _common.noop
    }
    var $mainElement = (0, _renderer.default)(instance.element());
    var keyDownHandler = function(e) {
        return processKeyDown(viewName, instance, e, action, $mainElement, executeKeyDown)
    };
    var mouseDownHandler = function() {
        isMouseDown = true;
        $mainElement.removeClass(FOCUS_STATE_CLASS)
    };
    var focusinHandler = function() {
        var needShowOverlay = !isMouseDown && !isHiddenFocusing;
        if (needShowOverlay) {
            $mainElement.addClass(FOCUS_STATE_CLASS)
        }
        isMouseDown = false
    };
    _events_engine.default.on($element, "keydown", selector, keyDownHandler);
    _events_engine.default.on($element, "mousedown", selector, mouseDownHandler);
    _events_engine.default.on($element, "focusin", selector, focusinHandler);
    return function() {
        _events_engine.default.off($element, "keydown", selector, keyDownHandler);
        _events_engine.default.off($element, "mousedown", selector, mouseDownHandler);
        _events_engine.default.off($element, "focusin", selector, focusinHandler)
    }
}

function restoreFocus(instance) {
    if (!instance.option("useLegacyKeyboardNavigation") && focusedElementInfo) {
        var viewInstance = focusedElementInfo.viewInstance;
        if (viewInstance) {
            var $activeElements = getActiveAccessibleElements(focusedElementInfo.ariaLabel, viewInstance.element());
            var $targetElement = $activeElements.eq(focusedElementInfo.index);
            focusedElementInfo = null;
            _events_engine.default.trigger($targetElement, "focus")
        }
    }
}

function selectView(viewName, instance, event) {
    var keyName = (0, _index.normalizeKeyName)(event);
    if (event.ctrlKey && ("upArrow" === keyName || "downArrow" === keyName)) {
        var viewNames = Object.keys(viewItemSelectorMap);
        var viewItemIndex = viewNames.indexOf(viewName);
        while (viewItemIndex >= 0 && viewItemIndex < viewNames.length) {
            viewItemIndex = "upArrow" === keyName ? --viewItemIndex : ++viewItemIndex;
            var _viewName = viewNames[viewItemIndex];
            var viewSelectors = viewItemSelectorMap[_viewName];
            var $focusViewElement = findFocusedViewElement(viewSelectors);
            if ($focusViewElement && $focusViewElement.length) {
                $focusViewElement.attr("tabindex", instance.option("tabindex") || 0);
                _events_engine.default.trigger($focusViewElement, "focus");
                $focusViewElement.removeClass(FOCUS_DISABLED_CLASS);
                break
            }
        }
    }
}

function setTabIndex(instance, $element) {
    if (!instance.option("useLegacyKeyboardnavigation")) {
        $element.attr("tabindex", instance.option("tabindex") || 0)
    }
}
