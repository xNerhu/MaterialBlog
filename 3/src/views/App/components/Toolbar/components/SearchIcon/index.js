import React from 'react'

import TextField from '../../../../../../imports/materialdesign/components/TextField'

export default class SearchIcon extends React.Component {
  constructor () {
    super()

    this.state = {
      toggled: false,
      overflow: 'hidden'
    }
  }

  /**
   * On search icon click event.
   */
  onClick = () => {
    this.setState({
      toggled: true,
      overflow: 'visible'
    })
  }

  /**
   * On action icon click event.
   */
  onActionIconClick = () => {
    var self = this

    this.setState({
      toggled: false
    })
    setTimeout(function () {
      self.setState({
        overflow: 'hidden'
      })
    }, 250)
  }

  render () {
    // Styles.
    const textFieldStyle = {
      width: (!this.state.toggled) ? 0 : 400,
      overflow: this.state.overflow
    }

    const buttonStyle = {
      backgroundImage: 'url(' + this.props.image + ')'
    }

    const actionIcon = 'src/images/Toolbar/close.png'

    const className = 'search-icon ' + this.props.className

    return (
      <div className={className}>
        <div className='search-icon-button' style={buttonStyle} onClick={this.onClick} onMouseDown={this.props.onMouseDown} onTouchStart={this.onTouchStart} />
        <TextField
          style={textFieldStyle}
          className='search-icon-textfield'
          hint={false}
          placeHolder='Wyszukaj'
          placeHolderAlwaysVisible={true}
          focusColor='#fff'
          textColor='#fff'
          actionIcon={actionIcon}
          onActionIconClick={this.onActionIconClick}
        />
      </div>
    )
  }
}
