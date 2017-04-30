import React from 'react'
import ReactDOM from 'react-dom'
import {TweenMax, CSSPlugin} from 'gsap'

import Toolbar from './components/Toolbar'
import TabLayout from './components/TabLayout'
import Tab from './components/TabLayout/components/Tab'
import NavigationDrawer from './components/NavigationDrawer'

import PostsTab from '../Tabs/Posts'
import GalleryTab from '../Tabs/Gallery'
import AboutClassTab from '../Tabs/AboutClass'
import LessonPlanTab from '../Tabs/LessonPlan'

import Tooltip from '../../imports/materialdesign/components/Tooltip'
import Preloader from '../../imports/materialdesign/components/Preloader'

import Url from '../../helpers/Url'

export default class App extends React.Component {
  constructor () {
    super()

    this.state = ({
      toolbarItems: [],
      tabLayoutLeft: 48,
      contentWidth: '100%',
      tabLayoutHidden: false,
      menuOpacity: 1,
      postFullScreen: false,
      dataPreloaderVisible: false,
      tooltipsData: {
        like: {
          text: '...',
          list: '...'
        },
        category: {
          date: '...',
          picturesCount: '...'
        }
      }
    })

    this.accountInfo = {
      userID: 1,
      userName: 'Mikołaj Palkiewicz'
    }
  }

  componentDidMount () {
    var self = this
    const navigationDrawer = this.refs.navigationDrawer

    // Events.
    function onClickMenu (event) {
      if (!self.refs.postsTab.state.isFullScreen && !self.refs.galleryTab.state.picturesVisible) {
        if (!navigationDrawer.state.toggled) {
          self.getToolBar().refs.menuIcon.changeToExit()
          navigationDrawer.show()
        } else {
          self.getToolBar().refs.menuIcon.changeToDefault()
          navigationDrawer.hide()
        }
      } else {
        if (self.refs.postsTab.state.isFullScreen) self.refs.postsTab.exitFullScreenPost()
        if (self.refs.galleryTab.state.picturesVisible) self.refs.galleryTab.hidePictures()
      }
    }

    // On search icon click event.
    function onClickSearch () {

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
          style: {color: '#fff'}
        },
        {
          type: 'Icon',
          position: 'Right',
          image: 'src/images/Toolbar/search.png',
          onClick: onClickSearch,
          style: {opacity: 1}
        }
      ]
    })

    // Set tabs.
    this.refs.tabLayout.setState({
      tabs: [
        {
          title: 'POSTY',
          page: this.refs.postsTab
        },
        {
          title: 'GALERIA',
          page: this.refs.galleryTab
        },
        {
          title: 'O KLASIE',
          page: this.refs.aboutClassTab
        },
        {
          title: 'PLAN LEKCJI',
          page: this.refs.lessonPlanTab
        }
      ]
    })

    // Timer, because there is react bug with states so must wait 1 sec.
    // if in url is 'post' parametr eg. http://localhost:1811/?post=1 will be displayed post in full screen version.
    setTimeout(function () {
      var postsTab = self.getPostsTab()
      const urlPost = Url.getUrlParameter('post')
      const postID = isNaN(parseInt(urlPost)) ? false : parseInt(urlPost) // Check if 'post' parametr is int.
      if (postID !== false) {
        var postData = postsTab.getPost(postID)
        postsTab.setState({fullScreenPost: postData})
        postsTab.showFullScreenPost(postID)
      }
    }, 1)
  }

  /**
   * Gets app.
   * @return {App}
   */
  getApp = () => {
    return this
  }

  /**
   * Gets account info.
   * @return {Object}
   */
  getAccountInfo = () => {
    return this.accountInfo
  }

  /**
   * Gets toolbar.
   * @return {Toolbar}
   */
  getToolBar = () => {
    return this.refs.toolbar
  }

  /**
   * Gets tablayout.
   * @return {TabLayout}
   */
  getTabLayout = () => {
    return this.refs.tabLayout
  }

  /**
   * Gets posts tab.
   * @return {PostsTab}
   */
  getPostsTab = () => {
    return this.refs.postsTab
  }

  /**
   * Gets gallery tab.
   * @return {GalleryTab}
   */
  getGalleryTab = () => {
    return this.refs.galleryTab
  }

  render () {
    // Styles.
    const tabLayoutStyle = {
      left: this.state.tabLayoutLeft,
      visibility: (!this.state.tabLayoutHidden) ? 'visible' : 'hidden',
      opacity: (!this.state.tabLayoutHidden) ? 1 : 0,
      width: 'calc(100% - ' + this.state.tabLayoutLeft + 'px)'
    }

    const appContentStyle = {
      width: this.state.contentWidth
    }

    const tabPagesStyle = {
      height: 'calc(100% - ' + ((!this.state.tabLayoutHidden) ? '136px' : '64px') + ')'
    }

    const dataPreloaderStyle = {
      height: 54,
      width: 54,
      visibility: (this.state.dataPreloaderVisible) ? 'visible' : 'hidden'
    }

    // Tooltips contents.
    const tooltipLikeText = this.state.tooltipsData.like.text // Like text is when you don't likes post: Like it! or you have already like post: Don't like it!.
    const tooltipLikeList = this.state.tooltipsData.like.list // Likes list is a list of people who liked post.
    const tooltipShowComments = 'Pokaż komentarze' // Show comments.
    const tooltipHideComments = 'Ukryj komentarze' // Hide comments.
    const tooltipCategoryInfo = 'Data utworzenia: ' + this.state.tooltipsData.category.date + '\n Ilość zdjęć: ' + this.state.tooltipsData.category.picturesCount // Category info: create category date and number of pictures.

    return (
      <div>
        <div className='app-content' ref='appContent' style={appContentStyle}>
          <Toolbar ref='toolbar' items={this.state.toolbarItems} getApp={this.getApp}>
            <TabLayout ref='tabLayout' className='tab-layout-1' style={tabLayoutStyle} />
          </Toolbar>
          <div className='tab-pages' style={tabPagesStyle}>
            <PostsTab ref='postsTab' getApp={this.getApp} />
            <GalleryTab ref='galleryTab' getApp={this.getApp} />
            <AboutClassTab ref='aboutClassTab' />
            <LessonPlanTab ref='lessonPlanTab' />
          </div>
        </div>
        <Preloader ref='preloader' className='data-preloader' style={dataPreloaderStyle} strokeColor='#2196f3' strokeWidth={4} />
        <NavigationDrawer ref='navigationDrawer' getApp={this.getApp} />
        <Tooltip ref='tooltipLike'>{tooltipLikeText}</Tooltip>
        <Tooltip ref='tooltipLikesList'>{tooltipLikeList}</Tooltip>
        <Tooltip ref='tooltipShowComments'>{tooltipShowComments}</Tooltip>
        <Tooltip ref='tooltipHideComments'>{tooltipHideComments}</Tooltip>
        <Tooltip ref='tooltipCategoryInfo'>{tooltipCategoryInfo}</Tooltip>
      </div>
    )
  }
}
App.defaultProps = {
  toolbarTitle: 'Blog klasy 3B'
}
