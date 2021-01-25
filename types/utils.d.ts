/**
 * Serialize an object to query string:
 *
 * obj2str({ a: 1, b: 2 }) => 'a=1&b=2'
 */
export declare function obj2str(obj: any): string;
/**
 * Deserialize a query string to an clean object:
 *
 * str2obj('a=1&b=2') => { a: 1, b: 2 }
 */
export declare function str2obj(str: string): any;
/**
 * Get the value type:
 *
 * getType({}) => 'Object'
 * getType([]) => 'Array'
 */
export declare function getType(obj: any): string;
/**
 * Declare a namespace from a string:
 *
 * namespace('Rexxar.Widget.AlertDialog') => Rexxar.Widget.AlertDialog = {}
 */
export declare function namespace(ns: string, root?: any): any;
/**
 * Go to uri
 */
export declare function callUri(uri: string): void;
