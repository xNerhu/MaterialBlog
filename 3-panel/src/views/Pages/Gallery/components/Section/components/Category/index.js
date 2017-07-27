import Component from '../../../../../../../helpers/Component'
import MenuManager from '../../../../../../../helpers/MenuManager'

export default class Category extends Component {
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
   * Loads image.
   */
  loadImage () {
    const root = this.getRoot()

    const img = new Image()

    const onLoad = this.props.onLoad

    img.onload = function () {
      root.style.backgroundImage = 'url(' + img.src + ')'

      if (typeof onLoad === 'function') onLoad()
    }

    const pic = this.props.data.pictures[0]

    if (pic != null) img.src = pic
  }

  /**
   * On click event.
   * Triggers on click function in props.
   * @param {Event}
   */
  onClick = (e) => {
    const onClick = this.props.onClick
    const target = e.target

    if (target !== this.elements.title && target !== this.elements.menuIcon) {
      if (typeof onClick === 'function') onClick(this)
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

    if (target !== this.elements.title && target !== this.elements.menuIcon && !this.touched) {
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
    const target = e.target

    if (target !== this.elements.title && target !== this.elements.menuIcon && !this.touched) {
      const ripple = Ripple.createRipple(root, this.props.rippleStyle, createRippleMouse(root, e, 1.5, true))
      Ripple.makeRipple(ripple)
    }

    this.touched = true
  }

  /**
   * On menu icon click event.
   * Shows category menu.
   * @param {Event}
   */
  onMenuIconClick = (e) => {
    const app = window.app
    const menu = app.elements.categoryMenu

    document.removeEventListener('click', app.onClick)

    MenuManager.toggle(true, menu, e.target, false)

    app.getGalleryPage().clickedCategory = this
  }

  /**
   * On menu icon mouse down event.
   * Makes ripple.
   * @param {Event}
   */
  onMenuIconMouseDown = (e) => {
    const menuIcon = this.elements.menuIcon

    if (!this.touched) {
      const ripple = Ripple.createRipple(menuIcon, this.props.menuIconRippleStyle, createRippleCenter(menuIcon, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On menu icon touch start event. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onMenuIconTouchStart = (e) => {
    const menuIcon = this.elements.menuIcon

    const ripple = Ripple.createRipple(menuIcon, this.props.menuIconRippleStyle, createRippleCenter(menuIcon, 14, 0.4, true))
    Ripple.makeRipple(ripple)

    this.touched = true
  }

  render () {
    return (
      <div className='page-gallery-category ripple' ref='root' onClick={this.onClick} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart}>
        <div className='container'>
          <div ref='title'>
            {
              this.props.data.name
            }
          </div>
          <div className='menu-icon ripple-icon' ref='menuIcon' onClick={this.onMenuIconClick} onMouseDown={this.onMenuIconMouseDown} onTouchStart={this.onMenuIconTouchStart} />
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

    if (props.menuIconRippleStyle == null) {
      props.menuIconRippleStyle = {
        backgroundColor: '#000',
        opacity: 0.2
      }
    }

    this.loadImage()
  }
}
