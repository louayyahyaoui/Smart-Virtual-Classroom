"use strict";

var _cache = _interopRequireDefault(require("./cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('cache', function () {
  it('should cache', function () {
    var cache = new _cache.default();
    var value = {};
    expect(cache.get('123', '456')).to.be.undefined;
    expect(cache.put('123', '456', value)).to.equal(value);
    expect(cache.get('123', '456')).to.equal(value);
    expect(cache.put('123', '789', 123)).to.equal(123);
  });
});
//# sourceMappingURL=cache.test.js.map