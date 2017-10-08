import Component from 'inferno-component'

import Dialog from '../../../../../../materialdesign/components/Dialog'
import Preloader from '../../../../../../materialdesign/components/Preloader'

export default class DeletePostDialog extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      dialogItems: [
        {
          text: 'USUŃ',
          onClick: this.onDeleteButtonClick
        },
        {
          text: 'ANULUJ',
          onClick: this.onCancelButtonClick
        }
      ]
    }
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  onCancelButtonClick = (e) => {
    this.elements.dialog.toggle(false)
  }

  onDeleteButtonClick = (e) => {
    const panel = window.panel
    const postsPage = panel.elements.postsPage
    const snackbar = panel.elements.deletePostSnackbar

    const root = this.getRoot()
    const dialog = this.elements.dialog

    root.classList.add('enabled-preloader')

    const index = postsPage.state.posts.indexOf(postsPage.selectedPost.props.data)
    if (index < 0) console.log('Index is less than 0')

    postsPage.deletePost(index, (err) => {
      if (!err) {
        dialog.toggle(false)
        snackbar.toggle(true)
        panel.moveFAB(snackbar.getRoot().scrollHeight)
        root.classList.remove('enabled-preloader')
      }
    })
  }

  render () {
    return (
      <div className='input-dialog delete-post-dialog' ref={(e) => this.elements.root = e}>
        <Dialog title='Czy napewno chcesz usunąć ten post?' ref={(e) => this.elements.dialog = e} items={this.state.dialogItems}>
          <div className='text'>
            Nie będzie można tego cofnąć.
          </div>
          <Preloader />
        </Dialog>
      </div>
    )
  }
}
