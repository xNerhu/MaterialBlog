import React from 'react'

export default class MaterialButton extends React.Component {
  constructor () {
    super()

    this.isTouchRipple = false
  }

  /**
   * On mouse down event.
   * @param {Object} event data
   */
  onMouseDown = (e) => {
    if (this.props.rippleMouseDown && !this.isTouchRipple) {
      var ripple = Ripple.createRipple(this.refs.button, this.props.rippleStyle, createRippleMouse(this.refs.button, e, this.props.rippleTime))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On touch start event. (on mobile)
   * @param {Object} event data
   */
  onTouchStart = (e) => {
    if (this.props.rippleTouch) {
      var ripple = Ripple.createRipple(this.refs.button, this.props.rippleStyle, createRippleMouse(this.refs.button, e, this.props.rippleTime, true))
      Ripple.makeRipple(ripple)
      this.isTouchRipple = true
    }
  }

  render () {
    // Styles.
    const style = Object.assign(
      {
        fontSize: this.props.fontSize,
        color: this.props.color,
        backgroundColor: this.props.backgroundColor,
        boxShadow: (!this.props.shadow) ? '' : '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
      }, this.props.style
    )

    var className = 'material-button ripple '
    if (this.props.className) className += this.props.className
    return (
      <div className={className} style={style} ref='button' onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    )
  }
}

MaterialButton.defaultProps = {
  shadow: true,
  color: '#fff',
  backgroundColor: '#2196f3',
  fontSize: 14,
  rippleMouseDown: true,
  rippleTouch: true,
  rippleStyle: {
    backgroundColor: '#fff',
    opacity: 0.2
  },
  rippleTime: 1.5
}
