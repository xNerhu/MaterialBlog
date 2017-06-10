import Preloader from '../../imports/materialdesign/components/Preloader'
import TextField from '../../imports/materialdesign/components/TextField'
import Tooltip from '../../imports/materialdesign/components/Tooltip'

import NavigationDrawer from './components/NavigationDrawer'

import Toolbar from './components/Toolbar'
import TabLayout from './components/TabLayout'

import PostsTab from '../Tabs/Posts'
import GalleryTab from '../Tabs/Gallery'

export default class App {
  constructor (parent) {
    window.app = this
    this.parent = parent

    this.elements = {}

    this.accountInfo = {
      userID: 1,
      userName: 'Mikołaj Palkiewicz',
      avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281'
    }

    this.tabsLoaded = {
      posts: false,
      gallery: false,
      aboutClass: false,
      lessonsPlan: false
    }

    this.isLoading = false

    this.render()
  }

  /**
   * On multi icon click event.
   * Important event for navigation.
   * @param {Event}
   */
  onMultiIconClick = (e) => {
    const toolbar = this.elements.toolbar
    const multiIcon = toolbar.getMultiIcon()
    const navigationDrawer = this.getNavigationDrawer()
    const postsTab = this.getPostsTab()

    if (multiIcon.canClick) {
      if (postsTab.fullScreen.flag) {
        postsTab.toggleFullScreen(false)
        multiIcon.changeToDefault()
      } else if (!navigationDrawer.toggled) {
        navigationDrawer.show()
        multiIcon.changeToExit()
      } else if (navigationDrawer.toggled) {
        navigationDrawer.hide()
        multiIcon.changeToDefault()
      }

      multiIcon.blockClick()
    }
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

    if (name === 'posts' && !this.tabsLoaded.posts || name === 'gallery' && !this.tabsLoaded.gallery) {
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

    if (tab === postsTab) return 'posts'
    else if (tab === galleryTab) return 'gallery'
  }

  render = () => {
    const self = this

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
        title: 'Blog klasy 3B',
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
            /*self.refs.searchResults.search(query)
            if (navigationDrawer.toggled) navigationDrawer.hide()*/
            console.log(query)
          }
        }
      }
    ]

    // APP CONTENT
    this.elements.appContent = document.createElement('div')
    this.elements.appContent.className = 'app-content'
    this.parent.appendChild(this.elements.appContent)

    // PRELOADER
    this.elements.preloader = new Preloader()
    this.elements.preloader.getRoot().classList.add('data-preloader')
    setTimeout(function () {
      self.parent.appendChild(self.elements.preloader.getRoot())
    }, 10)

    // NAVIGATION DRAWER
    const navigationDrawerItems = [
      {
        text: 'Informacje',
        className: 'navigation-drawer-info',
        onClick: function (e) {
          console.log(e)
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
        className: 'navigation-drawer-login',
        onClick: function (e) {
          console.log(e)
        }
      }
    ]

    this.elements.navigationDrawer = new NavigationDrawer()
    this.elements.navigationDrawer.setItems(navigationDrawerItems)
    this.parent.appendChild(this.elements.navigationDrawer.getRoot())

    // TOOLBAR
    this.elements.toolbar = new Toolbar()
    this.elements.toolbar.setItems(items)

    // TAB LAYOUT

    this.elements.tabLayout = new TabLayout()
    this.elements.toolbar.getRoot().appendChild(this.elements.tabLayout.getRoot())

    this.elements.appContent.appendChild(this.elements.toolbar.getRoot())

    // TAB PAGES
    this.elements.tabPages = document.createElement('div')
    this.elements.tabPages.className = 'tab-pages'

    this.elements.postsTab = new PostsTab()
    this.elements.tabPages.appendChild(this.elements.postsTab.getRoot())

    this.elements.galleryTab = new GalleryTab()
    this.elements.tabPages.appendChild(this.elements.galleryTab.getRoot())

    this.elements.appContent.appendChild(this.elements.tabPages)

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
      }
    ]

    this.elements.tabLayout.setTabs(tabs)

    // TOOLTIPS
    this.elements.tooltipShowCommentsButton = new Tooltip('Pokaż komentarze')
    this.parent.appendChild(this.elements.tooltipShowCommentsButton.getRoot())

    this.elements.tooltipLikeButton = new Tooltip('Polub to!')
    this.parent.appendChild(this.elements.tooltipLikeButton.getRoot())

    this.elements.tooltipLikesList = new Tooltip('...')
    this.parent.appendChild(this.elements.tooltipLikesList.getRoot())
  }
}
/*
    return (
      <div>
        <div className='app-content' ref='appContent' style={appContentStyle}>
          <Toolbar ref='toolbar' items={this.state.toolbarItems} getApp={this.getApp} shadow={this.state.toolbarShadow}>
            <TabLayout ref='tabLayout' className='tab-layout-1' style={tabLayoutStyle} getApp={this.getApp} />
          </Toolbar>
          <div className='tab-pages' style={tabPagesStyle}>
            <PostsTab ref='postsTab' getApp={this.getApp} />
            <GalleryTab ref='galleryTab' getApp={this.getApp} />
            <AboutClassTab ref='aboutClassTab' getApp={this.getApp} />
            <LessonsPlanTab ref='lessonsPlanTab' getApp={this.getApp} />
          </div>
          <SearchResults ref='searchResults' getApp={this.getApp} />
        </div>
        <LoginDialog ref='loginDialog' getApp={this.getApp} />
        <InfoDialog ref='infoDialog' />
        <Preloader ref='preloader' className='data-preloader' style={preloaderStyle} strokeColor='#2196f3' strokeWidth={4} />
        <NavigationDrawer ref='navigationDrawer' getApp={this.getApp} />
        <Tooltip ref='tooltipLike'>
          {this.state.tooltipsData.like.text}
        </Tooltip>
        <Tooltip ref='tooltipLikesList'>
          {this.state.tooltipsData.like.list}
        </Tooltip>
        <Tooltip ref='tooltipShowComments'>
          Pokaż komentarze
        </Tooltip>
        <Tooltip ref='tooltipHideComments'>
          Ukryj komentarze
        </Tooltip>
        <Tooltip ref='tooltipCategoryInfo'>
          {
            'Data utworzenia: ' + this.state.tooltipsData.category.date + '\n Ilość zdjęć: ' + this.state.tooltipsData.category.picturesCount
          }
        </Tooltip>
        <Tooltip ref='tooltipAddComment'>
          Dodaj komentarz
        </Tooltip>
        <Snackbar ref='snackbar' actionText='ZOBACZ' timeout={7500} onActionClick={this.onSnackbarActionClick}>
          Strona wykorzystuje pliki cookies.
        </Snackbar>
      </div>
    )
  }
}

App.defaultProps = {
  toolbarTitle: 'Blog klasy 3B',
  toolbarBackgroundColor: '#2196F3'
}*/
