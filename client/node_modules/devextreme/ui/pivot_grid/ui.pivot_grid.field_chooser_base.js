/**
 * DevExtreme (ui/pivot_grid/ui.pivot_grid.field_chooser_base.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _array_store = _interopRequireDefault(require("../../data/array_store"));
var _click = require("../../events/click");
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _array = require("../../core/utils/array");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _message = _interopRequireDefault(require("../../localization/message"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _uiGrid_core = require("../grid_core/ui.grid_core.header_filter_core");
var _uiGrid_core2 = _interopRequireDefault(require("../grid_core/ui.grid_core.column_state_mixin"));
var _uiGrid_core3 = _interopRequireDefault(require("../grid_core/ui.grid_core.sorting_mixin"));
var _uiPivot_grid = require("./ui.pivot_grid.utils");
var _ui2 = _interopRequireDefault(require("./ui.sortable"));
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var IE_FIELD_WIDTH_CORRECTION = 1;
var DIV = "<div>";
var HeaderFilterView = _uiGrid_core.HeaderFilterView.inherit({
    _getSearchExpr: function(options) {
        options.useDefaultSearchExpr = true;
        return this.callBase(options)
    }
});
var processItems = function(groupItems, field) {
    var filterValues = [];
    var isTree = !!field.groupName;
    var isExcludeFilterType = "exclude" === field.filterType;
    if (field.filterValues) {
        (0, _iterator.each)(field.filterValues, function(_, filterValue) {
            filterValues.push(Array.isArray(filterValue) ? filterValue.join("/") : filterValue && filterValue.valueOf())
        })
    }(0, _uiPivot_grid.foreachTree)(groupItems, function(items) {
        var item = items[0];
        var path = (0, _uiPivot_grid.createPath)(items);
        var preparedFilterValueByText = isTree ? (0, _iterator.map)(items, function(item) {
            return item.text
        }).reverse().join("/") : item.text;
        item.value = isTree ? path.slice(0) : item.key || item.value;
        var preparedFilterValue = isTree ? path.join("/") : item.value && item.value.valueOf();
        if (item.children) {
            item.items = item.children;
            item.children = null
        }(0, _uiGrid_core.updateHeaderFilterItemSelectionState)(item, item.key && (0, _array.inArray)(preparedFilterValueByText, filterValues) > -1 || (0, _array.inArray)(preparedFilterValue, filterValues) > -1, isExcludeFilterType)
    })
};

function getMainGroupField(dataSource, sourceField) {
    var field = sourceField;
    if ((0, _type.isDefined)(sourceField.groupIndex)) {
        field = dataSource.getAreaFields(sourceField.area, true)[sourceField.areaIndex]
    }
    return field
}

function getStringState(state) {
    state = state || {};
    return JSON.stringify([state.fields, state.columnExpandedPaths, state.rowExpandedPaths])
}
var FieldChooserBase = _ui.default.inherit(_uiGrid_core2.default).inherit(_uiGrid_core3.default).inherit(_uiGrid_core.headerFilterMixin).inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            allowFieldDragging: true,
            applyChangesMode: "instantly",
            state: null,
            headerFilter: {
                width: 252,
                height: 325,
                searchTimeout: 500,
                texts: {
                    emptyValue: _message.default.format("dxDataGrid-headerFilterEmptyValue"),
                    ok: _message.default.format("dxDataGrid-headerFilterOK"),
                    cancel: _message.default.format("dxDataGrid-headerFilterCancel")
                }
            }
        })
    },
    _init: function() {
        this.callBase();
        this._headerFilterView = new HeaderFilterView(this);
        this._refreshDataSource();
        this.subscribeToEvents()
    },
    _refreshDataSource: function() {
        var dataSource = this.option("dataSource");
        if (dataSource && dataSource.fields && dataSource.load) {
            this._dataSource = dataSource
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "dataSource":
                this._refreshDataSource();
                break;
            case "applyChangesMode":
                break;
            case "state":
                if (this._skipStateChange || !this._dataSource) {
                    break
                }
                if ("instantly" === this.option("applyChangesMode") && getStringState(this._dataSource.state()) !== getStringState(args.value)) {
                    this._dataSource.state(args.value)
                } else {
                    this._clean(true);
                    this._renderComponent()
                }
                break;
            case "headerFilter":
            case "allowFieldDragging":
                this._invalidate();
                break;
            default:
                this.callBase(args)
        }
    },
    renderField: function(field, showColumnLines) {
        var that = this;
        var $fieldContent = (0, _renderer.default)(DIV).addClass("dx-area-field-content").text(field.caption || field.dataField);
        var $fieldElement = (0, _renderer.default)(DIV).addClass("dx-area-field").addClass("dx-area-box").data("field", field).append($fieldContent);
        var mainGroupField = getMainGroupField(that._dataSource, field);
        if ("data" !== field.area) {
            if (field.allowSorting) {
                that._applyColumnState({
                    name: "sort",
                    rootElement: $fieldElement,
                    column: {
                        alignment: that.option("rtlEnabled") ? "right" : "left",
                        sortOrder: "desc" === field.sortOrder ? "desc" : "asc"
                    },
                    showColumnLines: showColumnLines
                })
            }
            that._applyColumnState({
                name: "headerFilter",
                rootElement: $fieldElement,
                column: {
                    alignment: that.option("rtlEnabled") ? "right" : "left",
                    filterValues: mainGroupField.filterValues,
                    allowFiltering: mainGroupField.allowFiltering && !field.groupIndex
                },
                showColumnLines: showColumnLines
            })
        }
        if (field.groupName) {
            $fieldElement.attr("item-group", field.groupName)
        }
        return $fieldElement
    },
    _clean: function() {},
    _render: function() {
        this.callBase();
        this._headerFilterView.render(this.$element())
    },
    renderSortable: function() {
        var that = this;
        that._createComponent(that.$element(), _ui2.default, (0, _extend.extend)({
            allowDragging: that.option("allowFieldDragging"),
            itemSelector: ".dx-area-field",
            itemContainerSelector: ".dx-area-field-container",
            groupSelector: ".dx-area-fields",
            groupFilter: function() {
                var dataSource = that._dataSource;
                var $sortable = (0, _renderer.default)(this).closest(".dx-sortable-old");
                var pivotGrid = $sortable.data("dxPivotGrid");
                var pivotGridFieldChooser = $sortable.data("dxPivotGridFieldChooser");
                if (pivotGrid) {
                    return pivotGrid.getDataSource() === dataSource
                }
                if (pivotGridFieldChooser) {
                    return pivotGridFieldChooser.option("dataSource") === dataSource
                }
                return false
            },
            itemRender: function($sourceItem, target) {
                var $item;
                if ($sourceItem.hasClass("dx-area-box")) {
                    $item = $sourceItem.clone();
                    if ("drag" === target) {
                        (0, _iterator.each)($sourceItem, function(index, sourceItem) {
                            $item.eq(index).css("width", parseInt((0, _renderer.default)(sourceItem).outerWidth(), 10) + IE_FIELD_WIDTH_CORRECTION)
                        })
                    }
                } else {
                    $item = (0, _renderer.default)(DIV).addClass("dx-area-field").addClass("dx-area-box").text($sourceItem.text())
                }
                if ("drag" === target) {
                    var wrapperContainer = (0, _renderer.default)(DIV);
                    (0, _iterator.each)($item, function(_, item) {
                        var wrapper = (0, _renderer.default)("<div>").addClass("dx-pivotgrid-fields-container").addClass("dx-widget").append((0, _renderer.default)(item));
                        wrapperContainer.append(wrapper)
                    });
                    return wrapperContainer.children()
                }
                return $item
            },
            onDragging: function(e) {
                var field = e.sourceElement.data("field");
                var targetGroup = e.targetGroup;
                e.cancel = false;
                if (true === field.isMeasure) {
                    if ("column" === targetGroup || "row" === targetGroup || "filter" === targetGroup) {
                        e.cancel = true
                    }
                } else {
                    if (false === field.isMeasure && "data" === targetGroup) {
                        e.cancel = true
                    }
                }
            },
            useIndicator: true,
            onChanged: function(e) {
                var dataSource = that._dataSource;
                var field = e.sourceElement.data("field");
                e.removeSourceElement = !!e.sourceGroup;
                that._adjustSortableOnChangedArgs(e);
                if (field) {
                    that._applyChanges([getMainGroupField(dataSource, field)], {
                        area: e.targetGroup,
                        areaIndex: e.targetIndex
                    })
                }
            }
        }, that._getSortableOptions()))
    },
    _processDemandState: function(func) {
        var that = this;
        var isInstantlyMode = "instantly" === that.option("applyChangesMode");
        var dataSource = that._dataSource;
        if (isInstantlyMode) {
            func(dataSource, isInstantlyMode)
        } else {
            var currentState = dataSource.state();
            var pivotGridState = that.option("state");
            if (pivotGridState) {
                dataSource.state(pivotGridState, true)
            }
            func(dataSource, isInstantlyMode);
            dataSource.state(currentState, true)
        }
    },
    _applyChanges: function(fields, props) {
        var that = this;
        that._processDemandState(function(dataSource, isInstantlyMode) {
            fields.forEach(function(_ref) {
                var index = _ref.index;
                dataSource.field(index, props)
            });
            if (isInstantlyMode) {
                dataSource.load()
            } else {
                that._changedHandler()
            }
        })
    },
    _adjustSortableOnChangedArgs: function(e) {
        e.removeSourceElement = false;
        e.removeTargetElement = true;
        e.removeSourceClass = false
    },
    _getSortableOptions: function() {
        return {
            direction: "auto"
        }
    },
    subscribeToEvents: function(element) {
        var that = this;
        var func = function(e) {
            var field = (0, _renderer.default)(e.currentTarget).data("field");
            var mainGroupField = (0, _extend.extend)(true, {}, getMainGroupField(that._dataSource, field));
            var isHeaderFilter = (0, _renderer.default)(e.target).hasClass("dx-header-filter");
            var dataSource = that._dataSource;
            var type = mainGroupField.groupName ? "tree" : "list";
            var paginate = dataSource.paginate() && "list" === type;
            if (isHeaderFilter) {
                that._headerFilterView.showHeaderFilterMenu((0, _renderer.default)(e.currentTarget), (0, _extend.extend)(mainGroupField, {
                    type: type,
                    encodeHtml: that.option("encodeHtml"),
                    dataSource: {
                        useDefaultSearch: !paginate,
                        load: function(options) {
                            var userData = options.userData;
                            if (userData.store) {
                                return userData.store.load(options)
                            } else {
                                var d = new _deferred.Deferred;
                                dataSource.getFieldValues(mainGroupField.index, that.option("headerFilter.showRelevantValues"), paginate ? options : void 0).done(function(data) {
                                    var emptyValue = that.option("headerFilter.texts.emptyValue");
                                    data.forEach(function(element) {
                                        if (!element.text) {
                                            element.text = emptyValue
                                        }
                                    });
                                    if (paginate) {
                                        d.resolve(data)
                                    } else {
                                        userData.store = new _array_store.default(data);
                                        userData.store.load(options).done(d.resolve).fail(d.reject)
                                    }
                                }).fail(d.reject);
                                return d
                            }
                        },
                        postProcess: function(data) {
                            processItems(data, mainGroupField);
                            return data
                        }
                    },
                    apply: function() {
                        that._applyChanges([mainGroupField], {
                            filterValues: this.filterValues,
                            filterType: this.filterType
                        })
                    }
                }))
            } else {
                if (field.allowSorting && "data" !== field.area) {
                    that._applyChanges([field], {
                        sortOrder: "desc" === field.sortOrder ? "asc" : "desc"
                    })
                }
            }
        };
        if (element) {
            _events_engine.default.on(element, _click.name, ".dx-area-field.dx-area-box", func);
            return
        }
        _events_engine.default.on(that.$element(), _click.name, ".dx-area-field.dx-area-box", func)
    },
    _initTemplates: _common.noop,
    addWidgetPrefix: function(className) {
        return "dx-pivotgrid-" + className
    }
});
(0, _component_registrator.default)("dxPivotGridFieldChooserBase", FieldChooserBase);
var _default = FieldChooserBase;
exports.default = _default;
module.exports = exports.default;
