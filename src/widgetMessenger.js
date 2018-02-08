/**
 * Curry function returns a message wating for dispatching
 *
 * widgetMessenger('douban', 'rexxar-container')('widget/alert_dialog')
 *
 * @param {string} scheme
 * @param {string} host
 * @returns {function}
 */
const widgetMessenger = (scheme, host) => (name) => (payload) => `${scheme}://${host}/${name}${payload}`

export default widgetMessenger
