import Component from 'inferno-component'

import Tab from './components/Tab'

export default class TabLayout extends Component {
  constructor () {
    super()

    this.selectedTabIndex = -1
    this.lastSelectedTabIndex = -1
    this.canSelectTab = true
    this.loadedTabs = []
    this.tabs = []
    this.isLoading = false

    this.state = {
      indicatorWidth: 90,
      indicatorLeft: 58
    }
  }

  render () {
    const indicatorStyle = {
      width: this.state.indicatorWidth + 'px',
      left: this.state.indicatorLeft + 'px'
    }

    let index = 0

    return (
      <div className='tab-layout'>
        {
          this.props.tabs.map((data, key) => {
            index++
            return <Tab data={data} tabLayout={this} index={index - 1} />
          })
        }
        <div className='indicator' style={indicatorStyle} />
      </div>
    )
  }
}
