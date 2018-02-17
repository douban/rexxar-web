import { widgetMessenger, callbackListener, dispatch, assemblePayload } from 'rexxar-web';

class AlertDialog {
  /**
   * Show Alert Dialog with 3 buttons at most
   *
   * let alertDialog = new AlertDialog({ title });
   * alertDialog.addButton({ text, callback }).show();
   *
   * @param {string} title
   * @param {string} [message]
   * @param {Object[]} [buttons]
   */
  constructor({ title, message = '', buttons = [] }) {
    this.data = {
      title,
      message,
      buttons
    };
    this._messenger = widgetMessenger('douban', 'rexxar-container')('widget/alert_dialog');
    this._listener = callbackListener('Rexxar.Widget.AlertDialog');
  }

  addButton({ text, callback }) {
    let clickHandler = `btnClicked_${this.data.buttons.length}`;
    let cbName = this._listener(clickHandler)(callback)
    let btn = {
      text: text,
      action: `${cbName}()`
    };
    this.data.buttons.push(btn);
    return this;
  }

  show() {
    let payload = { data: JSON.stringify(this.data) };
    let message = this._messenger(assemblePayload(payload));
    dispatch(message);
  }
}

export default AlertDialog;
