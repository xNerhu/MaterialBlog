export default class TextField {
  constructor (hint = null, placeholder = null, helperText = null, maxLength = null) {
    this.toggled = false

    this.counter = false
    this.maxLength = 0
    this.error = false
    this.touched = false

    this.elements = {}

    this.actionIconRippleStyle = {
      backgroundColor: '#000',
      opacity: 0.4
    }

    this.render()

    if (hint !== null) this.setHint(hint)
    if (placeholder != null) this.setPlaceholder(placeholder)
    if (helperText !== null) this.setHelperText(helperText)
    if (maxLength !== null) this.setMaxLength(maxLength)
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Gets input.
   * @return {DOMElement} input.
   */
  getInput = () => {
    return this.elements.input
  }

  /**
   * On focus event.
   * Toggle on input.
   * @param {Object} event data.
   */
  onFocus = (e) => {
    if (!this.toggled && this.elements.input.value.length < 1) this.toggle(true)
  }

  /**
   * On blur event.
   * Toggle off input.
   * @param {Object} event data.
   */
  onBlur = (e) => {
    if (this.toggled && this.elements.input.value.length < 1) this.toggle(false)
  }

  /**
   * On input event.
   * @param {Object} event data.
   */
  onInput = (e) => {
    if (this.counter) {
      const value = this.elements.input.value

      if (value.length > this.maxLength && !this.error && !this.elements.root.classList.contains('error')) {
        this.toggleError(true)
      } else if (value.length <= this.maxLength && this.error && this.elements.root.classList.contains('error')) {
        this.toggleError(false)
      }

      this.setCounterText(value.length + '/' + this.maxLength)
    }
  }

  /**
   * Sets hint text.
   * @param {String} text.
   */
  setHint = (str = 'Hint') => {
    this.elements.hint.innerHTML = str
  }

  /**
   * Sets input placeholder.
   * @param {String} text.
   */
  setPlaceholder = (str = 'Placeholder') => {
    this.elements.input.setAttribute('placeholder', str)
  }

  /**
   * Sets helper text.
   * @param {String} text.
   */
  setHelperText = (str = 'Helper text') => {
    this.elements.helperText.innerHTML = str
  }

  /**
   * Sets counter text.
   * @param {String} text.
   */
  setCounterText = (str = '0/0') => {
    this.elements.counter.innerHTML = str
  }

  /**
   * Sets max length of text.
   * @param {Int} max characters.
   */
  setMaxLength = (max) => {
    this.counter = true
    this.maxLength = max

    this.setCounterText('0/' + this.maxLength)
  }

  /**
   * Toggle error.
   * @param {Boolean}.
   */
  toggleError = (flag) => {
    if (flag) {
      this.elements.root.classList.add('error')
    } else {
      this.elements.root.classList.remove('error')
    }

    this.error = flag
  }

  /**
   * Toggle on input.
   * @param {Boolean}
   */
  toggle = (flag) => {
    if (flag) {
      this.elements.root.classList.remove('disabled')
      this.elements.root.classList.add('enabled')
      this.elements.input.focus()
    } else {
      this.elements.root.classList.remove('enabled')
      this.elements.root.classList.add('disabled')
    }

    this.toggled = flag
  }

  /**
   * On action icon mouse down event.
   * Makes ripple.
   * @param {Object} event data.
   */
  onActionIconMouseDown = (e) => {
    /*if (this.props.actionIcon && !this.props.disabled) {
      var ripple = Ripple.createRipple(this.refs.actionIcon, this.props.actionIconRippleStyle, createRippleCenter(this.refs.actionIcon, 14))
      Ripple.makeRipple(ripple)
    }*/
    if (!this.touched) {
      let ripple = Ripple.createRipple(this.elements.actionIcon, this.actionIconRippleStyle, createRippleCenter(this.elements.actionIcon, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On action icon touch start event.
   * Makes ripple.
   * @param {Object} event data.
   */
  onActionIconTouchStart = (e) => {
    let ripple = Ripple.createRipple(this.elements.actionIcon, this.actionIconRippleStyle, createRippleCenter(this.elements.actionIcon, 14, 0.4, true))
    Ripple.makeRipple(ripple)
    this.touched = true
  }

  /**
   * Adds elements.
   * @param {String} stroke color.
   * @param {Int} stroke width.
   */
  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'material-text-field disabled'

    this.elements.input = document.createElement('input')
    this.elements.input.className = 'material-text-field-input'
    this.elements.input.addEventListener('focus', this.onFocus)
    this.elements.input.addEventListener('blur', this.onBlur)
    this.elements.input.addEventListener('input', this.onInput)

    this.elements.hint = document.createElement('div')
    this.elements.hint.className = 'material-text-field-hint'
    this.elements.hint.addEventListener('click', this.onFocus)

    this.elements.divider = document.createElement('div')
    this.elements.divider.className = 'material-text-field-divider'

    this.elements.focusDivider = document.createElement('div')
    this.elements.focusDivider.className = 'material-text-field-focus-divider'

    this.elements.helperText = document.createElement('div')
    this.elements.helperText.className = 'material-text-field-helper-text'

    this.elements.counter = document.createElement('div')
    this.elements.counter.className = 'material-text-field-counter'

    this.elements.icon = document.createElement('div')
    this.elements.icon.className = 'material-text-field-icon'

    this.elements.actionIcon = document.createElement('div')
    this.elements.actionIcon.className = 'material-text-field-action-icon ripple-icon'
    this.elements.actionIcon.addEventListener('mousedown', this.onActionIconMouseDown)
    this.elements.actionIcon.addEventListener('touchstart', this.onActionIconTouchStart)

    this.elements.root.appendChild(this.elements.input)
    this.elements.root.appendChild(this.elements.hint)
    this.elements.root.appendChild(this.elements.divider)
    this.elements.root.appendChild(this.elements.focusDivider)
    this.elements.root.appendChild(this.elements.helperText)
    this.elements.root.appendChild(this.elements.counter)
    this.elements.root.appendChild(this.elements.icon)
    this.elements.root.appendChild(this.elements.actionIcon)
  }
}
