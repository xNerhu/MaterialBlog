import Component from 'inferno-component'

export default class Checkbox extends Component {
  constructor () {
    super()
    this.elements = {}

    this.checked = false
    this.touched = false
  }

  /**
   * Checks the checkbox and raises checked-changed event.
   */
  check () {
    if (!this.props.disabled) {
      const root = this.elements.root
      const border = this.elements.border
      const icon = this.elements.icon

      border.style.borderWidth = root.offsetWidth / 2 + 'px'
      border.style.borderColor = this.props.onColor

      setTimeout(() => {
        icon.classList.remove('material-checkbox-hide')
        icon.classList.add('material-checkbox-cover-animation')
      }, 150)

      const onCheck = this.props.onCheck
      if (typeof onCheck === 'function') onCheck(true, this)

      this.checked = true
    }
  }

  /**
   * Unchecks the checkboxs.
   */
  unCheck () {
    if (!this.props.disabled) {
      const border = this.elements.border
      const icon = this.elements.icon

      icon.classList.remove('material-checkbox-cover-animation')
      icon.classList.add('material-checkbox-hide')

      border.style.borderWidth = '2px'
      border.style.borderColor = this.props.offColor

      const onCheck = this.props.onCheck
      if (typeof onCheck === 'function') onCheck(false, this)

      this.checked = false
    }
  }

  /**
   * On click.
   * @param {Event}
   */
  onClick = (e) => {
    if (!this.props.disabled) {
      if (!this.checked) this.check()
      else this.unCheck()
    }
  }

  /**
   * On mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onMouseDown = (e) => {
    if (!this.props.disabled && !this.touched) {
      const root = this.elements.root

      const ripple = Ripple.createRipple(root, this.getRippleStyle(), createRippleCenter(root))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On touch start. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onTouchStart = (e) => {
    if (!this.props.disabled) {
      const root = this.elements.root

      const ripple = Ripple.createRipple(root, this.getRippleStyle(), createRippleCenter(root, 14, 0.4, true))

      Ripple.makeRipple(ripple)
      this.touched = true
    }
  }

  /**
   * Gets ripple style.
   * @return {Object}
   */
  getRippleStyle () {
    const border = this.elements.border
    const color = border.style['border-color']

    return {
      backgroundColor: color,
      opacity: 0.2
    }
  }

  render () {
    let className = 'material-checkbox ripple-icon'
    if (this.props.disabled) className += ' disabled'

    return (
      <div className={className} onMouseDown={this.onMouseDown} ref={(e) => this.elements.root = e} onClick={this.onClick}>
        <div ref={(e) => this.elements.border = e} className='material-checkbox-border' />
        <div ref={(e) => this.elements.icon = e} className='material-checkbox-icon material-checkbox-hide' />
      </div>
    )
  }

  componentDidMount () {
    this.elements.root.addEventListener('touchstart', this.onTouchStart)
  }
}

Checkbox.defaultProps = {
  onColor: '#FFC107',
  offColor: '#757575'
}
