import Component from '../../../../../helpers/Component'

import Dialog from '../../../../../imports/materialdesign/components/Dialog'

import Preloader from '../../../../../imports/materialdesign/components/Preloader'

export default class DeletePostDialog extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Sets dialog action buttons.
   */
  setDialogItems () {
    const dialog = this.elements.dialog

    const items = [
      {
        text: 'USUŃ',
        onClick: this.onDeleteButtonClick
      },
      {
        text: 'ANULUJ',
        onClick: function () {
          dialog.toggle(false)
        }
      }
    ]

    dialog.setItems(items)
  }

  onDeleteButtonClick = (e) => {
    const app = window.app
    const postsPage = app.getPostsPage()
    const snackbar = app.elements.deletePostSnackbar

    const root = this.getRoot()
    const dialog = this.elements.dialog

    root.classList.add('enabled-preloader')

    setTimeout(function () {
      root.classList.remove('enabled-preloader')

      snackbar.toggle(true)
      app.moveFAB(snackbar.getRoot().scrollHeight)

      postsPage.toggleCheckBoxes(false, false)
      postsPage.deletePost(postsPage.clickedPost.props.data, postsPage.clickedPost)
      dialog.toggle(false)
    }, 1000)
  }

  render () {
    return (
      <div className='input-dialog delete-post-dialog' ref='root'>
        <Dialog title='Czy napewno chcesz usunąć ten post?' ref='dialog'>
          <div className='text'>
            Nie będzie można tego cofnąć.
          </div>
          <Preloader />
        </Dialog>
      </div>
    )
  }

  afterRender () {
    this.setDialogItems()
  }
}
