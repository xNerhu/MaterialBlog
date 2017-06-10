export default class Category {
  constructor (data, onLoad) {
    this.elements = {}
    this.props = {
      ripple: true,
      rippleStyle: {
        backgroundColor: '#fff',
        opacity: 0.2
      },
      infoRippleStyle: {
        backgroundColor: '#000',
        opacity: 0.2
      },
      data: data,
      onLoad: onLoad
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
   * On click event.
   * @param {Event}
   */
  onClick = (e) => {
    const app = window.app
    const toolbar = app.getToolbar()
    const multiIcon = toolbar.getMultiIcon()

    if (e.target !== this.elements.showCommentsButton && e.target !== this.elements.commentsCount && e.target !== this.elements.likeButton && e.target !== this.elements.likesCount && multiIcon.canClick) {
      const postsTab = this.props.getPostsTab()

      postsTab.toggleFullScreen(true, this)
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

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'category ripple'
    this.elements.root.addEventListener('mousedown', this.onMouseDown)
    this.elements.root.addEventListener('touchstart', this.onTouchStart)

    // TITLE
    this.elements.title = document.createElement('div')
    this.elements.title.className = 'category-title'
    this.elements.title.innerHTML = this.props.data.name
    this.elements.root.appendChild(this.elements.title)

    // INFO BUTTON
    this.elements.info = document.createElement('div')
    this.elements.info.className = 'category-info ripple-icon'
    this.elements.info.addEventListener('mouseenter', this.onInfoMouseEnter)
    this.elements.info.addEventListener('mouseleave', this.onInfoMouseLeave)
    this.elements.info.addEventListener('mousedown', this.onInfoMouseDown)
    this.elements.info.addEventListener('touchstart', this.onInfoTouchStart)
    this.elements.title.appendChild(this.elements.info)

    this.loadImage()
  }
}
