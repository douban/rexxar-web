import RexxarWidget from './RexxarWidget';

class Toast extends RexxarWidget {
  constructor(level, message) {
    super('widget/toast');
    this.toastInfo = {
      level: level,
      message: message
    };
  }

  show() {
    super.call(this.toastInfo);
  }
}

export default Toast;
