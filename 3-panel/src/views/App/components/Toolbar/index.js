import Component from '../../../../helpers/Component'

import MultiIcon from './components/MultiIcon'

export default class Toolbar extends Component {
  beforeRender () {
    this.touched = false
    this.items = []
    this.hiddenItems = []

    this.actionIconRippleStyle = {
      backgroundColor: '#000',
      opacity: 0.2
    }
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * On item mouse down event.
   * Makes ripple.
   * @param {Event}
   * @param {DOMElement} element
   */
  onItemMouseDown = (e, target) => {
    if (!this.touched) {
      let ripple = Ripple.createRipple(target, this.actionIconRippleStyle, createRippleCenter(target, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On item touch start event.
   * Makes ripple.
   * @param {Event}
   * @param {DOMElement} element
   */
  onItemTouchStart = (e, target) => {
    let ripple = Ripple.createRipple(target, this.actionIconRippleStyle, createRippleCenter(target, 14, 0.4, true))
    Ripple.makeRipple(ripple)
    this.touched = true
  }

  /**
   * Sets items.
   * @param {Object} items
   */
  setItems = (items) => {
    const self = this
    let first = true

    for (var i = 0; i < items.length; i++) {
      const item = items[i]
      const type = item.type
      const subType = item.subType
      const position = item.position
      let style = item.style
      const image = item.image
      const onClick = item.onClick

      if (type === 'Icon') {
        if (image && subType !== 'Menu' && subType !== 'Search') {
          style = Object.assign(
            {
              backgroundImage: 'url(' + image + ')'
            }, style
          )
        }

        let className = 'toolbar-icon ripple-icon toolbar-' + position.toLowerCase()

        if (first) {
          if (position === 'Right') {
            className += ' toolbar-right-first'
          }
        }

        const element = document.createElement('div')
        const id = item.id
        const isOnClickEvent = (typeof onClick === 'function')
        if (isOnClickEvent) element.addEventListener('click', onClick)

        element.className = className

        if (id) element.id = id
        if (style) element.setStyle(style)

        if (subType === 'MultiIcon') {
          const multiIcon = (
            <MultiIcon ref='multiIcon' />
          )

          this.renderComponents(multiIcon, element)
        }

        element.addEventListener('mousedown', function (e) {
          self.onItemMouseDown(e, element)
        })
        element.addEventListener('touchstart', function (e) {
          self.onItemTouchStart(e, element)
        })

        this.items.push(element)

        this.elements.content.appendChild(element)
      } else if (type === 'Title') {
        const element = (
          <div className='toolbar-title' ref='title' style={style}>
            {item.title}
          </div>
        )

        this.renderComponents(element, this.elements.content)
        this.items.push(this.elements.title)
      }
    }
  }

  /**
   * Gets toolbar.
   * @return {Toolbar}
   */
  getToolbar = () => {
    return this
  }

  /**
   * Gets mutlti icon.
   * @return {MultiIcon}
   */
  getMultiIcon = () => {
    return this.elements.multiIcon
  }

  /**
   * Hides items.
   * @param {Boolean} hide multi icon
   * @param {Boolean} hide search icon
   */
  hideItems = (multiIcon = false, search = true, title = true) => {
    /*this.hiddenItems = []

    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      const id = item.id
      const classList = item.classList

      if (multiIcon && id === 'toolbar-icon-multi-icon' || search && id === 'toolbar-icon-search' || classList.contains('toolbar-title') && title) {
        item.style.top = '96px'
        this.hiddenItems.push(item)
      }
    }*/
  }

  /**
   * Shows hidden items.
   */
  showItems = () => {
    for (var i = 0; i < this.hiddenItems.length; i++) {
      const item = this.hiddenItems[i]
      const top = (item === this.searchIconParent) ? '0px' : '50%'

      item.style.top = top
    }
  }

  /**
   * Show or hides tabs.
   * @param {Boolean}
   */
  toggleTabs = (flag) => {
    const app = window.app
    const tabLayout = app.elements.tabLayout
    const tabPages = app.elements.tabPages
    const indicator = tabLayout.elements.indicator
    const root = this.getRoot()

    root.style.height = (!flag) ? '64px' : '128px'
    tabPages.style.height = 'calc(100% - ' + root.style.height + ')'
    indicator.style.opacity = (!flag) ? '0' : '1'
  }

  /**
   * Sets title.
   * @param {String} title.
   */
  setTitle = (str) => {
    this.elements.title.innerHTML = str
  }

  render () {
    return (
      <div className='toolbar toolbar-shadow' ref='root'>
        <div className='toolbar-content' ref='content' />
      </div>
    )
  }
}
