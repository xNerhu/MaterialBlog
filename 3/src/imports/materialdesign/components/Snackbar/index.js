import React from 'react'

import MaterialButton from '../MaterialButton'

export default class Snackbar extends React.Component {
  constructor () {
    super()

    this.toggled = false
  }

  /**
   * Shows snackbar.
   */
  show = () => {
    const self = this
    const root = this.refs.root
    const content = this.refs.content

    root.style.display = 'block'

    setTimeout(function () {
      root.style.bottom = '0px'

      setTimeout(function () {
        content.style.opacity = '1'
      }, 150)

      setTimeout(function () {
        self.hide()
      }, self.props.timeout)
    }, 10)

    this.toggled = true
  }

  /**
   * Hides snackbar.
   */
  hide = () => {
    const self = this
    const root = this.refs.root
    const content = this.refs.content

    root.style.bottom = -root.scrollHeight + 'px'

    setTimeout(function () {
      root.style.display = 'none'
      content.style.opacity = '0'

      self.toggled = false
    }, 300)
  }

  render () {
    var className = 'material-snackbar'
    if (this.props.className) className += this.props.className

    return (
      <div className={className} ref='root'>
        <div className='material-snackbar-content' ref='content'>
          <div className='material-snackbar-text' ref='text'>
            {
              this.props.children
            }
          </div>
          <MaterialButton className='material-snackbar-action' shadow={false} rippleStyle={this.props.actionRippleStyle} onClick={this.props.onActionClick}>
            {
              this.props.actionText
            }
          </MaterialButton>
        </div>
      </div>
    )
  }
}

Snackbar.defaultProps = {
  timeout: 2500,
  actionRippleStyle: {
    backgroundColor: '#FFEB3B'
  }
}
