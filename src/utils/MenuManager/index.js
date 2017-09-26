export default class MenuManager {
  /**
   * Shows or hides menu.
   * @param {Boolean} show or hide.
   * @param {Menu} menu
   * @param {DOMElement} clicked element
   */
  static toggle (flag, _menu, clickedElement, removeEvent) {
    const app = window.app

    if (removeEvent) document.removeEventListener('click', app.onClick)

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
        menuRoot.style.top = 'unset'
        menuRoot.style.bottom = bottom + 'px'
      }

      if (left !== false) {
        menuRoot.style.left = left + 'px'
      } else {
        menuRoot.style.left = 'unset'
        menuRoot.style.right = right + 'px'
      }

      menuRoot.style.overflowY = 'hidden'
      menuRoot.style.opacity = '1'

      setTimeout(() => {
        document.removeEventListener('click', app.onClick)

        menuRoot.style.width = '112px'
        menuRoot.style.height = menuRoot.scrollHeight + 'px'

        setTimeout(() => {
          this.toggleItems(true, menu)

          setTimeout(() => {
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

      setTimeout(() => {
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

      setTimeout(() => {
        menuItemRoot.style.opacity = (flag) ? '1' : '0'
      }, i * 25)
    }
  }

  static setBlogCommentMenuItems () {
    const app = window.app
    const menu = app.blogElements.commentMenu

    const items = [
      {
        text: 'Edytuj',
        onClick: () => {
          window.blog.elements.editCommentDialog.show()
        }
      },
      {
        text: 'Usuń',
        onClick: () => {
          window.blog.elements.deleteCommentDialog.elements.dialog.toggle(true)
        }
      }
    ]

    menu.setItems(items)
  }

  /**
   * Sets panel toolbar more menu items.
   */
  static setPanelToolbarMenuItems () {
    const app = window.app
    const panel = window.panel
    const menu = app.panelElements.toolbarMenu

    const items = [
      {
        text: 'Dodaj',
        onClick: () => {
          if (app.getLocationPath() === '/panel/' || app.getLocationPath() === '/panel') {
            panel.elements.postsPage.elements.postDialog.toggle(true)
          }
        }
      },
      {
        text: 'Usuń',
        onClick: () => {
          const postsPage = panel.elements.postsPage

          if (app.getLocationPath() === '/panel/' || window.app.getLocationPath() === '/panel') {
            postsPage.toggleDeletingMode(true)
          } else {
            panel.elements.galleryPage.elements.picturesDialog.toggleDeletingMode(true)
          }
        }
      }
    ]

    menu.setItems(items)
  }

  /**
   * Sets panel post menu items.
   */
  static setPanelPostMenuItems () {
    const panel = window.panel
    const menu = window.app.panelElements.postMenu

    const items = [
      {
        text: 'Edytuj',
        onClick: () => {
          const postsPage = panel.elements.postsPage

          postsPage.elements.postDialog.toggle(true, postsPage.selectedPost)
        }
      },
      {
        text: 'Usuń',
        onClick: () => {
          panel.elements.deletePostDialog.elements.dialog.toggle(true)
        }
      }
    ]

    menu.setItems(items)
  }

  /**
   * Sets panel category menu items.
   */
  static setPanelCategoryMenuItems () {
    const panel = window.panel
    const menu = window.app.panelElements.categoryMenu

    const items = [
      {
        text: 'Dodaj',
        onClick: () => {
          panel.elements.galleryPage.elements.uploadPicturesDialog.toggle(true)
        }
      },
      {
        text: 'Otwórz',
        onClick: () => {
          panel.elements.galleryPage.elements.picturesDialog.toggle(true)
        }
      },
      {
        text: 'Edytuj',
        onClick: () => {
          panel.elements.editCategoryDialog.show()
        }
      },
      {
        text: 'Usuń',
        onClick: () => {
          panel.elements.deleteCategoryDialog.elements.dialog.toggle(true)
        }
      }
    ]

    menu.setItems(items)
  }

  static setPanelLessonsPlanMenu () {
    const panel = window.panel
    const menu = window.app.panelElements.lessonsPlanMenu

    const items = [
      {
        text: 'Usuń',
        onClick: (e) => {
          panel.elements.lessonsPlanPage.onMenuDeleteButtonClick(e)
        }
      }
    ]

    menu.setItems(items)
  }
}
