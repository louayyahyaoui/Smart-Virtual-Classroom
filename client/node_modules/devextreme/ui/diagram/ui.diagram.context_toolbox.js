/**
 * DevExtreme (ui/diagram/ui.diagram.context_toolbox.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _popover = _interopRequireDefault(require("../popover"));
var _diagram = require("./diagram.importer");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
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
var DIAGRAM_CONTEXT_TOOLBOX_TARGET_CLASS = "dx-diagram-context-toolbox-target";
var DIAGRAM_CONTEXT_TOOLBOX_CLASS = "dx-diagram-context-toolbox";
var DIAGRAM_TOUCH_CONTEXT_TOOLBOX_CLASS = "dx-diagram-touch-context-toolbox";
var DIAGRAM_CONTEXT_TOOLBOX_CONTENT_CLASS = "dx-diagram-context-toolbox-content";
var DiagramContextToolbox = function(_Widget) {
    _inheritsLoose(DiagramContextToolbox, _Widget);

    function DiagramContextToolbox() {
        return _Widget.apply(this, arguments) || this
    }
    var _proto = DiagramContextToolbox.prototype;
    _proto._init = function() {
        _Widget.prototype._init.call(this);
        this._onShownAction = this._createActionByOption("onShown");
        this._popoverPositionData = [{
            my: {
                x: "center",
                y: "top"
            },
            at: {
                x: "center",
                y: "bottom"
            },
            offset: {
                x: 0,
                y: 5
            }
        }, {
            my: {
                x: "right",
                y: "center"
            },
            at: {
                x: "left",
                y: "center"
            },
            offset: {
                x: -5,
                y: 0
            }
        }, {
            my: {
                x: "center",
                y: "bottom"
            },
            at: {
                x: "center",
                y: "top"
            },
            offset: {
                x: 0,
                y: -5
            }
        }, {
            my: {
                x: "left",
                y: "center"
            },
            at: {
                x: "right",
                y: "center"
            },
            offset: {
                x: 5,
                y: 0
            }
        }]
    };
    _proto._initMarkup = function() {
        _Widget.prototype._initMarkup.call(this);
        this._$popoverTargetElement = (0, _renderer.default)("<div>").addClass(DIAGRAM_CONTEXT_TOOLBOX_TARGET_CLASS).appendTo(this.$element());
        var $popoverElement = (0, _renderer.default)("<div>").appendTo(this.$element());
        var _getDiagram = (0, _diagram.getDiagram)(),
            Browser = _getDiagram.Browser;
        var popoverClass = DIAGRAM_CONTEXT_TOOLBOX_CLASS;
        if (Browser.TouchUI) {
            popoverClass += " " + DIAGRAM_TOUCH_CONTEXT_TOOLBOX_CLASS
        }
        this._popoverInstance = this._createComponent($popoverElement, _popover.default, {
            closeOnOutsideClick: false,
            container: this.$element(),
            elementAttr: {
                "class": popoverClass
            }
        })
    };
    _proto._show = function(x, y, side, category, callback) {
        this._popoverInstance.hide();
        var $content = (0, _renderer.default)("<div>").addClass(DIAGRAM_CONTEXT_TOOLBOX_CONTENT_CLASS);
        if (void 0 !== this.option("toolboxWidth")) {
            $content.css("width", this.option("toolboxWidth"))
        }
        this._$popoverTargetElement.css({
            left: x + this._popoverPositionData[side].offset.x,
            top: y + this._popoverPositionData[side].offset.y
        }).show();
        this._popoverInstance.option({
            position: {
                my: this._popoverPositionData[side].my,
                at: this._popoverPositionData[side].at,
                of: this._$popoverTargetElement
            },
            contentTemplate: $content,
            onContentReady: function() {
                var _this = this;
                var $element = this.$element().find("." + DIAGRAM_CONTEXT_TOOLBOX_CONTENT_CLASS);
                this._onShownAction({
                    category: category,
                    callback: callback,
                    $element: $element,
                    hide: function() {
                        return _this._popoverInstance.hide()
                    }
                })
            }.bind(this)
        });
        this._popoverInstance.show()
    };
    _proto._hide = function() {
        this._$popoverTargetElement.hide();
        this._popoverInstance.hide()
    };
    return DiagramContextToolbox
}(_ui.default);
var _default = DiagramContextToolbox;
exports.default = _default;
module.exports = exports.default;
