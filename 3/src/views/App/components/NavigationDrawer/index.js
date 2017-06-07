import NavigationDrawerItem from './components/NavigationDrawerItem'

export default class NavigationDrawer {
  constructor () {
    this.persistent = true
    this.toggled = false

    this.props = {
      persistentWidth: 240,
      temporaryWidth: 260,
      darkOpacity: 0.7
    }

    this.elements = {}

    this.render()
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
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

  setItems = (items) => {
    //NavigationDrawerItemthis.elements.
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const text = item.text
      const className = item.className
      const onClick = item.onClick

      const element = new NavigationDrawerItem()

      element.setText(text)
      if (className !== undefined) element.getRoot().classList.add(className)
      if (typeof onClick === 'function') element.props.onClick = onClick

      this.elements.content.appendChild(element.getRoot())
    }
  }

  render = () => {
    this.elements.root = document.createElement('div')

    // CONTAINER
    this.elements.container = document.createElement('div')
    this.elements.container.className = 'navigation-drawer'

    // HEADER
    this.elements.header = document.createElement('div')
    this.elements.header.className = 'navigation-drawer-header'

    // HEADER AVATAR
    this.elements.headerAvatar = document.createElement('div')
    this.elements.headerAvatar.className = 'navigation-drawer-header'
    this.elements.header.appendChild(this.elements.headerAvatar)

    // HEADER USERNAME
    this.elements.headerUserName = document.createElement('div')
    this.elements.headerUserName.className = 'navigation-drawer-header-username'
    this.elements.header.appendChild(this.elements.headerUserName)

    // HEADER EMAIL
    this.elements.headerEmail = document.createElement('div')
    this.elements.headerEmail.className = 'navigation-drawer-header-email'
    this.elements.header.appendChild(this.elements.headerEmail)

    // CONTENT
    this.elements.content = document.createElement('div')
    this.elements.content.className = 'navigation-drawer-content'

    // DARK
    this.elements.dark = document.createElement('div')
    this.elements.dark.className = 'dark'
    this.elements.dark.addEventListener('click', this.onDarkClick)

    // ADD CHILDRENS
    this.elements.container.appendChild(this.elements.header)
    this.elements.container.appendChild(this.elements.content)

    this.elements.root.appendChild(this.elements.container)
    this.elements.root.appendChild(this.elements.dark)

    window.addEventListener('resize', this.onWindowResize)
  }
}
