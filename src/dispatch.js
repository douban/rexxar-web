import { callUri } from './utils';

/**
 * Dispatch message to client
 *
 * @param {string} msg
 */
const dispatch = (msg) => {
  callUri(msg)
}

export default dispatch
