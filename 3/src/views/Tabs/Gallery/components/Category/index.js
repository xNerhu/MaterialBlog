import Component from '../../../../../helpers/Component'

export default class Category extends Component {
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
   * On click event.
   * @param {Event}
   */
  onClick = (e) => {
    const root = this.getRoot()
    const target = e.target
    const title = this.elements.title
    const info = this.elements.info

    if (target !== title && info !== target) {
      if (typeof this.props.onClick === 'function') this.props.onClick(e, this)
    }
  }

  /**
   * On mouse down event.
   * Makes ripple.
   * @param {Event}
   */
  onMouseDown = (e) => {
    const root = this.getRoot()
    const target = e.target
    const title = this.elements.title
    const info = this.elements.info

    if (target !== title && info !== target && !this.touched) {
      let ripple = Ripple.createRipple(root, this.props.rippleStyle, createRippleMouse(root, e, 1.5))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On touch start event (on mobile).
   * Makes ripple.
   * @param {Event}
   */
  onTouchStart = (e) => {
    const root = this.getRoot()
    const target = e.target
    const title = this.elements.title
    const info = this.elements.info

    if (target !== title && info !== target) {
      let ripple = Ripple.createRipple(root, this.props.rippleStyle, createRippleMouse(root, e, 1.5, true))
      Ripple.makeRipple(ripple)

      this.touched = true
    }
  }

  /**
   * On info mouse down event.
   * Makes ripple.
   * @param {Event}
   */
  onInfoMouseDown = (e) => {
    const info = this.elements.info

    if (!this.touched) {
      let ripple = Ripple.createRipple(info, this.props.infoRippleStyle, createRippleCenter(info, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On info touch start event (on mobile).
   * Makes ripple.
   * @param {Event}
   */
  onInfoTouchStart = (e) => {
    const info = this.elements.info

    let ripple = Ripple.createRipple(info, this.props.infoRippleStyle, createRippleCenter(info, 14, 0.4, true))
    Ripple.makeRipple(ripple)

    this.touched = true
  }

  /**
   * On info mouse enter event.
   * Shows tooltip.
   * @param {Event}
   */
  onInfoMouseEnter = (e) => {
    const app = window.app
    const tooltip = app.elements.tooltipCategoryInfo
    const text = 'Data utworzenia: ' + this.props.data.date + '<br>Ilość zdjęc: ' + this.props.data.pictures.length

    tooltip.setText(text)
    tooltip.toggle(true, this.elements.info)
  }

  /**
   * On info mouse leave event.
   * Hides tooltip.
   * @param {Event}
   */
  onInfoMouseLeave = (e) => {
    const app = window.app
    const tooltip = app.elements.tooltipCategoryInfo

    tooltip.toggle(false)
  }

  /**
   * Loads image.
   */
  loadImage = () => {
    const self = this
    const root = this.getRoot()
    const picture = this.props.data.pictures[0]
    const img = new Image()
    /**
     * On img load event.
     */
    img.onload = function () {
      root.style.backgroundImage = 'url(' + this.src + ')'

      if (typeof self.props.onLoad === 'function') self.props.onLoad()
    }

    /**
     * On img error event.
     * @param {Object} error data.
     */
    img.onerror = function (err) {
      console.log('Component: Category')
      if (typeof self.props.onLoad === 'function') self.props.onLoad()
    }

    img.src = picture
  }

  render () {
    return (
      <div className='category ripple' ref='root' onClick={this.onClick} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart}>
        <div className='category-title' ref='title'>
          {this.props.data.name}
          <div
            className='category-info ripple-icon'
            ref='info'
            onMouseDown={this.onInfoMouseDown}
            onMouseEnter={this.onInfoMouseEnter}
            onMouseLeave={this.onInfoMouseLeave} />
        </div>
      </div>
    )
  }

  afterRender () {
    const props = this.props

    if (props.ripple == null) props.ripple = true

    if (props.rippleStyle == null) {
      props.rippleStyle = {
        backgroundColor: '#fff',
        opacity: 0.2
      }
    }

    if (props.infoRippleStyle == null) {
      props.infoRippleStyle = {
        backgroundColor: '#000',
        opacity: 0.2
      }
    }

    this.loadImage()
  }
}
