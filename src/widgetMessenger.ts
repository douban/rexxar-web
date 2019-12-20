/**
 * Curry function returns a message wating for dispatching
 *
 * widgetMessenger('douban', 'rexxar-container')('widget/alert_dialog')
 *
 */
export default (schema:string, host:string) => (name:string) => (payload:string):string => {
  return `${schema}://${host}/${name}${payload}`
}
