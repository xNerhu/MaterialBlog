import React from 'react'

export default class MultiIcon extends React.Component {
  constructor () {
    super()

    this.isArrow = false
    this.isExit = false

    this.canClick = true
  }

  changeToArrow = () => {
    var self = this

    if (!this.isArrow && !this.isExit) {
      this.blockClick()
      this.refs.multiIcon.classList.remove('multiIcon-arrow-true')
      this.refs.multiIcon.className += ' multiIcon-arrow multiIcon-arrow-change'
      this.isArrow = null
      setTimeout(function () {
        self.isArrow = true
      }, 500)
    }
  }

  changeToExit = () => {
    var self = this

    if (!this.isArrow && !this.isExit) {
      this.blockClick()
      this.refs.multiIcon.className += ' multiIcon-exit multiIcon-exit-change'
      this.isExit = null
      setTimeout(function () {
        self.isExit = true
      }, 500)
    }
  }

  changeToDefault = () => {
    var self = this

    if (this.isArrow && !this.isExit) {
      this.blockClick()
      this.refs.multiIcon.className += ' multiIcon-arrow multiIcon-arrow-backtodefault'
      this.refs.multiIcon.classList.remove('multiIcon-arrow')
      this.refs.multiIcon.classList.remove('multiIcon-arrow-change')
      this.isArrow = null
      setTimeout(function () {
        self.refs.multiIcon.classList.remove('multiIcon-arrow-backtodefault')
        self.isArrow = false
      }, 500)
    } else if (!this.isArrow && this.isExit) {
      this.blockClick()
      this.refs.multiIcon.classList.remove('multiIcon-exit')
      this.refs.multiIcon.classList.remove('multiIcon-exit-change')
      this.isExit = null
      setTimeout(function () {
        self.refs.multiIcon.classList.remove('multiIcon-exit-backtodefault')
        self.isExit = false
      }, 500)
    }
  }

  blockClick = () => {
    var self = this

    this.canClick = false
    setTimeout(function () {
      self.canClick = true
    }, 1500)
  }

  onClick = (e) => {
    if (this.canClick) {
      this.props.onClick(e)
    }
  }

  render () {
    return (
      <div style={this.props.style} className={this.props.className} onMouseDown={this.props.onMouseDown} onClick={this.onClick}>
        <div className='multiIcon' ref='multiIcon'>
          <div className='multiIcon-grid multiIcon-grid-1' />
          <div className='multiIcon-grid multiIcon-grid-2' />
          <div className='multiIcon-grid multiIcon-grid-3' />
        </div>
      </div>
    )
  }
}
