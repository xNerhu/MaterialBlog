import React from 'react'
import ReactDOM from 'react-dom'

import NavigationDrawer from './components/NavigationDrawer'
import Toolbar from './components/Toolbar'

import Posts from '../Pages/Posts'
import Gallery from '../Pages/Gallery'
import AboutClass from '../Pages/AboutClass'

import Preloader from '../../imports/materialdesign/components/Preloader'

export default class App extends React.Component {
  constructor () {
    super()

    this.state = ({
      toolbarItems: [],
      toggledPreloader: false
    })

    this.accountInfo = {
      userID: 1,
      userName: 'Mikołaj Palkiewicz',
      avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281'
    }

    this.elementsToChange = []

    this.lastPage = null
    this.pageIsLoading = false
  }

  componentDidMount () {
    const self = this
    const navigationDrawer = this.getNavigationDrawer()

    // Events.
    function onClickMenu (e) {
      if (!self.pageIsLoading) {
        if (!navigationDrawer.toggled) {
          navigationDrawer.show()
        } else {
          navigationDrawer.hide()
        }
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

    setTimeout(function () {
      self.selectPage(self.refs.posts)
    }, 10)
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

  /**
   * Toggles preloader.
   * @param {Boolean}
   */
  togglePreloader = (flag) => {
    this.setState({
      toggledPreloader: flag
    })
  }

  /**
    * Selects page.
    * @param {DOMElement} page.
    */
  selectPage = (page) => {
    const self = this
    const navigationDrawer = this.getNavigationDrawer()
    const lastPage = this.lastPage
    const root = page.refs.root

    if (lastPage !== null && lastPage !== page) {
      const lastPageRoot = lastPage.refs.root

      lastPageRoot.style.opacity = '0'

      setTimeout(function () {
        lastPageRoot.style.display = 'none'
      }, 300)
    }

    if (lastPage !== page) {
      this.togglePreloader(true)

      this.pageIsLoading = true

      // TODO: Make request
      setTimeout(function () {
        root.style.display = 'block'

        setTimeout(function () {
          root.style.opacity = '1'
        }, 10)

        self.togglePreloader(false)
        self.pageIsLoading = false
      }, 1000)

      this.lastPage = page
    }
  }

  /**
   * Gets posts page.
   * @return {Posts}
   */
  getPostsPage = () => {
    return this.refs.posts
  }

  /**
   * Gets gallery page.
   * @return {Gallery}
   */
  getGalleryPage = () => {
    return this.refs.gallery
  }

  /**
   * Gets about class page.
   * @return {AboutClass}
   */
  getAboutClassPage = () => {
    return this.refs.aboutClass
  }

  render () {
    // Styles.
    const preloaderStyle = {
      display: (!this.state.toggledPreloader) ? 'none' : 'block'
    }

    return (
      <div>
        <div className='app-content' ref='appContent'>
          <Toolbar ref='toolbar' items={this.state.toolbarItems} getApp={this.getApp} />
          <Posts ref='posts' getApp={this.getApp} />
          <Gallery ref='gallery' getApp={this.getApp} />
          <AboutClass ref='aboutClass' getApp={this.getApp} />
        </div>
        <Preloader className='preloader' ref='preloader' style={preloaderStyle} strokeColor='#2196f3' strokeWidth={4} />
        <NavigationDrawer ref='navigationDrawer' getApp={this.getApp} />
      </div>
    )
  }
}

App.defaultProps = {
  toolbarTitle: 'Blog klasy 3B',
  toolbarBackgroundColor: '#2196F3'
}
