import Component from './../../../../../../helpers/Component/index'

export default class NavigationDrawerItem extends Component {
  beforeComponent () {
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
   * On click event.
   * @param {Event}
   */
   onClick = (e) => {
     const onClick = this.props.onClick

     if (typeof onClick === 'function') onClick(e)
   }

  /**
   * On mouse down event.
   * Makes ripple.
   * @param {Event}
   */
  onMouseDown = (e) => {
    if (!this.touched) {
      const ripple = Ripple.createRipple(this.elements.root, this.props.rippleStyle, createRippleMouse(this.elements.root, e, 1.5))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On touch event. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onTouchStart = (e) => {
    const ripple = Ripple.createRipple(this.elements.root, this.props.rippleStyle, createRippleMouse(this.elements.root, e, 1.5, true))
    Ripple.makeRipple(ripple)
    this.touched = true
  }

  /**
   * Sets text.
   * @param {String} text
   */
  setText (str) {
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
    const props = this.props
    const root = this.getRoot()

    if (props.className) root.classList.add(props.className)

    if (props.rippleStyle == null) {
      props.rippleStyle = {
        backgroundColor: '#000',
        opacity: 0.2
      }
    }

    this.setText(this.props.children)
  }
}
