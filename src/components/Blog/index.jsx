import Component from 'inferno-component'
import Url from 'url'

import { userInfo } from '../../actions/user'

import NavigationDrawer from '../NavigationDrawer'
import NavigationDrawerFooter from '../NavigationDrawerFooter'

import PostsTab from './tabs/Posts'
import GalleryTab from './tabs/Gallery'
import AboutClassTab from './tabs/AboutClass'
import LessonsPlanTab from './tabs/LessonsPlan'

import Toolbar from '../Toolbar'

import InfoDialog from './InfoDialog'
import DeleteCommentDialog from './tabs/Posts/components/DeleteCommentDialog'
import EditCommentDialog from './tabs/Posts/components/EditCommentDialog'

import Menu from '../../materialdesign/components/Menu'
import Preloader from '../../materialdesign/components/Preloader'

export default class Blog extends Component {
  constructor () {
    super()
    this.elements = {}

    this.defaultToolbarTitle = 'Blog klasy 3B'

    this.state = {
      toolbarTitle: this.defaultToolbarTitle,
      toolbarHeight: 128,
      toolbarTransparent: false,
      userInfo: false,
      preloader: true,
      navigationDrawerItems: [
        {
          text: 'Informacje',
          className: 'navigation-drawer-info',
          onClick: () => {
            this.getMultiIcon().changeToDefault()
            this.elements.navigationDrawer.hide()
            this.elements.infoDialog.elements.dialog.toggle(true)
          }
        },
        {
          text: 'GitHub',
          className: 'navigation-drawer-github',
          onClick: () => {
            window.open('https://github.com/xNerhu22/MyClassBlog', '_blank')
          }
        },
        {
          text: 'Panel',
          className: 'navigation-drawer-panel',
          onClick: () => {
            window.location.href = '/panel'
          }
        },
        {
          text: 'Zarejestruj się',
          className: 'navigation-drawer-register',
          register: true,
          onClick: () => {
            window.app.getBrowserHistory().push('/register')
          }
        },
        {
          text: 'Zaloguj się',
          className: 'navigation-drawer-login',
          login: true,
          onClick: () => {
            const browserHistory = window.app.getBrowserHistory()

            if (!this.state.userInfo) {
              browserHistory.push('/login?backtoblog=true')
            } else {
              window.location.href = '/logout'
            }
          }
        }
      ]
    }

    this.tabLayout = [
      {
        title: 'POSTY',
        url: 'posts'
      },
      {
        title: 'GALERIA',
        url: 'gallery'
      },
      {
        title: 'O KLASIE',
        url: 'aboutclass'
      },
      {
        title: 'PLAN LEKCJI',
        url: 'lessonsplan'
      }
    ]

    this.tabs = []

    window.blog = this
  }

  /**
   * Gets multiicon.
   * @return {MultiIcon}
   */
  getMultiIcon () {
    return this.elements.toolbar.elements.multiIcon
  }

  getTabLayout () {
    return this.elements.toolbar.elements.tabLayout
  }

  /**
   * Shows or hides tabs.
   * @param {Boolean}
   */
  toggleTabLayout (flag) {
    this.setState({
      toolbarHeight: flag ? 128 : 64
    })
  }

  /**
   * Gets tab index from url page parameter
   * @return {Int} tab index
   */
  getTabIndexFromUrl () {
    const query = Url.parse(window.location.href, true).query

    for (var i = 1; i < this.tabLayout.length; i++) {
      if (query.tab === this.tabLayout[i].url) return i
    }

    return 0
  }

  /**
   * Shows or hides preloader.
   * @param {Boolean}
   */
  togglePreloader (flag) {
    this.setState({
      preloader: flag
    })
  }

  /**
   * On multi icon click.
   * @param {Event}
   */
  onMultiIconClick = (e) => {
    const multiIcon = this.getMultiIcon()
    const navigationDrawer = this.elements.navigationDrawer
    const postsTab = this.elements.postsTab

    const galleryTab = this.elements.galleryTab
    const picturesDialog = galleryTab.elements.picturesDialog

    if (picturesDialog.toggledFullScreenPicture) return picturesDialog.togglePicture(false)
    // Hide pictures dialog
    if (picturesDialog.toggled) return picturesDialog.toggle(false)

    if (postsTab.selectedPost != null) return postsTab.selectPost()

    // If navigation drawer is toggled on then hide it
    if (!navigationDrawer.toggled) {
      multiIcon.changeToExit()
      navigationDrawer.show()
   } else {
      multiIcon.changeToDefault()
      navigationDrawer.hide()
   }
  }

  async getUserInfo () {
    const json = await userInfo()

    if (json.success) {
      const navigationDrawerItems = this.state.navigationDrawerItems

      for (var i = 0; i < navigationDrawerItems.length; i++) {
        // If item is regier
        if (navigationDrawerItems[i].register) {
          navigationDrawerItems[i].className += ' disabled'
        }
        // If item is login
        if (navigationDrawerItems[i].login) {
          navigationDrawerItems[i].text = 'Wyloguj się'
          navigationDrawerItems[i].className += ' logout'
        }
      }

      this.setState({
        userInfo: json.info,
        navigationDrawerItems: navigationDrawerItems
      })
    }
  }

  render () {
    const toolbarStyle = {
      height: this.state.toolbarHeight + 'px'
    }

    const tabsContainerStyle = {
      height: `calc(100% - ${this.state.toolbarHeight}px)`
    }

    const preloaderStyle = {
      display: (this.state.preloader) ? 'block' : 'none'
    }

    return (
      <div>
        <div className='app-content blog' ref={(e) => this.elements.appContent = e}>
          <Toolbar
            ref={(e) => this.elements.toolbar = e}
            title={this.state.toolbarTitle}
            onMultiIconClick={this.onMultiIconClick}
            tabLayout={true}
            tabs={this.tabLayout}
            style={toolbarStyle}
            transparent={this.state.toolbarTransparent}
          />
          <div className='tabs-container' style={tabsContainerStyle}>
            <PostsTab ref={(e) => this.elements.postsTab = e} />
            <GalleryTab ref={(e) => this.elements.galleryTab = e} />
            <AboutClassTab />
            <LessonsPlanTab />
          </div>
        </div>
        <InfoDialog ref={(e) => this.elements.infoDialog = e} />
        <Preloader className='data-preloader' style={preloaderStyle} />
        <EditCommentDialog ref={(e) => this.elements.editCommentDialog = e} />
        <DeleteCommentDialog ref={(e) => this.elements.deleteCommentDialog = e} />
        <NavigationDrawer
          ref={(e) => this.elements.navigationDrawer = e}
          items={this.state.navigationDrawerItems}
          parentComponent={this}
          userInfo={this.state.userInfo}>
          <NavigationDrawerFooter />
        </NavigationDrawer>
      </div>
    )
  }

  componentDidMount () {
    const tabLayout = this.elements.toolbar.elements.tabLayout

    setTimeout(() => {
      this.getUserInfo()

      const index = this.getTabIndexFromUrl()
      tabLayout.tabs[index].select()
    }, 1)

    document.title = 'Blog klasy 3B'
  }
}
