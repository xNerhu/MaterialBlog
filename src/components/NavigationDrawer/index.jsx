import Component from 'inferno-component'

import NavigationDrawerItem from './components/NavigationDrawerItem'

export default class NavigationDrawer extends Component {
  constructor () {
    super()
    this.elements = {}

    this.persistent = true
    this.toggled = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Show navigation drawer.
   */
  show () {
    // If window width is less than 768, then show temporary navigation drawer.
    if (window.innerWidth <= 768) this.showTemporary()
    // Otherwise show persistent navigation drawer.
    else this.showPersistent()
  }

  /**
   * Hide navigation drawer.
   */
  hide () {
    if (this.toggled) {
      // If window width is more than 768, then hide temporary navigation drawer.
      if (window.innerWidth <= 768) this.hideTemporary()
      // Otherwise hide persistent navigation drawer.
      else this.hidePersistent()
    }
  }

  /**
   * Shows persistent navigation drawer.
   */
  showPersistent () {
    const appContent = this.props.parentComponent.elements.appContent
    const container = this.elements.container

    // Change left and width.
    container.style.left = '0px'
    container.style.width = this.props.persistentWidth + 'px'

    container.classList.remove('temporary')
    container.classList.add('persistent')

    // Change app's content width
    appContent.style.width = 'calc(100% - ' + this.props.persistentWidth + 'px)'

    this.persistent = true
    this.toggled = true
  }

  /**
   * Hides persistent navigation drawer.
   */
  hidePersistent () {
    const appContent = this.props.parentComponent.elements.appContent
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
  showTemporary () {
    const appContent = this.props.parentComponent.elements.appContent
    const container = this.elements.container

    // Show dark background.
    this.showDark()

    // Change navigation drawer's left and width.
    container.style.left = '0px'
    container.style.width = this.props.temporaryWidth + 'px'

    container.classList.remove('persistent')
    container.classList.add('temporary')

    // Change app's content width.
    appContent.style.width = '100%'

    this.persistent = false
    this.toggled = true
  }

  /**
   * Hides temporary navigation drawer.
   */
  hideTemporary () {
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
  showDark () {
    const darkOpacity = this.props.darkOpacity
    const dark = this.elements.dark

    dark.style.display = 'block'
    setTimeout(() => {
      dark.style.opacity = darkOpacity
    }, 10)
  }

  /**
   * Hides dark and fullscreen background.
   */
  hideDark () {
    const dark = this.elements.dark

    dark.style.opacity = '0'
    setTimeout(() => {
      dark.style.display = 'none'
    }, 10)
  }

  /**
    * On dark click event.
    * Hides navigation drawer.
    */
  onDarkClick = () => {
    const multiIcon = (window.panel || window.blog).getMultiIcon()

    multiIcon.changeToDefault()
    this.hide()
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

  render () {
    const userInfo = this.props.userInfo

    const headerClassName = `navigation-drawer-header ${(userInfo) ? '' : 'logo'}`

    const avatarStyle = userInfo && {
      backgroundImage: 'url(' + userInfo.avatar + ')',
      display: (userInfo.avatar == null) ? 'none' : 'block'
    }

    return (
      <div>
        <div className='navigation-drawer' ref={(e) => this.elements.container = e}>
          <div className={headerClassName}>
            <div className='navigation-drawer-header-avatar' style={avatarStyle} />
            <div className='navigation-drawer-header-username'>
              {userInfo && userInfo.username}
            </div>
            <div className='navigation-drawer-header-email'>
              {userInfo && userInfo.email}
            </div>
          </div>
          <div className='navigation-drawer-content'>
            {
              this.props.items.map((item, key) => {
                return <NavigationDrawerItem data={item} key={key} />
              })
            }
            {
              this.props.children
            }
          </div>
        </div>
        <div className='dark' ref={(e) => this.elements.dark = e} onClick={this.onDarkClick} />
      </div>
    )
  }

  componentDidMount () {
    window.addEventListener('resize', this.onWindowResize)
  }
}

NavigationDrawer.defaultProps = {
  persistentWidth: 240,
  temporaryWidth: 260,
  darkOpacity: 0.7
}
