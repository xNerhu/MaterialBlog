import React from 'react'

export default class NavigationDrawer extends React.Component {
  constructor () {
    super()

    this.state = {
      left: -240,
      width: 240,
      height: '100%',
      darkOpacity: 0,
      darkVisible: false,
      persistent: true,
      toggled: false
    }
  }

  componentDidMount () {
    const self = this
    // Add on window resize event listener.
    // If window width is less than 768 pixels and navigation drawer is toggled, then show temporary navigation drawer.
    // If window width is more than 768 pixels and navigation drawer is toggled, then show persistent navigation drawer.
    window.addEventListener('resize', function () {
      if (window.innerWidth <= 768 && self.state.persistent && self.state.toggled) {
        self.showTemporary()
      }
      if (window.innerWidth > 768 && !self.state.persistent && self.state.toggled) {
        self.hideDark()
        self.showPersistent()
      }
    })
  }

  /**
   * Show navigation drawer.
   */
  show = () => {
    // If window width is less than 768, then show temporary navigation drawer.
    if (window.innerWidth <= 768) this.showTemporary()
    // Otherwise show persistent navigation drawer.
    else this.showPersistent()
  }

  /**
   * Hide navigation drawer.
   */
  hide = () => {
    // If window width is more than 768, then hide temporary navigation drawer.
    if (window.innerWidth <= 768) this.hideTemporary()
    // Otherwise hide persistent navigation drawer.
    else this.hidePersistent()
  }

  /**
   * Shows persistent navigation drawer.
   */
  showPersistent = () => {
    var app = this.props.getApp()

    // Change left and width.
    this.setState({
      left: 0,
      width: this.props.persistentWidth
    })

    // Change app's content width.
    app.setState({
      contentWidth: 'calc(100% - ' + this.props.persistentWidth + 'px)'
    })

    this.setState({persistent: true, toggled: true})
  }

  /**
   * Hides persistent navigation drawer.
   */
  hidePersistent = () => {
    var app = this.props.getApp()

    // Change navigation drawer's left.
    this.setState({
      left: -this.props.persistentWidth
    })

    // Change app's content width
    app.setState({
      contentWidth: '100%'
    })

    this.setState({toggled: false})
  }

  /**
   * Shows temporary navigation drawer.
   */
  showTemporary = () => {
    var app = this.props.getApp()

    // Show dark background.
    this.showDark()

    // Change navigation drawer's left and width.
    this.setState({
      left: 0,
      width: this.props.temporaryWidth
    })

    // Change app's content width.
    app.setState({
      contentWidth: '100%'
    })

    this.setState({persistent: false, toggled: true})
  }

  /**
   * Hides temporary navigation drawer.
   */
  hideTemporary = () => {
    // Hide dark background.
    this.hideDark()

    // Change navigation drawer's left.
    this.setState({
      left: -this.props.temporaryWidth
    })

    this.setState({toggled: false})
  }

  /**
   * Shows dark and fullscreen background.
   */
  showDark = () => {
    this.setState({
      darkOpacity: this.props.darkOpacity,
      darkVisible: true
    })
  }

  /**
   * Hides dark and fullscreen background.
   */
  hideDark = () => {
    var self = this

    // Animate dark background opacity.
    this.setState({
      darkOpacity: 0
    })

    // Wait until the animation end (300 milliseconds).
    setTimeout(function () {
      self.setState({
        darkVisible: false
      })
    }, 300)
  }

  /**
    * On navigation drawer item mouse down event.
    * @param {object} event data
    */
  onItemMouseDown = (e) => {
    var ripple = Ripple.createRipple(e.target, {
      backgroundColor: '#000',
      opacity: 0.2
    }, createRippleMouse(e.target, e, 1.5))
    Ripple.makeRipple(ripple)
  }

  /**
    * On dark click event.
    * Hides navigation drawer.
    */
  onDarkClick = () => {
    this.hide()
    this.props.getApp().getToolBar().refs.menuIcon.changeToDefault()
  }

  render () {
    // Styles.
    const navigationDrawerStyle = {
      backgroundColor: this.props.backgroundColor,
      width: this.state.width,
      height: this.state.height,
      left: this.state.left
    }

    const navigationDrawerContentStyle = {
      borderRight: (this.state.persistent && this.state.toggled) ? '1px solid rgba(0,0,0,0.12)' : 'none'
    }

    const darkStyle = {
      backgroundColor: this.props.darkBackgroundColor,
      visibility: (this.state.darkVisible) ? 'visible' : 'hidden',
      opacity: this.state.darkOpacity
    }

    const headerStyle = {
      display: 'block'
    }

    const infoIconStyle = {
      backgroundImage: 'url(src/images/NavigationDrawer/info.png)'
    }

    const loginIconStyle = {
      backgroundImage: 'url(src/images/NavigationDrawer/login.png)'
    }

    return (
      <div>
        <div className='navigation-drawer' style={navigationDrawerStyle}>
          <div className='navigation-drawer-header' style={headerStyle} />
          <div className='navigation-drawer-content' style={navigationDrawerContentStyle}>
            <div className='navigation-drawer-item ripple' onMouseDown={this.onItemMouseDown}>
              <div className='navigation-drawer-item-icon' style={infoIconStyle} />
              Informacje
            </div>
            <div className='navigation-drawer-item ripple' onMouseDown={this.onItemMouseDown}>
              <div className='navigation-drawer-item-icon' style={loginIconStyle} />
              Zaloguj się
            </div>
          </div>
        </div>
        <div className='dark' style={darkStyle} onClick={this.onDarkClick} />
      </div>
    )
  }
}

NavigationDrawer.defaultProps = {
  backgroundColor: '#fff',
  persistentWidth: 240,
  temporaryWidth: 260,
  darkBackgroundColor: '#000',
  darkOpacity: 0.7
}
