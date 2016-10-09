import RexxarWidget from './RexxarWidget';
import { namespace } from '../utils/helpers';

class AlertDialog extends RexxarWidget {
  constructor({ title, message = '', buttons = [] }) {
    super('widget/alert_dialog');
    this.data = {
      title,
      message,
      buttons
    };
  }

  addButton({ text, callback }) {
    let clickHandler = `btnClicked_${this.data.buttons.length}`;
    namespace('Rexxar.Widget.AlertDialog')[clickHandler] = callback;
    let btn = {
      text: text,
      action: `window.Rexxar.Widget.AlertDialog.${clickHandler}()`
    };
    this.data.buttons.push(btn);
    return this;
  }

  show() {
    super.call({ data: JSON.stringify(this.data) });
  }
}

export default AlertDialog;
