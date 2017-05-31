import React from 'react'

import NavigationDrawerItem from './components/NavigationDrawerItem'

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
      toggled: false,
      loginItemText: 'Zaloguj się'
    }

    this.persistent = true
    this.toggled = false
  }

  componentDidMount () {
    const self = this
    const app = this.props.getApp()
    const header = this.refs.header
    const avatar = this.refs.avatar
    const username = this.refs.username
    const email = this.refs.email

    // Add on window resize event listener.
    // If window width is less than 768 pixels and navigation drawer is toggled, then show temporary navigation drawer.
    // If window width is more than 768 pixels and navigation drawer is toggled, then show persistent navigation drawer.
    window.addEventListener('resize', function () {
      if (window.innerWidth <= 768 && self.persistent && self.toggled) {
        self.showTemporary()
      }
      if (window.innerWidth > 768 && !self.persistent && self.toggled) {
        self.hideDark()
        self.showPersistent()
      }
    })

    header.style.backgroundImage = 'url(src/images/NavigationDrawer/header.png)'

    app.elementsToChange.push(this)
  }

  /**
   * When user logs event.
   */
  userLogs = () => {
    const app = this.props.getApp()
    const header = this.refs.header
    const avatar = this.refs.avatar
    const username = this.refs.username
    const email = this.refs.email

    header.style.backgroundImage = 'none'

    avatar.style.backgroundImage = 'url(' + app.accountInfo.avatar + ')'

    username.innerHTML = app.accountInfo.userName

    email.innerHTML = app.accountInfo.email

    this.setState({
      loginItemText: 'Wyloguj się'
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
    const app = this.props.getApp()
    const root = this.getRoot()

    // Change left and width.
    root.style.left = '0px'
    root.style.width = this.props.persistentWidth + 'px'

    // Change app's content width
    app.setState({
      contentWidth: 'calc(100% - ' + this.props.persistentWidth + 'px)'
    })

    this.persistent = true
    this.toggled = true
  }

  /**
   * Hides persistent navigation drawer.
   */
  hidePersistent = () => {
    const app = this.props.getApp()
    const root = this.getRoot()

    // Change navigation drawer's left.
    root.style.left = -this.props.persistentWidth + 'px'

    // Change app's content width
    app.setState({
      contentWidth: '100%'
    })

    this.toggled = false
  }

  /**
   * Shows temporary navigation drawer.
   */
  showTemporary = () => {
    const app = this.props.getApp()
    const root = this.getRoot()

    // Show dark background.
    this.showDark()

    // Change navigation drawer's left and width.
    root.style.left = '0px'
    root.style.width = this.props.temporaryWidth + 'px'

    // Change app's content width.
    app.setState({
      contentWidth: '100%'
    })

    this.persistent = false
    this.toggled = true
  }

  /**
   * Hides temporary navigation drawer.
   */
  hideTemporary = () => {
    const root = this.getRoot()

    // Hide dark background.
    this.hideDark()

    // Change navigation drawer's left.
    root.style.left = -this.props.temporaryWidth + 'px'

    this.toggled = false
  }

  /**
   * Shows dark and fullscreen background.
   */
  showDark = () => {
    const self = this
    const dark = this.refs.dark

    dark.style.display = 'block'
    setTimeout(function () {
      dark.style.opacity = self.props.darkOpacity
    }, 10)
  }

  /**
   * Hides dark and fullscreen background.
   */
  hideDark = () => {
    const dark = this.refs.dark

    dark.style.opacity = '0'
    setTimeout(function () {
      dark.style.display = 'none'
    }, 10)
  }

  /**
    * On dark click event.
    * Hides navigation drawer.
    */
  onDarkClick = () => {
    this.hide()
    this.props.getApp().getToolBar().refs.menuIcon.changeToDefault()
  }

  /**
   * On info item click event.
   * Shows info dialog.
   */
  onInfoClick = () => {
    const app = this.props.getApp()

    app.getToolBar().refs.menuIcon.changeToDefault()
    this.hide()

    app.refs.infoDialog.show()
  }

  /**
   * On login item click event.
   * Show login dialog.
   */
  onLoginClick = () => {
    const app = this.props.getApp()

    if (!app.accountInfo) {
      app.getToolBar().refs.menuIcon.changeToDefault()
      this.hide()

      app.refs.loginDialog.show()
    }
  }

  /**
   * On github item click event.
   */
  onGitHubClick = () => {
    window.open('https://github.com/xNerhu22/MyClassBlog', '_blank')
  }

  /**
   * Gets root.
   * @return {DOMElement}
   */
  getRoot = () => {
    return this.refs.root
  }

  render () {
    return (
      <div>
        <div className='navigation-drawer' ref='root'>
          <div className='navigation-drawer-header' ref='header'>
            <div className='navigation-drawer-header-avatar' ref='avatar' />
            <div className='navigation-drawer-header-username' ref='username'></div>
            <div className='navigation-drawer-header-email' ref='email'></div>
          </div>
          <div className='navigation-drawer-content'>
            <NavigationDrawerItem
              onClick={this.onInfoClick}
              getApp={this.props.getApp}
              className='navigation-drawer-info'
            >
              Informacje
            </NavigationDrawerItem>
            <NavigationDrawerItem
              onClick={this.onGitHubClick}
              getApp={this.props.getApp}
              className='navigation-drawer-github'
            >
              GitHub
            </NavigationDrawerItem>
            <div className='navigation-drawer-divider' />
            <NavigationDrawerItem
              getApp={this.props.getApp}
              className='navigation-drawer-panel'
            >
              Panel
            </NavigationDrawerItem>
            <NavigationDrawerItem
              getApp={this.props.getApp}
              className='navigation-drawer-register'
            >
              Zarejestruj się
            </NavigationDrawerItem>
            <NavigationDrawerItem
              onClick={this.onLoginClick}
              getApp={this.props.getApp}
              className='navigation-drawer-login'
            >
              {this.state.loginItemText}
            </NavigationDrawerItem>
          </div>
        </div>
        <div className='dark' ref='dark' onClick={this.onDarkClick} />
      </div>
    )
  }
}

NavigationDrawer.defaultProps = {
  persistentWidth: 240,
  temporaryWidth: 260,
  darkOpacity: 0.7
}
