import Component from 'inferno-component'

export default class MenuItem extends Component {
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
   * On mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onMouseDown = (e) => {
    if (!this.touched) {
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
    const root = this.getRoot()

    const ripple = Ripple.createRipple(root, this.props.rippleStyle, createRippleMouse(root, e, 1.5, true))
    Ripple.makeRipple(ripple)

    this.touched = true
  }

  render () {
    return (
      <div className='material-menu-item ripple' ref={(e) => this.elements.root = e} onClick={this.props.onClick} onMouseDown={this.onMouseDown}>
        {
          this.props.children
        }
      </div>
    )
  }

  componentDidMount () {
    const props = this.props
    const root = this.getRoot()

    if (props.className != null) root.classList.add(props.className)

    this.props.getMenu().items.push(this)
    root.addEventListener('touchstart', this.onTouchStart)
  }
}

MenuItem.defaultProps = {
  rippleStyle: {
    backgroundColor: '#000',
    opacity: 0.2
  }
}
