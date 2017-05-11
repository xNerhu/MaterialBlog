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
    this.setState({
      toggled: true
    })
  }

  /**
   * Hides dialog.
   */
  hide = () => {
    this.setState({
      toggled: false
    })
  }

  render () {
    // Styles.
    const style = Object.assign(
      {
        visibility: (!this.state.toggled) ? 'hidden' : 'visible',
        opacity: (!this.state.toggled) ? 0 : 1,
        top: (!this.state.toggled) ? this.props.toggledOffTop : '50%'
      }, this.props.style
    )

    const darkStyle = {
      visibility: (!this.state.toggled) ? 'hidden' : 'visible',
      opacity: (!this.state.toggled) ? 0 : this.props.darkOpacity
    }

    const contentStyle = {
      maxHeight: this.props.maxHeight
    }

    const className = 'material-dialog ' + ((!this.props.buttonsList) ? 'material-dialog-action-side-by-side' : 'material-dialog-action-list')

    return (
      <div className={this.props.className}>
        <div className={className} style={style}>
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
