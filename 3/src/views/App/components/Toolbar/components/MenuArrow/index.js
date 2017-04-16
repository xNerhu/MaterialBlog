import React from 'react'

export default class MenuArrow extends React.Component {
  constructor () {
    super()

    this.isArrow = false
  }

  changeToArrow = () => {
    if (!this.isArrow) {
      this.refs.menuArrow.classList.remove('menuArrow-arrow-true')
      this.refs.menuArrow.className += ' menuArrow-arrow menuArrow-arrow-change'
      this.isArrow = true
    }
  }

  changeToDefault = () => {
    var self = this

    if (this.isArrow) {
      this.refs.menuArrow.className += ' menuArrow-arrow menuArrow-arrow-backtodefault'
      this.refs.menuArrow.classList.remove('menuArrow-arrow')
      this.refs.menuArrow.classList.remove('menuArrow-arrow-change')
      this.isArrow = null
      setTimeout(function () {
        self.refs.menuArrow.classList.remove('menuArrow-arrow-backtodefault')
        self.isArrow = false
      }, 500)
    }
  }

  render () {
    return (
      <div style={this.props.style} className={this.props.className} onMouseDown={this.props.onMouseDown} onClick={this.props.onClick}>
        <div className='menuArrow' ref='menuArrow'>
          <div className='menuArrow-grid menuArrow-grid-1' />
          <div className='menuArrow-grid menuArrow-grid-2' />
          <div className='menuArrow-grid menuArrow-grid-3' />
        </div>
      </div>
    )
  }
}
