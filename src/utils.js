/**
 * Serialize an object to query string:
 *
 * obj2str({ a: 1, b: 2 }) => 'a=1&b=2'
 *
 * @param {object} obj
 * @returns {string}
 */
export function obj2str(obj) {
  return Object.getOwnPropertyNames(obj).map(key => {
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
export function str2obj(str) {
  if (!str) {
    return {};
  }

  return str.split('&').reduce((acc, cur) => {
    let [ k, v ] = cur.split('=');
    k = decodeURIComponent(k);
    v = decodeURIComponent(v);
    return {
      ...acc,
      [k]: v
    }
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
export function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

/**
 * Declare a namespace from a string:
 *
 * namespace('Rexxar.Widget.AlertDialog') => Rexxar.Widget.AlertDialog = {}
 *
 * @param {string} ns
 * @returns {object}
 */
export function namespace(ns) {
  let names = ns.split('.');
  let owner = window;
  for (let i = 0; i < names.length; i++) {
    let name = names[i];
    owner[name] = owner[name] || {};
    owner = owner[name];
  }
  return owner;
}

/**
 * Go to uri
 *
 * @param {string} uri
 */
export function callUri(uri) {
  let iframe = document.createElement('iframe');
  iframe.src = uri;
  iframe.style.display = 'none';
  document.documentElement.appendChild(iframe);
  setTimeout(() => document.documentElement.removeChild(iframe), 0);
}
