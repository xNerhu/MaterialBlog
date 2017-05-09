import React from 'react'

import MaterialButton from '../MaterialButton'

export default class Dialog extends React.Component {
  onMaterialButtonClick = (e, data) => {
    if (typeof data.onButtonClick === 'function') {
      data.onButtonClick(e)
    }
  }

  render () {
    // Styles.
    const contentStyle = {
      maxHeight: this.props.maxHeight
    }

    const className = 'material-dialog ' + ((!this.props.buttonsList) ? 'material-dialog-footer-side-by-side' : 'material-dialog-footer-list')

    return (
      <div className={this.props.className}>
        <div className={className} style={this.props.style}>
          <div className='material-dialog-title'>{this.props.title}</div>
          <div className='material-dialog-content' style={contentStyle}>{this.props.children}</div>
          <div className='material-dialog-footer'>
            {
              this.props.buttons.map((data, i) => {
                return <MaterialButton key={i} rippleStyle={data.rippleStyle} shadow={data.shadow} color={data.foreground} backgroundColor={data.backgroundColor} onClick={(e) => this.onMaterialButtonClick(e, data)}>{data.text}</MaterialButton>
              })
            }
            <div className='material-dialog-footer-clear' />
          </div>
        </div>
        <div className='material-dialog-dark' />
      </div>
    )
  }
}

Dialog.defaultProps = {
  buttonsList: false,
  maxHeight: '70vh'
}
