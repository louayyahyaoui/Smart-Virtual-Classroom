/**
 * DevExtreme (ui/speed_dial_action/speed_dial_main_item.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.initAction = initAction;
exports.disposeAction = disposeAction;
exports.repaint = repaint;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _config = _interopRequireDefault(require("../../core/config"));
var _extend = require("../../core/utils/extend");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _swatch_container = _interopRequireDefault(require("../widget/swatch_container"));
var _speed_dial_item = _interopRequireDefault(require("./speed_dial_item"));
var _themes = require("../themes");

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
var getSwatchContainer = _swatch_container.default.getSwatchContainer;
var FAB_MAIN_CLASS = "dx-fa-button-main";
var FAB_MAIN_CLASS_WITH_LABEL = "dx-fa-button-with-label";
var FAB_CLOSE_ICON_CLASS = "dx-fa-button-icon-close";
var INVISIBLE_STATE_CLASS = "dx-state-invisible";
var speedDialMainItem = null;
var modifyActionOptions = function(action) {
    return (0, _extend.extend)({}, action._options.silent(), {
        onInitialized: null,
        onDisposing: null
    })
};
var SpeedDialMainItem = function(_SpeedDialItem) {
    _inheritsLoose(SpeedDialMainItem, _SpeedDialItem);

    function SpeedDialMainItem() {
        return _SpeedDialItem.apply(this, arguments) || this
    }
    var _proto = SpeedDialMainItem.prototype;
    _proto._getDefaultOptions = function() {
        var defaultOptions = {
            icon: "add",
            closeIcon: "close",
            position: {
                at: "right bottom",
                my: "right bottom",
                offset: {
                    x: -16,
                    y: -16
                }
            },
            maxSpeedDialActionCount: 5,
            hint: "",
            label: "",
            direction: "auto",
            actions: [],
            activeStateEnabled: true,
            hoverStateEnabled: true,
            indent: 55,
            childIndent: 40,
            childOffset: 9,
            callOverlayRenderShading: true,
            closeOnOutsideClick: true
        };
        return (0, _extend.extend)(_SpeedDialItem.prototype._getDefaultOptions.call(this), (0, _extend.extend)(defaultOptions, (0, _config.default)().floatingActionButtonConfig, {
            shading: false
        }))
    };
    _proto._defaultOptionsRules = function() {
        return _SpeedDialItem.prototype._defaultOptionsRules.call(this).concat([{
            device: function() {
                return (0, _themes.isMaterial)()
            },
            options: {
                indent: 72,
                childIndent: 56,
                childOffset: 8
            }
        }])
    };
    _proto._render = function() {
        this.$element().addClass(FAB_MAIN_CLASS);
        _SpeedDialItem.prototype._render.call(this);
        this._moveToContainer();
        this._renderCloseIcon();
        this._renderClick()
    };
    _proto._renderLabel = function() {
        _SpeedDialItem.prototype._renderLabel.call(this);
        this.$element().toggleClass(FAB_MAIN_CLASS_WITH_LABEL, !!this._$label)
    };
    _proto._renderCloseIcon = function() {
        this._$closeIcon = this._renderButtonIcon(this._$closeIcon, this._options.silent("closeIcon"), FAB_CLOSE_ICON_CLASS);
        this._$closeIcon.addClass(INVISIBLE_STATE_CLASS)
    };
    _proto._renderClick = function() {
        this._clickAction = 1 === this._getVisibleActions().length ? this._getActionComponent()._createActionByOption("onClick") : this._createAction(this._clickHandler.bind(this));
        this._setClickAction()
    };
    _proto._getVisibleActions = function(actions) {
        var currentActions = actions || this.option("actions");
        return currentActions.filter(function(action) {
            return action.option("visible")
        })
    };
    _proto._getCurrentOptions = function(actions) {
        var visibleActions = speedDialMainItem._getVisibleActions(actions);
        return 1 === visibleActions.length ? (0, _extend.extend)(visibleActions[0]._options.silent(), {
            position: this._getPosition()
        }) : (0, _extend.extend)(this._getDefaultOptions(), {
            visible: 0 !== visibleActions.length
        })
    };
    _proto._clickHandler = function() {
        var actions = this._actionItems.filter(function(action) {
            return action.option("actionVisible")
        }).sort(function(action, nextAction) {
            return action.option("index") - nextAction.option("index")
        });
        if (1 === actions.length) {
            return
        }
        var lastActionIndex = actions.length - 1;
        for (var i = 0; i < actions.length; i++) {
            actions[i].option("animation", this._getActionAnimation(actions[i], i, lastActionIndex));
            actions[i].option("position", this._getActionPosition(actions, i));
            actions[i]._$wrapper.css("position", this._$wrapper.css("position"));
            actions[i].toggle()
        }
        if ((0, _config.default)().floatingActionButtonConfig.shading) {
            this._isShadingShown = !this.option("shading");
            this.option("shading", this._isShadingShown)
        }
        this._$icon.toggleClass(INVISIBLE_STATE_CLASS);
        this._$closeIcon.toggleClass(INVISIBLE_STATE_CLASS)
    };
    _proto._updateZIndexStackPosition = function() {
        _SpeedDialItem.prototype._updateZIndexStackPosition.call(this);
        var overlayStack = this._overlayStack();
        overlayStack.push(this)
    };
    _proto._renderActions = function() {
        var _this = this;
        var actions = this.option("actions");
        var minActionButtonCount = 1;
        if (this._actionItems && this._actionItems.length) {
            this._actionItems.forEach(function(actionItem) {
                actionItem.dispose();
                actionItem.$element().remove()
            });
            this._actionItems = []
        }
        this._actionItems = [];
        if (actions.length === minActionButtonCount) {
            return
        }
        for (var i = 0; i < actions.length; i++) {
            var action = actions[i];
            var $actionElement = (0, _renderer.default)("<div>").appendTo(getSwatchContainer(action.$element()));
            _events_engine.default.off($actionElement, "click");
            _events_engine.default.on($actionElement, "click", function() {
                _this._clickHandler()
            });
            action._options.silent("actionComponent", action);
            action._options.silent("parentPosition", this._getPosition());
            action._options.silent("actionVisible", action._options.silent("visible"));
            this._actionItems.push(this._createComponent($actionElement, _speed_dial_item.default, (0, _extend.extend)({}, modifyActionOptions(action), {
                visible: false
            })))
        }
    };
    _proto._getActionAnimation = function(action, index, lastActionIndex) {
        var actionAnimationDelay = 30;
        action._options.silent("animation.show.delay", actionAnimationDelay * index);
        action._options.silent("animation.hide.delay", actionAnimationDelay * (lastActionIndex - index));
        return action._options.silent("animation")
    };
    _proto._getDirectionIndex = function(actions, direction) {
        var directionIndex = 1;
        if ("auto" === direction) {
            var contentHeight = this.$content().height();
            var actionsHeight = this.initialOption("indent") + this.initialOption("childIndent") * actions.length - contentHeight;
            var offsetTop = this.$content().offset().top;
            if (actionsHeight < offsetTop) {
                return -directionIndex
            } else {
                var offsetBottom = this._getContainer().height() - contentHeight - offsetTop;
                return offsetTop >= offsetBottom ? -directionIndex : directionIndex
            }
        }
        return "down" !== direction ? -directionIndex : directionIndex
    };
    _proto._getActionPosition = function(actions, index) {
        var action = actions[index];
        var actionOffsetXValue = this.initialOption("childOffset");
        var actionOffsetX = action._options.silent("label") && !this._$label ? this._isPositionLeft(this._getPosition()) ? actionOffsetXValue : -actionOffsetXValue : 0;
        var actionOffsetYValue = this.initialOption("indent") + this.initialOption("childIndent") * index;
        var actionOffsetY = this._getDirectionIndex(actions, this.option("direction")) * actionOffsetYValue;
        var actionPositionAtMy = action._options.silent("label") ? this._isPositionLeft(this._getPosition()) ? "left" : "right" : "center";
        return {
            of: this.$content(),
            at: actionPositionAtMy,
            my: actionPositionAtMy,
            offset: {
                x: actionOffsetX,
                y: actionOffsetY
            }
        }
    };
    _proto._outsideClickHandler = function(e) {
        if (this._isShadingShown) {
            var isShadingClick = (0, _renderer.default)(e.target)[0] === this._$wrapper[0];
            if (isShadingClick) {
                e.preventDefault();
                this._clickHandler()
            }
        }
    };
    _proto._setPosition = function() {
        if (this.option("visible")) {
            this._hide();
            this._show()
        }
    };
    _proto._getPosition = function() {
        return this._getDefaultOptions().position
    };
    _proto._getInkRippleContainer = function() {
        return this.$content()
    };
    _proto._optionChanged = function(args) {
        switch (args.name) {
            case "actions":
                if (this._isVisible()) {
                    this._renderIcon()
                }
                this._renderCloseIcon();
                this._renderClick();
                this._renderActions();
                break;
            case "maxSpeedDialActionCount":
                this._renderActions();
                break;
            case "closeIcon":
                this._renderCloseIcon();
                break;
            case "position":
                this._setPosition();
                break;
            case "label":
                if (this._isVisible()) {
                    this._renderLabel()
                }
                this._setPosition();
                break;
            case "icon":
                if (this._isVisible()) {
                    this._renderIcon()
                }
                break;
            default:
                _SpeedDialItem.prototype._optionChanged.call(this, args)
        }
    };
    return SpeedDialMainItem
}(_speed_dial_item.default);

function initAction(newAction) {
    newAction._options.silent("onInitializing", null);
    var isActionExist = false;
    if (!speedDialMainItem) {
        var $fabMainElement = (0, _renderer.default)("<div>").appendTo(getSwatchContainer(newAction.$element()));
        speedDialMainItem = newAction._createComponent($fabMainElement, SpeedDialMainItem, (0, _extend.extend)({}, modifyActionOptions(newAction), {
            actions: [newAction]
        }))
    } else {
        var savedActions = speedDialMainItem.option("actions");
        savedActions.forEach(function(action) {
            if (action._options.silent("id") === newAction._options.silent("id")) {
                isActionExist = true;
                return newAction
            }
        });
        delete speedDialMainItem._options.silent("position");
        if (!isActionExist) {
            if (speedDialMainItem._getVisibleActions(savedActions).length >= speedDialMainItem.option("maxSpeedDialActionCount")) {
                newAction.dispose();
                _ui.default.log("W1014");
                return
            }
            savedActions.push(newAction);
            speedDialMainItem.option((0, _extend.extend)(speedDialMainItem._getCurrentOptions(savedActions), {
                actions: savedActions
            }))
        } else {
            if (1 === savedActions.length) {
                speedDialMainItem.option((0, _extend.extend)({}, modifyActionOptions(savedActions[0]), {
                    actions: savedActions,
                    position: speedDialMainItem._getPosition()
                }))
            } else {
                speedDialMainItem.option((0, _extend.extend)(speedDialMainItem._getCurrentOptions(savedActions), {
                    actions: savedActions
                }))
            }
        }
    }
}

function disposeAction(actionId) {
    if (!speedDialMainItem) {
        return
    }
    var savedActions = speedDialMainItem.option("actions");
    var savedActionsCount = savedActions.length;
    savedActions = savedActions.filter(function(action) {
        return action._options.silent("id") !== actionId
    });
    if (savedActionsCount === savedActions.length) {
        return
    }
    if (!savedActions.length) {
        speedDialMainItem.dispose();
        speedDialMainItem.$element().remove();
        speedDialMainItem = null
    } else {
        if (1 === savedActions.length) {
            speedDialMainItem.option((0, _extend.extend)({}, modifyActionOptions(savedActions[0]), {
                actions: savedActions
            }))
        } else {
            speedDialMainItem.option({
                actions: savedActions
            })
        }
    }
}

function repaint() {
    if (!speedDialMainItem) {
        return
    }
    var visibleActions = speedDialMainItem._getVisibleActions();
    var icon = 1 === visibleActions.length ? visibleActions[0].option("icon") : speedDialMainItem._getDefaultOptions().icon;
    var label = 1 === visibleActions.length ? visibleActions[0].option("label") : speedDialMainItem._getDefaultOptions().label;
    speedDialMainItem.option({
        actions: speedDialMainItem.option("actions"),
        icon: icon,
        closeIcon: speedDialMainItem._getDefaultOptions().closeIcon,
        position: speedDialMainItem._getPosition(),
        label: label,
        maxSpeedDialActionCount: speedDialMainItem._getDefaultOptions().maxSpeedDialActionCount,
        direction: speedDialMainItem._getDefaultOptions().direction
    })
}
