import React from 'react'

export default class MultiIcon extends React.Component {
  constructor () {
    super()

    this.isArrow = false
    this.isExit = false

    this.canClick = true

    this.actualState = 'default'
  }

  /**
   * Change to arrow version.
   * @param {Boolean} update actual state.
   */
  changeToArrow = (update = true) => {
    const self = this
    const root = this.refs.root

    if (!this.isArrow && !this.isExit) {
      this.blockClick()
      root.classList.remove('multiIcon-arrow-true')
      root.className += ' multiIcon-arrow multiIcon-arrow-change'
      this.isArrow = null
      // Wait until end of animation.
      setTimeout(function () {
        self.isArrow = true
      }, 500)

      if (update) this.actualState = 'arrow'
    }
  }

  /**
   * Change to exit (X) version
   * @param {Boolean} update actual state.
   */
  changeToExit = (update = true) => {
    const self = this
    const root = this.refs.root

    if (!this.isArrow && !this.isExit) {
      this.blockClick()
      root.className += ' multiIcon-exit multiIcon-exit-change'
      this.isExit = null
      // Wait until end of animation.
      setTimeout(function () {
        self.isExit = true
      }, 500)

      if (update) this.actualState = 'exit'
    }
  }

  /**
   * Change to normal menu.
   * @param {Boolean} update last state.
   */
  changeToDefault = (update = true) => {
    const self = this
    const root = this.refs.root

    if (this.isArrow && !this.isExit) {
      this.blockClick()
      root.className += ' multiIcon-arrow multiIcon-arrow-backtodefault'
      root.classList.remove('multiIcon-arrow')
      root.classList.remove('multiIcon-arrow-change')
      this.isArrow = null
      // Wait until end of animation.
      setTimeout(function () {
        root.classList.remove('multiIcon-arrow-backtodefault')
        self.isArrow = false
      }, 500)

      if (update) this.actualState = 'default'
    } else if (!this.isArrow && this.isExit) {
      this.blockClick()
      root.classList.remove('multiIcon-exit')
      root.classList.remove('multiIcon-exit-change')
      this.isExit = null
      // Wait until end of animation.
      setTimeout(function () {
        root.classList.remove('multiIcon-exit-backtodefault')
        self.isExit = false
      }, 500)

      if (update) this.actualState = 'default'
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
      <div style={this.props.style} className={this.props.className} onMouseDown={this.props.onMouseDown} onClick={this.onClick} onTouchStart={this.props.onTouchStart} id={this.props.id}>
        <div className='multiIcon' ref='root'>
          <div className='multiIcon-grid multiIcon-grid-1' />
          <div className='multiIcon-grid multiIcon-grid-2' />
          <div className='multiIcon-grid multiIcon-grid-3' />
        </div>
      </div>
    )
  }
}
