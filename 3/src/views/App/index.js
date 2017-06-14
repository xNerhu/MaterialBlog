import Component from '../../helpers/Component'

import NavigationDrawer from './components/NavigationDrawer/index'

import InfoDialog from './components/InfoDialog'
import LoginDialog from './components/LoginDialog'

import SearchResults from './components/SearchResults'

import Toolbar from './components/Toolbar'
import TabLayout from './components/TabLayout'

import PostsTab from '../Tabs/Posts'
import GalleryTab from '../Tabs/Gallery'
import AboutClassTab from '../Tabs/AboutClass'
import LessonsPlanTab from '../Tabs/LessonsPlan'

import Preloader from './../../imports/materialdesign/components/Preloader'
import Tooltip from '../../imports/materialdesign/components/Tooltip'
import Snackbar from '../../imports/materialdesign/components/Snackbar'

export default class App extends Component {
  beforeRender () {
    window.app = this

    this.props.defaultTitle = 'Blog klasy 3B'

    this.accountInfo = false

    this.tabsLoaded = {
      posts: false,
      gallery: false,
      aboutClass: false,
      lessonsPlan: false
    }

    this.isLoading = false

    this.elementsToCallBack = []
  }

  getToolbar = () => {
    return this.elements.toolbar
  }

  /**
   * Gets toolbar.
   * @return {Toolbar}
   */
  getToolbar = () => {
    return this.elements.toolbar
  }

  /**
   * Gets navigation drawer.
   * @return {NavigationDrawer}
   */
  getNavigationDrawer = () => {
    return this.elements.navigationDrawer
  }

  /**
   * Gets posts tab.
   * @return {PostsTab}
   */
  getPostsTab = () => {
    return this.elements.postsTab
  }

  /**
   * Gets gallery tab.
   * @return {GalleryTab}
   */
  getGalleryTab = () => {
    return this.elements.galleryTab
  }

  /**
   * Gets about class tab.
   * @return {AboutClassTab}
   */
  getAboutClassTab = () => {
    return this.elements.aboutClassTab
  }

  /**
   * Gets lessons plan tab.
   * @return {LessonsPlanTab}
   */
  getLessonsPlanTab = () => {
    return this.elements.lessonsPlanTab
  }

  /**
   * Gets preloader.
   * @return {Preloader}
   */
  getPreloader = () => {
    return this.elements.preloader
  }

  /**
   * Shows or hides preloader.
   * @param {Boolean}
   */
  togglePreloader = (flag) => {
    const preloader = this.getPreloader().getRoot()

    preloader.style.display = (!flag) ? 'none' : 'block'
  }

  /**
   * On tab select event.
   * @param {PostsTab | GalleryTab | AboutClassTab | LessonsPlanTab}
   */
  onTabSelect = (tab) => {
    const name = this.getTabName(tab)

    if (name === 'posts' && !this.tabsLoaded.posts || name === 'gallery' && !this.tabsLoaded.gallery || name === 'aboutClass' && !this.tabsLoaded.aboutClass || name === 'lessonsPlan' && !this.tabsLoaded.lessonsPlan) {
      this.togglePreloader(true)
      this.isLoading = true

      tab.load()
    }

    if (typeof tab.onSelect === 'function') tab.onSelect()
  }

  /**
   * On tab deselect event.
   * @param {PostsTab | GalleryTab | AboutClassTab | LessonsPlanTab}
   */
  onTabDeselect = (tab) => {
    if (typeof tab.onDeselect === 'function') tab.onDeselect()
  }

  /**
   * Gets tab name.
   * @param {PostsTab | GalleryTab | AboutClassTab | LessonsPlanTab}
   * @return {String} tab name.
   */
  getTabName = (tab) => {
    const postsTab = this.getPostsTab()
    const galleryTab = this.getGalleryTab()
    const aboutClassTab = this.getAboutClassTab()
    const lessonsPlanTab = this.getLessonsPlanTab()

    if (tab === postsTab) return 'posts'
    else if (tab === galleryTab) return 'gallery'
    else if (tab === aboutClassTab) return 'aboutClass'
    else if (tab === lessonsPlanTab) return 'lessonsPlan'
  }

  /**
   * On multi icon click event.
   * Important event for navigation.
   * @param {Event}
   */
  onMultiIconClick = (e) => {
    const toolbar = this.elements.toolbar
    const multiIcon = toolbar.getMultiIcon()
    const searchIcon = toolbar.getSearchIcon()
    const navigationDrawer = this.getNavigationDrawer()
    const searchResults = this.elements.searchResults
    const postsTab = this.getPostsTab()
    const galleryTab = this.getGalleryTab()

    if (multiIcon.canClick) {
      if (searchIcon.toggled && searchIcon.fullWidth) {
        searchIcon.changeToFullWidth(false)
        searchIcon.toggle(false)
        multiIcon.blockClick()
      } else if (searchResults.toggled) {
        searchResults.hide()
      } else if (postsTab.fullScreen.flag) {
        postsTab.toggleFullScreen(false)
        multiIcon.changeToDefault()
        multiIcon.blockClick()
      } else if (galleryTab.fullScreenPicture) {
        galleryTab.togglePictureFullScreen(false)
      } else if (galleryTab.fullScreenPictures) {
        galleryTab.togglePicturesFullScreen(false)
      } else if (!navigationDrawer.toggled) {
        navigationDrawer.show()
        multiIcon.changeToExit()
        multiIcon.blockClick()
      } else if (navigationDrawer.toggled) {
        navigationDrawer.hide()
        multiIcon.blockClick()
      }
    }
  }

  /**
   * Logs user.
   * TODO
   */
  logUser = () => {
    this.accountInfo = {
      userID: 1,
      userName: 'Mikołaj Palkiewicz',
      avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
      email: 'xnerhu22@onet.pl'
    }

    this.callElements()
  }

  /**
   * Calls event on user log in elements.
   * Updates stuffs.
   */
  callElements = () => {
    if (this.accountInfo) {
      for (var i = 0; i < this.elementsToCallBack.length; i++) {
        const element = this.elementsToCallBack[i]

        element.onUserLog()
      }
    }
  }

  render () {
    return (
      <div>
        <div className='app-content' ref='appContent'>
          <Toolbar ref='toolbar'>
            <TabLayout ref={(e) => { this.elements.tabLayout = e }} />
          </Toolbar>
          <div className='tab-pages' ref='tabPages'>
            <PostsTab ref='postsTab' />
            <GalleryTab ref='galleryTab' />
            <AboutClassTab ref='aboutClassTab' />
            <LessonsPlanTab ref='lessonsPlanTab' />
          </div>
          <SearchResults ref='searchResults' />
        </div>
        <NavigationDrawer ref='navigationDrawer' />
        <Preloader className='data-preloader' ref='preloader' />
        <InfoDialog ref='infoDialog' />
        <LoginDialog ref='loginDialog' />
        <Tooltip ref='tooltipShowCommentsButton' text='Pokaż komentarze' />
        <Tooltip ref='tooltipLikeButton' text='Polub to!' />
        <Tooltip ref='tooltipLikesList' text='...' />
        <Tooltip ref='tooltipCategoryInfo' text='Data utworzenia:<br>Ilość zdjęc:' />
        <Snackbar ref='snackbarLogged' text='Zalogowano pomyślnie' />
      </div>
    )
  }

  afterRender () {
    const self = this
    const toolbar = this.getToolbar()
    const tabLayout = this.elements.tabLayout
    const navigationDrawer = this.getNavigationDrawer()
    const snackbarLogged = this.elements.snackbarLogged

    const items = [
      {
        type: 'Icon',
        subType: 'MultiIcon',
        position: 'Left',
        onClick: this.onMultiIconClick,
        id: 'toolbar-icon-multi-icon',
        style: {
          width: '24px',
          height: '18px',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)'
        }
      },
      {
        type: 'Title',
        title: this.props.defaultTitle,
        style: {
          color: '#fff'
        }
      },
      {
        type: 'Icon',
        subType: 'Search',
        id: 'toolbar-icon-search',
        position: 'Right',
        image: 'src/images/Toolbar/search.png',
        onSearch: function (query) {
          if (query.length >= 1) {
            self.elements.searchResults.search(query)
            if (navigationDrawer.toggled) navigationDrawer.hide()
            console.log(query)
          }
        }
      }
    ]

    toolbar.setItems(items)

    const tabs = [
      {
        title: 'POSTY',
        url: 'posts',
        page: this.elements.postsTab,
        onSelect: function () {
          self.onTabSelect(self.getPostsTab())
        },
        onDeselect: function () {
          self.onTabDeselect(self.getPostsTab())
        }
      },
      {
        title: 'GALERIA',
        url: 'gallery',
        page: this.elements.galleryTab,
        onSelect: function () {
          self.onTabSelect(self.getGalleryTab())
        },
        onDeselect: function () {
          self.onTabDeselect(self.getGalleryTab())
        }
      },
      {
        title: 'O KLASIE',
        url: 'aboutclass',
        page: this.elements.aboutClassTab,
        onSelect: function () {
          self.onTabSelect(self.getAboutClassTab())
        },
        onDeselect: function () {
          self.onTabDeselect(self.getAboutClassTab())
        }
      },
      {
        title: 'PLAN LEKCJI',
        url: 'lessonsplan',
        page: this.elements.lessonsPlanTab,
        onSelect: function () {
          self.onTabSelect(self.getLessonsPlanTab())
        },
        onDeselect: function () {
          self.onTabDeselect(self.getLessonsPlanTab())
        }
      }
    ]

    tabLayout.setTabs(tabs)

    const navigationDrawerItems = [
      {
        text: 'Informacje',
        className: 'navigation-drawer-info',
        onClick: function (e) {
          self.elements.infoDialog.toggle(true)
        }
      },
      {
        text: 'GitHub',
        className: 'navigation-drawer-github',
        onClick: function (e) {
          window.open('https://github.com/xNerhu22/MyClassBlog', '_blank')
        }
      },
      {
        text: 'Panel',
        className: 'navigation-drawer-panel',
        onClick: function (e) {
          console.log(e)
        }
      },
      {
        text: 'Zarejestruj się',
        className: 'navigation-drawer-register',
        onClick: function (e) {
          console.log(e)
        }
      },
      {
        text: 'Zaloguj się',
        ref: 'itemLogin',
        className: 'navigation-drawer-login',
        onClick: function (e) {
          self.elements.loginDialog.show()
        }
      },
      {
        text: 'Wyloguj się',
        ref: 'itemLogout',
        className: 'navigation-drawer-logout',
        onClick: function (e) {

        }
      }
    ]

    navigationDrawer.setItems(navigationDrawerItems)

    snackbarLogged.setActionButton({
      text: 'WYLOGUJ',
      rippleStyle: {
        backgroundColor: '#FFEB3B',
        opacity: 0.2
      }
    })

    this.logUser()
  }
}
