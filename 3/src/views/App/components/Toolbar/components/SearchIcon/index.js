import React from 'react'

import TextField from '../../../../../../imports/materialdesign/components/TextField'

export default class SearchIcon extends React.Component {
  constructor () {
    super()

    this.state = {
      toggled: false,
      textFieldWidth: 0,
      overflow: 'hidden',
      fullWidth: false
    }
  }

  /**
   * On window resize event.
   * @param {Object} event data.
   */
  onWindowResize = (e) => {
    var self = this

    if (this.state.toggled && window.innerWidth <= 655) {
      this.showFullWidth()
    } else if (this.state.toggled && window.innerWidth > 655 && this.state.textFieldWidth !== 400) {
      this.showNormal()
    }
  }

  /**
   * On search icon click event.
   */
  onClick = () => {
    if (window.innerWidth > 655) {
      this.showNormal()
    } else {
      /*var toolbarItems = this.props.getApp().state.toolbarItems
      var indexies = []
      var searchIconIndex = 0
      for (var i = 0; i < toolbarItems.length; i++) {
        if (toolbarItems[i].subType !== 'Menu' && toolbarItems[i].subType !== 'Search') {
          indexies.push(i)
        } else {
          searchIconIndex = i
        }
      }
      for (var i = 0; i < indexies.length; i++) {
        var itemStyle = toolbarItems[indexies[i]].style
        var style = Object.assign({}, itemStyle)
        style.top = '64'
        toolbarItems[indexies[i]].style = style
      }*/
      this.showFullWidth()
    }
  }

  showNormal = () => {
    this.props.getApp().getToolBar().refs.menuIcon.changeToDefault()
    this.refs.searchIcon.style.width = ''
    this.refs.searchIcon.style.marginLeft = '0px'
    this.setState({
      toggled: true,
      fullWidth: false,
      textFieldWidth: 400,
      overflow: 'visible'
    })
    window.removeEventListener('resize', this.onWindowResize)
    window.addEventListener('resize', this.onWindowResize)
  }

  showFullWidth = () => {
    this.props.getApp().getToolBar().refs.menuIcon.changeToExit()
    this.setState({
      fullWidth: true,
      textFieldWidth: '100%'
    })
    this.refs.searchIcon.style.width = 'calc(100% - 100px)'
    this.refs.searchIcon.style.marginLeft = '30px'
  }

  /**
   * On action icon click event.
   */
  onActionIconClick = () => {
    var self = this

    this.setState({
      textFieldWidth: 0
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
      width: this.state.textFieldWidth,
      overflow: this.state.overflow
    }

    const searchIconButtonStyle = {
      backgroundImage: 'url(' + this.props.image + ')',
      display: (!this.state.fullWidth) ? 'block' : 'none'
    }

    const actionIcon = (!this.state.fullWidth) ? 'src/images/Toolbar/close.png' : false

    const className = 'search-icon ' + this.props.className

    return (
      <div className={className} ref='searchIcon'>
        <div className='search-icon-button' style={searchIconButtonStyle} onClick={this.onClick} onMouseDown={this.props.onMouseDown} onTouchStart={this.onTouchStart} />
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
