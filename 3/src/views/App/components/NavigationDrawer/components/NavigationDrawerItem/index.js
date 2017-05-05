import React from 'react'

export default class NavigationDrawerItem extends React.Component {
  /**
    * On mouse down event.
    * @param {object} event data
    */
  onMouseDown = (e) => {
    if (!this.props.getApp().blockMouseDownEvent) {
      var ripple = Ripple.createRipple(this.refs.item, {
        backgroundColor: '#000',
        opacity: 0.2
      }, createRippleMouse(this.refs.item, e, 1.5))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On touch event (on mobile).
   * @param {Object} event data
   */
  onTouchStart = (e) => {
    var ripple = Ripple.createRipple(this.refs.item, {
      backgroundColor: '#000',
      opacity: 0.2
    }, createRippleMouse(this.refs.item, e, 1.5, true))
    Ripple.makeRipple(ripple)
    this.props.getApp().blockMouseDownEvent = true
  }

  render () {
    return (
      <div className='navigation-drawer-item ripple' ref='item' onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart}>
        <div className='navigation-drawer-item-icon' style={this.props.iconStyle} />
        {this.props.children}
      </div>
    )
  }
}
