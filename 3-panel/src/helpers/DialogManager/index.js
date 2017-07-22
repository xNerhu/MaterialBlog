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
}
