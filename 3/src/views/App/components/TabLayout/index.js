import React from 'react'
import ReactDOM from 'react-dom'

import Url from '../../../../helpers/Url'

import Tab from './components/Tab'

export default class TabLayout extends React.Component {
  constructor () {
    super()

    this.state = {
      tabs: []
    }

    this.tabs = []

    this.lastSelectedIndex = -1
    this.lastSelectedIndex2 = -1
    this.selectedIndex = -1
  }

  componentDidMount () {
    this.setState({width: this.refs.tabLayout.offsetWidth})

    if (this.props.onSelect != null) {
      ReactDOM.findDOMNode(this).addEventListener('selected', this.props.onSelect)
    }
  }

  /**
   * Selects and deselects tabs.
   */
  selectTab = (tab) => {
    const app = this.props.getApp()

    if (app.canSelectTab) {
      for (var i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i] !== tab && this.tabs[i].selected) {
          this.tabs[i].deselect()
        }
      }
      tab.select()
      var event = document.createEvent('Event')
      event.initEvent('selected', true, true)
      event.page = tab.props.data.page
      ReactDOM.findDOMNode(this).dispatchEvent(event)
      this.selectedIndex = this.tabs.indexOf(tab)
      const action = Url.getUrlParameter('action')
      const param = (action === undefined) ? '?tab=' + tab.props.data.url : '?tab=' + tab.props.data.url + '&action=' + action
      window.history.pushState('', '', param)

      app.canSelectTab = false

      setTimeout(function () {
        app.canSelectTab = true
      }, 250)
    }
  }

  /**
   * Gets tab layout.
   * @return {TabLayout}
   */
  getTabLayout = () => {
    return this
  }

  render () {
    return (
      <div ref='tabLayout' style={this.props.style} className={'tab-layout ' + this.props.className} onMouseDown={this.onMouseDown}>
        {this.state.tabs.map((object, i) => {
          return <Tab getTabLayout={this.getTabLayout} key={i} data={object} allTabsData={this.state.tabs} getApp={this.props.getApp} />
        })}
        <div className='indicator' ref='indicator' />
        {this.props.children}
      </div>
    )
  }
}

TabLayout.defaultProps = {
  color: '#fff',
  defaultColor: 'rgba(255, 255, 255, 0.54)'
}
