export default class MenuManager {
  /**
   * Shows or hides menu.
   * @param {Boolean} show or hide.
   * @param {Menu} menu
   * @param {DOMElement} clicked element
   */
  static toggle (flag, _menu, clickedElement) {
    const app = window.app

    const self = this
    const menu = (flag) ? _menu : app.toggledMenu

    const menuRoot = menu.getRoot()

    if (app.toggledMenu !== false) {
      if (_menu !== app.toggledMenu) {
        this.toggle(false, app.toggledMenu)
      }
    }

    if (flag) {
      let top = 8
      let bottom = false
      let left = 0
      let right = false

      menuRoot.style.display = 'block'

      if (clickedElement != null) {
        const bounds = clickedElement.getBoundingClientRect()

        top = bounds.top + 8

        if (top + menuRoot.scrollHeight >= window.innerHeight) {
          top = false
          bottom = bounds.bottom - bounds.top
        }

        left = bounds.left

        if (left + 112 >= window.innerWidth) {
          left = false
          right = bounds.right - bounds.left - 4
        }
      }

      if (top !== false) {
        menuRoot.style.top = top + 'px'
      } else {
        menuRoot.style.top = 'initial'
        menuRoot.style.bottom = bottom + 'px'
      }

      if (left !== false) {
        menuRoot.style.left = left + 'px'
      } else {
        menuRoot.style.left = 'initial'
        menuRoot.style.right = right + 'px'
      }

      menuRoot.style.overflowY = 'hidden'
      menuRoot.style.opacity = '1'

      setTimeout(function () {
        document.removeEventListener('click', app.onClick)

        menuRoot.style.width = '112px'
        menuRoot.style.height = menuRoot.scrollHeight + 'px'

        setTimeout(function () {
          self.toggleItems(true, menu)

          setTimeout(function () {
            menuRoot.style.overflowY = 'auto'
          }, 200)
        }, 100)

        document.addEventListener('click', app.onClick)
      }, 10)

      app.toggledMenu = menu
    } else {
      document.removeEventListener('click', app.onClick)

      menuRoot.style.overflowY = 'hidden'

      menuRoot.style.height = '0px'
      menuRoot.style.width = '0px'

      this.toggleItems(false, menu)

      menuRoot.style.opacity = '0'

      setTimeout(function () {
        menuRoot.style.display = 'none'
      }, 300)

      app.toggledMenu = false
    }
  }

  /**
   * Shows or hides menu items.
   * @param {Boolean} show or hide
   * @param {Menu} menu
   */
  static toggleItems (flag, menu) {
    for (var i = 0; i < menu.items.length; i++) {
      const menuItem = menu.items[i]
      const menuItemRoot = menuItem.getRoot()

      setTimeout(function () {
        menuItemRoot.style.opacity = (flag) ? '1' : '0'
      }, i * 25)
    }
  }

  /**
   * Sets menu items.
   */
  static setMenuItems () {
    const app = window.app
    const menu = app.getMenu()
    const postDialog = app.elements.postDialog
    const postsPage = app.getPostsPage()

    const items = [
      {
        text: 'Dodaj',
        onClick: function () {
          postDialog.toggle(true)
        }
      },
      {
        text: 'Usuń',
        onClick: postsPage.onMenuItemDeletePostsClick
      }
    ]

    menu.setItems(items)
  }

  /**
   * Sets post menu items.
   */
  static setPostMenuItems () {
    const app = window.app
    const menu = app.elements.postItemMenu
    const dialog = app.elements.deletePostDialog

    const postsPage = app.getPostsPage()

    const items = [
      {
        text: 'Edytuj',
        onClick: postsPage.onMenuItemEditPostClick
      },
      {
        text: 'Usuń',
        onClick: function () {
          dialog.toggle(true)
        }
      }
    ]

    menu.setItems(items)
  }

  /**
   * Sets category menu items.
   */
  static setCategoryMenuItems () {
    const app = window.app
    const menu = app.elements.categoryMenu
    const gallery = app.getGalleryPage()

    const items = [
      {
        text: 'Dodaj',
        onClick: gallery.elements.uploadPicturesDialog.triggerFileDialog
      },
      {
        text: 'Otwórz',
        onClick: function (e) {
          gallery.clickedCategory.onClick(e)
        }
      },
      {
        text: 'Edytuj',
        onClick: function (e) {
          app.elements.editCategoryDialog.show(gallery.clickedCategory.props.data)
        }
      },
      {
        text: 'Usuń',
        onClick: function (e) {
          app.elements.deleteCategoryDialog.elements.dialog.toggle(true)
        }
      }
    ]

    menu.setItems(items)
  }

  static setPicturesMenuItems () {
    const app = window.app
    const menu = app.elements.picturesMenu

    const items = [
      {
        text: 'Usuń',
        onClick: function () {
          app.getGalleryPage().elements.picturesDialog.toggleDeleteMode(true)
        }
      }
    ]

    menu.setItems(items)
  }

  static setLessonsPlanSubjectMenu () {
    const app = window.app
    const menu = app.elements.lessonsPlanSubjectMenu
    const lessonsPlanPage = app.getLessonsPlanPage()

    const items = [
      {
        text: 'Usuń',
        onClick: function () {
          if (lessonsPlanPage.deletingLesson) {
            app.elements.deleteLessonDialog.elements.dialog.toggle(true)
          } else {
            app.elements.deleteLessonHoursDialog.elements.dialog.toggle(true)
          }
        }
      }
    ]

    menu.setItems(items)
  }
}
