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
exports.Show = exports.Position = exports.Offset = exports.My = exports.Hide = exports.Collision = exports.BoundaryOffset = exports.At = exports.Animation = exports.Toast = void 0;
var toast_1 = require("devextreme/ui/toast");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var Toast = /** @class */ (function (_super) {
    __extends(Toast, _super);
    function Toast() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = toast_1.default;
        _this.subscribableOptions = ["position", "visible"];
        _this.independentEvents = ["onContentReady", "onDisposing", "onHidden", "onHiding", "onInitialized", "onOptionChanged", "onShowing", "onShown"];
        _this._defaults = {
            defaultPosition: "position",
            defaultVisible: "visible"
        };
        _this._expectedChildren = {
            animation: { optionName: "animation", isCollectionItem: false },
            position: { optionName: "position", isCollectionItem: false }
        };
        _this._templateProps = [{
                tmplOption: "contentTemplate",
                render: "contentRender",
                component: "contentComponent",
                keyFn: "contentKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(Toast.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Toast;
}(component_1.Component));
exports.Toast = Toast;
Toast.propTypes = {
    accessKey: PropTypes.string,
    animation: PropTypes.object,
    closeOnClick: PropTypes.bool,
    closeOnOutsideClick: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func
    ]),
    closeOnSwipe: PropTypes.bool,
    deferRendering: PropTypes.bool,
    displayTime: PropTypes.number,
    elementAttr: PropTypes.object,
    focusStateEnabled: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    maxHeight: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    maxWidth: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    message: PropTypes.string,
    minHeight: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    minWidth: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onHidden: PropTypes.func,
    onHiding: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onShowing: PropTypes.func,
    onShown: PropTypes.func,
    position: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    rtlEnabled: PropTypes.bool,
    shading: PropTypes.bool,
    shadingColor: PropTypes.string,
    tabIndex: PropTypes.number,
    type: PropTypes.oneOf([
        "custom",
        "error",
        "info",
        "success",
        "warning"
    ]),
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Animation.OptionName = "animation";
    Animation.ExpectedChildren = {
        hide: { optionName: "hide", isCollectionItem: false },
        show: { optionName: "show", isCollectionItem: false }
    };
    return Animation;
}(nested_option_1.default));
exports.Animation = Animation;
var At = /** @class */ (function (_super) {
    __extends(At, _super);
    function At() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    At.OptionName = "at";
    return At;
}(nested_option_1.default));
exports.At = At;
var BoundaryOffset = /** @class */ (function (_super) {
    __extends(BoundaryOffset, _super);
    function BoundaryOffset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoundaryOffset.OptionName = "boundaryOffset";
    return BoundaryOffset;
}(nested_option_1.default));
exports.BoundaryOffset = BoundaryOffset;
var Collision = /** @class */ (function (_super) {
    __extends(Collision, _super);
    function Collision() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Collision.OptionName = "collision";
    return Collision;
}(nested_option_1.default));
exports.Collision = Collision;
var Hide = /** @class */ (function (_super) {
    __extends(Hide, _super);
    function Hide() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hide.OptionName = "hide";
    return Hide;
}(nested_option_1.default));
exports.Hide = Hide;
var My = /** @class */ (function (_super) {
    __extends(My, _super);
    function My() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    My.OptionName = "my";
    return My;
}(nested_option_1.default));
exports.My = My;
var Offset = /** @class */ (function (_super) {
    __extends(Offset, _super);
    function Offset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Offset.OptionName = "offset";
    return Offset;
}(nested_option_1.default));
exports.Offset = Offset;
var Position = /** @class */ (function (_super) {
    __extends(Position, _super);
    function Position() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Position.OptionName = "position";
    Position.ExpectedChildren = {
        at: { optionName: "at", isCollectionItem: false },
        boundaryOffset: { optionName: "boundaryOffset", isCollectionItem: false },
        collision: { optionName: "collision", isCollectionItem: false },
        my: { optionName: "my", isCollectionItem: false },
        offset: { optionName: "offset", isCollectionItem: false }
    };
    return Position;
}(nested_option_1.default));
exports.Position = Position;
var Show = /** @class */ (function (_super) {
    __extends(Show, _super);
    function Show() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Show.OptionName = "show";
    return Show;
}(nested_option_1.default));
exports.Show = Show;
exports.default = Toast;
