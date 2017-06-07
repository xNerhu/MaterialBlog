import Preloader from '../../imports/materialdesign/components/Preloader'
import TextField from '../../imports/materialdesign/components/TextField'

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
    const navigationDrawer = this.elements.navigationDrawer

    if (multiIcon.canClick) {
      if (!navigationDrawer.toggled) {
        navigationDrawer.show()
        multiIcon.changeToExit()
      } else {
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

  render = () => {
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
        title: 'Posty',
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
          console.log('onselect')
        },
        onDeselect: function () {
          console.log('ondeselect')
        }
      },
      {
        title: 'GALERIA',
        url: 'gallery',
        page: this.elements.galleryTab,
        onSelect: function () {
          console.log('onselect')
        },
        onDeselect: function () {
          console.log('ondeselect')
        }
      }
    ]

    this.elements.tabLayout.setTabs(tabs)

    // PARENT
    this.parent.appendChild(this.elements.appContent)
    this.parent.appendChild(this.elements.navigationDrawer.getRoot())
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
