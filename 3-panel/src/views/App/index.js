import Component from '../../helpers/Component'
import Url from '../../helpers/Url'

import DialogManager from '../../helpers/DialogManager'
import MenuManager from '../../helpers/MenuManager'
import PageManager from '../../helpers/PageManager'

import PostDialog from '../Pages/Posts/components/PostDialog'

import ErrorDialog from './components/ErrorDialog'

import AddCategoryDialog from '../Pages/Gallery/components/AddCategoryDialog'
import EditCategoryDialog from '../Pages/Gallery/components/EditCategoryDialog'
import DeleteCategoryDialog from '../Pages/Gallery/components/DeleteCategoryDialog'
import DeletePicturesDialog from '../Pages/Gallery/components/DeletePicturesDialog'

import AddLessonDialog from '../Pages/LessonsPlan/components/AddLessonDialog'
import DeleteLessonDialog from '../Pages/LessonsPlan/components/DeleteLessonDialog'
import DeleteLessonHoursDialog from '../Pages/LessonsPlan/components/DeleteLessonHoursDialog'

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
import TimePicker from './../../imports/materialdesign/components/TimePicker'

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
  getToolbar () {
    return this.elements.toolbar
  }

  /**
   * Gets navigation drawer.
   * @return {NavigationDrawer}
   */
  getNavigationDrawer () {
    return this.elements.navigationDrawer
  }

  /**
   * Gets posts page.
   * @return {PostsPage}
   */
  getPostsPage () {
    return this.elements.postsPage
  }

  /**
   * Gets gallery page.
   * @return {GalleryPage}
   */
  getGalleryPage () {
    return this.elements.galleryPage
  }

  /**
   * Gets about class page.
   * @return {AboutClassPage}
   */
  getAboutClassPage () {
    return this.elements.aboutClassPage
  }

  /**
   * Gets lessons plan page.
   * @return {LessonsPlanPage}
   */
  getLessonsPlanPage () {
    return this.elements.lessonsPlanPage
  }

  /**
   * Gets menu.
   * @return {Menu}
   */
  getMenu () {
    return this.elements.menu
  }

  /**
   * Gets preloader.
   * @return {Preloader}
   */
  getPreloader () {
    return this.elements.preloader
  }

  /**
   * Shows or hides preloader.
   * @param {Boolean}
   */
  togglePreloader (flag) {
    this.getPreloader().getRoot().style.display = (!flag) ? 'none' : 'block'
  }

  /**
   * Shows or hides floatig action button.
   * @param {Boolean}
   */
  toggleFAB (flag) {
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
   * On multi icon click event.
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
      if (picturesDialog.toggledDeleteMode) {
        picturesDialog.toggleDeleteMode(false)
      } else if (picturesDialog.toggled) {
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
  logUser () {
    this.accountInfo = {
      userID: 1,
      userName: 'Mikołaj Palkiewicz',
      avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
      email: 'xnerhu22@onet.pl'
    }

    this.callElements()
  }

  /**
   * Triggers on user log event.
   */
  callElements () {
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
  setToolbarItems () {
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
        onClick: this.onToolbarDeleteButtonClick
      },
      {
        type: 'Icon',
        ref: 'menuIcon',
        position: 'Right',
        className: 'toolbar-icon-more',
        onClick: this.onToolbarMenuIconClick
      },
      {
        type: 'Icon',
        ref: 'viewIcon',
        position: 'Right',
        className: 'toolbar-icon-view',
        onClick: postsPage.onViewClick,
        onMouseEnter: postsPage.onViewMouseEnter,
        onMouseLeave: postsPage.onViewMouseLeave
      },
      {
        type: 'Icon',
        ref: 'showPicturesIcon',
        position: 'Right',
        className: 'toolbar-icon-show-pictures',
        onClick: postsPage.onShowPicturesClick,
        onMouseEnter: postsPage.onShowPicturesMouseEnter,
        onMouseLeave: postsPage.onShowPicturesMouseLeave
      }
    ]

    toolbar.setItems(items)
  }

  /**
   * Sets navigation drawer items.
   */
  setNavigationDrawerItems () {
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
          PageManager.selectPage(self.getLessonsPlanPage())
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
      if (galleryPage.elements.picturesDialog.toggled) {
        galleryPage.elements.uploadPicturesDialog.triggerFileDialog()
      } else {
        this.elements.addCategoryDialog.elements.dialog.toggle(true)
      }
    }
  }

  /**
   * Moves floating action button.
   * @param {Int} height
   * @param {Int} duration (optional)
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

  onToolbarMenuIconClick = (e) => {
    if (this.selectedPage === this.getPostsPage()) {
      MenuManager.toggle(true, this.elements.menu, e.target)
    } else if (this.selectedPage === this.getGalleryPage()) {
      MenuManager.toggle(true, this.elements.picturesMenu, e.target)
    }
  }

  onToolbarDeleteButtonClick = (e) => {
    const postsPage = this.getPostsPage()
    const galleryPage = this.getGalleryPage()

    if (this.selectedPage === postsPage) {
      postsPage.onDeletePostsButtonClick
    } else if (this.selectedPage === galleryPage && galleryPage.elements.picturesDialog.toggledDeleteMode) {
      const picturesDialog = galleryPage.elements.picturesDialog

      if (picturesDialog.selectedPictures.length > 0) {
        this.elements.deletePicturesDialog.elements.dialog.toggle(true)
      }
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
        <Menu ref='menu' className='toolbar-menu' mobile='true' />
        <Menu ref='postItemMenu' className='toolbar-menu' mobile='true' />
        <Menu ref='categoryMenu' className='toolbar-menu' mobile='true' />
        <Menu ref='picturesMenu' className='toolbar-menu' mobile='true' />
        <Menu ref='lessonsPlanSubjectMenu' className='toolbar-menu' mobile='true' />
        <Dialog ref='deletePostsDialog' title='Jesteś pewny(a)?'>
          Nie będzie można ich odzyskać.
        </Dialog>
        <Dialog ref='deletePostDialog' title='Jesteś pewny(a)?'>
          Nie będzie można go odzyskać.
        </Dialog>
        <AddCategoryDialog ref='addCategoryDialog' />
        <EditCategoryDialog ref='editCategoryDialog' />
        <DeleteCategoryDialog ref='deleteCategoryDialog' />
        <DeletePicturesDialog ref='deletePicturesDialog' />
        <AddLessonDialog ref='addLessonDialog' />
        <DeleteLessonDialog ref='deleteLessonDialog' />
        <DeleteLessonHoursDialog ref='deleteLessonHoursDialog' />
        <ErrorDialog ref='errorDialog' />
        <TimePicker ref='timePicker' onConfirm={(hour, minutes, isAM) => { this.getLessonsPlanPage().onTimePickerConfirm(hour, minutes, isAM) }} />
        <Snackbar ref='deletePostsSnackbar' text='Usunięto posty' />
        <Snackbar ref='deletePostSnackbar' text='Usunięto post' />
        <Snackbar ref='addPostSnackbar' text='Dodano nowy post' />
        <Snackbar ref='addCategorySnackbar' text='Dodano nową kategorię' />
        <Snackbar ref='editCategorySnackbar' text='Zapisano kategorię' />
        <Snackbar ref='deleteCategorySnackbar' text='Usunięto kategorię' />
        <Snackbar ref='addPicturesSnackbar' text='Dodano zdjęcia' />
        <Snackbar ref='deletePicturesSnackbar' text='Usunięto zdjęcia' />
        <Snackbar ref='deleteLessonSnackbar' text='Usunięto lekcję' />
        <Snackbar ref='deleteLessonHoursSnackbar' text='Usunięto godziny lekcji' />
        <Tooltip ref='viewTooltip' text='Przełącz na liste' />
        <Tooltip ref='showPicturesTooltip' text='Pokaż zdjęcia' />
        <Tooltip ref='uploadButtonTooltip' text='Najlepiej w proporcjach 16:9' />
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
    MenuManager.setPicturesMenuItems()
    MenuManager.setLessonsPlanSubjectMenu()
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
        pageToSelect = this.getLessonsPlanPage()
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
      this.elements.categoryMenu,
      this.elements.picturesMenu,
      this.elements.lessonsPlanSubjectMenu
    ]

    for (var i = 0; i < menus.length; i++) {
      menus[i].getRoot().style.width = '0px'
    }
  }
}
