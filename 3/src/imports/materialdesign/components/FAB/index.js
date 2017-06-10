export default class FAB {
  constructor (className) {
    this.elements = {}
    this.props = {
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

  render () {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'material-fab ripple'

    if (this.props.className !== undefined) this.elements.root.classList.add(this.props.className)

    this.elements.root.addEventListener('mousedown', this.onMouseDown)
    this.elements.root.addEventListener('touchstart', this.onTouchStart)

    this.elements.icon = document.createElement('div')
    this.elements.icon.className = 'material-fab-icon'
    this.elements.root.appendChild(this.elements.icon)
  }
}
