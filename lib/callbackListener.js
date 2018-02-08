'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

/**
 * Curry function for callback register
 *
 * callbackListener('Rexxar.Widget.AlertDialog')('clickHandler')(()=>{}))
 *
 * @param {string} ns
 * @returns {string} The callback name
 */
var callbackListener = function callbackListener(ns) {
  return function (name) {
    return function (callback) {
      (0, _utils.namespace)(ns)[name] = function (jsonStr) {
        var data = void 0;
        try {
          data = JSON.parse(jsonStr);
        } catch (e) {
          data = jsonStr;
        }
        callback(data);
      };
      return ns + '.' + name;
    };
  };
};

exports.default = callbackListener;