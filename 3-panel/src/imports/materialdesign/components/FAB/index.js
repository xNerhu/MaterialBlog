import Component from '../../../../helpers/Component'

export default class FAB extends Component {
  beforeRender () {
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
      <div className='material-fab ripple' ref='root' onClick={this.props.onClick} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart}>
        <div className='material-fab-icon' ref='icon' />
      </div>
    )
  }

  afterRender () {
    const props = this.props
    const root = this.getRoot()

    if (props.rippleStyle == null) {
      props.rippleStyle = {
        backgroundColor: '#fff',
        opacity: 0.2
      }
    }

    if (props.className != null) root.classList.add(props.className)
  }
}
