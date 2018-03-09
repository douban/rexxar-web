import { widgetMessenger, dispatch, assemblePayload } from 'rexxar-web';

class NavMenu {
  /**
   * Set Navigation Bar Menu
   *
   * let menu = new NavMenu();
   * menu.show();
   *
   * @param {Object[]} [menu] You can pass the json data of the menu while initializing.
   */
  constructor(menu = []) {
    this.menu = menu;
    this._messenger = widgetMessenger('douban', 'rexxar-container')('widget/nav_menu');
  }

  /**
   * menu.addItem({type: 'button', ...});
   *
   * @param {Object} item
   * @returns this So that you can chain method calls.
   */
  addItem(item) {
    this.menu.push(item);
    return this;
  }

  show() {
    dispatch(this._messenger(assemblePayload({ data: JSON.stringify(this.menu) })));
  }

}

export default NavMenu;
