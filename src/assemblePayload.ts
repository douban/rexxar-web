import { getType } from './utils';

/**
 * Assemble payload for message
 *
 * assemblePayload({ data: '' })
 */

export default (obj:any, base=''):string => {
  let _base = base;
  if (getType(obj) !== 'Object' || getType(_base) !== 'String') {
    throw new Error('assemblePayload arguments type error')
  }
  let query = Object.getOwnPropertyNames(obj).map((key) => {
    let value = obj[key]
    // Q: does callback need to be registed
    if (getType(value) === 'Object') {
      value = JSON.stringify(value)
    }
    return encodeURIComponent(key) + '=' + encodeURIComponent(value)
  }).join('&');
  if (_base) {
    _base = `/${_base}`;
  }
  return `${_base}&${query}`.replace(/[&?]/, '?');
}