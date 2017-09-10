import { getType } from './utils';

/**
 * Assemble payload for message
 *
 * assemblePayload({ data: '' })
 *
 * @param {object} obj
 * @param {string} base
 * @returns {string}
 */
const assemblePayload = (obj, base = '') => {
  if (getType(obj) !== 'Object' || getType(base) !== 'String') {
    throw new Error('assemblePayload arguments type error')
  }
  let query = Object.getOwnPropertyNames(obj).map(key => {
    let value = obj[key]
    // Q: does callback need to be registed
    if (getType(value) === 'Object') {
      value = JSON.stringify(value)
    }
    return encodeURIComponent(key) + '=' + encodeURIComponent(value)
  }).join('&')
  if (base) { base = `/${base}` }
  return `${base}&${query}`.replace(/[&?]/, '?')
}

export default assemblePayload
