import { namespace } from './utils';

/**
 * Curry function for callback register
 *
 * callbackListener('Rexxar.Widget.AlertDialog')('clickHandler')(()=>{}))
 */

export default (ns:string) => (name:string) => (callback:Function):string => {
  namespace(ns)[name] = (jsonStr:string):any => {
    let data;
    try {
      data = JSON.parse(jsonStr);
    } catch (e) {
      data = jsonStr;
    }
    return callback(data)
  }

  return `${ns}.${name}`
}