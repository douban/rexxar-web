import React from 'react';

import NavTitle from 'common/Widget/NavTitle';

export default function TitleComponent() {
  return (
    <section>
      <h1>Title</h1>
      <p>Rexxar Demo Page</p>
      <input
        type='button'
        onClick={() => {
          let title = new NavTitle('Rexxar Demo Page');
          title.show();
        }}
        value='Set Title'
      />
    </section>
  )
}
