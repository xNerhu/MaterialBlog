import Component from '../../../../../../helpers/Component'

import Url from '../../../../../../helpers/Url'

export default class Tab extends Component {
  beforeRender () {
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
    this.props.getTabLayout().selectTab(this)
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

    const select = this.props.onSelect
    if (typeof select === 'function') select()

    const tabLayout = this.props.getTabLayout()

    this.elements.title.style.opacity = '1'

    const indicator = tabLayout.elements.indicator
    indicator.style.width = this.elements.root.offsetWidth + 'px'
    indicator.style.left = this.elements.root.offsetLeft - 48 + 'px'

    const page = this.props.page
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
      const lastPageRoot = lastTab.props.page.getRoot()

      if (tabLayout.tabs.indexOf(this) > tabLayout.lastSelectedIndex) {
        if (lastPageRoot != null) {
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
    let url = '?tab=' + this.props.url
    if (action != null) url += '&action=' + action

    window.history.pushState('', '', url)
  }

  /**
   * Deselects tab.
   */
  deselect = () => {
    const tabLayout = this.props.getTabLayout()

    this.elements.title.style.opacity = this.defaultOpacity
    tabLayout.lastSelectedIndex = tabLayout.tabs.indexOf(this)

    const deselect = this.props.onDeselect

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

  render () {
    return (
      <div className='tab ripple' ref='root' onClick={this.onClick} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart}>
        <div className='tab-title' ref='title'>
          {this.props.children}
        </div>
      </div>
    )
  }

  afterRender () {
    const self = this
    const tabLayout = this.props.getTabLayout()

    tabLayout.tabs.push(this)

    let urlTab = Url.getUrlParameter('tab')
    const url = this.props.url

    if (urlTab != null && urlTab.toLowerCase() === url) {
      setTimeout(function () {
        self.select()
      }, 10)
    }
  }
}
