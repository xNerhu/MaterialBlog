import React from 'react'

export default class FAB extends React.Component {
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
      var ripple = Ripple.createRipple(this.refs.root, this.props.rippleStyle, createRippleMouse(this.refs.root, e, this.props.rippleTime))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On touch start event. (on mobile)
   * @param {Object} event data
   */
  onTouchStart = (e) => {
    if (this.props.rippleTouch) {
      var ripple = Ripple.createRipple(this.refs.root, this.props.rippleStyle, createRippleMouse(this.refs.root, e, this.props.rippleTime, true))
      Ripple.makeRipple(ripple)
      this.isTouchRipple = true
    }
  }

  render () {
    var className = 'material-fab ripple '
    if (this.props.className) className += this.props.className

    return (
      <div className={className} ref='root' onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart} onClick={this.props.onClick}>
        <div className='material-fab-icon' />
      </div>
    )
  }
}

FAB.defaultProps = {
  rippleMouseDown: true,
  rippleTouch: true,
  rippleStyle: {
    backgroundColor: '#fff',
    opacity: 0.2
  }
}
