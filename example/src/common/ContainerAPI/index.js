import request from '../utils/request';

const cntrApi = 'http://rexxar-container/api/';

export class ContainerAPI {

  static processGet({ type, params, success, failure }) {
    request.get({
      url: cntrApi + type,
      params,
      success,
      failure
    })
  }

  static processPost({ type, body, success, failure }) {
    request.post({
      url: cntrApi + type,
      body,
      success,
      failure
    })
  }

  sendLog(body) {
    return new Promise((resolve, reject) => {
      this.constructor.processPost({
        type: 'log',
        body,
        success: (data) => {
          resolve(data);
        },
        failure: (data) => {
          reject(data);
        }
      });
    })
  }

  getGeo() {
    return new Promise((resolve, reject) => {
      this.constructor.processGet({
        type: 'geo',
        success: (data) => {
          if (data.lat === 0.0 && data.lng === 0.0) {
            reject(data);
          } else {
            resolve(data);
          }
        },
        failure: (data) => {
          reject(data);
        }
      });
    })
  }

}

export default new ContainerAPI();
