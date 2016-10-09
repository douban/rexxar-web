import RexxarWidget from './RexxarWidget';

class NavMenu extends RexxarWidget {
  constructor(menu = []) {
    super('widget/nav_menu');
    this.menu = menu;
  }

  addItem(item) {
    this.menu.push(item);
    return this;
  }

  show() {
    super.call({ data: JSON.stringify(this.menu) })
  }
}

export default NavMenu;
