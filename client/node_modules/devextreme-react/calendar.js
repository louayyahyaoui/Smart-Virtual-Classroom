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
exports.Calendar = void 0;
var calendar_1 = require("devextreme/ui/calendar");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = calendar_1.default;
        _this.subscribableOptions = ["value", "zoomLevel"];
        _this.independentEvents = ["onDisposing", "onInitialized", "onOptionChanged", "onValueChanged"];
        _this._defaults = {
            defaultValue: "value",
            defaultZoomLevel: "zoomLevel"
        };
        _this._templateProps = [{
                tmplOption: "cellTemplate",
                render: "cellRender",
                component: "cellComponent",
                keyFn: "cellKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(Calendar.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Calendar;
}(component_1.Component));
exports.Calendar = Calendar;
Calendar.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    dateSerializationFormat: PropTypes.string,
    disabled: PropTypes.bool,
    disabledDates: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.func
    ]),
    elementAttr: PropTypes.object,
    firstDayOfWeek: PropTypes.oneOf([
        0,
        1,
        2,
        3,
        4,
        5,
        6
    ]),
    focusStateEnabled: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    isValid: PropTypes.bool,
    maxZoomLevel: PropTypes.oneOf([
        "century",
        "decade",
        "month",
        "year"
    ]),
    minZoomLevel: PropTypes.oneOf([
        "century",
        "decade",
        "month",
        "year"
    ]),
    name: PropTypes.string,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onValueChanged: PropTypes.func,
    readOnly: PropTypes.bool,
    rtlEnabled: PropTypes.bool,
    showTodayButton: PropTypes.bool,
    tabIndex: PropTypes.number,
    validationError: PropTypes.object,
    validationErrors: PropTypes.array,
    validationMessageMode: PropTypes.oneOf([
        "always",
        "auto"
    ]),
    validationStatus: PropTypes.oneOf([
        "valid",
        "invalid",
        "pending"
    ]),
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    zoomLevel: PropTypes.oneOf([
        "century",
        "decade",
        "month",
        "year"
    ])
};
exports.default = Calendar;
