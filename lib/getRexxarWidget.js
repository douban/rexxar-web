"use strict";
/**
 * IMPORTANT: This is deprecated
 */
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
exports.default = (function (config) {
    var schema = config.schema, host = config.host;
    if (!schema || utils_1.getType(schema) !== 'String') {
        throw new Error('getRexxarWidget config `schema` expected a non-empty string.');
    }
    if (!host || utils_1.getType(host) !== 'String') {
        throw new Error('getRexxarWidget config `host` expected a non-empty string.');
    }
    return /** @class */ (function () {
        function RexxarWidget(name) {
            this.name = name;
        }
        RexxarWidget.prototype.call = function (params) {
            var search;
            if (utils_1.getType(params) === 'Object') {
                search = '?' + utils_1.obj2str(params);
            }
            else if (params === null || params === undefined) {
                search = '';
            }
            else {
                throw new Error('`call` method in RexxarWidget expected argument to be an object.');
            }
            var pathname = "/" + this.name;
            var iframe = document.createElement('iframe');
            iframe.src = schema + "://" + host + pathname + search;
            iframe.style.display = 'none';
            document.documentElement.appendChild(iframe);
            setTimeout(function () {
                document.documentElement.removeChild(iframe);
            }, 0);
        };
        return RexxarWidget;
    }());
});
//# sourceMappingURL=getRexxarWidget.js.map