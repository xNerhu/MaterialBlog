export default class MaterialButton {
  constructor (text, shadow = true, className) {
    this.elements = {}
    this.props = {
      text: text,
      shadow: shadow,
      className: className,
      rippleStyle: {
        backgroundColor: '#fff',
        opacity: 0.2
      }
    }

    this.touched = false

    this.render()
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
  setText = (str = this.props.text) => {
    this.elements.root.innerHTML = str
  }

  render () {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'material-button ripple'

    if (!this.props.shadow) this.elements.root.classList.add('no-shadow')
    if (this.props.className !== undefined) this.elements.root.classList.add(this.props.className)

    this.elements.root.addEventListener('mousedown', this.onMouseDown)
    this.elements.root.addEventListener('touchstart', this.onTouchStart)

    this.setText()
  }
}
