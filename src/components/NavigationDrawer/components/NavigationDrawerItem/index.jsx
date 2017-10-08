import Component from 'inferno-component'

export default class NavigationDrawerItem extends Component {
  constructor () {
    super()
    this.elements = {}

    this.touched = false
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
    const className = `navigation-drawer-item ripple ${this.props.data.className !== null ? this.props.data.className : ''}`

    return (
      <div className={className} ref={(e) => this.elements.root = e} onClick={this.props.data.onClick} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart}>
        <div className='icon' />
        <div className='text'>
          {
            this.props.data.text
          }
        </div>
      </div>
    )
  }
}

NavigationDrawerItem.defaultProps = {
  rippleStyle: {
    backgroundColor: '#000',
    opacity: 0.2
  }
}
