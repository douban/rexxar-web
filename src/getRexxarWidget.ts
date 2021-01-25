/**
 * IMPORTANT: This is deprecated
 */

import { obj2str, getType } from './utils'; 

/**
 * Accept sheme and host as configrations, Returns a base class for Widget inheritance.
 * See `example` folder as an example of the RexxarWidget Usage.
 */

interface Config {
  schema: 'douban',
  host: 'rexxar-container'
}

interface RexxarWidgetCall {
  (params:string|null|undefined): void
}

interface RexxarWidget {
  name: string,
  call: RexxarWidgetCall
}

export default (config:Config):RexxarWidget => {
  const { schema, host } = config;
  if (!schema || getType(schema) !== 'String') {
    throw new Error('getRexxarWidget config `schema` expected a non-empty string.')
  }

  if (!host || getType(host) !== 'String') {
    throw new Error('getRexxarWidget config `host` expected a non-empty string.')
  }

  return class RexxarWidget implements RexxarWidget {
    name:string

    constructor(name:string) {
      this.name = name;
    }

    call(params:string|null|undefined) {
      let search;
      if (getType(params) === 'Object') {
        search = '?' + obj2str(params);
      } else if (params === null || params === undefined) {
        search = '';
      } else {
        throw new Error('`call` method in RexxarWidget expected argument to be an object.');
      }

      const pathname = `/${this.name}`;

      const iframe = document.createElement('iframe');
      iframe.src = `${schema}://${host}${pathname}${search}`;
      iframe.style.display = 'none';
      document.documentElement.appendChild(iframe);
      setTimeout(function() {
        document.documentElement.removeChild(iframe);
      }, 0);
    }
  }
}