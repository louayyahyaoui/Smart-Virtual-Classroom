/*!
 * devextreme-react
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/devextreme-react
 */

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorOffset = exports.Draggable = void 0;
var draggable_1 = require("devextreme/ui/draggable");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var Draggable = /** @class */ (function (_super) {
    __extends(Draggable, _super);
    function Draggable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = draggable_1.default;
        _this.independentEvents = ["onDisposing", "onDragEnd", "onDragMove", "onDragStart", "onInitialized", "onOptionChanged"];
        _this._expectedChildren = {
            cursorOffset: { optionName: "cursorOffset", isCollectionItem: false }
        };
        _this._templateProps = [{
                tmplOption: "dragTemplate",
                render: "dragRender",
                component: "dragComponent",
                keyFn: "dragKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(Draggable.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Draggable;
}(component_1.Component));
exports.Draggable = Draggable;
Draggable.propTypes = {
    autoScroll: PropTypes.bool,
    clone: PropTypes.bool,
    cursorOffset: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    dragDirection: PropTypes.oneOf([
        "both",
        "horizontal",
        "vertical"
    ]),
    elementAttr: PropTypes.object,
    group: PropTypes.string,
    handle: PropTypes.string,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    onDisposing: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDragMove: PropTypes.func,
    onDragStart: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    rtlEnabled: PropTypes.bool,
    scrollSensitivity: PropTypes.number,
    scrollSpeed: PropTypes.number,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
var CursorOffset = /** @class */ (function (_super) {
    __extends(CursorOffset, _super);
    function CursorOffset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CursorOffset.OptionName = "cursorOffset";
    return CursorOffset;
}(nested_option_1.default));
exports.CursorOffset = CursorOffset;
exports.default = Draggable;
