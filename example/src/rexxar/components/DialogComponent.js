import React, { PureComponent } from 'react';

import AlertDialog from 'common/Widget/AlertDialog';

class DialogComponent extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    btnClickedText: ''
  }

  showDialog = () => {
    let alertDialog = new AlertDialog({
      title: 'Dialog Title',
      message: 'This is dialog message!'
    });
    alertDialog.addButton({
      text: 'Cancel',
      callback: () => {
        this.setState({
          btnClickedText: 'Cancel clicked'
        })
      }
    }).addButton({
      text: 'Confirm',
      callback: () => {
        this.setState({
          btnClickedText: 'Confirm clicked'
        })
      }
    }).show();
  }

  render() {
    return (
      <section>
        <h1>AlertDialog</h1>
        <p>{this.state.btnClickedText}</p>
        <input
          type='button'
          onClick={this.showDialog}
          value='Show'
        />
      </section>
    )
  }
}

export default DialogComponent;
