import React from 'react'
import ReactDOM from 'react-dom'

export default class Checkbox extends React.Component {
  componentDidMount () {
    this.checked = this.props.checked

    if (this.props.checked) this.unCheck()
    else this.check()

    ReactDOM.findDOMNode(this).addEventListener('checked-changed', this.props.onCheckedChanged)
  }

  unCheck = (userInteraction = false) => {
    const border = this.refs.border
    const icon = this.refs.icon

    icon.classList.remove('material-checkbox-cover-animation')
    icon.classList.add('material-checkbox-hide')

    border.style.borderWidth = '2px'
    border.style.borderColor = this.props.offColor

    let evt = document.createEvent('Event')
    evt.initEvent('checked-changed', true, true)
    evt.checked = false
    evt.userInteraction = userInteraction
    ReactDOM.findDOMNode(this).dispatchEvent(evt)

    this.checked = false
  }

  /**
   * Checks the checkbox and raises checked-changed event.
   * @param {Boolean} userInteraction.
   */
  check = (userInteraction = true) => {
    const checkbox = this.refs.checkbox
    const border = this.refs.border
    const icon = this.refs.icon

    border.style.borderWidth = checkbox.offsetWidth / 2 + 'px'
    border.style.borderColor = this.props.onColor

    setTimeout(function () {
      icon.classList.remove('material-checkbox-hide')
      icon.classList.add('material-checkbox-cover-animation')
    }, 150)

    let evt = document.createEvent('Event')
    evt.initEvent('checked-changed', true, true)
    evt.checked = true
    evt.userInteraction = userInteraction
    ReactDOM.findDOMNode(this).dispatchEvent(evt)

    this.checked = true
  }

  /**
   * On click event.
   * @param {Object} event data.
   */
  onClick = (e) => {
    if (!this.checked) this.check()
    else this.unCheck()
  }

  /*
   * On mouse down event.
   * Makes ripple.
   * @param {Object} event data.
   */
  onMouseDown = (e) => {
    const color = this.refs.border.style['border-color']

    const ripple = Ripple.createRipple(this.refs.checkbox, {
      backgroundColor: color
    }, createRippleCenter(this.refs.checkbox))
    Ripple.makeRipple(ripple)
  }

  render () {
    return (
      <div className='material-checkbox ripple-icon' onMouseDown={this.onMouseDown} ref='checkbox' onClick={this.onClick}>
        <div ref='border' className='material-checkbox-border' />
        <div ref='icon' className='material-checkbox-icon material-checkbox-hide' />
      </div>
    )
  }
}

Checkbox.defaultProps = {
  onColor: '#2196F3',
  offColor: '#757575',
  checked: 'false'
}
