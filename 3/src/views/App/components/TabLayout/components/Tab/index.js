import React from 'react'
import {Motion, spring} from 'react-motion'

export default class Tab extends React.Component {
  constructor () {
    super()
    this.state = {
      color: '#fff'
    }
    this.selected = false
  }

  componentDidMount () {
    var tabLayout = this.props.getTabLayout()
    this.setState({color: tabLayout.props.defaultColor})
    tabLayout.tabs.push(this)

    setTimeout(function () {
      tabLayout.selectTab(tabLayout.tabs[0])
    }, 1)
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
    this.setState({color: tabLayout.props.defaultColor})
    tabLayout.lastSelectedIndex = tabLayout.tabs.indexOf(this)
    var page = this.getPage()

    this.selected = false
  }

  /**
   * Selects tab.
   */
  select = () => {
    this.selected = true
    var tabLayout = this.props.getTabLayout()
    this.setState({color: tabLayout.props.color})
    tabLayout.setState({
      dividerWidth: spring(this.refs.tab.offsetWidth, tabLayoutAnimationData.tabsDividerSpring),
      dividerLeft: spring(this.refs.tab.offsetLeft, tabLayoutAnimationData.tabsDividerSpring)
    })
    var page = this.getPage()

    page.isVisible = true
    page.setState({display: 'block'})

    if (page != null) {
      if (tabLayout.lastSelectedIndex === -1 || tabLayout.lastSelectedIndex2 === tabLayout.tabs.indexOf(this)) {
        return
      }
      tabLayout.lastSelectedIndex2 = tabLayout.tabs.indexOf(this)

      var lastTab = tabLayout.tabs[tabLayout.lastSelectedIndex]
      if (tabLayout.tabs.indexOf(this) > tabLayout.lastSelectedIndex) {
        page.setState({left: window.innerWidth}, function () {
          page.setState({left: spring(0, tabLayoutAnimationData.pageMoveSpring)})
        })
        if (lastTab.getPage() != null) {
          lastTab.getPage().setState({left: spring(-window.innerWidth, tabLayoutAnimationData.pageMoveSpring)})
          lastTab.getPage().isVisible = false
        }
      } else {
        page.setState({left: -window.innerWidth}, function () {
          page.setState({left: spring(0, tabLayoutAnimationData.pageMoveSpring)})
        })
        if (lastTab.getPage() != null) {
          lastTab.getPage().setState({left: spring(window.innerWidth, tabLayoutAnimationData.pageMoveSpring)})
          lastTab.getPage().isVisible = false
        }
      }
    }
    if (this.props.data.onSelect !== undefined) {
      this.props.data.onSelect()
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
    // Styles.
    const tabTitleStyle = {
      color: this.state.color
    }

    return (
      <div ref='tab' onClick={this.onClick} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart} style={this.props.style} className='tab ripple'>
        <div style={tabTitleStyle} className='tab-title'>
          {this.props.data.title}
        </div>
      </div>
    )
  }
}
