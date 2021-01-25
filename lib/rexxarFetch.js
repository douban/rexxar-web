"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
var utils_1 = require("./utils");
var navigator = typeof window !== 'undefined' ? window.navigator : null;
var isAndroid = navigator ? /android/i.test(navigator.userAgent.toLowerCase()) : true;
/**
 * `rexxarFetch` wraps whatwg-fetch function. Use rexxarFetch like using the normal fetch API.
 * However, there are some limitation, rexxarFetch does not support Request object as
 * argument when you are using for HTTP POST, and `application/x-www-form-urlencoded`
 * must be specified as content-type.
 *
 * @param {string|object} input Url string or a Request object
 * @param {object} init Options for Request
 * @returns {function} Promise A Promise that resolves to a Response object.
 */
exports.default = (function (input, init) {
    var request;
    var promise;
    if (typeof (input) !== 'string' && !init) {
        request = input;
        if (request.method === 'POST') {
            throw new Error('rexxarFetch POST error: please use `rexxarFetch(input, init)` for HTTP POST');
        }
    }
    else {
        request = new Request(input, init);
    }
    if (request.method === 'POST') {
        var contentType = request.headers.get('content-type');
        var body = init.body;
        if (!contentType && !body) {
            input = (input + "&_rexxar_method=POST").replace(/[&?]/, '?');
            promise = isomorphic_fetch_1.default(input);
        }
        else if (contentType && contentType.indexOf('application/x-www-form-urlencoded') > -1) {
            if (body && window &&
                'URLSearchParams' in window &&
                window.URLSearchParams.prototype.isPrototypeOf(body)) {
                body = body.toString();
            }
            if (utils_1.getType(body) === 'String') {
                input = (input + "&" + body + "&_rexxar_method=POST").replace(/[&?]/, '?');
                promise = isomorphic_fetch_1.default(input);
            }
            else {
                throw new Error('rexxarFetch POST error: cannot handle this body type');
            }
        }
        else {
            throw new Error('rexxarFetch POST error: only supports `application/x-www-form-urlencoded` as content-type');
        }
    }
    else {
        promise = isomorphic_fetch_1.default(request);
    }
    return promise.then(resolveResponse);
});
function resolveResponse(response) {
    if (isAndroid) {
        var responseBackup_1 = response.clone();
        return response.text().then(function (text) {
            var errorMsg = text.indexOf('_error_=') === 0 ? utils_1.str2obj(text)._error_ : null;
            if (errorMsg) {
                var error = JSON.parse(errorMsg);
                if (error._network_error) {
                    throw new TypeError('Network request failed');
                }
                else if (error._response_error) {
                    var options = {
                        status: error._response_code,
                        statusText: '',
                        headers: new Headers(response.headers)
                    };
                    var res = error._response_error;
                    var body = utils_1.getType(res) === 'Object' ? JSON.stringify(res) : "" + res;
                    return new Response(body, options);
                }
                else {
                    throw new Error('Unknown error type');
                }
            }
            else {
                return responseBackup_1;
            }
        });
    }
    else {
        if (response.status === 999) {
            throw new TypeError('Network request failed');
        }
        return response;
    }
}
//# sourceMappingURL=rexxarFetch.js.map