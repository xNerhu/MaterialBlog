import Component from 'inferno-component'
import { Route, Router } from 'inferno-router'
import createBrowserHistory from 'history/createBrowserHistory'

import { userInfo, getModerators } from '../../actions/user'

import MenuManager from '../../utils/MenuManager'

import NavigationDrawer from '../NavigationDrawer'
import NavigationDrawerFooter from '../NavigationDrawerFooter'

import Toolbar from '../Toolbar'
import ToolbarIcon from '../Toolbar/components/ToolbarIcon'
import ToolbarButton from '../Toolbar/components/ToolbarButton'

import PostsPage from './pages/Posts'
import PostsFilterDialog from './pages/Posts/components/PostsFilterDialog'
import DeletePostDialog from './pages/Posts/components/DeletePostDialog'
import DeletePostsDialog from './pages/Posts/components/DeletePostsDialog'

import GalleryPage from './pages/Gallery'
import AddCategoryDialog from './pages/Gallery/components/AddCategoryDialog'
import DeleteCategoryDialog from './pages/Gallery/components/DeleteCategoryDialog'
import EditCategoryDialog from './pages/Gallery/components/EditCategoryDialog'
import DeletePicturesDialog from './pages/Gallery/components/DeletePicturesDialog'

import AddLessonDialog from './pages/LessonsPlan/components/AddLessonDialog'

import Preloader from '../../materialdesign/components/Preloader'
import Tooltip from '../../materialdesign/components/Tooltip'
import FAB from '../../materialdesign/components/FAB'
import Snackbar from '../../materialdesign/components/Snackbar'
import TimePicker from '../../materialdesign/components/TimePicker'

export default class Panel extends Component {
  constructor () {
    super()
    this.elements = {}

    window.panel = this

    this.state = {
      userInfo: false,
      toolbarTitle: '',
      preloader: true,
    }

    this.defaultToolbarTitle = ''
    this.moderators = []
    this.postsPageToolbarItems = []
    this.hiddedPostsPageToolbarItems = false

    this.navigationDrawerItems = [
      {
        text: 'Posty',
        className: 'navigation-drawer-posts',
        onClick: () => {
          this.changePage('/panel/')
        }
      },
      {
        text: 'Galeria',
        className: 'navigation-drawer-gallery',
        onClick: () => {
          this.changePage('/panel/gallery')
        }
      },
      {
        text: 'Plan lekcji',
        className: 'navigation-drawer-lessons-plan',
        onClick: () => {
          this.changePage('/panel/lessonsplan')
        }
      },
      {
        text: 'Zarządzanie kontem',
        className: 'navigation-drawer-manage-account',
        onClick: () => {
          this.changePage('/panel/manageaccount')
        }
      },
      {
        text: 'Wróć na bloga',
        className: 'navigation-drawer-back-to-blog',
        onClick: () => {
          window.location.href = '/'
        }
      },
      {
        text: 'Wyloguj się',
        className: 'navigation-drawer-logout',
        onClick: () => {
          this.changePage('logout')
        }
      }
    ]
  }

  /**
   * Gets multiicon.
   * @return {MultiIcon}
   */
  getMultiIcon () {
    return this.elements.toolbar.elements.multiIcon
  }

  /**
   * Shows or hides floatig action button.
   * @param {Boolean}
   */
  toggleFAB (flag) {
    const fab = this.elements.fab.getRoot()

    setTimeout(() => {
      fab.style.display = (flag) ? 'block' : 'none'
    }, (flag) ? 1 : 300)

    setTimeout(() => {
      const size = ((flag) ? 56 : 0) + 'px'

      fab.style.height = size
      fab.style.width = size
    }, (flag) ? 20 : 1)
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

    const locationPath = window.app.getLocationPath()

    // If page is gallery
    if (locationPath.includes('gallery')) {
      const galleryPage = this.elements.galleryPage
      const picturesDialog = galleryPage.elements.picturesDialog

      // If pictures dialog is toggled on
      if (picturesDialog.toggled) {
        // Disable pictures deleting mode
        if (picturesDialog.toggledDeletingMode) {
          return picturesDialog.toggleDeletingMode(false)
        } else {
          // Show pictures dialog
          return picturesDialog.toggle(false)
        }
      }
    } else if (locationPath === '/panel' || locationPath === '/panel/') {
      const postsPage = this.elements.postsPage
      const postDialog = postsPage.elements.postDialog

      // If deleting posts mode is toggled on
      if (postsPage.toggledDeletingMode) {
        // Disable posts deleting mode
        return postsPage.toggleDeletingMode(false)
      } else if (postDialog.toggled) { // If post dialog is toggled on
        // Hide post dialog
        return postDialog.toggle(false)
      }
    }

    // If navigation drawer is toggled on then hide it
    if (!navigationDrawer.toggled) {
      multiIcon.changeToExit()
      navigationDrawer.show()
   } else {
      multiIcon.changeToDefault()
      navigationDrawer.hide()
   }
  }

  onToolbarViewIconClick = (e) => {
    const postsPage = this.elements.postsPage

    postsPage.toggleTable(!postsPage.toggledTable)
    this.elements.viewTooltip.toggle(false)
  }

  onToolbarViewIconMouseEnter = (e) => {
    const tooltip = this.elements.viewTooltip

    tooltip.setText((this.elements.postsPage.toggledTable) ? 'Przełącz na listę' : 'Przełącz na tabelę')
    tooltip.show(e.target)
  }

  onToolbarShowPicturesIconClick = (e) => {
    const postsPage = this.elements.postsPage

    postsPage.togglePictures(!postsPage.toggledPictures)
    this.elements.showPicturesTooltip.toggle(false)
  }

  onToolbarShowPicturesIconMouseEnter = (e) => {
    const tooltip = this.elements.showPicturesTooltip

    tooltip.setText((this.elements.postsPage.toggledPictures) ? 'Ukryj zdjęcia' : 'Pokaż zdjęcia')
    tooltip.show(e.target)
  }

  /**
   * On toolbar more icon click.
   * Shows menu.
   * @param {Event}
   */
  onToolbarMoreIconClick = (e) => {
    MenuManager.toggle(true, window.app.panelElements.toolbarMenu, e.target)
  }

  /**
   * On floating action button click.
   * @param {Event}
   */
  onFABClick = (e) => {
    const locationPath = window.app.getLocationPath()

    // If page is gallery
    if (locationPath.includes('gallery')) {
      const galleryPage = this.elements.galleryPage
      const picturesDialog = galleryPage.elements.picturesDialog

      // If pictures dialog is toggled on
      if (picturesDialog.toggled) {
        // Trigger file dialog for upload pictures
        galleryPage.elements.uploadPicturesDialog.toggle(true, galleryPage.selectedCategory)
      } else {
        // Show add category dialog
        this.elements.addCategoryDialog.elements.dialog.toggle(true)
      }
    } else if (locationPath === '/panel' || locationPath === '/panel/') { // If page is posts
      // Show post dialog
      this.elements.postsPage.elements.postDialog.toggle(true)
    }
  }

  onToolbarButtonSaveClick = (e) => {
    this.elements.postsPage.elements.postDialog.save()
  }

  onToolbarButtonDeleteClick = (e) => {
    const locationPath = window.app.getLocationPath()

    // If page is gallery
    if (locationPath.includes('gallery')) {
      const picturesDialog = this.elements.galleryPage.elements.picturesDialog

      // If there is more selected pictures than 0
      if (picturesDialog.getSelectedPictures().length > 0) {
        // Show delete pictures confirm dialog
        this.elements.deletePicturesDialog.elements.dialog.toggle(true)
      }
    } else if (locationPath === '/panel' || locationPath === '/panel/') {
      this.elements.postsPage.deleteSelectedPosts()
    }
  }

  onToolbarFilterIconClick = (e) => {
    this.elements.postsFilterDialog.elements.dialog.toggle(true)
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

      setTimeout(() => {
        fabContainer.style.bottom = '32px'
      }, duration)
    }
  }

  /**
   * Gets info about logged user.
   */
  async getUserInfo () {
    // Get user info
    const json = await userInfo()
    // Get moderators info
    const moderators = await getModerators()
    const locationPath = window.app.getLocationPath()

    if (!json.success) {
      alert('Can\'t get user info!')
      return console.error(json)
    }

    if (moderators.success === false) return console.error(json)

    json.info.avatar = '../' + json.info.avatar

    this.setState({
      userInfo: json.info,
    })
    this.moderators = moderators
    this.load()
  }

  load () {
    const locationPath = window.app.getLocationPath()
    let component = null

    if (locationPath.includes('manageaccount')) {
      component = this.elements.manageAccountPage
    } else if (locationPath.includes('lessonsplan')) {
      component = this.elements.lessonsPlanPage
    } else if (locationPath.includes('gallery')) {
      component = this.elements.galleryPage
    } else {
      component = this.elements.postsPage

      // Set filter dialog items
      let filterDialogItems = [
        {
          text: 'Wszyscy',
          data: {
            _id: 'all'
          }
        }
      ]

      for (var i = 0; i < this.moderators.length; i++) {
        filterDialogItems.push({
          text: this.moderators[i].username,
          data: {
            _id: this.moderators[i]._id
          },
          selected: (this.state.userInfo._id === this.moderators[i]._id)
        })
      }

      this.elements.postsFilterDialog.setState({
        userDropDownItems: filterDialogItems
      })
    }

    component.load()
  }

  /**
   * Change page.
   * @param {String}
   */
  changePage (page) {
    const browserHistory = window.app.getBrowserHistory()
    const navigationDrawer = this.elements.navigationDrawer

    if (page === 'logout') return window.location.href = '/logout?panel=true'

    // If navigation drawer is toggled then hide it
    if (navigationDrawer.toggled) {
      this.getMultiIcon().changeToDefault()
      navigationDrawer.hide()
    }

    // If page is not latest page
    if (browserHistory.location.pathname !== page) {
      browserHistory.push(page)

      this.togglePreloader(true)
      this.load()
      this.toggleToolbarItems()
    }
  }

  /**
   * Shows or hides toolbar items.
   */
  toggleToolbarItems () {
    const locationPath = window.app.getLocationPath()

    if (locationPath === '/panel/' || locationPath === '/panel') {
      if (this.hiddedPostsPageToolbarItems) {
        this.elements.toolbar.showItems(this.postsPageToolbarItems)
      }
    } else {
      this.hiddedPostsPageToolbarItems = true
      this.elements.toolbar.hideItems(this.postsPageToolbarItems)
    }
  }

  render () {
    const preloaderStyle = {
      display: (this.state.preloader) ? 'block' : 'none'
    }

    return (
      <div>
        <div className='app-content panel' ref={(e) => this.elements.appContent = e}>
          <Toolbar ref={(e) => this.elements.toolbar = e} title={this.state.toolbarTitle} onMultiIconClick={this.onMultiIconClick}>
            <ToolbarIcon
              className='toolbar-icon-more'
              onClick={this.onToolbarMoreIconClick}
              ref={(e) => this.elements.toolbarMoreIcon = e}
            />
            <ToolbarIcon
              className='toolbar-icon-filter'
              onClick={this.onToolbarFilterIconClick}
              ref={(e) => this.elements.toolbarFilterIcon = e}
            />
            <ToolbarIcon
              className='toolbar-icon-view'
              onClick={this.onToolbarViewIconClick}
              onMouseEnter={this.onToolbarViewIconMouseEnter}
              ref={(e) => this.elements.toolbarViewIcon = e}
            />
            <ToolbarIcon
              className='toolbar-icon-show-pictures'
              onClick={this.onToolbarShowPicturesIconClick}
              onMouseEnter={this.onToolbarShowPicturesIconMouseEnter}
              ref={(e) => this.elements.toolbarShowPicturesIcon = e}
            />
            <ToolbarButton
              text='ZAPISZ'
              className='toolbar-button-save'
              onClick={this.onToolbarButtonSaveClick}
              ref={(e) => this.elements.toolbarSaveButton = e}
            />
            <ToolbarButton
              text='USUŃ'
              className='toolbar-button-delete'
              onClick={this.onToolbarButtonDeleteClick}
              ref={(e) => this.elements.toolbarDeleteButton = e}
            />
          </Toolbar>
          {this.props.children}
        </div>
        <div className='fab' ref={(e) => this.elements.fabContainer = e}>
          <FAB onClick={this.onFABClick} ref={(e) => this.elements.fab = e} />
        </div>
        <Preloader className='data-preloader' style={preloaderStyle} />
        <PostsFilterDialog ref={(e) => this.elements.postsFilterDialog = e} />
        <DeletePostDialog ref={(e) => this.elements.deletePostDialog = e} />
        <DeletePostsDialog ref={(e) => this.elements.deletePostsDialog = e} />
        <AddCategoryDialog ref={(e) => this.elements.addCategoryDialog = e} />
        <DeleteCategoryDialog ref={(e) => this.elements.deleteCategoryDialog = e} />
        <EditCategoryDialog ref={(e) => this.elements.editCategoryDialog = e} />
        <DeletePicturesDialog ref={(e) => this.elements.deletePicturesDialog = e} />
        <AddLessonDialog ref={(e) => this.elements.addLessonDialog = e} />
        <TimePicker
          ref={(e) => this.elements.lessonsPlanTimePicker = e}
          onConfirmButtonClick={(e) => {
            this.elements.lessonsPlanPage.onTimePickerConfirmButtonClick(e)
          }}
        />
        <Tooltip ref={(e) => this.elements.viewTooltip = e} text='Przełącz na liste' />
        <Tooltip ref={(e) => this.elements.showPicturesTooltip = e} text='Pokaż zdjęcia' />
        <Tooltip ref={(e) => this.elements.uploadButtonTooltip = e} text='Najlepiej w proporcjach 16:9' />
        <Snackbar ref={(e) => this.elements.addPostSnackbar = e} text='Dodano post' />
        <Snackbar ref={(e) => this.elements.savePostSnackbar = e} text='Zapisano post' />
        <Snackbar ref={(e) => this.elements.deletePostSnackbar = e} text='Usunięto post' />
        <Snackbar ref={(e) => this.elements.deletePostsSnackbar = e} text='Usunięto posty' />
        <Snackbar ref={(e) => this.elements.addCategorySnackbar = e} text='Dodano kategorię' />
        <Snackbar ref={(e) => this.elements.deleteCategorySnackbar = e} text='Usunięto kategorię' />
        <Snackbar ref={(e) => this.elements.saveCategorySnackbar = e} text='Zapisano kategorię' />
        <Snackbar ref={(e) => this.elements.deletePicturesSnackbar = e} text='Usunięto zdjęcia' />
        <NavigationDrawer
          ref={(e) => this.elements.navigationDrawer = e}
          items={this.navigationDrawerItems}
          parentComponent={this}
          userInfo={this.state.userInfo}>
          <NavigationDrawerFooter />
        </NavigationDrawer>
      </div>
    )
  }

  componentDidMount () {
    const browserHistory = window.app.getBrowserHistory()
    const locationPath = window.app.getLocationPath()
    const split = locationPath.split('/')

    if (split[split.length - 1] === '') {
      browserHistory.push(locationPath.substring(0, locationPath.length - 1))
    }

    this.togglePreloader(true)

    this.postsPageToolbarItems = [
      this.elements.toolbarMoreIcon,
      this.elements.toolbarFilterIcon,
      this.elements.toolbarViewIcon,
      this.elements.toolbarShowPicturesIcon
    ]

    this.getUserInfo()
    this.toggleToolbarItems()

    document.title = 'Panel CMS'
  }
}
