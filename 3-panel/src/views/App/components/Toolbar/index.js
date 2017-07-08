import Component from '../../../../helpers/Component'

import MultiIcon from './components/MultiIcon'

import MaterialButton from '../../../../imports/materialdesign/components/MaterialButton'

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
      const onMouseEnter = item.onMouseEnter
      const onMouseLeave = item.onMouseLeave

      if (type === 'Button') {
        let className = 'toolbar-button'

        if (item.className != null) {
          className += ' ' + item.className
        }

        const element = (
          <MaterialButton ref={item.ref} className={className} shadow={false} text={item.text} onClick={onClick} />
        )

        this.renderComponents(element, this.elements.content)
      } else if (type === 'Icon') {
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
            first = false
          }
        }

        const element = document.createElement('div')

        if (item.ref != null) {
          this.elements[item.ref] = element
        }

        if (typeof onClick === 'function') element.addEventListener('click', onClick)
        if (typeof onMouseEnter === 'function') element.addEventListener('mouseenter', onMouseEnter)
        if (typeof onMouseLeave === 'function') element.addEventListener('mouseleave', onMouseLeave)

        element.className = className
        if (item.className != null) element.classList.add(item.className)

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
   * Gets view icon.
   * @return {DOMElement}
   */
  getViewIcon = () => {
    return this.elements.viewIcon
  }

  /**
   * Hides items.
   * @param {Boolean} hide multi icon
   * @param {Boolean} hide search icon
   */
  hideItems = (multiIcon = false, title = true) => {
    this.hiddenItems = []

    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      const classList = item.classList

      const isMultiIcon = classList.contains('toolbar-icon-multi-icon')
      const isTitle = classList.contains('toolbar-title')
      const isSaveButton = classList.contains('toolbar-button-save')

      if (multiIcon && isMultiIcon || title && isTitle || !isMultiIcon && !isTitle && !isSaveButton) {
        this.hideElement(item)
      }
    }
  }

  /**
   * Hides element.
   */
  hideElement = (element) => {
    element.style.top = '96px'
    this.hiddenItems.push(element)
  }

  /**
   * Shows hidden items.
   */
  showItems = () => {
    for (var i = 0; i < this.hiddenItems.length; i++) {
      const item = this.hiddenItems[i]
      this.showItem(item)
    }
  }

  showItem = (element) => {
    const top = '0px'

    element.style.top = top
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
