/**
 * DevExtreme (renovation/preact_wrapper/grid_pager.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.GridPagerWrapper = void 0;
var _component = _interopRequireDefault(require("./component"));

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
var GridPagerWrapper = function(_Component) {
    _inheritsLoose(GridPagerWrapper, _Component);

    function GridPagerWrapper() {
        return _Component.apply(this, arguments) || this
    }
    var _proto = GridPagerWrapper.prototype;
    _proto._optionChanged = function(args) {
        switch (args.name) {
            case "pageIndex":
                var pageIndexChanged = this.option("pageIndexChanged");
                if (pageIndexChanged) {
                    pageIndexChanged(args.value)
                }
                break;
            case "pageSize":
                var pageSizeChanged = this.option("pageSizeChanged");
                if (pageSizeChanged) {
                    pageSizeChanged(args.value)
                }
        }
        _Component.prototype._optionChanged.call(this, args)
    };
    return GridPagerWrapper
}(_component.default);
exports.GridPagerWrapper = GridPagerWrapper;
