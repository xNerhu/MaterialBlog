import Component from 'inferno-component'

import { deleteComment } from '../../../../../../actions/posts'

import Dialog from '../../../../../../materialdesign/components/Dialog'
import Preloader from '../../../../../../materialdesign/components/Preloader'

export default class DeleteCommentDialog extends Component {
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

  onDeleteButtonClick = async (e) => {
    const root = this.getRoot()
    const dialog = this.elements.dialog

    root.classList.add('enabled-preloader')

    const postsTab = window.blog.elements.postsTab
    const posts = postsTab.state.posts.slice()
    const selectedComment = postsTab.selectedComment
    const postIndex = posts.indexOf(selectedComment.props.post.props.data)
    const commentIndex = posts[postIndex].comments.indexOf(selectedComment.props.data)

    const json = await deleteComment(posts[postIndex]._id, selectedComment.props.data._id)
    if (!json.success) return console.error(json)

    posts[postIndex].comments.splice(commentIndex, 1)

    postsTab.setState({
      posts
    })

    dialog.toggle(false)
    root.classList.remove('enabled-preloader')
  }

  render () {
    return (
      <div className='input-dialog' ref={(e) => this.elements.root = e}>
        <Dialog title='Czy napewno chcesz usunąć ten komentarz?' ref={(e) => this.elements.dialog = e} items={this.state.dialogItems}>
          <div className='text'>
            Nie będzie można tego cofnąć.
          </div>
          <Preloader />
        </Dialog>
      </div>
    )
  }
}
