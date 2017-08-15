import Component from '../../../../../../helpers/Component'

import TextField from '../../../../../../imports/materialdesign/components/TextField'

export default class SearchIcon extends Component {
  beforeRender () {
    this.toggled = false
    this.fullWidth = false
    this.maxWidth = 700
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
   * On search icon click event.
   * @param {Event}
   */
  onClick = (e) => {
    if (window.innerWidth <= this.maxWidth) {
      this.changeToFullWidth(true)
    } else if (!this.toggled) {
      this.toggle(true)
    } else if (this.toggled) {
      this.props.onSearch(this.elements.textField.getInput().value)
    }
  }

  /**
   * On search icon mouse down event.
   * Makes ripple.
   * @param {Event}
   */
  onMouseDown = (e) => {
    if (!this.touched) {
      let ripple = Ripple.createRipple(this.elements.button, this.props.actionIconRippleStyle, createRippleCenter(this.elements.button, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On search icon touch start event.
   * Makes ripple.
   * @param {Event}
   */
  onTouchStart = (e) => {
    let ripple = Ripple.createRipple(this.elements.button, this.props.actionIconRippleStyle, createRippleCenter(this.elements.button, 14, 0.4, true))
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
    const app = window.app
    const toolbar = app.getToolbar()
    const multiIcon = toolbar.getMultiIcon()
    const root = this.getRoot()
    const parent = root.parentNode
    multiIcon.blockClick()

    if (flag) {
      root.classList.add('toggled')
      root.classList.add('full-width')
      this.fullWidth = true
      parent.style.width = 'calc(100% - 96px)'
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
      this.toggled = true
    } else {
      this.elements.root.classList.remove('full-width')
      this.fullWidth = false
      setTimeout(function () {
        parent.style.width = '64px'
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
    const app = window.app
    const toolbar = app.getToolbar()
    const multiIcon = toolbar.getMultiIcon()

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

  /**
   * On text field key press event.
   * @param {Object} event data.
   */
  onKeyPress = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      const value = this.elements.textField.getInput().value
      this.props.onSearch(value)
    }
  }

  render () {
    return (
      <div className='search-icon-container' ref='root'>
        <div className='search-icon-button ripple-icon' ref='button' onClick={this.onClick} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart} />
        <TextField placeholder='Wyszukaj' className='search-icon-text-field' ref='textField' />
      </div>
    )
  }

  afterRender () {
    const textField = this.elements.textField

    textField.elements.input.addEventListener('keypress', this.onKeyPress)
    textField.elements.actionIcon.addEventListener('click', this.onActionIconClick)

    this.props.actionIconRippleStyle = {
      backgroundColor: '#000',
      opacity: 0.2
    }

    window.addEventListener('resize', this.onWindowResize)
  }
}
