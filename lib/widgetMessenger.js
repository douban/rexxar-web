"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Curry function returns a message wating for dispatching
 *
 * widgetMessenger('douban', 'rexxar-container')('widget/alert_dialog')
 *
 * @param {string} scheme
 * @param {string} host
 * @returns {function}
 */
var widgetMessenger = function widgetMessenger(scheme, host) {
  return function (name) {
    return function (payload) {
      return scheme + "://" + host + "/" + name + payload;
    };
  };
};

exports.default = widgetMessenger;