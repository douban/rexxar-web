require('es6-promise').polyfill();
import { rexxarFetch } from 'rexxar-web';
import { obj2str, getType } from './helpers';

export class Request {

  static checkError(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      // 处理API错误的json返回
      return response.json().then((json) => {
        let { localized_message, msg, code } = json;
        return localized_message || msg || code;
      }).catch(() => {
        return 'Error: ' + response.statusText;
      })
    }
  }

  static parseJSON(response) {
    if (typeof response === 'string') {
      let error = new Error(response);
      throw error;
    } else {
      return response.json();
    }
  }

  static processPromise(promise, { success, failure }) {
    if (typeof success === 'function') {
      promise = promise.then(success);
    }

    if (typeof failure === 'function') {
      promise = promise.catch(failure);
    }

    return promise;
  }

  /**
   * GET Request
   *
   * @param {string} url
   * @param {Object} params
   * @param {function} success The callback when success
   * @param {function} failure The callback when error occurs
   * @returns {Promise} promise Returned for next process
   */
  get({ url, params, success, failure }) {
    let cls = this.constructor;
    let urlWithQuery = _appendQuery(url, params);

    let promise = rexxarFetch(urlWithQuery)
      .then(cls.checkError)
      .then(cls.parseJSON);

    return cls.processPromise(promise, { success, failure });
  }

  /**
   * POST Request
   *
   * @param {string} url
   * @param {Object} body
   * @param {function} success The callback when success
   * @param {function} failure The callback when error occurs
   * @returns {Promise} promise Returned for next process
   */
  post({ url, body, success, failure }) {
    let cls = this.constructor;
    let headers = {};
    let type = getType(body);

    switch (type) {
      case 'HTMLFormElement':
        body = new FormData(body);
        break;
      case 'HTMLInputElement':
        body = JSON.stringify({
          [body.name]: body.files[0]
        });
        break;
      case 'Object':
        body = obj2str(body);
        headers = {
          ...headers,
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        };
        break;
    }

    let promise = rexxarFetch(url, {
      method: 'POST',
      headers,
      body
    }).then(cls.checkError)
      .then(cls.parseJSON);

    return cls.processPromise(promise, { success, failure });
  }

}

function _appendQuery(url, params) {
  if (!params) {
    return url;
  } else {
    let query = obj2str(params);
    return (url + '&' + query).replace(/[&?]/, '?');
  }
}

export default new Request();
