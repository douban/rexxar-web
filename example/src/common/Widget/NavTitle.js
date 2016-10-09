import RexxarWidget from './RexxarWidget';

class NavTitle extends RexxarWidget {
  constructor(title) {
    super('widget/nav_title');
    this.title = title;
  }

  show() {
    super.call({ title: this.title });
  }
}

export default NavTitle
