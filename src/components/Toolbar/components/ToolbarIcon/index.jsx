import Component from 'inferno-component'

export default class ToolbarIcon extends Component {
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

  /**
   * On mouse down event.
   * Makes ripple.
   * @param {Event}
   */
  onMouseDown = (e, target) => {
    if (!this.touched) {
      const ripple = Ripple.createRipple(e.target, this.props.rippleStyle, createRippleCenter(e.target, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On touch start event. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onTouchStart = (e) => {
    const ripple = Ripple.createRipple(e.target, this.props.rippleStyle, createRippleCenter(e.target, 14, 0.4, true))
    Ripple.makeRipple(ripple)
    this.touched = true
  }

  render () {
    return (
      <div className='toolbar-icon ripple-icon toolbar-right' ref={(e) => this.elements.root = e} onMouseDown={this.onMouseDown} onClick={this.props.onClick} onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave} />
    )
  }

  componentDidMount () {
    const props = this.props

    if (props.className != null) this.getRoot().classList.add(props.className)

    this.elements.root.addEventListener('touchstart', this.onTouchStart)
  }
}

ToolbarIcon.defaultProps = {
  rippleStyle: {
    backgroundColor: '#000',
    opacity: 0.2
  }
}
