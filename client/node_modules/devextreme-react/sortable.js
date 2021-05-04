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
exports.CursorOffset = exports.Sortable = void 0;
var sortable_1 = require("devextreme/ui/sortable");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var Sortable = /** @class */ (function (_super) {
    __extends(Sortable, _super);
    function Sortable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = sortable_1.default;
        _this.independentEvents = ["onAdd", "onDisposing", "onDragChange", "onDragEnd", "onDragMove", "onDragStart", "onInitialized", "onOptionChanged", "onRemove", "onReorder"];
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
    Object.defineProperty(Sortable.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Sortable;
}(component_1.Component));
exports.Sortable = Sortable;
Sortable.propTypes = {
    allowDropInsideItem: PropTypes.bool,
    allowReordering: PropTypes.bool,
    autoScroll: PropTypes.bool,
    cursorOffset: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    dragDirection: PropTypes.oneOf([
        "both",
        "horizontal",
        "vertical"
    ]),
    dropFeedbackMode: PropTypes.oneOf([
        "push",
        "indicate"
    ]),
    elementAttr: PropTypes.object,
    filter: PropTypes.string,
    group: PropTypes.string,
    handle: PropTypes.string,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    itemOrientation: PropTypes.oneOf([
        "horizontal",
        "vertical"
    ]),
    moveItemOnDrop: PropTypes.bool,
    onAdd: PropTypes.func,
    onDisposing: PropTypes.func,
    onDragChange: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDragMove: PropTypes.func,
    onDragStart: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onRemove: PropTypes.func,
    onReorder: PropTypes.func,
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
exports.default = Sortable;
