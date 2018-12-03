'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
 * argument when you are using for HTTP POST, PUT and DELETE, and `application/x-www-form-urlencoded`
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
    if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
      throw new Error('rexxarFetch ' + request.method + ' error: please use `rexxarFetch(input, init)` for HTTP ' + request.method);
    }
  } else {
    request = new Request(input, init);
  }

  if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
    var contentType = request.headers.get('content-type');
    var body = init.body;
    var method = request.method;

    if (!contentType && !body) {
      input = (input + '&_rexxar_method=' + method).replace(/[&?]/, '?');
      promise = (0, _isomorphicFetch2.default)(input);
    } else if (contentType && contentType.indexOf('application/x-www-form-urlencoded') > -1) {
      if (window && 'URLSearchParams' in window && window.URLSearchParams.prototype.isPrototypeOf(body)) {
        body = body.toString();
      }
      if ((0, _utils.getType)(body) === 'String') {
        input = (input + '&' + body + '&_rexxar_method=' + method).replace(/[&?]/, '?');
        promise = (0, _isomorphicFetch2.default)(input);
      } else {
        throw new Error('rexxarFetch ' + method + ' error: cannot handle this body type');
      }
    } else {
      throw new Error('rexxarFetch ' + method + ' error: only supports `application/x-www-form-urlencoded` as content-type');
    }
  } else {
    promise = (0, _isomorphicFetch2.default)(request);
  }

  return promise.then(resolveResponse);
}

function resolveResponse(response) {

  if (isAndroid) {
    var responseBackup = response.clone();

    return response.text().then(function (text) {

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
    });
  } else {
    if (response.status === 999) {
      throw new TypeError('Network request failed');
    }
    return response;
  }
}