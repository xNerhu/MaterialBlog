import React from 'react'
import ReactDOM from 'react-dom'

import NavigationDrawer from './components/NavigationDrawer'

import Toolbar from './components/Toolbar'

export default class App extends React.Component {
  constructor () {
    super()

    this.state = ({
      toolbarItems: [],
      toolbarShadow: true,
      tabLayoutLeft: 48,
      contentWidth: '100%',
      tabLayoutHidden: false
    })

    this.accountInfo = {
      userID: 1,
      userName: 'Mikołaj Palkiewicz',
      avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281'
    }

    this.elementsToChange = []
  }

  componentDidMount () {
    const self = this
    const navigationDrawer = this.getNavigationDrawer()
    const toolbar = this.getToolBar()

    // Events.
    function onClickMenu (e) {
      const menuIcon = toolbar.refs.menuIcon

      if (!navigationDrawer.toggled) {
        navigationDrawer.show()
        menuIcon.changeToExit()
      } else {
        navigationDrawer.hide()
        menuIcon.changeToDefault()
      }
    }

    // Set toolbar items.
    this.setState({
      toolbarItems: [
        {
          type: 'Icon',
          subType: 'Menu',
          position: 'Left',
          image: 'src/images/Toolbar/menu.png',
          onClick: onClickMenu,
          id: 'toolbar-icon-menu',
          style: {
            width: 24,
            height: 18,
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)'
          }
        },
        {
          type: 'Title',
          title: this.props.toolbarTitle,
          id: 'toolbar-title',
          style: {
            color: '#fff'
          }
        }
      ]
    })
  }

  /**
   * Gets app.
   * @return {App}
   */
  getApp = () => {
    return this
  }

  /**
   * Gets toolbar.
   * @return {Toolbar}
   */
  getToolBar = () => {
    return this.refs.toolbar
  }

  /**
   * Gets navigation drawer.
   * @return {NavigationDrawer}
   */
  getNavigationDrawer = () => {
    return this.refs.navigationDrawer
  }

  /**
   * Gets app content.
   * @return {DOMElement}
   */
  getAppContent = () => {
    return this.refs.appContent
  }

  render () {
    return (
      <div>
        <div className='app-content' ref='appContent'>
          <Toolbar ref='toolbar' items={this.state.toolbarItems} getApp={this.getApp} />
        </div>
        <NavigationDrawer ref='navigationDrawer' getApp={this.getApp} />
      </div>
    )
  }
}

App.defaultProps = {
  toolbarTitle: 'Blog klasy 3B',
  toolbarBackgroundColor: '#2196F3'
}
