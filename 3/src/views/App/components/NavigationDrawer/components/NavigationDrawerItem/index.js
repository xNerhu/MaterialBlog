export default class NavigationDrawerItem {
  constructor () {
    this.touched = false

    this.props = {}
    this.elements = {}

    this.rippleStyle = {
      backgroundColor: '#000',
      opacity: 0.2
    }

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
   * On click event.
   * @param {Event}
   */
   onClick = (e) => {
     const onClick = this.props.onClick

     if (typeof onClick === 'function') onClick(e)
   }

  /**
   * On mouse down event.
   * @param {Event}
   */
  onMouseDown = (e) => {
    if (!this.touched) {
      let ripple = Ripple.createRipple(this.elements.root, this.rippleStyle, createRippleMouse(this.elements.root, e, 1.5))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On touch event (on mobile).
   * @param {Event}
   */
  onTouchStart = (e) => {
    let ripple = Ripple.createRipple(this.elements.root, this.rippleStyle, createRippleMouse(this.elements.root, e, 1.5, true))
    Ripple.makeRipple(ripple)
    this.touched = true
  }

  /**
   * Sets text.
   * @param {String} text.
   */
  setText = (str) => {
    this.elements.text.innerHTML = str
  }

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'navigation-drawer-item ripple'
    this.elements.root.addEventListener('click', this.onClick)
    this.elements.root.addEventListener('mousedown', this.onMouseDown)
    this.elements.root.addEventListener('touchstart', this.onTouchStart)

    this.elements.icon = document.createElement('div')
    this.elements.icon.className = 'icon'

    this.elements.text = document.createElement('div')
    this.elements.text.className = 'text'

    this.elements.root.appendChild(this.elements.icon)
    this.elements.root.appendChild(this.elements.text)
  }
}
