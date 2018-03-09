import React, { PureComponent } from 'react';

import Toast from 'common/Widget/Toast';

class ToastComponent extends PureComponent {
  constructor(props) {
    super(props);
  }

  message = 'Hello Toast'

  state = {
    value: 'info'
  }

  clickToast = () => {
    let level = this.state.value;
    let message = this.message;
    let toast = new Toast(level, message);
    toast.show();
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <section>
        <h1>Toast</h1>
        <p>
          Level:&nbsp;
          <select value={this.state.value} onChange={this.handleChange}>
            <option value='info'>info</option>
            <option value='error'>error</option>
            <option value='fatal'>fatal</option>
          </select>
        </p>
        <p>Message: {this.message}</p>
        <input
          type='button'
          onClick={this.clickToast}
          value='Click Toast'
        />
      </section>
    )
  }
}

export default ToastComponent;
