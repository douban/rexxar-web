import { namespace } from './utils';

/**
 * Curry function for callback register
 *
 * callbackListener('Rexxar.Widget.AlertDialog')('clickHandler')(()=>{}))
 *
 * @param {string} ns
 * @returns {string} The callback name
 */
const callbackListener = (ns) => (name) => (callback) => {
  namespace(ns)[name] = (jsonStr) => {
    let data;
    try {
      data = JSON.parse(jsonStr);
    } catch(e) {
      data = jsonStr;
    }
    callback(data);
  }
  return `${ns}.${name}`
}

export default callbackListener
