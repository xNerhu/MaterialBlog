import Component from './../../../../helpers/Component'

export default class Checkbox extends Component {
  beforeRender () {
    this.checked = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
  */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Unchecks the checkboxs.
   */
  unCheck = () => {
    const border = this.elements.border
    const icon = this.elements.icon

    icon.classList.remove('material-checkbox-cover-animation')
    icon.classList.add('material-checkbox-hide')

    border.style.borderWidth = '2px'
    border.style.borderColor = this.props.offColor

    const onCheck = this.props.onCheck
    if (typeof onCheck === 'function') onCheck(false)

    this.checked = false
  }

  /**
   * Checks the checkbox and raises checked-changed event.
   */
  check = () => {
    const root = this.getRoot()
    const border = this.elements.border
    const icon = this.elements.icon

    border.style.borderWidth = root.offsetWidth / 2 + 'px'
    border.style.borderColor = this.props.onColor

    setTimeout(function () {
      icon.classList.remove('material-checkbox-hide')
      icon.classList.add('material-checkbox-cover-animation')
    }, 150)

    const onCheck = this.props.onCheck
    if (typeof onCheck === 'function') onCheck(true)

    this.checked = true
  }

  /**
   * On click event.
   * @param {Event} event data.
   */
  onClick = (e) => {
    if (!this.checked) this.check()
    else this.unCheck()
  }

  /**
   * On mouse down event.
   * Makes ripple.
   * @param {Event} event data.
   */
  onMouseDown = (e) => {
    const root = this.getRoot()
    const border = this.elements.border
    const color = border.style['border-color']

    const ripple = Ripple.createRipple(root, {
      backgroundColor: color,
      opacity: 0.2
    }, createRippleCenter(root))
    Ripple.makeRipple(ripple)
  }

  render () {
    return (
      <div className='material-checkbox ripple-icon' onMouseDown={this.onMouseDown} ref='root' onClick={this.onClick}>
        <div ref='border' className='material-checkbox-border' />
        <div ref='icon' className='material-checkbox-icon material-checkbox-hide' />
      </div>
    )
  }

  afterRender () {
    const props = this.props

    if (!this.checked) {
      this.unCheck()
    } else {
      this.check()
    }

    if (props.onColor == null) props.onColor = '#FFC107'
    if (props.offColor == null) props.offColor = '#757575'
  }
}
