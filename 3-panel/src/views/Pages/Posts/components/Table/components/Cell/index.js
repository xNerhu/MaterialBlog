import Component from '../../../../../../../helpers/Component'

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

  onMenuIconClick = (e) => {
    const app = window.app
    const menu = app.elements.postItemMenu

    document.removeEventListener('click', app.onClick)

    app.toggleMenu(true, menu, e.target, false)
  }

  render () {
    return (
      <tr ref='root'>
        <td>
          <Checkbox ref='checkbox' />
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
        <td>
          {
            this.props.data.title
          }
        </td>
        <td ref='content' />
        <td className='menu'>
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
