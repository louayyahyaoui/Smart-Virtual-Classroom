/**
 * DevExtreme (ui/scheduler/ui.scheduler.resource_manager.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _array = require("../../core/utils/array");
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _object = require("../../core/utils/object");
var _iterator = require("../../core/utils/iterator");
var _extend = require("../../core/utils/extend");
var _query = _interopRequireDefault(require("../../data/query"));
var _data = require("../../core/utils/data");
var _data_source = require("../../data/data_source/data_source");
var _deferred = require("../../core/utils/deferred");
var _utils = require("../../data/data_source/utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var getValueExpr = function(resource) {
    return resource.valueExpr || "id"
};
var getDisplayExpr = function(resource) {
    return resource.displayExpr || "text"
};
var ResourceManager = function() {
    function ResourceManager(resources) {
        this._resourceLoader = {};
        this.setResources(resources)
    }
    var _proto = ResourceManager.prototype;
    _proto._createWrappedDataSource = function(dataSource) {
        if (dataSource instanceof _data_source.DataSource) {
            return dataSource
        }
        var result = {
            store: (0, _utils.normalizeDataSourceOptions)(dataSource).store,
            pageSize: 0
        };
        if (!Array.isArray(dataSource)) {
            result.filter = dataSource.filter
        }
        return new _data_source.DataSource(result)
    };
    _proto._mapResourceData = function(resource, data) {
        var valueGetter = (0, _data.compileGetter)(getValueExpr(resource));
        var displayGetter = (0, _data.compileGetter)(getDisplayExpr(resource));
        return (0, _iterator.map)(data, function(item) {
            var result = {
                id: valueGetter(item),
                text: displayGetter(item)
            };
            if (item.color) {
                result.color = item.color
            }
            return result
        })
    };
    _proto._isMultipleResource = function(resourceField) {
        var result = false;
        (0, _iterator.each)(this.getResources(), function(_, resource) {
            var field = this.getField(resource);
            if (field === resourceField) {
                result = resource.allowMultiple;
                return false
            }
        }.bind(this));
        return result
    };
    _proto.getDataAccessors = function(field, type) {
        var result = null;
        (0, _iterator.each)(this._dataAccessors[type], function(accessorName, accessors) {
            if (field === accessorName) {
                result = accessors;
                return false
            }
        });
        return result
    };
    _proto.getField = function(resource) {
        return resource.fieldExpr || resource.field
    };
    _proto.setResources = function(resources) {
        this._resources = resources;
        this._dataAccessors = {
            getter: {},
            setter: {}
        };
        this._resourceFields = (0, _iterator.map)(resources || [], function(resource) {
            var field = this.getField(resource);
            this._dataAccessors.getter[field] = (0, _data.compileGetter)(field);
            this._dataAccessors.setter[field] = (0, _data.compileSetter)(field);
            return field
        }.bind(this))
    };
    _proto.getResources = function() {
        return this._resources || []
    };
    _proto.getResourcesData = function() {
        return this._resourcesData || []
    };
    _proto.getEditors = function() {
        var result = [];
        var that = this;
        (0, _iterator.each)(this.getResources(), function(i, resource) {
            var field = that.getField(resource);
            var currentResourceItems = that._getResourceDataByField(field);
            result.push({
                editorOptions: {
                    dataSource: currentResourceItems.length ? currentResourceItems : that._createWrappedDataSource(resource.dataSource),
                    displayExpr: getDisplayExpr(resource),
                    valueExpr: getValueExpr(resource)
                },
                dataField: field,
                editorType: resource.allowMultiple ? "dxTagBox" : "dxSelectBox",
                label: {
                    text: resource.label || field
                }
            })
        });
        return result
    };
    _proto.getResourceDataByValue = function(field, value) {
        var that = this;
        var result = new _deferred.Deferred;
        (0, _iterator.each)(this.getResources(), function(_, resource) {
            var resourceField = that.getField(resource);
            if (resourceField === field) {
                var dataSource = that._createWrappedDataSource(resource.dataSource);
                var valueExpr = getValueExpr(resource);
                if (!that._resourceLoader[field]) {
                    that._resourceLoader[field] = dataSource.load()
                }
                that._resourceLoader[field].done(function(data) {
                    var filteredData = (0, _query.default)(data).filter(valueExpr, value).toArray();
                    delete that._resourceLoader[field];
                    result.resolve(filteredData[0])
                }).fail(function() {
                    delete that._resourceLoader[field];
                    result.reject()
                });
                return false
            }
        });
        return result.promise()
    };
    _proto.setResourcesToItem = function(itemData, resources) {
        var resourcesSetter = this._dataAccessors.setter;
        for (var name in resources) {
            if (Object.prototype.hasOwnProperty.call(resources, name)) {
                var resourceData = resources[name];
                resourcesSetter[name](itemData, this._isMultipleResource(name) ? (0, _array.wrapToArray)(resourceData) : resourceData)
            }
        }
    };
    _proto.getResourcesFromItem = function(itemData, wrapOnlyMultipleResources) {
        var _this = this;
        var result = null;
        if (!(0, _type.isDefined)(wrapOnlyMultipleResources)) {
            wrapOnlyMultipleResources = false
        }
        this._resourceFields.forEach(function(field) {
            (0, _iterator.each)(itemData, function(fieldName, fieldValue) {
                var tempObject = {};
                tempObject[fieldName] = fieldValue;
                var resourceData = _this.getDataAccessors(field, "getter")(tempObject);
                if ((0, _type.isDefined)(resourceData)) {
                    if (!result) {
                        result = {}
                    }
                    if (1 === resourceData.length) {
                        resourceData = resourceData[0]
                    }
                    if (!wrapOnlyMultipleResources || wrapOnlyMultipleResources && _this._isMultipleResource(field)) {
                        _this.getDataAccessors(field, "setter")(tempObject, (0, _array.wrapToArray)(resourceData))
                    } else {
                        _this.getDataAccessors(field, "setter")(tempObject, resourceData)
                    }(0, _extend.extend)(result, tempObject);
                    return true
                }
            })
        });
        return result
    };
    _proto.loadResources = function(groups) {
        var result = new _deferred.Deferred;
        var that = this;
        var deferreds = [];
        (0, _iterator.each)(this.getResourcesByFields(groups), function(i, resource) {
            var deferred = new _deferred.Deferred;
            var field = that.getField(resource);
            deferreds.push(deferred);
            that._createWrappedDataSource(resource.dataSource).load().done(function(data) {
                deferred.resolve({
                    name: field,
                    items: that._mapResourceData(resource, data),
                    data: data
                })
            }).fail(function() {
                deferred.reject()
            })
        });
        if (!deferreds.length) {
            that._resourcesData = [];
            return result.resolve([])
        }
        _deferred.when.apply(null, deferreds).done(function() {
            var data = Array.prototype.slice.call(arguments);
            var mapFunction = function(obj) {
                return {
                    name: obj.name,
                    items: obj.items,
                    data: obj.data
                }
            };
            that._resourcesData = data;
            result.resolve(data.map(mapFunction))
        }).fail(function() {
            result.reject()
        });
        return result.promise()
    };
    _proto.getResourcesByFields = function(fields) {
        return (0, _common.grep)(this.getResources(), function(resource) {
            var field = this.getField(resource);
            return (0, _array.inArray)(field, fields) > -1
        }.bind(this))
    };
    _proto.getResourceByField = function(field) {
        return this.getResourcesByFields([field])[0] || {}
    };
    _proto.getResourceColor = function(field, value) {
        var valueExpr = this.getResourceByField(field).valueExpr || "id";
        var valueGetter = (0, _data.compileGetter)(valueExpr);
        var colorExpr = this.getResourceByField(field).colorExpr || "color";
        var colorGetter = (0, _data.compileGetter)(colorExpr);
        var result = new _deferred.Deferred;
        var resourceData = this._getResourceDataByField(field);
        var resourceDataLength = resourceData.length;
        var color;
        if (resourceDataLength) {
            for (var i = 0; i < resourceDataLength; i++) {
                if (valueGetter(resourceData[i]) === value) {
                    color = colorGetter(resourceData[i]);
                    break
                }
            }
            result.resolve(color)
        } else {
            this.getResourceDataByValue(field, value).done(function(resourceData) {
                if (resourceData) {
                    color = colorGetter(resourceData)
                }
                result.resolve(color)
            }).fail(function() {
                result.reject()
            })
        }
        return result.promise()
    };
    _proto.getResourceForPainting = function(groups) {
        var resources = this.getResources();
        var result;
        (0, _iterator.each)(resources, function(index, resource) {
            if (resource.useColorAsDefault) {
                result = resource;
                return false
            }
        });
        if (!result) {
            if (Array.isArray(groups) && groups.length) {
                resources = this.getResourcesByFields(groups)
            }
            result = resources[resources.length - 1]
        }
        return result
    };
    _proto.createResourcesTree = function(groups) {
        var leafIndex = 0;
        var groupIndex = groupIndex || 0;

        function make(group, groupIndex, result, parent) {
            result = result || [];
            for (var i = 0; i < group.items.length; i++) {
                var currentGroupItem = group.items[i];
                var resultItem = {
                    name: group.name,
                    value: currentGroupItem.id,
                    title: currentGroupItem.text,
                    data: group.data && group.data[i],
                    children: [],
                    parent: parent ? parent : null
                };
                result.push(resultItem);
                var nextGroupIndex = groupIndex + 1;
                if (groups[nextGroupIndex]) {
                    make.call(this, groups[nextGroupIndex], nextGroupIndex, resultItem.children, resultItem)
                }
                if (!resultItem.children.length) {
                    resultItem.leafIndex = leafIndex;
                    leafIndex++
                }
            }
            return result
        }
        return make.call(this, groups[0], 0)
    };
    _proto._hasGroupItem = function(appointmentResources, groupName, itemValue) {
        var group = this.getDataAccessors(groupName, "getter")(appointmentResources);
        if (group) {
            if ((0, _array.inArray)(itemValue, group) > -1) {
                return true
            }
        }
        return false
    };
    _proto._getResourceDataByField = function(fieldName) {
        var loadedResources = this.getResourcesData();
        var currentResourceData = [];
        for (var i = 0, resourceCount = loadedResources.length; i < resourceCount; i++) {
            if (loadedResources[i].name === fieldName) {
                currentResourceData = loadedResources[i].data;
                break
            }
        }
        return currentResourceData
    };
    _proto.getResourceTreeLeaves = function(tree, appointmentResources, result) {
        result = result || [];
        for (var i = 0; i < tree.length; i++) {
            if (!this._hasGroupItem(appointmentResources, tree[i].name, tree[i].value)) {
                continue
            }
            if ((0, _type.isDefined)(tree[i].leafIndex)) {
                result.push(tree[i].leafIndex)
            }
            if (tree[i].children) {
                this.getResourceTreeLeaves(tree[i].children, appointmentResources, result)
            }
        }
        return result
    };
    _proto.groupAppointmentsByResources = function(appointments, resources) {
        var tree = this.createResourcesTree(resources);
        var result = {};
        (0, _iterator.each)(appointments, function(_, appointment) {
            var appointmentResources = this.getResourcesFromItem(appointment);
            var treeLeaves = this.getResourceTreeLeaves(tree, appointmentResources);
            for (var i = 0; i < treeLeaves.length; i++) {
                if (!result[treeLeaves[i]]) {
                    result[treeLeaves[i]] = []
                }
                result[treeLeaves[i]].push((0, _object.deepExtendArraySafe)({}, appointment, true))
            }
        }.bind(this));
        return result
    };
    _proto.reduceResourcesTree = function(tree, existingAppointments, _result) {
        _result = _result ? _result.children : [];
        var that = this;
        tree.forEach(function(node, index) {
            var ok = false;
            var resourceName = node.name;
            var resourceValue = node.value;
            var resourceTitle = node.title;
            var resourceData = node.data;
            var resourceGetter = that.getDataAccessors(resourceName, "getter");
            existingAppointments.forEach(function(appointment) {
                if (!ok) {
                    var resourceFromAppointment = resourceGetter(appointment);
                    if (Array.isArray(resourceFromAppointment)) {
                        if (resourceFromAppointment.indexOf(resourceValue) > -1) {
                            _result.push({
                                name: resourceName,
                                value: resourceValue,
                                title: resourceTitle,
                                data: resourceData,
                                children: []
                            });
                            ok = true
                        }
                    } else {
                        if (resourceFromAppointment === resourceValue) {
                            _result.push({
                                name: resourceName,
                                value: resourceValue,
                                title: resourceTitle,
                                data: resourceData,
                                children: []
                            });
                            ok = true
                        }
                    }
                }
            });
            if (ok && node.children && node.children.length) {
                that.reduceResourcesTree(node.children, existingAppointments, _result[index])
            }
        });
        return _result
    };
    _proto.getResourcesDataByGroups = function(groups) {
        var _this2 = this;
        var resourcesData = this.getResourcesData();
        if (!groups) {
            return resourcesData
        }
        var fieldNames = Object.getOwnPropertyNames(groups);
        var resourceData = resourcesData.filter(function(item) {
            return fieldNames.indexOf(item.name) !== -1
        });
        var currentResourcesData = [];
        resourceData.forEach(function(data) {
            return currentResourcesData.push((0, _extend.extend)({}, data))
        });
        (0, _iterator.each)(groups, function(_, value) {
            currentResourcesData.forEach(function(resourceData) {
                var items = resourceData.items,
                    data = resourceData.data,
                    name = resourceData.name;
                var resource = _this2.getResourceByField(name);
                var valueExpr = getValueExpr(resource);
                var currentItems = items.filter(function(item) {
                    return item.id === value
                });
                var currentData = data.filter(function(item) {
                    return item[valueExpr] === value
                });
                resourceData.items = currentItems;
                resourceData.data = currentData
            })
        });
        return currentResourcesData
    };
    return ResourceManager
}();
exports.default = ResourceManager;
module.exports = exports.default;
