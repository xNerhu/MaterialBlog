import Component from './../../../../helpers/Component/index'

import NavigationDrawerItem from './components/NavigationDrawerItem'

export default class NavigationDrawer extends Component {
  beforeRender () {
    this.persistent = true
    this.toggled = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
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

    const multiIcon = window.app.getToolbar().getMultiIcon()

    multiIcon.changeToDefault()
  }

  /**
   * Shows persistent navigation drawer.
   */
  showPersistent = () => {
    const appContent = window.app.elements.appContent
    const container = this.elements.container

    // Change left and width.
    container.style.left = '0px'
    container.style.width = this.props.persistentWidth + 'px'

    // Change app's content width
    appContent.style.width = 'calc(100% - ' + this.props.persistentWidth + 'px)'

    this.persistent = true
    this.toggled = true
  }

  /**
   * Hides persistent navigation drawer.
   */
  hidePersistent = () => {
    const appContent = window.app.elements.appContent
    const container = this.elements.container

    // Change navigation drawer's left.
    container.style.left = -this.props.persistentWidth + 'px'

    // Change app's content width
    appContent.style.width = '100%'

    this.toggled = false
  }

  /**
   * Shows temporary navigation drawer.
   */
  showTemporary = () => {
    const appContent = window.app.elements.appContent
    const container = this.elements.container

    // Show dark background.
    this.showDark()

    // Change navigation drawer's left and width.
    container.style.left = '0px'
    container.style.width = this.props.temporaryWidth + 'px'

    // Change app's content width.
    appContent.style.width = '100%'

    this.persistent = false
    this.toggled = true
  }

  /**
   * Hides temporary navigation drawer.
   */
  hideTemporary = () => {
    const container = this.elements.container

    // Hide dark background.
    this.hideDark()

    // Change navigation drawer's left.
    container.style.left = -this.props.temporaryWidth + 'px'

    this.toggled = false
  }

  /**
   * Shows dark and fullscreen background.
   */
  showDark = () => {
    const darkOpacity = this.props.darkOpacity
    const dark = this.elements.dark

    dark.style.display = 'block'
    setTimeout(function () {
      dark.style.opacity = darkOpacity
    }, 10)
  }

  /**
   * Hides dark and fullscreen background.
   */
  hideDark = () => {
    const dark = this.elements.dark

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
    const multiIcon = window.app.getToolbar().getMultiIcon()

    if (multiIcon.canClick) {
      multiIcon.changeToDefault()
      this.hide()
    }
  }

  /**
   * On window resize event.
   * Changes type of navigation drawer.
   * @param {Event}
   */
  onWindowResize = (e) => {
    if (window.innerWidth <= 768 && this.persistent && this.toggled) {
      this.showTemporary()
    }
    if (window.innerWidth > 768 && !this.persistent && this.toggled) {
      this.hideDark()
      this.showPersistent()
    }
  }

  /**
   * Sets items.
   * @param {Object} items
   */
  setItems = (items) => {
    for (var i = 0; i < items.length; i++) {
      const item = items[i]
      const ref = item.ref
      const text = item.text
      const className = item.className
      const onClick = item.onClick

      const element = (
        <NavigationDrawerItem className={className} onClick={onClick} ref={ref}>
          {
            text
          }
        </NavigationDrawerItem>
      )

      this.renderComponents(element, this.elements.content)
    }
  }

  /**
   * On user logs event.
   */
  onUserLog = () => {
    const app = window.app
    const accountInfo = app.accountInfo

    const header = this.elements.header
    const avatar = this.elements.headerAvatar
    const userName = this.elements.headerUserName
    const email = this.elements.headerEmail

    header.style.backgroundImage = 'none'

    avatar.style.display = 'block'
    avatar.style.backgroundImage = 'url(' + accountInfo.avatar + ')'

    userName.innerHTML = accountInfo.userName
    email.innerHTML = accountInfo.email
  }

  render () {
    return (
      <div ref='root'>
        <div className='navigation-drawer' ref='container'>
          <div className='navigation-drawer-header' ref='header'>
            <div className='navigation-drawer-header-avatar' ref='headerAvatar' />
            <div className='navigation-drawer-header-username' ref='headerUserName' />
            <div className='navigation-drawer-header-email' ref='headerEmail' />
          </div>
          <div className='navigation-drawer-content' ref='content' />
        </div>
        <div className='dark' ref='dark' onClick={this.onDarkClick} />
      </div>
    )
  }

  afterRender () {
    const props = this.props

    if (props.persistentWidth == null) props.persistentWidth = 240
    if (props.temporaryWidth == null) props.temporaryWidth = 260
    if (props.darkOpacity == null) props.darkOpacity = 0.7

    window.addEventListener('resize', this.onWindowResize)
    window.app.elementsToCall.push(this)
  }
}
