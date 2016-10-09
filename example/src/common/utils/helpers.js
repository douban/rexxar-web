export function namespace(ns) {
  let names = ns.split('.');
  let owner = window;
  for (let i = 0; i < names.length; i++) {
    let name = names[i];
    owner[name] = owner[name] || {};
    owner = owner[name];
  }
  return owner;
}

export function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

export function obj2str(obj) {
  return Object.getOwnPropertyNames(obj).map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
  }).join('&');
}
