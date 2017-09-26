import Component from 'inferno-component'

import { editComment } from '../../../../../../actions/posts'

import Dialog from '../../../../../../materialdesign/components/Dialog'
import Preloader from '../../../../../../materialdesign/components/Preloader'
import TextField from '../../../../../../materialdesign/components/TextField'

export default class EditCommentDialog extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      dialogItems: [
        {
          text: 'ZAPISZ',
          onClick: this.onSaveButtonClick
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

  onSaveButtonClick = async (e) => {
    const root = this.getRoot()
    const dialog = this.elements.dialog

    const textField = this.elements.textField

    if (textField.getValue().length < 1 || textField.getValue().length > 100) return textField.toggleError(true)

    const content = textField.getValue().replace(/\r?\n/g, '<br />')

    root.classList.add('enabled-preloader')

    const postsTab = window.blog.elements.postsTab
    const posts = postsTab.state.posts.slice()
    const selectedComment = postsTab.selectedComment
    const postIndex = posts.indexOf(selectedComment.props.post.props.data)
    const commentIndex = posts[postIndex].comments.indexOf(selectedComment.props.data)

    const json = await editComment(posts[postIndex]._id, selectedComment.props.data._id, content)
    if (!json.success) return console.error(json)

    posts[postIndex].comments[commentIndex].content = content

    postsTab.setState({
      posts
    })

    dialog.toggle(false)
    root.classList.remove('enabled-preloader')
    textField.setValue('')
  }

  show () {
    const content = window.blog.elements.postsTab.selectedComment.props.data.content.replace(/<br *\/?>/gi, '\n')
    this.elements.textField.setValue(content)
    this.elements.dialog.toggle(true)
  }

  render () {
    return (
      <div className='input-dialog edit-comment-dialog' ref={(e) => this.elements.root = e}>
        <Dialog title='Edytowanie komentarza' ref={(e) => this.elements.dialog = e} items={this.state.dialogItems}>
          <TextField ref={(e) => this.elements.textField = e} textarea={true} hint='Treść' maxLength={100} />
          <Preloader />
        </Dialog>
      </div>
    )
  }
}
