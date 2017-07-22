import Component from '../../../../../../../../../helpers/Component'
import MenuManager from '../../../../../../../../../helpers/MenuManager'

import Checkbox from '../../../../../../../../../imports/materialdesign/components/CheckBox'

export default class Cell extends Component {
  beforeRender () {
    this.touched = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Sets text.
   */
  setText (str) {
    this.elements.text.innerHTML = str
  }

  /**
   * On menu icon click event.
   * Shows menu.
   * @param {Event}
   */
  onMenuIconClick = (e) => {
    const app = window.app
    const menu = app.elements.postItemMenu

    document.removeEventListener('click', app.onClick)

    MenuManager.toggle(true, menu, e.target, false)

    app.getPostsPage().clickedPost = this.props.getItem()
  }

  /**
   * On menu icon mouse down event.
   * Makes ripple.
   * @param {Event}
   */
  onMenuIconMouseDown = (e) => {
    if (!this.touched) {
      const ripple = Ripple.createRipple(this.elements.menuIcon, this.props.menuIconRippleStyle, createRippleCenter(this.elements.menuIcon, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On menu icon touch start event. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onMenuIconTouchStart = (e) => {
    const ripple = Ripple.createRipple(this.elements.menuIcon, this.props.menuIconRippleStyle, createRippleCenter(this.elements.menuIcon, 14, 0.4, true))
    Ripple.makeRipple(ripple)

    this.touched = true
  }

  /**
   * On checkbox check event.
   * @param {Boolean} checked
   */
  onCheck = (flag) => {
    window.app.getPostsPage().onCheck(flag, this)
  }

  render () {
    return (
      <div className='cell' ref='root'>
        <div className='title'>
          {
            this.props.title
          }
        </div>
        <div className='text' ref='text' />
      </div>
    )
  }

  afterRender () {
    const props = this.props
    const root = this.getRoot()

    if (props.className != null) root.classList.add(props.className)

    if (props.isAction) {
      const checkBox = (
        <Checkbox ref='checkbox' onCheck={this.onCheck} />
      )

      const menuIcon = (
        <div ref='menuIcon' className='menu-icon' onClick={this.onMenuIconClick} onMouseDown={this.onMenuIconMouseDown} onTouchStart={this.onMenuIconTouchStart} />
      )

      this.renderComponents(checkBox, this.elements.text)
      this.renderComponents(menuIcon, this.elements.text)

      root.classList.add('action')

      this.props.getMobileTable().cells.push(this)
      this.props.getMobileTable().checkbox = this.elements.checkBox
    }

    if (props.menuIconRippleStyle == null) {
      props.menuIconRippleStyle = {
        backgroundColor: '#000',
        opacity: 0.2
      }
    }
  }
}
