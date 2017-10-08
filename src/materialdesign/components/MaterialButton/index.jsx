import Component from 'inferno-component'

export default class MaterialButton extends Component {
  constructor () {
    super()
    this.elements = {}

    this.touched = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  onClick = (e) => {
    const onClick = this.props.onClick

    if (!this.props.disabled && typeof onClick === 'function') onClick(e)
  }

  /**
   * On mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onMouseDown = (e) => {
    if (!this.touched && !this.props.disabled) {
      const root = this.getRoot()

      const ripple = Ripple.createRipple(root, this.props.rippleStyle, createRippleMouse(root, e, 1.5))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On touch start. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onTouchStart = (e) => {
    if (!this.props.disabled) {
      const root = this.getRoot()

      const ripple = Ripple.createRipple(root, this.props.rippleStyle, createRippleMouse(root, e, 1.5, true))
      Ripple.makeRipple(ripple)

      this.touched = true
    }
  }

  render () {
    let className = 'material-button ripple '
    if (this.props.className != null) className += this.props.className
    if (this.props.shadow === false) className += ' no-shadow'
    if (this.props.disabled) className += ' disabled'

    return (
      <div className={className} ref={(e) => this.elements.root = e} onClick={this.onClick} onMouseDown={this.onMouseDown} style={this.props.style}>
        {this.props.text}
      </div>
    )
  }

  componentDidMount () {
    this.elements.root.addEventListener('touchstart', this.onTouchStart)
  }
}

MaterialButton.defaultProps = {
  disabled: false,
  rippleStyle: {
    backgroundColor: '#fff',
    opacity: 0.2
  }
}
