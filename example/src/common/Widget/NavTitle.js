import { widgetMessenger, dispatch, assemblePayload } from 'rexxar-web';

class NavTitle {
  /**
   * Set Navigation Bar Title
   *
   * let title = new NavTitle('标题');
   * title.work();
   *
   * @param {string} title
   */
  constructor(title) {
    this.title = title;
    this._messenger = widgetMessenger('douban', 'rexxar-container')('widget/nav_title');
  }

  show() {
    dispatch(this._messenger(assemblePayload({ title: this.title })));
    document.title = this.title;
  }
}

export default NavTitle;
