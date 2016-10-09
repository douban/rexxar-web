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
