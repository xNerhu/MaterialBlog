import Component from 'inferno-component'
import Url from 'url'

import { Link } from 'inferno-router'

export default class Tab extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      selected: false
    }

    this.touched = false
    this.loaded = false
  }

  onClick = (e) => {
    this.select()
  }

  /**
   * On mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onMouseDown = (e) => {
    if (!this.touched) {
      const ripple = Ripple.createRipple(this.elements.root, this.props.rippleStyle, createRippleMouse(this.elements.root, e, 1.5))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On touch start. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onTouchStart = (e) => {
    if (!this.touched) {
      const ripple = Ripple.createRipple(this.elements.root, this.props.rippleStyle, createRippleMouse(this.elements.root, e, 1.5, true))
      Ripple.makeRipple(ripple)
    }

    this.touched = true
  }

  select () {
    const blog = window.blog
    const tabLayout = this.props.tabLayout

    const page = blog.tabs[this.props.index]

    if (tabLayout.selectedTabIndex === this.props.index || !tabLayout.canSelectTab || tabLayout.isLoading) return
    tabLayout.selectedTabIndex = this.props.index

    tabLayout.canSelectTab = false

    this.setState({
      selected: true
    })

    // Select tab
    if (this.props.index < tabLayout.lastSelectedTabIndex) {
      page.setState({
        display: 'none',
        left: -100
      })

      setTimeout(() => {
        page.setState({
          display: 'block'
        })
      }, 1)
    }

    setTimeout(() => {
      page.setState({
        left: 0
      })
    }, 10)

    // Change url
    const postID = Url.parse(window.location.href, true).query.post
    let url = `?tab=${this.props.data.url}`
    if (postID != null && this.props.index === 0) url += `&post=${postID}`

    window.history.pushState('', '', url)

    if (typeof page.load === 'function' && !this.loaded) {
      window.blog.togglePreloader(true)

      setTimeout(() => {
        page.load()
      }, (tabLayout.lastSelectedTabIndex === -1) ? 200 : 1)

      tabLayout.isLoading = true
      this.loaded = true
    }

    // Hide last selected tab
    if (tabLayout.lastSelectedTabIndex >= 0) {
      const lastPage = blog.tabs[tabLayout.lastSelectedTabIndex]
      const lastSelectedTab = tabLayout.tabs[tabLayout.lastSelectedTabIndex]
      const left = (this.props.index > tabLayout.lastSelectedTabIndex) ? -100 : 100

      lastPage.setState({
        left: left
      })

      lastSelectedTab.setState({
        selected: false
      })
    }

    // Move indicator under selected tab
    tabLayout.setState({
      indicatorWidth: this.elements.root.offsetWidth,
      indicatorLeft: this.elements.root.offsetLeft
    })

    tabLayout.lastSelectedTabIndex = this.props.index

    setTimeout(() => {
      tabLayout.canSelectTab = true
    }, 200)
  }

  render () {
    const titleStyle = {
      opacity: !this.state.selected ? 0.79 : 1
    }

    return (
      <div className='tab ripple' ref={(e) => this.elements.root = e} onClick={this.onClick} onMouseDown={this.onMouseDown}>
        <div className='title' style={titleStyle}>
          {this.props.data.title}
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.elements.root.addEventListener('touchstart', this.onTouchStart)
    this.props.tabLayout.tabs.push(this)
  }
}

Tab.defaultProps = {
  rippleStyle: {
    backgroundColor: '#fff',
    opacity: 0.2
  }
}
