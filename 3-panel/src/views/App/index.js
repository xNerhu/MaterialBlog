import Component from '../../helpers/Component'
import Url from '../../helpers/Url'

import PostDialog from './components/PostDialog'

import NavigationDrawer from './components/NavigationDrawer/index'
import Toolbar from './components/Toolbar'

import PostsPage from '../Pages/Posts'
import GalleryPage from '../Pages/Gallery'
import AboutClassPage from '../Pages/AboutClass'
import LessonsPlanPage from '../Pages/LessonsPlan'

import Dialog from './../../imports/materialdesign/components/Dialog'
import FAB from './../../imports/materialdesign/components/FAB'
import Menu from './../../imports/materialdesign/components/Menu'
import Preloader from './../../imports/materialdesign/components/Preloader'
import Snackbar from './../../imports/materialdesign/components/Snackbar'
import Tooltip from './../../imports/materialdesign/components/Tooltip'

export default class App extends Component {
  beforeRender () {
    window.app = this

    this.defaultTitle = 'Posty'

    this.accountInfo = {
      userName: 'Mikołaj Palkiewicz'
    }

    this.elementsToCallBack = []

    this.loadedPages = {
      posts: false,
      gallery: false,
      aboutClass: false,
      lessonsPlan: false
    }

    this.isLoading = false

    this.selectedPage = null
    this.canSelect = true
    this.lastPage = null

    this.toggledMenu = false
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
   * Shows or hides floatig action button.
   * @param {Boolean} show or hide
   */
  toggleFAB = (flag) => {
    const fab = this.elements.fab.getRoot()

    if (flag) {
      fab.style.display = 'block'

      setTimeout(function () {
        fab.style.height = '56px'
        fab.style.width = '56px'
      }, 20)
    } else {
      fab.style.height = '0px'
      fab.style.width = '0px'

      setTimeout(function () {
        fab.style.display = 'none'
      }, 300)
    }
  }

  /**
   * On multi-icon click event.
   * @param {Event}
   */
  onMultiIconClick = () => {
    const toolbar = this.getToolbar()
    const multiIcon = toolbar.getMultiIcon()
    const navigationDrawer = this.getNavigationDrawer()

    const postDialog = this.elements.postDialog

    const postsPage = this.getPostsPage()

    if (multiIcon.canClick) {
      if (postsPage.checkBoxes) {
        postsPage.toggleCheckBoxes(false)
      } else if (postDialog.toggled) {
        postDialog.toggle(false)
      } else if (!navigationDrawer.toggled) {
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

    const postsPage = this.getPostsPage()

    const items = [
      {
        type: 'Icon',
        subType: 'MultiIcon',
        position: 'Left',
        onClick: this.onMultiIconClick,
        className: 'toolbar-icon-multi-icon',
        style: {
          width: '24px',
          height: '16px',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)'
        }
      },
      {
        type: 'Title',
        title: this.defaultTitle,
        style: {
          color: '#fff'
        }
      },
      {
        type: 'Button',
        text: 'ZAPISZ',
        ref: 'saveButton',
        position: 'Right',
        className: 'toolbar-button',
        onClick: this.onSavePostButtonClick
      },
      {
        type: 'Button',
        text: 'USUŃ',
        ref: 'deleteButton',
        position: 'Right',
        className: 'toolbar-button',
        onClick: postsPage.onDeletePostsButtonClick
      },
      {
        type: 'Icon',
        position: 'Right',
        className: 'toolbar-icon-more',
        onClick: function (e) {
          self.toggleMenu(true, self.elements.menu)
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
      },
      {
        type: 'Icon',
        ref: 'showPicturesIcon',
        position: 'Right',
        className: 'toolbar-icon-show-pictures',
        onClick: postsPage.onShowPicturesClick,
        onMouseEnter: this.onShowPicturesMouseEnter,
        onMouseLeave: this.onShowPicturesMouseLeave
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

    if (postsPage.isTable) {
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
    const postsPage = this.getPostsPage()
    const tooltip = this.elements.tooltipView

    const text = (postsPage.isTable) ? 'Przełącz na listę' : 'Przełącz na tabelę'

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
   * On toolbar show images mouse enter event.
   * Shows tooltip.
   * @param {Event}
   */
  onShowPicturesMouseEnter = (e) => {
    const postsPage = this.getPostsPage()
    const tooltip = this.elements.tooltipShowPictures

    const text = (!postsPage.toggledPictures) ? 'Pokaż zdjęcia' : 'Ukryj zdjęcia'

    tooltip.setText(text)
    tooltip.toggle(true, e.target)
  }

  /**
   * On toolbar show images mouse leave event.
   * Hides tooltip.
   * @param {Event}
   */
  onShowPicturesMouseLeave = (e) => {
    const tooltip = this.elements.tooltipShowPictures

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
    const postsPage = this.getPostsPage()

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
        text: 'Usuń',
        onClick: postsPage.onMenuItemDeletePostsClick
      }
    ]

    menu.setItems(items)
  }

  setPostItemMenuItems () {
    const self = this
    const menu = this.elements.postItemMenu
    const postsPage = this.getPostsPage()

    const items = [
      {
        text: 'Edytuj',
        onClick: postsPage.onMenuItemEditPostClick
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
      const toolbar = this.getToolbar()
      const navigationDrawer = this.getNavigationDrawer()
      const pageRoot = page.getRoot()
      const pageName = this.getPageName(page)

      this.selectedPage = page
      this.canSelect = false

      if (navigationDrawer.toggled) navigationDrawer.hide()

      pageRoot.style.display = 'block'

      if (pageName === 'posts' && !this.loadedPages.posts || pageName === 'gallery' && !this.loadedPages.gallery || pageName === 'aboutClass' && !this.loadedPages.aboutClass || pageName === 'lessonsPlan' && !this.loadedPages.lessonsPlan) {
        this.togglePreloader(true)
        this.isLoading = true

        page.load()
      }

      let title = 'Posty'

      if (pageName === 'gallery') {
        title = 'Galeria'
      } else if (pageName === 'aboutClass') {
        title = 'O klasie'
      } else if (pageName === 'lessonsPlan') {
        title = 'Plan lekcji'
      }

      this.defaultTitle = title
      toolbar.setTitle(title)

      setTimeout(function () {
        pageRoot.style.opacity = '1'

        setTimeout(function () {
          self.canSelect = true
        }, 300)
      }, 10)

      if (typeof page.onSelect === 'function') page.onSelect()

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

    if (typeof page.onDeselect === 'function') page.onDeselect()

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
   * @param {Menu} menu
   * @param {DOMElement} clicked element
   */
  toggleMenu = (flag, _menu, clickedElement) => {
    const self = this
    const menu = (flag) ? _menu : this.toggledMenu

    const menuRoot = menu.getRoot()

    if (this.toggledMenu !== false) {
      if (_menu !== this.toggledMenu) {
        this.toggleMenu(false, this.toggledMenu)
      }
    }

    if (flag) {
      let top = 8
      let right = 32

      if (clickedElement != null) {
        const bounds = clickedElement.getBoundingClientRect()

        top = bounds.top
        right = bounds.right - bounds.left
      }

      menuRoot.style.top = top + 'px'
      menuRoot.style.right = right + 'px'

      menuRoot.style.overflowY = 'hidden'
      menuRoot.style.display = 'block'
      menuRoot.style.opacity = '1'

      setTimeout(function () {
        document.removeEventListener('click', this.onClick)

        menuRoot.style.width = '112px'
        menuRoot.style.height = menuRoot.scrollHeight + 'px'

        setTimeout(function () {
          self.toggleMenuItems(true, menu)

          setTimeout(function () {
            menuRoot.style.overflowY = 'auto'
          }, 200)
        }, 100)

        document.addEventListener('click', self.onClick)
      }, 10)

      this.toggledMenu = menu
    } else {
      document.removeEventListener('click', this.onClick)

      menuRoot.style.overflowY = 'hidden'

      menuRoot.style.height = '0px'
      menuRoot.style.width = '0px'

      this.toggleMenuItems(false, menu)

      menuRoot.style.opacity = '0'

      setTimeout(function () {
        menuRoot.style.display = 'none'
      }, 300)

      this.toggledMenu = false
    }
  }

  /**
   * Shows or hides menu items.
   * @param {Boolean} show or hide
   * @param {Menu} menu
   */
  toggleMenuItems (flag, menu) {
    for (var i = 0; i < menu.items.length; i++) {
      const menuItem = menu.items[i]
      const menuItemRoot = menuItem.getRoot()

      setTimeout(function () {
        menuItemRoot.style.opacity = (flag) ? '1' : '0'
      }, i * 25)
    }
  }

  /**
   * Sets dialog action buttons.
   */
  setDeletePostsDialogItems = () => {
    const postsPage = this.getPostsPage()
    const dialog = this.elements.deletePostsDialog

    const items = [
      {
        text: 'TAK',
        onClick: postsPage.deletePosts
      },
      {
        text: 'NIE',
        onClick: function () {
          dialog.toggle(false)
        }
      }
    ]

    dialog.setItems(items)
  }

  /**
   * On click event.
   * Hides menu.
   * @param {Event}
   */
  onClick = (e) => {
    this.toggleMenu(false)
  }

  /**
   * On floating action button click event.
   * @param {Event}
   */
  onFABClick = (e) => {
    const postsPage = this.getPostsPage()

    if (this.selectedPage === postsPage) {
      this.elements.postDialog.toggle(true)
    }
  }

  /**
   * On save post button click event.
   * Adds post.
   * TODO.
   * Close add post dialog.
   * @param {Event}
   */
  onSavePostButtonClick = (e) => {
    const postDialog = this.elements.postDialog
    const snackbar = this.elements.addedPostSnackbar

    if (postDialog.verifyData()) {
      postDialog.toggle(false)
      snackbar.toggle(true)
    }
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
          <PostDialog ref='postDialog' />
        </div>
        <div className='fab' ref='fabContainer'>
          <FAB ref='fab' onClick={this.onFABClick} />
        </div>
        <Menu ref='menu' className='toolbar-menu' mobile={true} />
        <Menu ref='postItemMenu' className='toolbar-menu' mobile={true} />
        <Dialog ref='deletePostsDialog' title='Jesteś pewny(a)?'>
          Nie będzie można ich odzyskać.
        </Dialog>
        <Snackbar className='snackbar-deleted-posts' ref='deletedPostsSnackbar' text='Pomyślnie usunięto posty' timeout={5000} />
        <Snackbar className='snackbar-added-post' ref='addedPostSnackbar' text='Pomyślnie dodano post' />
        <Tooltip ref='tooltipView' text='Przełącz na liste' />
        <Tooltip ref='tooltipShowPictures' text='Pokaż zdjęcia' />
        <Tooltip ref='tooltipUploadButton' text='Najlepiej w proporcjach 16:9' />
        <NavigationDrawer ref='navigationDrawer' />
        <Preloader className='data-preloader' ref='preloader' />
      </div>
    )
  }

  afterRender () {
    this.setToolbarItems()
    this.setNavigationDrawerItems()
    this.setMenuItems()
    this.setPostItemMenuItems()
    this.setDeletePostsDialogItems()

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

    this.elements.menu.getRoot().style.width = '0px'
    this.elements.postItemMenu.getRoot().style.width = '0px'
  }
}
