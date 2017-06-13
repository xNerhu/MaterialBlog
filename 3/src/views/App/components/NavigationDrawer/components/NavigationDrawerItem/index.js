import Component from './../../../../../../helpers/Component/index'

export default class NavigationDrawerItem extends Component {
  beforeComponent () {
    this.touched = false

    this.rippleStyle = {
      backgroundColor: '#000',
      opacity: 0.2
    }
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * On click event.
   * @param {Event}
   */
   onClick = (e) => {
     const onClick = this.props.onClick

     if (typeof onClick === 'function') onClick(e)
   }

  /**
   * On mouse down event.
   * @param {Event}
   */
  onMouseDown = (e) => {
    if (!this.touched) {
      let ripple = Ripple.createRipple(this.elements.root, this.rippleStyle, createRippleMouse(this.elements.root, e, 1.5))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On touch event (on mobile).
   * @param {Event}
   */
  onTouchStart = (e) => {
    let ripple = Ripple.createRipple(this.elements.root, this.rippleStyle, createRippleMouse(this.elements.root, e, 1.5, true))
    Ripple.makeRipple(ripple)
    this.touched = true
  }

  /**
   * Sets text.
   * @param {String} text.
   */
  setText = (str) => {
    this.elements.text.innerHTML = str
  }

  render () {
    return (
      <div className='navigation-drawer-item ripple' ref='root' onClick={this.onClick} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart}>
        <div className='icon' ref='icon' />
        <div className='text' ref='text' />
      </div>
    )
  }

  afterRender () {
    if (this.props.className) this.getRoot().classList.add(this.props.className)

    this.setText(this.props.children)
  }
}
