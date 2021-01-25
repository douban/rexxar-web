/**
 * Serialize an object to query string:
 * 
 * obj2str({ a: 1, b: 2 }) => 'a=1&b=2'
 */
export function obj2str(obj:any):string {
  return Object.getOwnPropertyNames(obj).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
  }).join('&');
}

/**
 * Deserialize a query string to an clean object:
 *
 * str2obj('a=1&b=2') => { a: 1, b: 2 }
 */
export function str2obj(str:string):any {
  if (!str) {
    return {}
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
 */
export function getType(obj:any):string {
  return Object.prototype.toString.call(obj).slice(8, -1);
}


/**
 * Declare a namespace from a string:
 *
 * namespace('Rexxar.Widget.AlertDialog') => Rexxar.Widget.AlertDialog = {}
 */
export function namespace(ns:string, root:any=window):any {
  const names = ns.split('.');
  let owner:any = root;
  for (let i = 0; i < names.length; i++) {
    const name = names[i].toString();
    if (name) {
      owner[name] = owner[name] || {};
      owner = owner[name];
    }
  }
  return owner;
}

/**
 * Go to uri
 */
export function callUri(uri:string, container=document.createElement('iframe')):void {
  container.src = uri;
  container.style.display = 'none';
  document.documentElement.appendChild(container);
  setTimeout(() => document.documentElement.removeChild(container), 0);
}
