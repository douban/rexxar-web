import React, { PureComponent } from 'react';

import NavMenu from 'common/Widget/NavMenu';

class MenuComponent extends PureComponent {
  setMenu = () => {
    let menu = new NavMenu();
    menu
    .addItem({
      'type': 'button',
      'title': '建议',
      'color': '#9b9b9b',
      'uri': 'douban://douban.com/seti/channel/suggestion'
    })
    .show();
  }

  render() {
    return (
      <section>
        <h1>Menu</h1>
        <p>Add suggestion button</p>
        <input
          type='button'
          onClick={this.setMenu}
          value='Set Menu'
        />
      </section>
    )
  }
}

export default MenuComponent;
