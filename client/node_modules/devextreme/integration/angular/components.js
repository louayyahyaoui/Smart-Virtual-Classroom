/**
 * DevExtreme (integration/angular/components.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _module = _interopRequireDefault(require("./module"));
var _angular = _interopRequireDefault(require("angular"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
if (_angular.default) {
    _module.default.service("dxDigestCallbacks", ["$rootScope", function($rootScope) {
        var begin = (0, _callbacks.default)();
        var prioritizedEnd = (0, _callbacks.default)();
        var end = (0, _callbacks.default)();
        var digestPhase = false;
        $rootScope.$watch(function() {
            if (digestPhase) {
                return
            }
            digestPhase = true;
            begin.fire();
            $rootScope.$$postDigest(function() {
                digestPhase = false;
                prioritizedEnd.fire();
                end.fire()
            })
        });
        return {
            begin: {
                add: function(callback) {
                    if (digestPhase) {
                        callback()
                    }
                    begin.add(callback)
                },
                remove: begin.remove.bind(begin)
            },
            end: {
                add: end.add.bind(end),
                addPrioritized: prioritizedEnd.add.bind(prioritizedEnd),
                remove: end.remove.bind(end)
            }
        }
    }])
}
