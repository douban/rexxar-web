import fetch from 'isomorphic-fetch';

import { str2obj, getType } from './utils';

const navigator = typeof window !== 'undefined' ? window.navigator : null;

const isAndroid = navigator ? /android/i.test(navigator.userAgent.toLowerCase()) : true;

/**
 * `rexxarFetch` wraps whatwg-fetch function. Use rexxarFetch like using the normal fetch API.
 * However, there are some limitation, rexxarFetch does not support Request object as
 * argument when you are using for HTTP POST, and `application/x-www-form-urlencoded`
 * must be specified as content-type.
 *
 * @param {string|object} input Url string or a Request object
 * @param {object} init Options for Request
 * @returns {function} Promise A Promise that resolves to a Response object.
 */
export default function rexxarFetch(input, init) {

  let request;
  let promise;

  if (Request.prototype.isPrototypeOf(input) && !init) {
    request = input;
    if (request.method === 'POST') {
      throw new Error('rexxarFetch POST error: please use `rexxarFetch(input, init)` for HTTP POST');
    }
  } else {
    request = new Request(input, init);
  }

  if (request.method === 'POST') {
    let contentType = request.headers.get('content-type');
    let body = init.body;

    if (!contentType && !body ) {
      input = `${input}&_rexxar_method=POST`.replace(/[&?]/, '?');
      promise = fetch(input);
    } else if (contentType && contentType.indexOf('application/x-www-form-urlencoded') > -1) {
      if (window && 'URLSearchParams' in window && window.URLSearchParams.prototype.isPrototypeOf(body)) {
        body = body.toString();
      }
      if (getType(body) === 'String') {
        input = `${input}&${body}&_rexxar_method=POST`.replace(/[&?]/, '?');
        promise = fetch(input);
      } else {
        throw new Error('rexxarFetch POST error: cannot handle this body type');
      }
    } else {
      throw new Error('rexxarFetch POST error: only supports `application/x-www-form-urlencoded` as content-type');
    }
  } else {
    promise = fetch(request);
  }

  return promise.then(resolveResponse);

}

function resolveResponse(response) {

  if (isAndroid) {
    let responseBackup = response.clone();

    return response.text().then((text) => {

      let errorMsg = text.indexOf('_error_=') === 0 ? str2obj(text)._error_ : null;

      if (errorMsg) {
        let error = JSON.parse(errorMsg);

        if (error._network_error) {
          throw new TypeError('Network request failed');
        } else if (error._response_error) {
          let options = {
            status: error._response_code,
            statusText: '',
            headers: new Headers(response.headers)
          };

          let res = error._response_error;
          let body = getType(res) === 'Object' ? JSON.stringify(res) : `${res}`;

          return new Response(body, options)
        } else {
          throw new Error('Unknown error type');
        }
      } else {
        return responseBackup;
      }

    });
  } else {
    if (response.status === 999) {
      throw new TypeError('Network request failed');
    }
    return response;
  }

}
