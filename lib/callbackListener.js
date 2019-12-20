"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
/**
 * Curry function for callback register
 *
 * callbackListener('Rexxar.Widget.AlertDialog')('clickHandler')(()=>{}))
 */
exports.default = (function (ns) { return function (name) { return function (callback) {
    utils_1.namespace(ns)[name] = function (jsonStr) {
        var data;
        try {
            data = JSON.parse(jsonStr);
        }
        catch (e) {
            data = jsonStr;
        }
        callback(data);
    };
    return ns + "." + name;
}; }; });
//# sourceMappingURL=callbackListener.js.map