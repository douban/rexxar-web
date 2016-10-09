'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = rexxarFetch;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navigator = typeof window !== 'undefined' ? window.navigator : null;

var isAndroid = navigator ? /android/i.test(navigator.userAgent.toLowerCase()) : true;

/**
 * `rexxarFetch` wraps whatwg-fetch function. Use rexxarFetch like using the normal fetch API.
 * However, there are some limitation, rexxarFetch does not support Request object as
 * argument when you are using for POST in Android, and `application/x-www-form-urlencoded`
 * must be specified as content-type.
 *
 * @param {string|object} input Url string or a Request object
 * @param {object} init Options for Request
 * @returns {function} Promise A Promise that resolves to a Response object.
 */
function rexxarFetch(input, init) {

  var request = void 0;
  var promise = void 0;

  if (Request.prototype.isPrototypeOf(input) && !init) {
    request = input;
    if (request.method === 'POST' && isAndroid) {
      throw new Error('Please use `rexxarFetch(input, init)` for HTTP POST in Android');
    }
  } else {
    request = new Request(input, init);
  }

  if (request.method === 'POST' && isAndroid) {
    var contentType = request.headers.get('content-type');
    var body = init.body || '';

    if ((0, _utils.getType)(body) === 'String' && contentType.indexOf('application/x-www-form-urlencoded') > -1) {
      input = (input + '&' + body + '&_rexxar_method=POST').replace(/[&?]/, '?');
      promise = (0, _isomorphicFetch2.default)(input);
    } else {
      throw new Error('Rexxar Android only supports `application/x-www-form-urlencoded` as content-type');
    }
  } else {
    promise = (0, _isomorphicFetch2.default)(request);
  }

  return promise.then(resolveResponse);
}

function resolveResponse(response) {

  if (isAndroid) {
    var _ret = function () {
      var responseBackup = response.clone();

      return {
        v: response.text().then(function (text) {

          var errorMsg = text.indexOf('_error_=') === 0 ? (0, _utils.str2obj)(text)._error_ : null;

          if (errorMsg) {
            var error = JSON.parse(errorMsg);

            if (error._network_error) {
              throw new TypeError('Network request failed');
            } else if (error._response_error) {
              var options = {
                status: error._response_code,
                statusText: '',
                headers: new Headers(response.headers)
              };

              var res = error._response_error;
              var body = (0, _utils.getType)(res) === 'Object' ? JSON.stringify(res) : '' + res;

              return new Response(body, options);
            } else {
              throw new Error('Unknown error type');
            }
          } else {
            return responseBackup;
          }
        })
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    return response;
  }
}