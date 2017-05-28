import React from 'react'

import TextField from '../../../../../../imports/materialdesign/components/TextField'

export default class SearchIcon extends React.Component {
  constructor () {
    super()

    this.state = {
      toggled: false,
      overflow: 'hidden',
      fullWidth: false
    }

    this.maxWidth = 700
  }

  /**
   * On window resize event.
   * @param {Object} event data.
   */
  onWindowResize = (e) => {
    var self = this

    if (this.state.toggled && !this.state.fullWidth && window.innerWidth <= this.maxWidth) {
      this.showFullWidth()
    } else if (this.state.toggled && this.state.fullWidth && window.innerWidth > this.maxWidth) {
      this.showNormal()
      this.backMenu()
    }
  }

  /**
   * Shows normal-width search input.
   */
  showNormal = () => {
    const menuIcon = this.props.getApp().getToolBar().refs.menuIcon

    this.setState({
      overflow: 'visible',
      toggled: true,
      fullWidth: false
    })

    this.toolBarItems(true)
  }

  /**
   * Shows full-width search input.
   */
  showFullWidth = () => {
    const menuIcon = this.props.getApp().getToolBar().refs.menuIcon

    if (!menuIcon.isExit) {
      if (menuIcon.isArrow) {
        menuIcon.changeToDefault(false)
        setTimeout(function () {
          menuIcon.changeToExit(false)
        }, 500)
      } else {
        menuIcon.changeToExit(false)
      }
    }

    this.setState({
      overflow: 'hidden',
      fullWidth: true,
      toggled: true
    })

    this.toolBarItems(false)
  }

  toolBarItems = (flag) => {
    var toolbarItems = this.props.getApp().state.toolbarItems
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
      style.top = (!flag) ? '96px' : '50%'
      toolbarItems[indexies[i]].style = style
    }
    this.props.getApp().setState({
      toolbarItems: toolbarItems
    })
  }

  /**
   * Hides search input.
   */
  hide = () => {
    var self = this

    this.setState({
      toggled: false,
      fullWidth: false
    })

    setTimeout(function () {
      self.setState({
        overflow: 'hidden'
      })
    }, 250)

    if (this.props.getApp().getToolBar().refs.menuIcon.isExit) {
      this.backMenu()
      this.toolBarItems(true)
    }
    window.removeEventListener('resize', this.onWindowResize)
  }

  /**
   * Backs menu state.
   */
  backMenu = () => {
    const app = this.props.getApp()
    const menuIcon = app.getToolBar().refs.menuIcon
    const searchResults = app.refs.searchResults

    if (menuIcon.actualState) {
      if (menuIcon.actualState === 'default' && !searchResults.state.toggled) {
        menuIcon.changeToDefault(false)
      } else if (menuIcon.actualState === 'arrow' || searchResults.state.toggled) {
        menuIcon.changeToDefault(false)
        setTimeout(function () {
          menuIcon.changeToArrow(false)
        }, 500)
      }
    }
  }

  /**
   * On action icon click event.
   */
  onActionIconClick = () => {
    this.hide()
  }

  /**
   * On search button click event.
   */
  onSearchButtonClick = () => {
    if (!this.state.toggled) {
      if (window.innerWidth <= this.maxWidth) this.showFullWidth()
      else this.showNormal()

      window.removeEventListener('resize', this.onWindowResize)
      window.addEventListener('resize', this.onWindowResize)
    } else {
      if (typeof this.props.onSearch === 'function') {
        const value = this.refs.textField.getValue()
        this.props.onSearch(value)
      }
    }
  }

  /**
   * On text field key press event.
   * @param {Object} event data.
   */
  onKeyPress = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      if (typeof this.props.onSearch === 'function') {
        const value = this.refs.textField.getValue()
        this.props.onSearch(value)
      }
    }
  }

  render () {
    // Styles.
    const style = {
      width: (!this.state.toggled) ? 64 : ((!this.state.fullWidth) ? 400 : 'calc(100% - 96px)')
    }

    const textFieldStyle = {
      width: (!this.state.fullWidth) ? 'calc(100% - 64px)' : '100%',
      overflow: this.state.overflow
    }

    const textFieldInputStyle = {
      width: (!this.state.fullWidth) ? 'calc(100% - 24px)' : '100%'
    }

    const searchButtonStyle = {
      backgroundImage: 'url(' + this.props.image + ')',
      display: (!this.state.fullWidth) ? 'block' : 'none'
    }

    const actionIcon = 'src/images/Toolbar/close.png'

    const actionIconStyle = {
      opacity: (!this.state.fullWidth) ? 0.7 : 0,
      visibility: (!this.state.fullWidth) ? 'visible' : 'hidden'
    }

    const className = 'search-icon ' + this.props.className

    return (
      <div className={className} ref='searchIcon' style={style}>
        <div className='search-icon-button' ref='searchButton' style={searchButtonStyle} onClick={this.onSearchButtonClick} onMouseDown={this.props.onMouseDown} onTouchStart={this.onTouchStart} />
        <TextField
          ref='textField'
          style={textFieldStyle}
          className='search-icon-textfield'
          hint={false}
          placeHolder='Wyszukaj'
          placeHolderAlwaysVisible={true}
          focusColor='#fff'
          textColor='#fff'
          actionIcon={actionIcon}
          onActionIconClick={this.onActionIconClick}
          actionIconStyle={actionIconStyle}
          inputStyle={textFieldInputStyle}
          onKeyPress={this.onKeyPress}
        />
      </div>
    )
  }
}
