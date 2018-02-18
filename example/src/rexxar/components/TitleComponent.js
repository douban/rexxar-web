import React, { PureComponent } from 'react';

import NavTitle from 'common/Widget/NavTitle';

class TitleComponent extends PureComponent {
  title = 'Rexxar Demo Title Set'

  setTitle = () => {
    let title = new NavTitle(this.title);
    title.show();
  }

  render() {
    return (
      <section>
        <h1>Title</h1>
        <p>{this.title}</p>
        <input
          type='button'
          onClick={this.setTitle}
          value='Set Title'
        />
      </section>
    )
  }
}

export default TitleComponent;
