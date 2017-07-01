import Component from '../../../../helpers/Component'

export default class TextField extends Component {
  beforeRender () {
    this.toggled = false

    this.counter = false
    this.error = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Gets input.
   * @return {DOMElement} input
   */
  getInput = () => {
    return (!this.props.textarea) ? this.elements.input : this.elements.textarea
  }

  /**
   * On focus event.
   * Toggle on input.
   * @param {Object} event data
   */
  onFocus = (e) => {
    if (!this.toggled && this.getInput().value.length < 1) this.toggle(true)
  }

  /**
   * On blur event.
   * Toggle off input.
   * @param {Object} event data
   */
  onBlur = (e) => {
    if (this.toggled && this.getInput().value.length < 1) this.toggle(false)
  }

  /**
   * On input event.
   * @param {Object} event data
   */
  onInput = (e) => {
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
  }

  /**
   * Sets hint text.
   * @param {String} text
   */
  setHint = (str = 'Hint') => {
    this.elements.hint.innerHTML = str
  }

  /**
   * Sets input placeholder.
   * @param {String} text
   */
  setPlaceholder = (str = 'Placeholder') => {
    this.getInput().setAttribute('placeholder', str)
  }

  /**
   * Sets helper text.
   * @param {String} text
   */
  setHelperText = (str = 'Helper text') => {
    this.elements.helperText.innerHTML = str
  }

  /**
   * Sets counter.
   * @param {Boolean}
   */
  setCounter = (flag) => {
    this.counter = flag
    if (flag) {
      this.setCounterText(0 + '/' + this.props.maxLength)
    } else {
      this.setCounterText('')
    }
  }

  /**
   * Sets counter text.
   * @param {String} text
   */
  setCounterText = (str = '0/0') => {
    this.elements.counter.innerHTML = str
  }

  /**
   * Sets max length of text.
   * @param {Int} max characters
   */
  setMaxLength = (max) => {
    this.counter = true
    this.maxLength = max

    this.setCounterText('0/' + this.maxLength)
  }

  /**
   * Toggle error.
   * @param {Boolean}
   */
  toggleError = (flag) => {
    const root = this.getRoot()

    if (flag) {
      root.classList.add('error')
    } else {
      root.classList.remove('error')
    }

    this.error = flag
  }

  /**
   * Toggle on input.
   * @param {Boolean}
   */
  toggle = (flag) => {
    const root = this.getRoot()
    const input = this.getInput()

    if (flag) {
      root.classList.remove('disabled')
      root.classList.add('enabled')
      input.focus()
    } else {
      root.classList.remove('enabled')
      root.classList.add('disabled')
    }

    this.toggled = flag
  }

  /**
   * On action icon mouse down event.
   * Makes ripple.
   * @param {Object} event data.
   */
  onActionIconMouseDown = (e) => {
    if (!this.touched) {
      let ripple = Ripple.createRipple(this.elements.actionIcon, this.props.actionIconRippleStyle, createRippleCenter(this.elements.actionIcon, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On action icon touch start event.
   * Makes ripple.
   * @param {Object} event data.
   */
  onActionIconTouchStart = (e) => {
    let ripple = Ripple.createRipple(this.elements.actionIcon, this.props.actionIconRippleStyle, createRippleCenter(this.elements.actionIcon, 14, 0.4, true))
    Ripple.makeRipple(ripple)
    this.touched = true
  }

  /**
   * Sets input value.
   * @param {String} value
   */
  setValue (str) {
    if (this.props.textarea === true) {
      this.elements.textarea.value = str
    } else {
      this.elements.input.value = str
    }

    this.onInput()

    if (str.length > 1 && !this.toggled) {
      this.toggle(true)
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

  render () {
    return (
      <div className='material-text-field disabled' ref='root'>
        <input className='material-text-field-input' ref='input' onFocus={this.onFocus} onBlur={this.onBlur} onInput={this.onInput} />
        <textarea className='material-text-field-text-area' ref='textarea' onFocus={this.onFocus} onBlur={this.onBlur} onInput={this.onInput} />
        <div className='material-text-field-hint' ref='hint' onClick={this.onFocus} />
        <div className='material-text-field-divider' ref='divider' />
        <div className='material-text-field-focus-divider' ref='focusDivider' />
        <div className='material-text-field-helper-text' ref='helperText' />
        <div className='material-text-field-counter' ref='counter' />
        <div className='material-text-field-icon' ref='icon' />
        <div className='material-text-field-action-icon ripple-icon' ref='actionIcon' onClick={this.props.onActionIconClick} onMouseDown={this.onActionIconMouseDown} onActionIconTouchStart={this.onActionIconTouchStart} />
      </div>
    )
  }

  afterRender () {
    const props = this.props

    if (props.textarea === true) this.elements.textarea.style.display = 'block'
    else this.elements.input.style.display = 'block'

    if (props.hint) this.setHint(this.props.hint)
    if (props.placeholder) this.setPlaceholder(this.props.placeholder)
    if (props.helperText) this.setHelperText(this.props.helperText)
    if (props.maxLength) this.setCounter(true)
    if (props.className) this.elements.root.classList.add(this.props.className)
    if (props.type != null) this.getInput().type = this.props.type

    if (!this.props.actionIconRippleStyle) {
      this.props.actionIconRippleStyle = {
        backgroundColor: '#000',
        opacity: 0.3
      }
    }
  }
}
