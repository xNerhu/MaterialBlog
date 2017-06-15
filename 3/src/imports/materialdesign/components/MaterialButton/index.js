import Component from '../../../../helpers/Component'

export default class MaterialButton extends Component {
  beforeRender () {
    this.touched = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
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

      let ripple = Ripple.createRipple(root, this.props.rippleStyle, createRippleMouse(root, e, 1.5))
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

    let ripple = Ripple.createRipple(root, this.props.rippleStyle, createRippleMouse(root, e, 1.5, true))
    Ripple.makeRipple(ripple)

    this.touched = true
  }

  /**
   * Sets button text.
   * @param {String} text.
   */
  setText = (str) => {
    this.elements.root.innerHTML = str
  }

  render () {
    return (
      <div className='material-button ripple' ref='root' onClick={this.props.onClick} onMouseDown={this.onMouseDown} onMouseLeave={this.onMouseLeave} onTouchStart={this.onTouchStart} />
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

    if (props.shadow === false) root.classList.add('no-shadow')
    if (props.className != null) root.classList.add(props.className)

    this.setText(props.text)
  }
}
