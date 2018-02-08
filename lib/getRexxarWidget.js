'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * IMPORTANT: This is deprecated
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

exports.default = getRexxarWidget;

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Accept sheme and host as configrations, Returns a base class for Widget inheritance.
 * See `example` folder as an example of the RexxarWidget Usage.
 *
 * @param {object} config { scheme: 'douban', host: 'rexxar-container' }
 * @returns {function} RexxarWidget Inherit RexxarWidget and writing you own widget
 */
function getRexxarWidget(_ref) {
  var scheme = _ref.scheme,
      host = _ref.host;


  if (!scheme || (0, _utils.getType)(scheme) !== 'String') {
    throw new Error('getRexxarWidget config `scheme` expected a non-empty string.');
  }

  if (!host || (0, _utils.getType)(host) !== 'String') {
    throw new Error('getRexxarWidget config `host` expected a non-empty string.');
  }

  return function () {
    function RexxarWidget(name) {
      _classCallCheck(this, RexxarWidget);

      this.name = name;
    }

    _createClass(RexxarWidget, [{
      key: 'call',
      value: function call(params) {
        var search = void 0;
        if ((0, _utils.getType)(params) === 'Object') {
          search = '?' + (0, _utils.obj2str)(params);
        } else if (params === null || params === undefined) {
          search = '';
        } else {
          throw new Error('`call` method in RexxarWidget expected argument to be an object.');
        }

        var pathname = '/' + this.name;

        var iframe = document.createElement('iframe');
        iframe.src = scheme + '://' + host + pathname + search;
        iframe.style.display = 'none';
        document.documentElement.appendChild(iframe);
        setTimeout(function () {
          document.documentElement.removeChild(iframe);
        }, 0);
      }
    }]);

    return RexxarWidget;
  }();
}