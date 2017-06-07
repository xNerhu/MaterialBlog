import Url from '../../../../helpers/Url'

import Tab from './components/Tab'

export default class TabLayout {
  constructor (parent) {
    this.elements = {}

    this.tabs = []
    this.lastSelectedIndex = -1
    this.lastSelectedIndex2 = -1
    this.selectedIndex = -1

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
   * Sets tabs.
   * @param {Object} tabs.
   */
  setTabs = (tabs) => {
    const self = this

    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i]
      const element = new Tab()

      element.getTabLayout = this.getTabLayout()
      element.page = tab.page
      element.url = tab.url
      element.onSelect = tab.onSelect
      element.onDeselect = tab.onDeselect
      element.render(tab.title)

      this.elements.root.appendChild(element.getRoot())
    }

    const urlTab = Url.getUrlParameter('tab')

    if (urlTab === undefined) {
      setTimeout(function () {
        self.tabs[0].select()
      }, 10)
    }
  }

  /**
   * Gets tab layout.
   * @return {TabLayout}
   */
  getTabLayout = () => {
    return this
  }

  /**
   * Selects and deselects tabs.
   */
  selectTab = (tab) => {
    for (var i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i] !== tab && this.tabs[i].selected) {
        this.tabs[i].deselect()
      }
    }

    tab.select()
  }

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'tab-layout'

    this.elements.indicator = document.createElement('div')
    this.elements.indicator.className = 'indicator'

    this.elements.root.appendChild(this.elements.indicator)
  }
}
