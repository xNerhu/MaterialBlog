import Component from '../../helpers/Component'
import Url from '../../helpers/Url'

import DialogManager from '../../helpers/DialogManager'
import MenuManager from '../../helpers/MenuManager'
import PageManager from '../../helpers/PageManager'

import AddCategoryDialog from '../Pages/Gallery/components/AddCategoryDialog'
import PostDialog from '../Pages/Posts/components/PostDialog'

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

    this.elementsToCall = []

    this.pagesData = {
      loading: false,
      selected: null
    }

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
    this.getPreloader().getRoot().style.display = (!flag) ? 'none' : 'block'
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
  onMultiIconClick = (e) => {
    const toolbar = this.getToolbar()
    const multiIcon = toolbar.getMultiIcon()
    const navigationDrawer = this.getNavigationDrawer()

    const postDialog = this.elements.postDialog

    const postsPage = this.getPostsPage()
    const galleryPage = this.getGalleryPage()

    const picturesDialog = galleryPage.elements.picturesDialog

    if (multiIcon.canClick) {
      if (picturesDialog.toggled) {
        picturesDialog.toggle(false)
      } else if (postsPage.checkBoxes) {
        postsPage.toggleCheckBoxes(false)
      } else if (postDialog.toggled) {
        postDialog.toggle(false)
      } else if (!navigationDrawer.toggled) {
        navigationDrawer.show()
        multiIcon.changeToExit()
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
      for (var i = 0; i < this.elementsToCall.length; i++) {
        const element = this.elementsToCall[i]

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

    const postDialog = this.elements.postDialog
    const postsPage = this.getPostsPage()

    const items = [
      {
        type: 'Icon',
        subType: 'MultiIcon',
        position: 'Left',
        onClick: this.onMultiIconClick,
        className: 'toolbar-icon-multi-icon',
        style: {
          width: '18px',
          height: '12px',
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
        text: 'DODAJ',
        ref: 'saveButton',
        position: 'Right',
        className: 'toolbar-button',
        onClick: postDialog.onSavePostButtonClick
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
          MenuManager.toggle(true, self.elements.menu, e.target)
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
          PageManager.selectPage(self.getPostsPage())
        }
      },
      {
        text: 'Galeria',
        className: 'navigation-drawer-gallery',
        onClick: function (e) {
          PageManager.selectPage(self.getGalleryPage())
        }
      },
      {
        text: 'O klasie',
        className: 'navigation-drawer-about-class',
        onClick: function (e) {
          PageManager.selectPage(self.getAboutClassPage())
        }
      },
      {
        text: 'Plan lekcji',
        className: 'navigation-drawer-lessons-plan',
        onClick: function (e) {
          PageManager.selectPage(self.getLessonsPlanTab())
        }
      }
    ]

    navigationDrawer.setItems(navigationDrawerItems)
  }

  /**
   * On click event.
   * Hides menu.
   * @param {Event}
   */
  onClick = (e) => {
    MenuManager.toggle(false)
  }

  /**
   * On floating action button click event.
   * @param {Event}
   */
  onFABClick = (e) => {
    const postsPage = this.getPostsPage()
    const galleryPage = this.getGalleryPage()

    if (this.selectedPage === postsPage) {
      this.elements.postDialog.toggle(true)
    } else if (this.selectedPage === galleryPage) {
      const uploadPicturesDialog = galleryPage.elements.uploadPicturesDialog

      if (galleryPage.elements.picturesDialog.toggled) {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.multiple = 'true'

        input.click()
        input.addEventListener('change', function (e) {
          uploadPicturesDialog.toggle(true, input)
        })
      } else {
        this.elements.addCategoryDialog.elements.dialog.toggle(true)
      }
    }
  }

  /**
   * Moves floating action button.
   * @param {Int} height
   * @param {Int} duration
   */
  moveFAB (height, duration = 2700) {
    const fabContainer = this.elements.fabContainer

    if (window.innerWidth < 480) {
      fabContainer.style.bottom = height + 16 + 'px'

      setTimeout(function () {
        fabContainer.style.bottom = '32px'
      }, duration)
    }
  }

  toggleFullScreenDialog = (flag, root) => {
    if (flag) {
      root.style.display = 'block'

      setTimeout(function () {
        root.style.opacity = '1'
      }, 10)
    } else {
      root.style.opacity = '0'

      setTimeout(function () {
        root.style.display = 'none'
      }, 300)
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
        <Menu ref='categoryMenu' className='toolbar-menu' mobile={true} />
        <Dialog ref='deletePostsDialog' title='Jesteś pewny(a)?'>
          Nie będzie można ich odzyskać.
        </Dialog>
        <Dialog ref='deletePostDialog' title='Jesteś pewny(a)?'>
          Nie będzie można go odzyskać.
        </Dialog>
        <AddCategoryDialog ref='addCategoryDialog' />
        <Snackbar ref='deletedPostsSnackbar' text='Pomyślnie usunięto posty' />
        <Snackbar ref='deletedPostSnackbar' text='Pomyślnie usunięto post' />
        <Snackbar ref='addedPostSnackbar' text='Pomyślnie dodano post' />
        <Snackbar ref='addedCategorySnackbar' text='Pomyślnie dodano kategorię' />
        <Snackbar ref='addedPicturesSnackbar' text='Pomyślnie dodano zdjęcia' />
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
    MenuManager.setMenuItems()
    MenuManager.setPostMenuItems()
    MenuManager.setCategoryMenuItems()
    DialogManager.setDeletePostsDialogItems()
    DialogManager.setDeletePostDialogItems()

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

    if (pageToSelect !== this.getPostsPage()) {
      this.getToolbar().hideItems(false, false)
    }

    PageManager.selectPage(pageToSelect)

    this.logUser()

    const menus = [
      this.elements.menu,
      this.elements.postItemMenu,
      this.elements.categoryMenu
    ]

    for (var i = 0; i < menus.length; i++) {
      menus[i].getRoot().style.width = '0px'
    }
  }
}
