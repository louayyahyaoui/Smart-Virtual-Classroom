/**
 * DevExtreme (ui/html_editor/modules/popup.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _window = require("../../../core/utils/window");
var _popup = _interopRequireDefault(require("../../popup"));
var _list = _interopRequireDefault(require("../../list"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var ListPopupModule = {};
if (_devextremeQuill.default) {
    var SUGGESTION_LIST_CLASS = "dx-suggestion-list";
    var SUGGESTION_LIST_WRAPPER_CLASS = "dx-suggestion-list-wrapper";
    var BaseModule = _devextremeQuill.default.import("core/module");
    var MIN_HEIGHT = 100;
    ListPopupModule = function(_BaseModule) {
        _inheritsLoose(ListPopupModule, _BaseModule);
        var _proto = ListPopupModule.prototype;
        _proto._getDefaultOptions = function() {
            return {
                dataSource: null
            }
        };

        function ListPopupModule(quill, options) {
            var _this;
            _this = _BaseModule.call(this, quill, options) || this;
            _this.options = (0, _extend.extend)({}, _this._getDefaultOptions(), options);
            _this._popup = _this.renderPopup();
            _this._popup._wrapper().addClass(SUGGESTION_LIST_WRAPPER_CLASS);
            return _this
        }
        _proto.renderList = function($container, options) {
            var $list = (0, _renderer.default)("<div>").addClass(SUGGESTION_LIST_CLASS).appendTo($container);
            this._list = this.options.editorInstance._createComponent($list, _list.default, options)
        };
        _proto.renderPopup = function() {
            var editorInstance = this.options.editorInstance;
            var $container = (0, _renderer.default)("<div>").appendTo(editorInstance.$element());
            var popupConfig = this._getPopupConfig();
            return editorInstance._createComponent($container, _popup.default, popupConfig)
        };
        _proto._getPopupConfig = function() {
            var _this2 = this;
            return {
                contentTemplate: function(contentElem) {
                    var listConfig = _this2._getListConfig(_this2.options);
                    _this2.renderList((0, _renderer.default)(contentElem), listConfig)
                },
                deferRendering: false,
                onShown: function() {
                    _this2._list.focus()
                },
                onHidden: function() {
                    _this2._list.unselectAll();
                    _this2._list.option("focusedElement", null)
                },
                showTitle: false,
                width: "auto",
                height: "auto",
                shading: false,
                closeOnTargetScroll: true,
                closeOnOutsideClick: true,
                animation: {
                    show: {
                        type: "fade",
                        duration: 0,
                        from: 0,
                        to: 1
                    },
                    hide: {
                        type: "fade",
                        duration: 400,
                        from: 1,
                        to: 0
                    }
                },
                fullScreen: false,
                maxHeight: this.maxHeight
            }
        };
        _proto._getListConfig = function(options) {
            return {
                dataSource: options.dataSource,
                onSelectionChanged: this.selectionChangedHandler.bind(this),
                selectionMode: "single",
                pageLoadMode: "scrollBottom"
            }
        };
        _proto.selectionChangedHandler = function(e) {
            if (this._popup.option("visible")) {
                this._popup.hide();
                this.insertEmbedContent(e)
            }
        };
        _proto.insertEmbedContent = function(selectionChangedEvent) {};
        _proto.showPopup = function() {
            this._popup && this._popup.show()
        };
        _proto.savePosition = function(position) {
            this.caretPosition = position
        };
        _proto.getPosition = function() {
            return this.caretPosition
        };
        _createClass(ListPopupModule, [{
            key: "maxHeight",
            get: function() {
                var window = (0, _window.getWindow)();
                var windowHeight = window && (0, _renderer.default)(window).height() || 0;
                return Math.max(MIN_HEIGHT, .5 * windowHeight)
            }
        }]);
        return ListPopupModule
    }(BaseModule)
}
var _default = ListPopupModule;
exports.default = _default;
module.exports = exports.default;
