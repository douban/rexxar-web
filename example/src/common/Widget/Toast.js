import { widgetMessenger, dispatch, assemblePayload } from 'rexxar-web';

class Toast {
  /**
   * Show App Toast
   *
   * let toast = new Toast('error', '出错啦');
   * toast.work();
   *
   * @param {string} level ('info'|'error'|'fatal')
   * @param {string} message
   */
  constructor(level, message) {
    this.toastInfo = {
      level: level,
      message: message
    };
    this._messenger = widgetMessenger('douban', 'rexxar-container')('widget/toast');
  }

  show() {
    dispatch(this._messenger(assemblePayload(this.toastInfo)));
  }
}

export default Toast;
