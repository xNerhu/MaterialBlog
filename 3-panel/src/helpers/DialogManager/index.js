export default class DialogManager {
  /**
   * Sets dialog action buttons.
   */
  static setDeletePostsDialogItems () {
    const app = window.app

    const postsPage = app.getPostsPage()
    const dialog = app.elements.deletePostsDialog

    const items = [
      {
        text: 'TAK',
        onClick: postsPage.onDeletePostsDialogConfirmClick
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
   * Sets dialog action buttons.
   */
  static setDeletePostDialogItems () {
    const app = window.app

    const postsPage = app.getPostsPage()
    const dialog = app.elements.deletePostDialog

    const items = [
      {
        text: 'TAK',
        onClick: postsPage.onDeletePostDialogConfirmClick
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
   * Shows or hides full screen dialog.
   * @param {Boolean}
   * @param {DOMElement}
   */
  static toggleFullScreenDialog (flag, root) {
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

  static checkForErrors (dialog) {
    const textField = dialog.textField
    const name = textField.getValue()

    if (name.length < 1 && !textField.error || name.length > textField.props.maxLength) {
      textField.toggleError(true)

      return true
    } else if (name.length > 0) {
      return false
    }
  }
}
