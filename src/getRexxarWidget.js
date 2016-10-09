import { obj2str, getType } from './utils';

/**
 * Accept sheme and host as configrations, Returns a base class for Widget inheritance.
 * See `example` folder as an example of the RexxarWidget Usage.
 *
 * @param {object} config { scheme: 'douban', host: 'rexxar-container' }
 * @returns {function} RexxarWidget Inherit RexxarWidget and writing you own widget
 */
export default function getRexxarWidget({ scheme, host }) {

  if (!scheme || getType(scheme) !== 'String') {
    throw new Error('getRexxarWidget config `scheme` expected a non-empty string.')
  }

  if (!host || getType(host) !== 'String') {
    throw new Error('getRexxarWidget config `host` expected a non-empty string.')
  }

  return class RexxarWidget {

    constructor(name) {
      this.name = name;
    }

    call(params) {
      let search;
      if (getType(params) === 'Object') {
        search = '?' + obj2str(params);
      } else if (params === null || params === undefined) {
        search = '';
      } else {
        throw new Error('`call` method in RexxarWidget expected argument to be an object.');
      }

      let pathname = `/${this.name}`;

      let iframe = document.createElement('iframe');
      iframe.src = `${scheme}://${host}${pathname}${search}`;
      iframe.style.display = 'none';
      document.documentElement.appendChild(iframe);
      setTimeout(function() {
        document.documentElement.removeChild(iframe);
      }, 0);
    }

  }

}
