import React from 'react'
import ReactDOM from 'react-dom'

export default class TextField extends React.Component {
  constructor () {
    super()

    this.state = {
      focus: false,
      hover: false,
      placeHolder: false,
      error: false,
      counter: '0/0',
      focusedDivider: false
    }

    this.errorID = 0
  }

  componentDidMount () {
    if (this.props.multiple) {
      this.refs.textarea.style.height = '54px'
    }
    if (this.props.placeHolderAlwaysVisible) {
      this.setState({
        placeHolder: true
      })
    }
  }

  /**
   * On focus event.
   * Toggle on input
   * @param {Object} event data
   */
  onFocus = (e) => {
    this.toggleOn()
    if (typeof this.props.onFocus === 'function') this.props.onFocus(e)
  }

  /**
   * On blur event.
   * On focus out.
   * Toggle off input
   * @param {Object} event data
   */
  onBlur = (e) => {
    this.toggleOff()
    if (typeof this.props.onBlur === 'function') this.props.onBlur(e)
  }

  /**
   * Toggle on input
   */
  toggleOn = () => {
    if (!this.state.focus && !this.props.disabled) {
      const element = (!this.props.multiple) ? this.refs.input : this.refs.textarea
      this.setState({
        focus: true,
        placeHolder: true
      })
      element.select()
    }
  }

  /**
   * Toggle off input
   */
  toggleOff = () => {
    if (this.state.focus) {
      const element = (!this.props.multiple) ? this.refs.input : this.refs.textarea
      if (element.value.length === 0) {
        this.setState({
          focus: false,
          placeHolder: (this.props.placeHolderAlwaysVisible)
        })
      }
    }
  }

  /**
   * On mouse enter event.
   * @param {Object} event data
   */
  onMouseEnter = (e) => {
    this.setState({
      hover: true
    })
  }

  /**
   * On mouse leave event.
   * @param {Object} event data
   */
  onMouseLeave = (e) => {
    this.setState({
      hover: false
    })
  }

  /**
   * On input event.
   * Disables or enables placeholder.
   * @param {Object} event data
   */
  onInput = (e) => {
    const element = (!this.props.multiple) ? this.refs.input : this.refs.textarea
    const placeHolder = (element.value.length > 0) ? false : true
    const length = element.value.length
    const maxLength = this.props.maxLength
    var textArea = this.refs.textarea

    this.setState({
      placeHolder: placeHolder,
      counter: (!this.props.counter) ? '' : length + '/' + maxLength
    })

    if (this.props.counter) {
      if (length > maxLength) {
        if (typeof this.props.onError === 'function') {
          /**
           * On error.
           * @param {DomObject} element
           * @param {String} error name
           * @param {int} error id
           */
          this.props.onError(this, 'Too much letters!', 1)

          // 0 - no errors
          // 1 - too much letters
          this.errorID = 1
        }
        this.setState({
          error: true
        })
      } else if (this.state.error) {
        this.setState({
          error: false
        })
        this.errorID = 0
        if (typeof this.props.onErrorEnd === 'function') {
          /**
           * On error end.
           * @param {DomObject} element
           */
          this.props.onErrorEnd(this)
        }
      }
    }

    if (typeof this.props.onInput === 'function') this.props.onInput(e)

    // It can't be state, because when resizes there is weird drop.
    textArea.style.height = 'auto'
    textArea.style.height = textArea.scrollHeight + 'px'
  }

  /**
   * On key press event.
   * @param {Object} event data.
   */
  onKeyPress = (e) => {
    if (typeof this.props.onKeyPress === 'function') this.props.onKeyPress(e)
  }

  /**
   * Returns any error.
   * @return {Boolean} only false if there isn't any error.
   * @return {Int} error id. Only if there is any error.
   */
  getErrors = () => {
    return (this.state.error) ? this.errorID : false
  }

  /**
   * On action icon mouse down event.
   * @param {Object} event data
   */
  onActionIconMouseDown = (e) => {
    if (this.props.actionIcon && !this.props.disabled) {
      var ripple = Ripple.createRipple(this.refs.actionIcon, this.props.actionIconRippleStyle, createRippleCenter(this.refs.actionIcon, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On action icon touch start event. (on mobile)
   * @param {Object} event data
   */
  onActionIconTouchStart = (e) => {
    if (this.props.actionIcon && !this.props.disabled) {
      var ripple = Ripple.createRipple(this.refs.actionIcon, this.props.actionIconRippleStyle, createRippleCenter(this.refs.actionIcon, 14, 0.4, true))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On action icon click event.
   * @param {Object} event data
   */
  onActionIconClick = (e) => {
    if (typeof this.props.onActionIconClick === 'function' && !this.props.disabled) {
      this.props.onActionIconClick(e)
    }
  }

  /**
   * On action icon mouse enter event.
   * @param {Object} event data
   */
  onActionIconMouseEnter = (e) => {
    if (typeof this.props.onActionIconMouseEnter === 'function' && !this.props.disabled) {
      this.props.onActionIconMouseEnter(e)
    }
  }

  /**
   * On action icon mouse leave event.
   * @param {Object} event data
   */
  onActionIconMouseLeave = (e) => {
    if (typeof this.props.onActionIconMouseLeave === 'function' && !this.props.disabled) {
      this.props.onActionIconMouseLeave(e)
    }
  }

  /**
   * Gets input value.
   * @return {String} text
   */
  getValue = () => {
    return this.refs.input.value
  }

  /**
   * Sets input value.
   * @param {String} value
   */
  setValue = (value) => {
    this.refs.input.value = value
    if (value.length < 1) {
      this.setState({
        focus: false
      })
    } if (value.length >= 1) {
      this.setState({
        focus: true
      })
    }
  }

  render () {
    var self = this

    // Styles.
    var inputStyle = Object.assign(
      {
        color: (!this.state.error) ? this.props.focusHintStyle.color : this.props.errorColor,
        textShadow: '0px 0px 0px ' + this.props.textColor,
        display: (!this.props.multiple) ? 'block' : 'none',
        width: (!this.props.actionIcon) ? '' : 'calc(100% - ' + this.props.actionIconStyle.width + 'px)'
      }, this.props.inputStyle
    )

    const inputDisabled = (!this.props.disabled) ? false : true

    var textAreaStyle = Object.assign(
      {
        color: (!this.state.error) ? this.props.focusHintStyle.color : this.props.errorColor,
        textShadow: '0px 0px 0px ' + this.props.textColor,
        display: (!this.props.multiple) ? 'none' : 'block'
      }, this.props.textAreaStyle
    )

    var _hintStyle = (!this.state.focus) ? this.props.defaultHintStyle : Object.assign({
      color: this.props.focusColor
    }, this.props.focusHintStyle)

    var _dividerStyle = (!this.state.hover && !this.state.focus || !this.props.hover) ? this.props.dividerStyle : this.props.hoverDividerStyle
    if (this.props.disabled) _dividerStyle = this.props.disabledDividerStyle

    var focusDividerStyle = Object.assign(
      {
        width: (!this.state.focus && !self.state.focusedDivider) ? '0%' : '100%',
        backgroundColor: this.props.focusColor
      }, this.props.focusDividerStyle
    )

    var _placeHolderStyle = Object.assign(
      {
        display: (!this.state.placeHolder || !this.props.placeHolder) ? 'none' : 'block'
      }, this.props.placeHolderStyle
    )

    var _helperTextStyle = this.props.helperTextStyle

    var _counterStyle = Object.assign(
      {
        display: (!this.props.counter) ? 'none' : 'block'
      }, this.props.counterStyle
    )

    var iconStyle = Object.assign(
      {
        backgroundImage: (!this.props.icon) ? '' : 'url(' + this.props.icon + ')',
        display: (!this.props.icon || this.props.disabled) ? 'none' : 'block'
      }, this.props.iconStyle
    )

    var actionIconStyle = Object.assign(
      {
        backgroundImage: (!this.props.actionIcon) ? '' : 'url(' + this.props.actionIcon + ')',
        display: (!this.props.actionIcon || this.props.disabled) ? 'none' : 'block'
      }, this.props.actionIconStyle
    )

    var hintStyle = Object.assign({}, _hintStyle)
    var dividerStyle = Object.assign({}, _dividerStyle)
    var placeHolderStyle = Object.assign({}, _placeHolderStyle)
    var helperTextStyle = Object.assign({}, _helperTextStyle)
    var counterStyle = Object.assign({}, _counterStyle)

    // If there is error.
    if (this.state.error) {
      hintStyle.color = this.props.errorColor
      focusDividerStyle.backgroundColor = this.props.errorColor
      helperTextStyle.color = this.props.errorColor
      counterStyle.color = this.props.errorColor

      hintStyle.opacity = 1
      helperTextStyle.opacity = 1
      counterStyle.opacity = 1
    }

    if (this.props.disabled) counterStyle.display = 'none'

    const hintText = this.props.hint
    const placeHolderText = (!this.props.placeHolder) ? '' : this.props.placeHolder
    const helperText = (!this.props.helperText) ? '' : this.props.helperText

    const classes = 'material-text-field ' + this.props.className

    return (
      <div
        className={classes}
        style={this.props.style}
        onClick={this.onClick}
      >
        <input
          type={this.props.type}
          className='material-text-field-input'
          ref='input'
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onInput={this.onInput}
          onKeyPress={this.onKeyPress}
          style={inputStyle}
          disabled={inputDisabled}
        />
        <textarea
          ref='textarea'
          className='material-text-field-textarea'
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onInput={this.onInput}
          style={textAreaStyle}
        />
        <div
          className='material-text-field-place-holder'
          onClick={this.toggleOn}
          style={placeHolderStyle}
        >
          {placeHolderText}
        </div>
        <div
          className='material-text-field-hint'
          onClick={this.toggleOn}
          style={hintStyle}
        >
          {hintText}
        </div>
        <div
          className='material-text-field-divider'
          style={dividerStyle}
        />
        <div
          className='material-text-field-focus-divider'
          style={focusDividerStyle}
        />
        <div
          className='material-textfield-helper-text'
          style={helperTextStyle}
        >
          {helperText}
        </div>
        <div
          className='material-text-field-counter'
          style={counterStyle}
        >
          {this.state.counter}
        </div>
        <div
          className='material-text-field-icon'
          style={iconStyle}
        />
        <div
          className='material-text-field-action-icon ripple-icon'
          ref='actionIcon'
          onMouseDown={this.onActionIconMouseDown}
          onTouchStart={this.onActionIconTouchStart}
          onClick={this.onActionIconClick}
          onMouseEnter={this.onActionIconMouseEnter}
          onMouseLeave={this.onActionIconMouseLeave}
          style={actionIconStyle}
        />
      </div>
    )
  }
}

TextField.defaultProps = {
  hint: 'Label',
  placeHolder: 'Place holder', // or 'Place holder'
  placeHolderAlwaysVisible: false,
  helperText: false, // or 'Helper text'
  counter: false, // true or false
  maxLength: 10,
  hover: false, // true or false
  errorColor: '#d32f2f',
  textColor: '#000',
  focusColor: '#2d5cfa',
  multiple: false,
  disabled: false,
  type: 'text',
  icon: false, // or image link
  actionIcon: false, // or image link
  actionIconRipple: true,
  actionIconRippleStyle: {
    backgroundColor: '#000',
    opacity: 0.4
  },
  inputStyle: {
    // do not set 'color' attribute
  },
  textAreaStyle: {
    // do not set 'color' attribute
  },
  defaultHintStyle: {},
  focusHintStyle: {
    fontSize: 14,
    top: -12,
    opacity: 0.85,
    cursor: 'default'
  },
  placeHolderStyle: {},
  dividerStyle: {},
  disabledDividerStyle: {
    height: 0,
    borderBottom: '1px dashed rgba(0, 0, 0, 0.42)'
  },
  hoverDividerStyle: {
    height: 2,
    backgroundColor: '#000'
  },
  focusDividerStyle: {},
  helperTextStyle: {},
  counterStyle: {},
  iconStyle: {
    width: 24,
    height: 24,
    left: -32,
    opacity: 0.5
  },
  actionIconStyle: {}
}
