/**
 * DevExtreme (ui/gantt/ui.gantt.dialogs.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.GanttDialog = void 0;
var _popup = _interopRequireDefault(require("../popup"));
var _form = _interopRequireDefault(require("../form"));
require("../tag_box");
var _message = _interopRequireDefault(require("../../localization/message"));

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
var GanttDialog = function() {
    function GanttDialog(owner, $element) {
        this._popupInstance = owner._createComponent($element, _popup.default);
        this.infoMap = {
            TaskEdit: TaskEditDialogInfo,
            Resources: ResourcesEditDialogInfo,
            Confirmation: ConfirmDialogInfo,
            ConstraintViolation: ConstraintViolationDialogInfo
        }
    }
    var _proto = GanttDialog.prototype;
    _proto._apply = function() {
        if (this._dialogInfo.isValidated()) {
            var result = this._dialogInfo.getResult();
            this._callback(result);
            this.hide()
        }
    };
    _proto.show = function(name, parameters, callback, afterClosing, editingOptions) {
        this._callback = callback;
        this._afterClosing = afterClosing;
        if (!this.infoMap[name]) {
            return
        }
        this._dialogInfo = new this.infoMap[name](parameters, this._apply.bind(this), this.hide.bind(this), editingOptions);
        this._popupInstance.option({
            showTitle: !!this._dialogInfo.getTitle(),
            title: this._dialogInfo.getTitle(),
            toolbarItems: this._dialogInfo.getToolbarItems(),
            maxWidth: this._dialogInfo.getMaxWidth(),
            height: this._dialogInfo.getHeight(),
            contentTemplate: this._dialogInfo.getContentTemplate()
        });
        this._popupInstance.show()
    };
    _proto.hide = function() {
        this._popupInstance.hide();
        if (this._afterClosing) {
            this._afterClosing()
        }
    };
    return GanttDialog
}();
exports.GanttDialog = GanttDialog;
var DialogInfoBase = function() {
    function DialogInfoBase(parameters, applyAction, hideAction, editingOptions) {
        this._parameters = parameters;
        this._applyAction = applyAction;
        this._hideAction = hideAction;
        this._editingOptions = editingOptions
    }
    var _proto2 = DialogInfoBase.prototype;
    _proto2._getFormItems = function() {
        return {}
    };
    _proto2._getFormCssClass = function() {
        return ""
    };
    _proto2._getFormData = function() {
        return this._parameters
    };
    _proto2._updateParameters = function() {};
    _proto2._getOkToolbarItem = function() {
        return this._getToolbarItem("OK", this._applyAction)
    };
    _proto2._getCancelToolbarItem = function() {
        return this._getToolbarItem("Cancel", this._hideAction)
    };
    _proto2._getYesToolbarItem = function() {
        return this._getToolbarItem("Yes", this._applyAction)
    };
    _proto2._getNoToolbarItem = function() {
        return this._getToolbarItem("No", this._hideAction)
    };
    _proto2._getToolbarItem = function(localizationText, action) {
        return {
            widget: "dxButton",
            toolbar: "bottom",
            options: {
                text: _message.default.format(localizationText),
                onClick: action
            }
        }
    };
    _proto2.getTitle = function() {
        return ""
    };
    _proto2.getToolbarItems = function() {
        return this._editingOptions.enabled ? [this._getOkToolbarItem(), this._getCancelToolbarItem()] : [this._getCancelToolbarItem()]
    };
    _proto2.getMaxWidth = function() {
        return 400
    };
    _proto2.getHeight = function() {
        return "auto"
    };
    _proto2.getContentTemplate = function() {
        var _this = this;
        return function(content) {
            _this._form = new _form.default(content, {
                formData: _this._getFormData(),
                items: _this._getFormItems(),
                elementAttr: {
                    "class": _this._getFormCssClass()
                }
            });
            return content
        }
    };
    _proto2.getResult = function() {
        var formData = this._form && this._form.option("formData");
        this._updateParameters(formData);
        return this._parameters
    };
    _proto2.isValidated = function() {
        return true
    };
    return DialogInfoBase
}();
var TaskEditDialogInfo = function(_DialogInfoBase) {
    _inheritsLoose(TaskEditDialogInfo, _DialogInfoBase);

    function TaskEditDialogInfo() {
        return _DialogInfoBase.apply(this, arguments) || this
    }
    var _proto3 = TaskEditDialogInfo.prototype;
    _proto3.getTitle = function() {
        return _message.default.format("dxGantt-dialogTaskDetailsTitle")
    };
    _proto3._getFormItems = function() {
        var _this2 = this;
        var readOnly = !this._editingOptions.enabled || !this._editingOptions.allowTaskUpdating;
        var readOnlyRange = readOnly || !this._parameters.enableRangeEdit;
        return [{
            dataField: "title",
            editorType: "dxTextBox",
            label: {
                text: _message.default.format("dxGantt-dialogTitle")
            },
            editorOptions: {
                readOnly: readOnly || this._isReadOnlyField("title")
            },
            visible: !this._isHiddenField("title")
        }, {
            dataField: "start",
            editorType: "dxDateBox",
            label: {
                text: _message.default.format("dxGantt-dialogStartTitle")
            },
            editorOptions: {
                type: "datetime",
                width: "100%",
                readOnly: readOnlyRange || this._isReadOnlyField("start")
            },
            visible: !this._isHiddenField("start"),
            validationRules: [{
                type: "required",
                message: _message.default.format("validation-required-formatted", _message.default.format("dxGantt-dialogStartTitle"))
            }]
        }, {
            dataField: "end",
            editorType: "dxDateBox",
            label: {
                text: _message.default.format("dxGantt-dialogEndTitle")
            },
            editorOptions: {
                type: "datetime",
                width: "100%",
                readOnly: readOnlyRange || this._isReadOnlyField("end")
            },
            visible: !this._isHiddenField("end"),
            validationRules: [{
                type: "required",
                message: _message.default.format("validation-required-formatted", _message.default.format("dxGantt-dialogEndTitle"))
            }]
        }, {
            dataField: "progress",
            editorType: "dxNumberBox",
            label: {
                text: _message.default.format("dxGantt-dialogProgressTitle")
            },
            editorOptions: {
                showSpinButtons: true,
                min: 0,
                max: 1,
                format: "#0%",
                step: .01,
                readOnly: readOnlyRange || this._isReadOnlyField("progress")
            },
            visible: !this._isHiddenField("progress")
        }, {
            dataField: "assigned.items",
            editorType: "dxTagBox",
            label: {
                text: _message.default.format("dxGantt-dialogResourcesTitle")
            },
            editorOptions: {
                readOnly: readOnly || !this._editingOptions.allowTaskResourceUpdating,
                dataSource: this._parameters.resources.items,
                displayExpr: "text",
                buttons: [{
                    name: "editResources",
                    location: "after",
                    options: {
                        disabled: !this._editingOptions.allowResourceAdding && !this._editingOptions.allowResourceDeleting,
                        text: "...",
                        hint: _message.default.format("dxGantt-dialogEditResourceListHint"),
                        onClick: function() {
                            var showTaskEditDialogCallback = function() {
                                _this2._parameters.showTaskEditDialogCommand.execute()
                            };
                            _this2._parameters.showResourcesDialogCommand.execute(showTaskEditDialogCallback)
                        }
                    }
                }]
            }
        }]
    };
    _proto3._isReadOnlyField = function(field) {
        return this._parameters.readOnlyFields.indexOf(field) > -1
    };
    _proto3._isHiddenField = function(field) {
        return this._parameters.hiddenFields.indexOf(field) > -1
    };
    _proto3._getFormData = function() {
        var data = {};
        for (var field in this._parameters) {
            data[field] = "progress" === field ? this._parameters[field] / 100 : this._parameters[field]
        }
        return data
    };
    _proto3._updateParameters = function(formData) {
        this._parameters.title = formData.title;
        this._parameters.start = formData.start;
        this._parameters.end = formData.end;
        this._parameters.progress = 100 * formData.progress;
        this._parameters.assigned = formData.assigned
    };
    _proto3.isValidated = function() {
        var _this$_form;
        var validationResult = null === (_this$_form = this._form) || void 0 === _this$_form ? void 0 : _this$_form.validate();
        return null === validationResult || void 0 === validationResult ? void 0 : validationResult.isValid
    };
    return TaskEditDialogInfo
}(DialogInfoBase);
var ResourcesEditDialogInfo = function(_DialogInfoBase2) {
    _inheritsLoose(ResourcesEditDialogInfo, _DialogInfoBase2);

    function ResourcesEditDialogInfo() {
        return _DialogInfoBase2.apply(this, arguments) || this
    }
    var _proto4 = ResourcesEditDialogInfo.prototype;
    _proto4.getTitle = function() {
        return _message.default.format("dxGantt-dialogResourceManagerTitle")
    };
    _proto4._getFormItems = function() {
        var _this3 = this;
        return [{
            label: {
                visible: false
            },
            dataField: "resources.items",
            editorType: "dxList",
            editorOptions: {
                allowItemDeleting: this._editingOptions.enabled && this._editingOptions.allowResourceDeleting,
                itemDeleteMode: "static",
                selectionMode: "none",
                items: this._parameters.resources.items,
                height: 250,
                noDataText: _message.default.format("dxGantt-dialogEditNoResources"),
                onInitialized: function(e) {
                    _this3.list = e.component
                },
                onItemDeleted: function(e) {
                    _this3._parameters.resources.remove(e.itemData)
                }
            }
        }, {
            label: {
                visible: false
            },
            editorType: "dxTextBox",
            editorOptions: {
                readOnly: !this._editingOptions.enabled || !this._editingOptions.allowResourceAdding,
                onInitialized: function(e) {
                    _this3.textBox = e.component
                },
                onInput: function(e) {
                    var addButton = e.component.getButton("addResource");
                    var resourceName = e.component.option("text");
                    addButton.option("disabled", 0 === resourceName.length)
                },
                buttons: [{
                    name: "addResource",
                    location: "after",
                    options: {
                        text: _message.default.format("dxGantt-dialogButtonAdd"),
                        disabled: true,
                        onClick: function(e) {
                            var newItem = _this3._parameters.resources.createItem();
                            newItem.text = _this3.textBox.option("text");
                            _this3._parameters.resources.add(newItem);
                            _this3.list.option("items", _this3._parameters.resources.items);
                            _this3.list.scrollToItem(newItem);
                            _this3.textBox.reset();
                            e.component.option("disabled", true)
                        }
                    }
                }]
            }
        }]
    };
    return ResourcesEditDialogInfo
}(DialogInfoBase);
var ConfirmDialogInfo = function(_DialogInfoBase3) {
    _inheritsLoose(ConfirmDialogInfo, _DialogInfoBase3);

    function ConfirmDialogInfo() {
        return _DialogInfoBase3.apply(this, arguments) || this
    }
    var _proto5 = ConfirmDialogInfo.prototype;
    _proto5.getContentTemplate = function() {
        var _this4 = this;
        return function(content) {
            return _this4._getConfirmMessage()
        }
    };
    _proto5._getConfirmMessage = function() {
        switch (this._parameters.type) {
            case 0:
                return _message.default.format("dxGantt-dialogTaskDeleteConfirmation");
            case 1:
                return _message.default.format("dxGantt-dialogDependencyDeleteConfirmation");
            case 2:
                return _message.default.format("dxGantt-dialogResourcesDeleteConfirmation", this._parameters.message);
            default:
                return ""
        }
    };
    _proto5.getToolbarItems = function() {
        return [this._getYesToolbarItem(), this._getNoToolbarItem()]
    };
    return ConfirmDialogInfo
}(DialogInfoBase);
var ConstraintViolationDialogInfo = function(_DialogInfoBase4) {
    _inheritsLoose(ConstraintViolationDialogInfo, _DialogInfoBase4);

    function ConstraintViolationDialogInfo() {
        return _DialogInfoBase4.apply(this, arguments) || this
    }
    var _proto6 = ConstraintViolationDialogInfo.prototype;
    _proto6._getFormItems = function() {
        var items = [];
        items.push({
            text: _message.default.format("dxGantt-dialogCancelOperationMessage"),
            value: 0
        });
        items.push({
            text: _message.default.format("dxGantt-dialogDeleteDependencyMessage"),
            value: 1
        });
        if (!this._parameters.validationError.critical) {
            items.push({
                text: _message.default.format("dxGantt-dialogMoveTaskAndKeepDependencyMessage"),
                value: 2
            })
        }
        return [{
            template: this._parameters.validationError.critical ? _message.default.format("dxGantt-dialogConstraintCriticalViolationMessage") : _message.default.format("dxGantt-dialogConstraintViolationMessage")
        }, {
            cssClass: "dx-cv-dialog-row",
            dataField: "option",
            label: {
                visible: false
            },
            editorType: "dxRadioGroup",
            editorOptions: {
                items: items,
                valueExpr: "value",
                value: 0
            }
        }]
    };
    _proto6._getFormCssClass = function() {
        return "dx-cv-dialog"
    };
    _proto6._updateParameters = function(formData) {
        this._parameters.option = formData.option
    };
    return ConstraintViolationDialogInfo
}(DialogInfoBase);
