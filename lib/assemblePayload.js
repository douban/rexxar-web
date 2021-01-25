"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
/**
 * Assemble payload for message
 *
 * assemblePayload({ data: '' })
 */
exports.default = (function (obj, base) {
    if (base === void 0) { base = ''; }
    var _base = base;
    if (utils_1.getType(obj) !== 'Object' || utils_1.getType(_base) !== 'String') {
        throw new Error('assemblePayload arguments type error');
    }
    var query = Object.getOwnPropertyNames(obj).map(function (key) {
        var value = obj[key];
        // Q: does callback need to be registed
        if (utils_1.getType(value) === 'Object') {
            value = JSON.stringify(value);
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(value);
    }).join('&');
    if (_base) {
        _base = "/" + _base;
    }
    return (_base + "&" + query).replace(/[&?]/, '?');
});
//# sourceMappingURL=assemblePayload.js.map