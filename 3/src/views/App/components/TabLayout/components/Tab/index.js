import Url from '../../../../../../helpers/Url'

export default class Tab {
  constructor () {
    this.elements = {}

    this.selected = false
    this.defaultOpacity = 0.54

    this.touched = false
    this.ripple = {
      backgroundColor: '#fff',
      opacity: 0.2
    }
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * On tab click event.
   * @param {Event}
   */
  onClick = (e) => {
    this.getTabLayout.selectTab(this)
  }

  /**
   * On tab mouse down event.
   * Makes ripple.
   * @param {Event}
   */
  onMouseDown = (e) => {
    if (!this.touched) {
      let ripple = Ripple.createRipple(this.elements.root, this.ripple, createRippleMouse(this.elements.root, e, 1.5))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On tab touch start event.
   * Makes ripple.
   * @param {Event}
   */
  onTouchStart = (e) => {
    let ripple = Ripple.createRipple(this.elements.root, this.ripple, createRippleMouse(this.elements.root, e, 1.5, true))
    Ripple.makeRipple(ripple)
    this.touched = true
  }

  /**
   * Selects tab.
   */
  select = () => {
    this.selected = true

    const select = this.onSelect
    if (typeof select === 'function') select()

    const tabLayout = this.getTabLayout

    this.elements.title.style.opacity = '1'

    const indicator = tabLayout.elements.indicator
    indicator.style.width = this.elements.root.offsetWidth + 'px'
    indicator.style.left = this.elements.root.offsetLeft + 'px'

    const page = this.getPage()
    const pageRoot = page.getRoot()

    if (page != null) {
      pageRoot.style.display = 'block'
      setTimeout(function () {
        pageRoot.style.left = '0%'
      }, 10)

      tabLayout.selectedIndex = tabLayout.tabs.indexOf(this)

      if (tabLayout.lastSelectedIndex === -1 || tabLayout.lastSelectedIndex2 === tabLayout.tabs.indexOf(this)) {
        return
      }
      tabLayout.lastSelectedIndex2 = tabLayout.tabs.indexOf(this)

      const lastTab = tabLayout.tabs[tabLayout.lastSelectedIndex]
      const lastPageRoot = lastTab.getPage().getRoot()

      if (tabLayout.tabs.indexOf(this) > tabLayout.lastSelectedIndex) {
        if (lastTab.getPage() != null) {
          lastPageRoot.style.left = '-100%'
          setTimeout(function () {
            lastPageRoot.style.display = 'none'
          }, 150)
        }
      } else {
        lastPageRoot.style.left = '100%'
        setTimeout(function () {
          lastPageRoot.style.display = 'none'
        }, 150)
      }
    }

    const action = Url.getUrlParameter('action')
    const param = (action === undefined) ? '?tab=' + this.url : '?tab=' + this.url + '&action=' + action
    window.history.pushState('', '', param)
  }

  /**
   * Deselects tab.
   */
  deselect = () => {
    const tabLayout = this.getTabLayout

    this.elements.title.style.opacity = this.defaultOpacity
    tabLayout.lastSelectedIndex = tabLayout.tabs.indexOf(this)

    const deselect = this.onDeselect
    if (typeof deselect === 'function') deselect()

    this.selected = false
  }

  /**
   * Gets page.
   * @return {DomElement}
   */
  getPage = () => {
    return this.page
  }

  render = (title = 'TITLE') => {
    const self = this

    this.elements.root = document.createElement('div')
    this.elements.root.className = 'tab ripple'
    this.elements.root.addEventListener('click', this.onClick)
    this.elements.root.addEventListener('mousedown', this.onMouseDown)
    this.elements.root.addEventListener('touchstart', this.onTouchStart)

    this.elements.title = document.createElement('div')
    this.elements.title.className = 'tab-title'
    this.elements.title.innerHTML = title

    this.elements.root.appendChild(this.elements.title)

    this.getTabLayout.tabs.push(this)

    const urlTab = Url.getUrlParameter('tab')
    const url = this.url

    if (urlTab === url) {
      setTimeout(function () {
        self.select()
      }, 10)
    }
  }
}
