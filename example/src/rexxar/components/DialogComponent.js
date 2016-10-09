import React from 'react';

import AlertDialog from 'common/Widget/AlertDialog';

class DialogComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnClickedText: ''
    };
  }

  showDialog() {
    let alertDialog = new AlertDialog({
      title: '你好',
      message: '这是一个示例弹框'
    });
    alertDialog.addButton({
      text: '取消',
      callback: () => {
        this.setState({
          btnClickedText: '点了取消'
        })
      }
    }).addButton({
      text: '确定',
      callback: () => {
        this.setState({
          btnClickedText: '点了确定'
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
          onClick={() => this.showDialog()}
          value='Show'
        />
      </section>
    )
  }
}

export default DialogComponent;
