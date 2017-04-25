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
      toolTipLikeText: 'Polub',
      toolTipLikesList: '',
      tabLayoutHidden: false,
      menuOpacity: 1,
      postFullScreen: false,
      dataPreloaderVisible: false,
      tooltipsData: {
        category: {
          date: '',
          picturesCount: ''
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

    /** events */
    function onClickMenu (event) {
      if (!self.refs.postsTab.state.isFullScreen) {
        if (!navigationDrawer.state.toggled) {
          self.getToolBar().refs.menuIcon.changeToExit()
          navigationDrawer.show()
        } else {
          self.getToolBar().refs.menuIcon.changeToDefault()
          navigationDrawer.hide()
        }
      } else {
        self.refs.postsTab.exitFullScreenPost()
      }
    }

    function onClickSearch () {

    }

    this.setState({
      toolbarItems: [
        {
          type: 'Icon',
          subType: 'Menu',
          position: 'Left',
          image: 'src/images/Toolbar/menu.png',
          onClick: onClickMenu,
          style: {
            width: 24, //24, 18
            height: 18,
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)'
          },
        },
        {
          type: 'Title',
          title: 'Blog klasy 3B',
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

    // react bug with states, must wait 1 sec
    setTimeout(function () {
      var postsTab = self.getPostsTab()
      const urlPost = Url.getUrlParameter('post')
      const postID = isNaN(parseInt(urlPost)) ? false : parseInt(urlPost)
      if (postID != false) {
        var postData = postsTab.getPost(postID)
        postsTab.setState({fullScreenPost: postData})
        postsTab.showFullScreenPost(postID)
      }
    }, 1)
  }

  /**
    * gets app
    * @return {App}
    */
  getApp = () => {
    return this
  }

  /**
    * gets account info
    * @return {Object}
    */
  getAccountInfo = () => {
    return this.accountInfo
  }

  /**
    * gets tool bar
    * @return {Toolbar}
    */
  getToolBar = () => {
    return this.refs.toolbar
  }

  /**
    * gets tab layout
    * @return {TabLayout}
    */
  getTabLayout = () => {
    return this.refs.tabLayout
  }

  /**
    * gets posts tab
    * @return {PostsTab}
    */
  getPostsTab = () => {
    return this.refs.postsTab
  }

  /**
    * gets gallery tab
    * @return {GalleryTab}
    */
  getGalleryTab = () => {
    return this.refs.galleryTab
  }

  render () {
    var tabLayoutStyle = {
      left: this.state.tabLayoutLeft,
      visibility: (!this.state.tabLayoutHidden) ? 'visible' : 'hidden',
      opacity: (!this.state.tabLayoutHidden) ? 1 : 0,
      width: 'calc(100% - ' + this.state.tabLayoutLeft + 'px)'
    }
    var appContentStyle = {
      width: this.state.contentWidth
    }
    var tabPagesStyle = {
      height: 'calc(100% - ' + ((!this.state.tabLayoutHidden) ? '136px' : '64px') + ')'
    }
    var dataPreloaderStyle = {
      height: 54,
      width: 54,
      visibility: (this.state.dataPreloaderVisible) ? 'visible' : 'hidden'
    }
    const tooltipCategoryInfo = 'Data utworzenia: ' + this.state.tooltipsData.category.date + '\n Ilość zdjęć: ' + this.state.tooltipsData.category.picturesCount
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
        <Tooltip ref='tooltipLike'>{this.state.toolTipLikeText}</Tooltip>
        <Tooltip ref='tooltipLikesList'>{this.state.toolTipLikesList}</Tooltip>
        <Tooltip ref='tooltipShowComments'>Pokaż komentarze</Tooltip>
        <Tooltip ref='tooltipHideComments'>Ukryj komentarze</Tooltip>
        <Tooltip ref='tooltipCategoryInfo'>{tooltipCategoryInfo}</Tooltip>
      </div>
    )
  }
}
