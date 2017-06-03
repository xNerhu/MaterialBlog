import React from 'react'
import ReactDOM from 'react-dom'

import NavigationDrawer from './components/NavigationDrawer'
import Toolbar from './components/Toolbar'

import Posts from '../Pages/Posts'
import Gallery from '../Pages/Gallery'
import AboutClass from '../Pages/AboutClass'

import Preloader from '../../imports/materialdesign/components/Preloader'

import Url from '../../helpers/Url'

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

    this.selected = {
      posts: true,
      gallery: false,
      aboutClass: false
    }
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
          title: 'Posty',
          id: 'toolbar-title',
          style: {
            color: '#fff'
          }
        }
      ]
    })

    setTimeout(function () {
      const pageParameter = Url.getUrlParameter('page')
      const page = self.getPage(pageParameter)

      if (page) {
        self.selectPage(page)
      } else {
        self.selectPage(self.getPostsPage())
      }
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
   * Sets toolbar title.
   * @param {String} title.
   */
  setToolBarTitle = (title) => {
    const items = this.state.toolbarItems
    var index = 0

    // Get title index.
    for (var i = 0; i < items.length; i++) {
      if (items[i].type === 'Title') {
        index = i
        break
      }
    }

    items[index].title = title

    this.setState({
      toolbarItems: items
    })
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
    const lastPage = this.lastPage
    const root = page.refs.root
    const selected = this.pageWasSelected(page)

    if (lastPage !== null && lastPage !== page) {
      const lastPageRoot = lastPage.refs.root

      lastPageRoot.style.opacity = '0'

      setTimeout(function () {
        lastPageRoot.style.display = 'none'
      }, 300)
    }

    if (lastPage !== page) {
      this.setToolBarTitle(page.props.title)

      this.lastPage = page

      // TODO: Make request
      if (!selected) {
        this.togglePreloader(true)

        this.pageIsLoading = true

        this.setSelectedPage(page)

        setTimeout(function () {
          self.showPage(page)
          self.togglePreloader(false)
          self.pageIsLoading = false
        }, 500)
      } else {
        this.showPage(page)
      }

      const param = '?page=' + page.props.url
      window.history.pushState('', '', param)
    }
  }

  /**
   * Shows page.
   * @param {Object}
   */
  showPage = (page) => {
    const root = page.refs.root

    root.style.display = 'block'

    setTimeout(function () {
      root.style.opacity = '1'
    }, 10)
  }

  /**
   * Gets page from name.
   * @param {String} name of page (from url).
   * @return {Object}
   */
  getPage = (str) => {
    const posts = this.getPostsPage()
    const gallery = this.getGalleryPage()
    const aboutClass = this.getAboutClassPage()

    if (str === posts.props.url) return posts
    else if (str === gallery.props.url) return gallery
    else if (str === aboutClass.props.url) return aboutClass
    else return null
  }

  /**
   * Checks that page wasa selected.
   * @param {Object} page.
   * @return {Boolean} selected.
   */
  pageWasSelected = (page) => {
    const posts = this.getPostsPage()
    const gallery = this.getGalleryPage()
    const aboutClass = this.getAboutClassPage()

    if (page === posts) return this.selected.posts
    else if (page === gallery) return this.selected.gallery
    else if (page === aboutClass) return this.selected.aboutClass
  }

  /**
   * Sets page selected.
   * @param {Boolean}
   */
  setSelectedPage = (page) => {
    const posts = this.getPostsPage()
    const gallery = this.getGalleryPage()
    const aboutClass = this.getAboutClassPage()

    if (page === posts) this.selected.posts = true
    else if (page === gallery) this.selected.gallery = true
    else if (page === aboutClass) this.selected.aboutClass = true
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
