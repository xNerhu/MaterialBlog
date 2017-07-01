import Component from '../../../../../../helpers/Component'

export default class MenuItem extends Component {
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
   * On mouse down event.
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
   * On touch start event. (on mobile)
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
      <div className='material-menu-item ripple' ref='root' onClick={this.props.onClick} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart}>
        {
          this.props.children
        }
      </div>
    )
  }

  afterRender () {
    const props = this.props
    const root = this.getRoot()

    if (props.className != null) root.classList.add(props.className)

    if (props.rippleStyle == null) {
      props.rippleStyle = {
        backgroundColor: '#000',
        opacity: 0.2
      }
    }

    const menu = this.props.getMenu()

    menu.items.push(this)
  }
}
