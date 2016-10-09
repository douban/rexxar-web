import React from 'react';

import NavMenu from 'common/Widget/NavMenu';

export default function MenuComponent() {
  return (
    <section>
      <h1>Menu</h1>
      <p>Add suggestion button</p>
      <input
        type='button'
        onClick={() => {
          let menu = new NavMenu();
          menu.addItem({
            'type': 'button',
            'title': '建议',
            'color': '#9b9b9b',
            'uri': 'douban://douban.com/seti/channel/suggestion'
          }).show();
        }}
        value='Set Menu'
      />
    </section>
  )
}
