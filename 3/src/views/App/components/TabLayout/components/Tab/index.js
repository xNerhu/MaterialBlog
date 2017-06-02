import React from 'react'

import Url from '../../../../../../helpers/Url'

export default class Tab extends React.Component {
  constructor () {
    super()

    this.selected = false
  }

  componentDidMount () {
    var self = this
    var tabLayout = this.props.getTabLayout()
    this.setState({color: tabLayout.props.defaultColor})
    tabLayout.tabs.push(this)

    setTimeout(function () {
      const urlTab = Url.getUrlParameter('tab')
      var tabIndex = 0
      if (urlTab !== '') {
        for (var i = 0; i < self.props.allTabsData.length; i++) {
          if (self.props.allTabsData[i].url === urlTab) {
            tabIndex = i
            break
          }
        }
      }
      tabLayout.selectTab(tabLayout.tabs[tabIndex])
    }, 10)
  }

  /**
   * On click event.
   */
  onClick = () => {
    this.props.getTabLayout().selectTab(this)
  }

  /**
   * On mouse down event.
   * @param {object} event data
   */
  onMouseDown = (e) => {
    if (!this.props.getApp().blockMouseDownEvent) {
      var ripple = Ripple.createRipple(this.refs.tab, {
        backgroundColor: '#fff'
      }, createRippleMouse(this.refs.tab, e, 1.5))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On touch event (on mobile).
   * @param {Object} event data
   */
  onTouchStart = (e) => {
    var ripple = Ripple.createRipple(this.refs.tab, {
      backgroundColor: '#fff'
    }, createRippleMouse(this.refs.tab, e, 1.5, true))
    Ripple.makeRipple(ripple)
    this.props.getApp().blockMouseDownEvent = true
  }

  /**
   * Deselects tab.
   */
  deselect = () => {
    var tabLayout = this.props.getTabLayout()

    this.refs.title.style.color = tabLayout.props.defaultColor
    tabLayout.lastSelectedIndex = tabLayout.tabs.indexOf(this)

    if (typeof this.props.data.onDeselect === 'function') {
      this.props.data.onDeselect()
    }

    this.selected = false
  }

  /**
   * Selects tab.
   */
  select = () => {
    if (typeof this.props.data.onSelect === 'function') {
      this.props.data.onSelect()
    }
    this.selected = true

    const tabLayout = this.props.getTabLayout()

    this.refs.title.style.color = tabLayout.props.color

    const indicator = tabLayout.refs.indicator
    indicator.style.width = this.refs.tab.offsetWidth + 'px'
    indicator.style.left = this.refs.tab.offsetLeft + 'px'

    const page = this.getPage()
    const root = page.getRoot()

    root.style.display = 'block'
    setTimeout(function () {
      root.style.left = '0%'
    }, 10)

    if (page != null) {
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
          }, 250)
        }
      } else {
        lastPageRoot.style.left = '100%'
        setTimeout(function () {
          lastPageRoot.style.display = 'none'
        }, 250)
      }
    }
  }

  /**
   * Gets page.
   * @return {DomElement}
   */
  getPage = () => {
    return this.props.data.page
  }

  render () {
    return (
      <div ref='tab' onClick={this.onClick} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart} style={this.props.style} className='tab ripple'>
        <div ref='title' className='tab-title'>
          {this.props.data.title}
        </div>
      </div>
    )
  }
}
