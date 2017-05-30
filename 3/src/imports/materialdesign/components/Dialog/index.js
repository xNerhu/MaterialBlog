import React from 'react'

import MaterialButton from '../MaterialButton'

export default class Dialog extends React.Component {
  constructor () {
    super()

    this.state = {
      toggled: false
    }
  }
  /**
   * On action button click event.
   * @param {Object} event data.
   * @param {Object} button data.
   */
  onActionButtonClick = (e, data) => {
    if (typeof data.onClick === 'function') {
      data.onClick(e)
    }
  }

  /**
   * Shows dialog.
   */
  show = () => {
    var self = this

    this.refs.dialog.style.display = 'block'
    setTimeout(function () {
      self.setState({
        toggled: true
      })
    }, 10)
  }

  /**
   * Hides dialog.
   */
  hide = () => {
    var self = this

    this.setState({
      toggled: false
    })
    setTimeout(function () {
      self.refs.dialog.style.display = 'none'
    }, 300)
  }

  render () {
    // Styles.
    const style = Object.assign(
      {
        opacity: (!this.state.toggled) ? 0 : 1,
        top: (!this.state.toggled) ? this.props.toggledOffTop : '50%'
      }, this.props.style
    )
    //        visibility: (!this.state.toggled) ? 'hidden' : 'visible',

    const darkStyle = {
      visibility: (!this.state.toggled) ? 'hidden' : 'visible',
      opacity: (!this.state.toggled) ? 0 : this.props.darkOpacity
    }

    const contentStyle = {
      maxHeight: this.props.maxHeight
    }

    const className = 'material-dialog ' + ((!this.props.buttonsList) ? 'material-dialog-action-side-by-side ' : 'material-dialog-action-list ') + ((this.props.className) ? this.props.className : '')

    return (
      <div className={this.props.className}>
        <div className={className} style={style} ref='dialog'>
          <div className='material-dialog-title'>{this.props.title}</div>
          <div className='material-dialog-content' style={contentStyle}>{this.props.children}</div>
          <div className='material-dialog-action'>
            {
              this.props.actionButtons.map((data, i) => {
                return <MaterialButton key={i} rippleStyle={data.rippleStyle} shadow={data.shadow} color={data.foreground} backgroundColor={data.backgroundColor} onClick={(e) => this.onActionButtonClick(e, data)}>{data.text}</MaterialButton>
              })
            }
            <div className='material-dialog-action-clear' />
          </div>
        </div>
        <div className='material-dialog-dark' style={darkStyle} />
      </div>
    )
  }
}

Dialog.defaultProps = {
  buttonsList: false,
  maxHeight: '70vh',
  darkOpacity: 0.7,
  toggledOffTop: '25%'
}
