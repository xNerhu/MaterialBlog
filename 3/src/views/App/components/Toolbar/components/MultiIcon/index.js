import React from 'react'

export default class MultiIcon extends React.Component {
  constructor () {
    super()

    this.isArrow = false
    this.isExit = false

    this.canClick = true
  }

  /**
   * Change to arrow version.
   */
  changeToArrow = () => {
    var self = this

    if (!this.isArrow && !this.isExit) {
      this.blockClick()
      this.refs.multiIcon.classList.remove('multiIcon-arrow-true')
      this.refs.multiIcon.className += ' multiIcon-arrow multiIcon-arrow-change'
      this.isArrow = null
      // Wait until end of animation.
      setTimeout(function () {
        self.isArrow = true
      }, 500)
    }
  }

  /**
   * Change to exit (X) version
   */
  changeToExit = () => {
    var self = this

    if (!this.isArrow && !this.isExit) {
      this.blockClick()
      this.refs.multiIcon.className += ' multiIcon-exit multiIcon-exit-change'
      this.isExit = null
      // Wait until end of animation.
      setTimeout(function () {
        self.isExit = true
      }, 500)
    }
  }

  /**
   * Change to normal menu.
   */
  changeToDefault = () => {
    var self = this

    if (this.isArrow && !this.isExit) {
      this.blockClick()
      this.refs.multiIcon.className += ' multiIcon-arrow multiIcon-arrow-backtodefault'
      this.refs.multiIcon.classList.remove('multiIcon-arrow')
      this.refs.multiIcon.classList.remove('multiIcon-arrow-change')
      this.isArrow = null
      // Wait until end of animation.
      setTimeout(function () {
        self.refs.multiIcon.classList.remove('multiIcon-arrow-backtodefault')
        self.isArrow = false
      }, 500)
    } else if (!this.isArrow && this.isExit) {
      this.blockClick()
      this.refs.multiIcon.classList.remove('multiIcon-exit')
      this.refs.multiIcon.classList.remove('multiIcon-exit-change')
      this.isExit = null
      // Wait until end of animation.
      setTimeout(function () {
        self.refs.multiIcon.classList.remove('multiIcon-exit-backtodefault')
        self.isExit = false
      }, 500)
    }
  }

  /**
   * Blocks click mouse event.
   */
  blockClick = () => {
    var self = this
    // Block click mouse event.
    this.canClick = false
    // Wait 1.5 second then unlock click mouse event.
    setTimeout(function () {
      self.canClick = true
    }, 1500)
  }

  /**
   * On click
   * @param {Object} event data
   */
  onClick = (e) => {
    // If click mouse event has't been blocked.
    if (this.canClick) {
      this.props.onClick(e)
    }
  }

  render () {
    return (
      <div style={this.props.style} className={this.props.className} onMouseDown={this.props.onMouseDown} onClick={this.onClick} onTouchStart={this.props.onTouchStart}>
        <div className='multiIcon' ref='multiIcon'>
          <div className='multiIcon-grid multiIcon-grid-1' />
          <div className='multiIcon-grid multiIcon-grid-2' />
          <div className='multiIcon-grid multiIcon-grid-3' />
        </div>
      </div>
    )
  }
}
