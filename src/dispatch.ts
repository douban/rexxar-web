import { callUri } from './utils';

/**
 * Dispatch message to client
 *
 */

 export default (msg:string):void => {
   callUri(msg);
 }