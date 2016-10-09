'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.obj2str = obj2str;
exports.str2obj = str2obj;
exports.getType = getType;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Serialize an object to query string:
 *
 * obj2str({ a: 1, b: 2 }) => 'a=1&b=2'
 *
 * @param {object} obj
 * @returns {string}
 */
function obj2str(obj) {
  return Object.getOwnPropertyNames(obj).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
  }).join('&');
}

/**
 * Deserialize a query string to an clean object:
 *
 * str2obj('a=1&b=2') => { a: 1, b: 2 }
 *
 * @param {string} str
 * @returns {object}
 */
function str2obj(str) {
  if (!str) {
    return {};
  }

  return str.split('&').reduce(function (acc, cur) {
    var _cur$split = cur.split('=');

    var _cur$split2 = _slicedToArray(_cur$split, 2);

    var k = _cur$split2[0];
    var v = _cur$split2[1];

    k = decodeURIComponent(k);
    v = decodeURIComponent(v);
    return _extends({}, acc, _defineProperty({}, k, v));
  }, {});
}

/**
 * Get the value type:
 *
 * getType({}) => 'Object'
 * getType([]) => 'Array'
 *
 * @param {*} obj
 * @returns {string}
 */
function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}