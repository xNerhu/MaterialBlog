import React from 'react'
import ReactDOM from 'react-dom'
import {TweenMax, CSSPlugin} from 'gsap'

import LoginDialog from './components/LoginDialog'
import InfoDialog from './components/InfoDialog'
import Toolbar from './components/Toolbar'
import TabLayout from './components/TabLayout'
import Tab from './components/TabLayout/components/Tab'
import NavigationDrawer from './components/NavigationDrawer'

import PostsTab from '../Tabs/Posts'
import GalleryTab from '../Tabs/Gallery'
import AboutClassTab from '../Tabs/AboutClass'
import LessonsPlanTab from '../Tabs/LessonsPlan'

import Tooltip from '../../imports/materialdesign/components/Tooltip'
import Preloader from '../../imports/materialdesign/components/Preloader'

import Url from '../../helpers/Url'
import Cookies from '../../helpers/Cookies'

export default class App extends React.Component {
  constructor () {
    super()

    this.state = ({
      toolbarItems: [],
      toolbarBackgroundColor: '#2196F3',
      toolbarShadow: true,
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
      userName: 'Mikołaj Palkiewicz',
      avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281'
    }

    this.selected = {
      posts: false,
      gallery: false,
      aboutClass: false,
      lessonsPlan: false
    }

    this.blockMouseDownEvent = false
    this.canSelectTab = true
  }

  componentDidMount () {
    var self = this
    const navigationDrawer = this.refs.navigationDrawer

    // Events.
    function onClickMenu (event) {
      if (!self.refs.postsTab.state.isFullScreen && !self.refs.galleryTab.state.picturesVisible && !self.refs.galleryTab.state.fullPictureVisible) {
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
        if (self.refs.galleryTab.state.fullPictureVisible) self.refs.galleryTab.hidefullPicture()
      }
    }

    // On search icon click event.
    function onClickSearch () {

    }

    function onPostsSelect () {
      if (!self.selected.posts) self.getPostsTab().loadPosts()
    }

    function onGalleryTabSelect () {
      if (!self.selected.gallery) self.getGalleryTab().loadCategories()
    }

    function onLessonsPlanTabSelect () {
      if (!self.selected.lessonsPlan) self.getLessonsPlanTab().loadPlan()
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
          subType: 'Search',
          position: 'Right',
          image: 'src/images/Toolbar/search.png'
        }
      ]
    })

    // Set tabs.
    this.refs.tabLayout.setState({
      tabs: [
        {
          title: 'POSTY',
          url: 'posts',
          page: this.refs.postsTab,
          onSelect: onPostsSelect
        },
        {
          title: 'GALERIA',
          url: 'gallery',
          page: this.refs.galleryTab,
          onSelect: onGalleryTabSelect
        },
        {
          title: 'O KLASIE',
          url: 'aboutclass',
          page: this.refs.aboutClassTab
        },
        {
          title: 'PLAN LEKCJI',
          url: 'lessonsplan',
          page: this.refs.lessonsPlanTab,
          onSelect: onLessonsPlanTabSelect
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

      const action = Url.getUrlParameter('action')
      if (action === 'info') {
        self.refs.infoDialog.show()
      }
    }, 1)

  //  this.getPostsTab().loadPosts()
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

  /**
   * Gets lessons plan tab.
   * @return {LessonsPlanTab}
   */
  getLessonsPlanTab = () => {
    return this.refs.lessonsPlanTab
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
      height: 'calc(100% - ' + ((!this.state.tabLayoutHidden) ? '136px' : '64px') + ')',
      opacity: (!this.state.dataPreloaderVisible) ? 1 : 0
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
    const tooltipAddComment = 'Dodaj komentarz' // Add comment.

    return (
      <div>
        <div className='app-content' ref='appContent' style={appContentStyle}>
          <Toolbar ref='toolbar' items={this.state.toolbarItems} getApp={this.getApp} backgroundColor={this.state.toolbarBackgroundColor} shadow={this.state.toolbarShadow}>
            <TabLayout ref='tabLayout' className='tab-layout-1' style={tabLayoutStyle} getApp={this.getApp} />
          </Toolbar>
          <div className='tab-pages' style={tabPagesStyle}>
            <PostsTab ref='postsTab' getApp={this.getApp} />
            <GalleryTab ref='galleryTab' getApp={this.getApp} />
            <AboutClassTab ref='aboutClassTab' />
            <LessonsPlanTab ref='lessonsPlanTab' getApp={this.getApp} />
          </div>
        </div>
        <LoginDialog ref='loginDialog' />
        <InfoDialog ref='infoDialog' />
        <Preloader ref='preloader' className='data-preloader' style={dataPreloaderStyle} strokeColor='#2196f3' strokeWidth={4} />
        <NavigationDrawer ref='navigationDrawer' getApp={this.getApp} />
        <Tooltip ref='tooltipLike'>{tooltipLikeText}</Tooltip>
        <Tooltip ref='tooltipLikesList'>{tooltipLikeList}</Tooltip>
        <Tooltip ref='tooltipShowComments'>{tooltipShowComments}</Tooltip>
        <Tooltip ref='tooltipHideComments'>{tooltipHideComments}</Tooltip>
        <Tooltip ref='tooltipCategoryInfo'>{tooltipCategoryInfo}</Tooltip>
        <Tooltip ref='tooltipAddComment'>{tooltipAddComment}</Tooltip>
      </div>
    )
  }
}
App.defaultProps = {
  toolbarTitle: 'Blog klasy 3B',
  toolbarBackgroundColor: '#2196F3'
}
