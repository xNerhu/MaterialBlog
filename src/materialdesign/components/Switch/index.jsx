import Component from 'inferno-component'

export default class Switch extends Component {
  constructor () {
    super()
    this.elements = {}

    this.touched = false
    this.toggled = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * On switch click.
   * @param {Event}
   */
  onClick = (e) => {
    this.toggle(!this.toggled)
  }

  /**
   * Toggle switch.
   * @param {Boolean}
   */
  toggle (flag) {
    const root = this.getRoot()

    if (flag) {
      root.classList.add('toggled')
    } else {
      root.classList.remove('toggled')
    }

    if (typeof this.props.onSwitch === 'function') this.props.onSwitch(flag, this)

    this.toggled = flag
  }

  /**
   * On mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onMouseDown = (e) => {
    if (!this.touched) {
      const thumb = this.elements.thumb
      const style = (!this.toggled) ? this.props.rippleStyleOff : this.props.rippleStyleOn

      const ripple = Ripple.createRipple(thumb, style, createRippleCenter(thumb))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On touch start.
   * Makes ripple.
   * @param {Event}
   */
  onTouchStart = (e) => {
    const thumb = this.elements.thumb
    const style = (!this.toggled) ? this.props.rippleStyleOff : this.props.rippleStyleOn

    let ripple = Ripple.createRipple(thumb, style, createRippleCenter(thumb, 14, 0.4, true))
    Ripple.makeRipple(ripple)

    this.touched = true
  }

  render () {
    return (
      <div className='material-switch' ref={(e) => this.elements.root = e} onClick={this.onClick} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart}>
        <div className='track' ref={(e) => this.elements.track = e} />
        <div className='thumb' ref={(e) => this.elements.thumb = e} />
      </div>
    )
  }
}

Switch.defaultProps = {
  rippleStyleOn: {
    backgroundColor: '#FFC107',
    opacity: 0.25
  },
  rippleStyleOff: {
    backgroundColor: '#000',
    opacity: 0.08
  }
}
