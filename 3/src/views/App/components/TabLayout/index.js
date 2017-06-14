import Component from '../../../../helpers/Component'

import Url from '../../../../helpers/Url'

import Tab from './components/Tab'

export default class TabLayout extends Component {
  beforeRender () {
    this.tabs = []
    this.lastSelectedIndex = -1
    this.lastSelectedIndex2 = -1
    this.selectedIndex = -1
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
    const root = this.getRoot()

    for (var i = 0; i < tabs.length; i++) {
      const tab = tabs[i]
      const element = (
        <Tab getTabLayout={this.getTabLayout} page={tab.page} url={tab.url} onSelect={tab.onSelect} onDeselect={tab.onDeselect}>
          {
            tab.title
          }
        </Tab>
      )

      this.renderComponents(element, root)
    }

    let urlTab = Url.getUrlParameter('tab')

    if (urlTab != null) urlTab = urlTab.toLowerCase()

    if (urlTab !== this.tabs[1].props.url && urlTab !== this.tabs[2].props.url && urlTab !== this.tabs[3].props.url) {
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
    const app = window.app

    if (!app.isLoading) {
      for (var i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i] !== tab && this.tabs[i].selected) {
          this.tabs[i].deselect()
        }
      }

      tab.select()
    }
  }

  render () {
    return (
      <div className='tab-layout' ref='root'>
        <div className='indicator' ref='indicator' />
      </div>
    )
  }
}
