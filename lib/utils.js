"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Serialize an object to query string:
 *
 * obj2str({ a: 1, b: 2 }) => 'a=1&b=2'
 */
function obj2str(obj) {
    return Object.getOwnPropertyNames(obj).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }).join('&');
}
exports.obj2str = obj2str;
/**
 * Deserialize a query string to an clean object:
 *
 * str2obj('a=1&b=2') => { a: 1, b: 2 }
 */
function str2obj(str) {
    if (!str) {
        return {};
    }
    return str.split('&').reduce(function (acc, cur) {
        var _a;
        var _b = cur.split('='), k = _b[0], v = _b[1];
        k = decodeURIComponent(k);
        v = decodeURIComponent(v);
        return __assign(__assign({}, acc), (_a = {}, _a[k] = v, _a));
    }, {});
}
exports.str2obj = str2obj;
/**
 * Get the value type:
 *
 * getType({}) => 'Object'
 * getType([]) => 'Array'
 */
function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}
exports.getType = getType;
/**
 * Declare a namespace from a string:
 *
 * namespace('Rexxar.Widget.AlertDialog') => Rexxar.Widget.AlertDialog = {}
 */
function namespace(ns, root) {
    if (root === void 0) { root = window; }
    var names = ns.split('.');
    var owner = root;
    for (var i = 0; i < names.length; i++) {
        var name_1 = names[i].toString();
        if (name_1) {
            owner[name_1] = owner[name_1] || {};
            owner = owner[name_1];
        }
    }
    return owner;
}
exports.namespace = namespace;
/**
 * Go to uri
 */
function callUri(uri) {
    var iframe = document.createElement('iframe');
    iframe.src = uri;
    iframe.style.display = 'none';
    document.documentElement.appendChild(iframe);
    setTimeout(function () { return document.documentElement.removeChild(iframe); }, 0);
}
exports.callUri = callUri;
//# sourceMappingURL=utils.js.map