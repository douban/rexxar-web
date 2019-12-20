"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Curry function returns a message wating for dispatching
 *
 * widgetMessenger('douban', 'rexxar-container')('widget/alert_dialog')
 *
 */
exports.default = (function (schema, host) { return function (name) { return function (payload) {
    return schema + "://" + host + "/" + name + payload;
}; }; });
//# sourceMappingURL=widgetMessenger.js.map