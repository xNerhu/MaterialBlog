import Component from 'inferno-component'

export default class TextField extends Component {
  constructor () {
    super()
    this.elements = {}

    this.toggled = false
    this.counter = false
    this.error = false
    this.helperText = ''
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Gets input.
   * @return {DOMElement} input
   */
  getInput () {
    return (!this.props.textarea) ? this.elements.input : this.elements.textarea
  }

  /**
   * On focus.
   * Toggle on input.
   * @param {Event}
   */
  onFocus = (e) => {
    if (!this.toggled && this.getInput().value.length < 1 && !this.props.disabled) this.toggle(true)
  }

  /**
   * On blur.
   * Toggle off input.
   * @param {Event}
   */
  onBlur = (e) => {
    if (this.toggled && this.getInput().value.length < 1 && !this.props.disabled) this.toggle(false)
  }

  /**
   * On input.
   * @param {Event}
   */
  onInput = (e) => {
    if (this.props.disabled) return

    if (this.counter) {
      const value = this.getInput().value

      if (value.length > this.props.maxLength && !this.error && !this.elements.root.classList.contains('error')) {
        this.toggleError(true)
      } else if (value.length <= this.props.maxLength && this.error && this.elements.root.classList.contains('error')) {
        this.toggleError(false)
      }

      this.setCounterText(value.length + '/' + this.props.maxLength)
    }

    if (this.props.textarea === true) {
      const textarea = this.elements.textarea

      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight - 16 + 'px'
    }

    const onInput = this.props.onInput
    if (typeof onInput === 'function') onInput(e, this)
  }

  /**
   * Sets hint text.
   * @param {String} text
   */
  setHint (str = 'Hint') {
    this.elements.hint.innerHTML = str
  }

  /**
   * Sets input placeholder.
   * @param {String} text
   */
  setPlaceholder (str = 'Placeholder') {
    this.getInput().setAttribute('placeholder', str)
  }

  /**
   * Sets helper text.
   * @param {String} text
   */
  setHelperText (str = '') {
    this.elements.helperText.innerHTML = str
    this.helperText = str
  }

  /**
   * Sets counter.
   * @param {Boolean}
   */
  setCounter (flag) {
    this.counter = flag

    const text = (flag) ? (0 + '/' + this.props.maxLength) : ''
    this.setCounterText(text)
  }

  /**
   * Sets counter text.
   * @param {String} text
   */
  setCounterText (str = '0/0') {
    this.elements.counter.innerHTML = str
  }

  /**
   * Sets max length of text.
   * @param {Int} max characters
   */
  setMaxLength (max) {
    this.counter = true
    this.maxLength = max

    this.setCounterText('0/' + this.maxLength)
  }

  /**
   * Shows or hides error.
   * @param {Boolean}
   */
  toggleError (flag) {
    const root = this.getRoot()

    if (flag) {
      root.classList.add('error')
    } else {
      root.classList.remove('error')
    }

    this.error = flag
  }

  /**
   * Toggles on input.
   * @param {Boolean}
   * @param {Boolean} focus
   */
  toggle (flag, focus = true) {
    const root = this.getRoot()
    const input = this.getInput()

    root.classList.remove((flag) ? 'disabled' : 'enabled')
    root.classList.add((flag) ? 'enabled' : 'disabled')

    if (flag && focus) input.focus()
    this.toggled = flag
  }

  /**
   * On action icon mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onActionIconMouseDown = (e) => {
    if (!this.touched) {
      const ripple = Ripple.createRipple(this.elements.actionIcon, this.props.actionIconRippleStyle, createRippleCenter(this.elements.actionIcon, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On action icon touch start. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onActionIconTouchStart = (e) => {
    const ripple = Ripple.createRipple(this.elements.actionIcon, this.props.actionIconRippleStyle, createRippleCenter(this.elements.actionIcon, 14, 0.4, true))
    Ripple.makeRipple(ripple)
    this.touched = true
  }

  /**
   * Sets input value.
   * @param {String} value
   * @param {Boolean} focus
   */
  setValue (str, focus) {
    this.getInput().value = str

    setTimeout(() => {
      this.onInput()
    }, 1)

    if (str.length >= 1 && !this.toggled) {
      this.toggle(true, focus)
    } else if (str.length < 1 && this.toggled) {
      this.toggle(false)
    }
  }

  /**
   * Gets input value.
   * @return {String} value
   */
  getValue () {
    return this.getInput().value
  }

  componentDidMount () {
    const self = this
    const props = this.props

    if (props.textarea === true) this.elements.textarea.style.display = 'block'
    else this.elements.input.style.display = 'block'

    if (props.placeholder) this.setPlaceholder(this.props.placeholder)
    if (props.maxLength && !this.props.disabled) this.setCounter(true)
    if (props.className) this.elements.root.classList.add(this.props.className)
    if (props.type != null) this.getInput().type = this.props.type
  }

  render () {
    return (
      <div className='material-text-field disabled' ref={(e) => this.elements.root = e}>
        {!this.props.textarea &&
          <input
            className='material-text-field-input'
            ref={(e) => this.elements.input = e}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onInput={this.onInput}
            onChange={this.onFocus}
            autoComplete={this.props.autoComplete}
            name={this.props.name}
          />
        }
        {this.props.textarea &&
          <textarea
            className='material-text-field-text-area'
            ref={(e) => this.elements.textarea = e}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onInput={this.onInput}
            disabled={this.props.disabled}
            autocomplete={this.props.autoComplete}
            name={this.props.name}
          />
        }
        <div className='material-text-field-hint' ref={(e) => this.elements.hint = e} onClick={this.onFocus}>
          {this.props.hint}
        </div>
        <div className='material-text-field-divider' ref={(e) => this.elements.divider = e} />
        <div className='material-text-field-focus-divider' ref={(e) => this.elements.focusDivider = e} />
        <div className='material-text-field-helper-text' ref={(e) => this.elements.helperText = e}>
          {this.props.helperText}
        </div>
        <div className='material-text-field-counter' ref={(e) => this.elements.counter = e} />
        <div className='material-text-field-icon' ref={(e) => this.elements.icon = e} />
        <div className='material-text-field-action-icon ripple-icon' ref={(e) => this.elements.actionIcon = e} onClick={this.props.onActionIconClick} onMouseDown={this.onActionIconMouseDown} onActionIconTouchStart={this.onActionIconTouchStart} />
      </div>
    )
  }
}

TextField.defaultProps = {
  textarea: false,
  disabled: false,
  autoComplete: true,
  actionIconRippleStyle: {
    backgroundColor: '#000',
    opacity: 0.3
  }
}
