'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

/**
 * Assemble payload for message
 *
 * assemblePayload({ data: '' })
 *
 * @param {object} obj
 * @param {string} base
 * @returns {string}
 */
var assemblePayload = function assemblePayload(obj) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if ((0, _utils.getType)(obj) !== 'Object' || (0, _utils.getType)(base) !== 'String') {
    throw new Error('assemblePayload arguments type error');
  }
  var query = Object.getOwnPropertyNames(obj).map(function (key) {
    var value = obj[key];
    // Q: does callback need to be registed
    if ((0, _utils.getType)(value) === 'Object') {
      value = JSON.stringify(value);
    }
    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
  }).join('&');
  if (base) {
    base = '/' + base;
  }
  return (base + '&' + query).replace(/[&?]/, '?');
};

exports.default = assemblePayload;