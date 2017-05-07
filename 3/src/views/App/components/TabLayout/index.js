import React from 'react'
import {Motion, spring} from 'react-motion'
import ReactDOM from 'react-dom'
import Tab from './components/Tab'

export default class TabLayout extends React.Component {
  constructor () {
    super()

    this.state = {
      tabs: [],
      width: 0,
      dividerLeft: 0,
      dividerWidth: 0
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
    if (this.props.getApp().canSelectTab) {
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
      window.history.pushState('', '', '?tab=' + tab.props.data.url)
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
        <Motion style={{
          left: this.state.dividerLeft,
          width: this.state.dividerWidth
        }}>
          {value => <div className='indicator' style={{
            backgroundColor: this.props.indicatorColor,
            width: value.width,
            left: value.left
          }} />}
        </Motion>
        {this.props.children}
      </div>
    )
  }
}

TabLayout.defaultProps = {
  color: '#fff',
  defaultColor: 'rgba(255, 255, 255, 0.54)',
  indicatorColor: '#fff'
}
