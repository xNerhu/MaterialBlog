import TextField from '../../../../../../imports/materialdesign/components/TextField'

export default class SearchIcon {
  constructor (parent) {
    this.toggled = false
    this.fullWidth = false
    this.maxWidth = 700
    this.touched = false

    this.elements = {}

    this.actionIconRippleStyle = {
      backgroundColor: '#000',
      opacity: 0.2
    }

    this.parent = parent

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
   * On search icon click event.
   * @param {Event}
   */
  onClick = (e) => {
    if (window.innerWidth <= this.maxWidth) {
      this.showFullWidth()
    } else {
      this.toggle(true)
    }
  }

  /**
   * On search icon mouse down event.
   * Makes ripple.
   * @param {Event}
   */
  onMouseDown = (e) => {
    if (!this.touched) {
      let ripple = Ripple.createRipple(this.elements.button, this.actionIconRippleStyle, createRippleCenter(this.elements.button, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On search icon touch start event.
   * Makes ripple.
   * @param {Event}
   */
  onTouchStart = (e) => {
    let ripple = Ripple.createRipple(this.elements.button, this.actionIconRippleStyle, createRippleCenter(this.elements.button, 14, 0.4, true))
    Ripple.makeRipple(ripple)
    this.touched = true
  }

  /**
   * On text field action icon click event.
   * @param {Event}
   */
  onActionIconClick = (e) => {
    this.toggle(false)
  }

  /**
   * On window resize event.
   * @param {Object} event data.
   */
  onWindowResize = (e) => {
    const self = this
    const toolbar = this.getToolbar()
    const multiIcon = toolbar.getMultiIcon()

    if (this.toggled && !this.fullWidth && window.innerWidth <= this.maxWidth) {
      this.changeToFullWidth(true)
    } else if (this.toggled && this.fullWidth && window.innerWidth > this.maxWidth) {
      this.changeToFullWidth(false)
    }
  }

  /**
   * Toggle search icon.
   * @param {Boolean}
   */
  toggle = (flag) => {
    if (flag) {
      this.elements.root.classList.add('toggled')
    } else {
      this.elements.root.classList.remove('toggled')
    }

    this.elements.textField.elements.actionIcon.style.display = (flag) ? 'block' : 'none'

    this.toggled = flag
  }

  /**
   * Changes to full width.
   * @param {Boolean} change or back to normal.
   */
  changeToFullWidth = (flag) => {
    const self = this
    const toolbar = this.getToolbar()
    const multiIcon = toolbar.getMultiIcon()

    if (flag) {
      this.elements.root.classList.add('full-width')
      this.fullWidth = true
      this.parent.style.width = 'calc(100% - 96px)'
      this.elements.textField.elements.actionIcon.style.opacity = '0'
      setTimeout(function () {
        self.elements.textField.elements.actionIcon.style.display = 'none'
      }, 300)

      if (!multiIcon.isExit) {
        if (multiIcon.isArrow) {
          multiIcon.changeToDefault(false)
          setTimeout(function () {
            multiIcon.changeToExit(false)
          }, 500)
        } else {
          multiIcon.changeToExit(false)
        }
      }

      toolbar.hideItems(false, false)
    } else {
      this.elements.root.classList.remove('full-width')
      this.fullWidth = false
      setTimeout(function () {
        self.parent.style.width = '64px'
      }, 350)
      this.backMultiIconState()

      this.elements.textField.elements.actionIcon.style.display = 'block'
      setTimeout(function () {
        self.elements.textField.elements.actionIcon.style.opacity = '0.7'
      }, 10)

      toolbar.showItems()
    }

    this.fullWidth = flag
  }

  /**
   * Backs multi icon state to default.
   */
  backMultiIconState = () => {
    /*const app = this.props.getApp()
    const navigationDrawer = app.refs.navigationDrawer
    const menuIcon = app.getToolBar().refs.menuIcon
    const searchResults = app.refs.searchResults

    if (menuIcon.actualState && !navigationDrawer.toggled) {
      if (menuIcon.actualState === 'default' && !searchResults.state.toggled) {
        menuIcon.changeToDefault(false)
      } else if (menuIcon.actualState === 'arrow' || !searchResults.state.toggled || menuIcon.isExit) {
        menuIcon.changeToDefault(false)
        setTimeout(function () {
          menuIcon.changeToArrow(false)
        }, 200)
      }
    }*/
    const multiIcon = this.getToolbar().getMultiIcon()

    if (multiIcon.actualState) {
      if (multiIcon.actualState === 'default') {
        multiIcon.changeToDefault(false)
      } else if (multiIcon.actualState === 'arrow') {
        multiIcon.changeToDefault(false)
        setTimeout(function () {
          multiIcon.changeToArrow(false)
        }, 200)
      }
    }
  }

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'search-icon-container'

    this.elements.button = document.createElement('div')
    this.elements.button.className = 'search-icon-button ripple-icon'
    this.elements.button.setStyle({
      backgroundImage: 'url(src/images/Toolbar/search.png)'
    })
    this.elements.button.addEventListener('click', this.onClick)
    this.elements.button.addEventListener('mousedown', this.onMouseDown)
    this.elements.button.addEventListener('touchstart', this.onTouchStart)

    this.elements.textField = new TextField()
    this.elements.textField.setPlaceholder('Wyszukaj')
    this.elements.textField.getRoot().classList.add('search-icon-text-field')
    this.elements.textField.elements.actionIcon.addEventListener('click', this.onActionIconClick)

    this.elements.root.appendChild(this.elements.button)
    this.elements.root.appendChild(this.elements.textField.getRoot())

    window.addEventListener('resize', this.onWindowResize)
  }
}
