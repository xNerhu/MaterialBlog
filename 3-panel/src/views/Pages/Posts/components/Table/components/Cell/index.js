import Component from '../../../../../../../helpers/Component'
import MenuManager from '../../../../../../../helpers/MenuManager'

import Checkbox from '../../../../../../../imports/materialdesign/components/CheckBox'

export default class Cell extends Component {
  beforeRender () {
    this.touched = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
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

    app.getPostsPage().clickedPost = this
  }

  /**
   * On menu icon mouse down event.
   * Makes ripple.
   * @param {Event}
   */
  onMenuIconMouseDown = (e) => {
    if (!this.touched) {
      let ripple = Ripple.createRipple(this.elements.menuIcon, this.props.menuIconRippleStyle, createRippleCenter(this.elements.menuIcon, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On menu icon touch start event.
   * Makes ripple.
   * @param {Event}
   */
  onMenuIconTouchStart = (e) => {
    let ripple = Ripple.createRipple(this.elements.menuIcon, this.props.menuIconRippleStyle, createRippleCenter(this.elements.menuIcon, 14, 0.4, true))
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
      <tr ref='root'>
        <td>
          <Checkbox ref='checkbox' onCheck={this.onCheck} />
        </td>
        <td ref='id' />
        <td>
          {
            this.props.data.author
          }
        </td>
        <td ref='date' />
        <td ref='comments' />
        <td ref='likes' />
        <td ref='picture' className='picture-cell' />
        <td ref='title'>
          {
            this.props.data.title
          }
        </td>
        <td ref='content' />
        <td>
          <div className='menu-icon' ref='menuIcon' onClick={this.onMenuIconClick} onMouseDown={this.onMenuIconMouseDown} onTouchStart={this.onMenuIconTouchStart} />
        </td>
      </tr>
    )
  }

  afterRender () {
    const props = this.props
    const data = this.props.data

    this.elements.id.innerHTML = data.id
    this.elements.date.innerHTML = data.date
    this.elements.comments.innerHTML = data.comments.length
    this.elements.likes.innerHTML = data.likes.length
    this.elements.picture.innerHTML = (data.media != null) ? '<img src="' + data.media + '" >' : '<img>'
    this.elements.content.innerHTML = data.content

    this.props.getDesktopTable().cells.push(this)

    if (props.menuIconRippleStyle == null) {
      props.menuIconRippleStyle = {
        backgroundColor: '#000',
        opacity: 0.2
      }
    }
  }
}
