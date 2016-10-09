import React from 'react';

import Toast from 'common/Widget/Toast';

class ToastComponent extends React.Component {
  constructor(props) {
    super(props);
    this.message = 'Hello Toast';
  }

  clickToast() {
    let level = this.refs.toastLevel.value;
    let message = this.message;
    let toast = new Toast(level, message);
    toast.show();
  }

  render() {
    return (
      <section>
        <h1>Toast</h1>
        <p>
          Level:&nbsp;
          <select ref='toastLevel'>
            <option value='info'>info</option>
            <option value='error'>error</option>
            <option value='fatal'>fatal</option>
          </select>
        </p>
        <p>Message: {this.message}</p>
        <input
          type='button'
          onClick={() => this.clickToast()}
          value='Click Toast'
        />
      </section>
    )
  }
}

export default ToastComponent;
