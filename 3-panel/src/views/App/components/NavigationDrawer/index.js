import React from 'react'

import NavigationDrawerItem from './components/NavigationDrawerItem'

export default class NavigationDrawer extends React.Component {
  constructor () {
    super()

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
   * Show navigation drawer.
   */
  show = () => {
    const app = this.props.getApp()
    const toolbar = app.getToolBar()
    const menuIcon = toolbar.refs.menuIcon

    // If window width is less than 768, then show temporary navigation drawer.
    if (window.innerWidth <= 768) this.showTemporary()
    // Otherwise show persistent navigation drawer.
    else this.showPersistent()

    menuIcon.changeToExit()
  }

  /**
   * Hide navigation drawer.
   */
  hide = () => {
    const app = this.props.getApp()
    const toolbar = app.getToolBar()
    const menuIcon = toolbar.refs.menuIcon

    // If window width is more than 768, then hide temporary navigation drawer.
    if (window.innerWidth <= 768) this.hideTemporary()
    // Otherwise hide persistent navigation drawer.
    else this.hidePersistent()

    menuIcon.changeToDefault()
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
    app.getAppContent().style.width = 'calc(100% - ' + this.props.persistentWidth + 'px)'

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
    app.getAppContent().style.width = '100%'

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
    app.getAppContent().style.width = '100%'

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
   * Gets root.
   * @return {DOMElement}
   */
  getRoot = () => {
    return this.refs.root
  }

  /**
   * On posts item click event.
   * Selects posts page.
   * @param {Object} event data.
   */
  onPostsClick = (e) => {
    const app = this.props.getApp()

    app.selectPage(app.getPostsPage())

    this.hide()
  }

  /**
   * On gallery item click event.
   * Selects gallery page.
   * @param {Object} event data.
   */
  onGalleryClick = (e) => {
    const app = this.props.getApp()

    app.selectPage(app.getGalleryPage())

    this.hide()
  }

  /**
   * On about class item click event.
   * Selects about class page.
   * @param {Object} event data.
   */
  onAboutClassClick = (e) => {
    const app = this.props.getApp()

    app.selectPage(app.getAboutClassPage())

    this.hide()
  }

  render () {
    return (
      <div>
        <div className='navigation-drawer' ref='root'>
          <div className='navigation-drawer-header' ref='header'>
            <div className='navigation-drawer-header-avatar' ref='avatar' />
            <div className='navigation-drawer-header-username' ref='username' />
            <div className='navigation-drawer-header-email' ref='email' />
          </div>
          <div className='navigation-drawer-content'>
            <NavigationDrawerItem
              getApp={this.props.getApp}
              onClick={this.onPostsClick}
              className='navigation-drawer-posts'
            >
              Posty
            </NavigationDrawerItem>
            <NavigationDrawerItem
              getApp={this.props.getApp}
              onClick={this.onGalleryClick}
              className='navigation-drawer-gallery'
            >
              Galeria
            </NavigationDrawerItem>
            <NavigationDrawerItem
              getApp={this.props.getApp}
              onClick={this.onAboutClassClick}
              className='navigation-drawer-about-class'
            >
              O klasie
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
