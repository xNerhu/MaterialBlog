import Component from '../../helpers/Component'
import Url from '../../helpers/Url'

import NavigationDrawer from './components/NavigationDrawer/index'
import Toolbar from './components/Toolbar'

import PostsPage from '../Pages/Posts'
import GalleryPage from '../Pages/Gallery'
import AboutClassPage from '../Pages/AboutClass'
import LessonsPlanPage from '../Pages/LessonsPlan'

import Menu from './../../imports/materialdesign/components/Menu'
import Preloader from './../../imports/materialdesign/components/Preloader'
import Tooltip from './../../imports/materialdesign/components/Tooltip'

export default class App extends Component {
  beforeRender () {
    window.app = this

    this.props.defaultTitle = 'Posty'

    this.elementsToCallBack = []

    this.loadedPages = {
      posts: false,
      gallery: false,
      aboutClass: false,
      lessonsPlan: false
    }

    this.isLoading = false

    this.canSelect = true
    this.lastPage = null

    this.isTable = true
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
   * Gets posts page.
   * @return {PostsPage}
   */
  getPostsPage = () => {
    return this.elements.postsPage
  }

  /**
   * Gets gallery page.
   * @return {GalleryPage}
   */
  getGalleryPage = () => {
    return this.elements.galleryPage
  }

  /**
   * Gets about class page.
   * @return {AboutClassPage}
   */
  getAboutClassPage = () => {
    return this.elements.aboutClassPage
  }

  /**
   * Gets lessons plan page.
   * @return {LessonsPlanPage}
   */
  getLessonsPlanTab = () => {
    return this.elements.lessonsPlanPage
  }

  /**
   * Gets menu.
   * @return {Menu}
   */
  getMenu = () => {
    return this.elements.menu
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
   * On multi-icon click event.
   * @param {Event}
   */
  onMultiIconClick = () => {
    const toolbar = this.getToolbar()
    const multiIcon = toolbar.getMultiIcon()
    const navigationDrawer = this.getNavigationDrawer()

    if (multiIcon.canClick) {
      if (!navigationDrawer.toggled) {
        navigationDrawer.show()
        multiIcon.changeToExit()
        multiIcon.blockClick()
      } else {
        navigationDrawer.hide()
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

  /**
   * Sets toolbar items.
   */
  setToolbarItems = () => {
    const self = this
    const toolbar = this.getToolbar()

    const items = [
      {
        type: 'Icon',
        subType: 'MultiIcon',
        position: 'Left',
        onClick: this.onMultiIconClick,
        className: 'toolbar-icon-multi-icon',
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
        position: 'Right',
        className: 'toolbar-icon-more',
        onClick: function (e) {
          self.toggleMenu(true)
        }
      },
      {
        type: 'Icon',
        ref: 'viewIcon',
        position: 'Right',
        className: 'toolbar-icon-view',
        onClick: this.onViewClick,
        onMouseEnter: this.onViewMouseEnter,
        onMouseLeave: this.onViewMouseLeave
      }
    ]

    toolbar.setItems(items)
  }

  /**
   * On toolbar view item click event.
   * Changes table.
   * @param {Event}
   */
  onViewClick = (e) => {
    const target = e.target
    const postsPage = this.getPostsPage()
    const tooltip = this.elements.tooltipView

    if (this.isTable) {
      postsPage.switchToList()
    } else {
      postsPage.switchToTable()
    }

    tooltip.toggle(false)
  }

  /**
   * On toolbar view item mouse enter event.
   * Shows tooltip.
   * @param {Event}
   */
  onViewMouseEnter = (e) => {
    const tooltip = this.elements.tooltipView

    const text = (this.isTable) ? 'Przełącz na listę' : 'Przełącz na tabelę'

    tooltip.setText(text)
    tooltip.toggle(true, e.target)
  }

  /**
   * On toolbar view item mouse leave event.
   * Hides tooltip.
   * @param {Event}
   */
  onViewMouseLeave = (e) => {
    const tooltip = this.elements.tooltipView

    tooltip.toggle(false)
  }

  /**
   * Sets navigation drawer items.
   */
  setNavigationDrawerItems = () => {
    const self = this
    const navigationDrawer = this.getNavigationDrawer()

    const navigationDrawerItems = [
      {
        text: 'Posty',
        className: 'navigation-drawer-posts',
        onClick: function (e) {
          self.selectPage(self.getPostsPage())
        }
      },
      {
        text: 'Galeria',
        className: 'navigation-drawer-gallery',
        onClick: function (e) {
          self.selectPage(self.getGalleryPage())
        }
      },
      {
        text: 'O klasie',
        className: 'navigation-drawer-about-class',
        onClick: function (e) {
          self.selectPage(self.getAboutClassPage())
        }
      },
      {
        text: 'Plan lekcji',
        className: 'navigation-drawer-lessons-plan',
        onClick: function (e) {
          self.selectPage(self.getLessonsPlanTab())
        }
      }
    ]

    navigationDrawer.setItems(navigationDrawerItems)
  }

  /**
   * Sets menu items.
   */
  setMenuItems = () => {
    const self = this
    const menu = this.getMenu()

    const items = [
      {
        text: 'Odśwież',
        onClick: function () {

        }
      },
      {
        text: 'Dodaj',
        onClick: function () {

        }
      },
      {
        text: 'Edytuj',
        onClick: function () {

        }
      },
      {
        text: 'Usuń',
        onClick: function () {

        }
      }
    ]

    menu.setItems(items)
  }

  /**
   * Selects page.
   * @param {PostsPage | GalleryPage}
   */
  selectPage = (page) => {
    if (this.canSelect && this.lastPage !== page && !this.isLoading) {
      const self = this
      const navigationDrawer = this.getNavigationDrawer()
      const pageRoot = page.getRoot()
      const pageName = this.getPageName(page)

      this.canSelect = false

      if (navigationDrawer.toggled) navigationDrawer.hide()

      pageRoot.style.display = 'block'

      if (pageName === 'posts' && !this.loadedPages.posts || pageName === 'gallery' && !this.loadedPages.gallery || pageName === 'aboutClass' && !this.loadedPages.aboutClass || pageName === 'lessonsPlan' && !this.loadedPages.lessonsPlan) {
        this.togglePreloader(true)
        this.isLoading = true

        page.load()
      }

      setTimeout(function () {
        pageRoot.style.opacity = '1'

        setTimeout(function () {
          self.canSelect = true
        }, 300)
      }, 10)

      const url = '?page=' + pageName.toLowerCase()
      window.history.pushState('', '', url)

      const lastPage = this.lastPage
      if (lastPage != null) {
        this.deselectPage(lastPage)
      }

      this.lastPage = page
    }
  }

  /**
   * Deselects page.
   * @param {PostsPage | GalleryPage}
   */
  deselectPage = (page) => {
    const pageRoot = page.getRoot()

    pageRoot.style.opacity = '0'

    setTimeout(function () {
      pageRoot.style.display = 'none'
    }, 300)
  }

  /**
   * Gets page page.
   * @param {PostsPage | GalleryPage}
   * @return {String} page name
   */
  getPageName = (page) => {
    const postsPage = this.getPostsPage()
    const galleryPage = this.getGalleryPage()
    const aboutClassPage = this.getAboutClassPage()
    const lessonsPlanPage = this.getLessonsPlanTab()

    if (postsPage === page) return 'posts'
    else if (galleryPage === page) return 'gallery'
    else if (aboutClassPage === page) return 'aboutClass'
    else if (lessonsPlanPage === page) return 'lessonsPlan'
    return null
  }

  /**
   * Toggle menu.
   * @param {Boolean} show or hide.
   */
  toggleMenu = (flag) => {
    const self = this
    const menu = this.getMenu()
    const menuRoot = menu.getRoot()

    if (flag) {
      menuRoot.style.overflowY = 'hidden'
      menuRoot.style.display = 'block'

      setTimeout(function () {
        menuRoot.style.height = menuRoot.scrollHeight - 16 + 'px'
        menuRoot.style.opacity = '1'
        document.addEventListener('click', self.onClick)

        setTimeout(function () {
          menuRoot.style.overflowY = 'auto'
        }, 300)
      }, 20)
    } else {
      document.removeEventListener('click', this.onClick)

      menuRoot.style.overflowY = 'hidden'

      menuRoot.style.height = '32px'

      setTimeout(function () {
        menuRoot.style.opacity = '0'
      }, 50)

      setTimeout(function () {
        menuRoot.style.display = 'none'
      }, 300)
    }
  }

  /**
   * On click event.
   * Hides menu.
   * @param {Event}
   */
  onClick = (e) => {
    this.toggleMenu(false)
  }

  render () {
    return (
      <div>
        <div className='app-content' ref='appContent'>
          <Toolbar ref='toolbar' />
          <div className='pages'>
            <PostsPage ref='postsPage' />
            <GalleryPage ref='galleryPage' />
            <AboutClassPage ref='aboutClassPage' />
            <LessonsPlanPage ref='lessonsPlanPage' />
          </div>
        </div>
        <Menu ref='menu' className='toolbar-menu' mobile={true} />
        <Tooltip ref='tooltipView' text='Przełącz na liste' />
        <NavigationDrawer ref='navigationDrawer' />
        <Preloader className='data-preloader' ref='preloader' />
      </div>
    )
  }

  afterRender () {
    const menuRoot = this.getMenu().getRoot()

    this.setToolbarItems()
    this.setNavigationDrawerItems()
    this.setMenuItems()

    let urlPage = Url.getUrlParameter('page')
    let pageToSelect = this.getPostsPage()

    if (urlPage != null) {
      urlPage = urlPage.toLowerCase()

      if (urlPage === 'gallery') {
        pageToSelect = this.getGalleryPage()
      } else if (urlPage === 'aboutclass') {
        pageToSelect = this.getAboutClassPage()
      } else if (urlPage === 'lessonsplan') {
        pageToSelect = this.getLessonsPlanTab()
      }
    }

    this.selectPage(pageToSelect)

    this.logUser()

    menuRoot.style.height = '32px'
  }
}
