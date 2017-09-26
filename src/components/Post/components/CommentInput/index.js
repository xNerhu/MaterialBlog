import Component from 'inferno-component'

import { addComment } from '../../../../actions/posts'

import TextField from '../../../../materialdesign/components/TextField'
import MaterialButton from '../../../../materialdesign/components/MaterialButton'

export default class CommentInput extends Component {
  constructor () {
    super()
    this.elements = {}

    this.toggledActionButtons = false
  }

  onAddButtonClick = async (e) => {
    const input = this.elements.input
    const post = this.props.post

    if (input.getValue().length < 1 || input.getValue().length > 100) return input.toggleError(true)

    post.togglePreloader(true)

    const json = await addComment(this.props.post.props.data._id, input.getValue().replace(/\r?\n/g, '<br />'))
    if (!json.success) return console.error(json)

    const postsTab = window.blog.elements.postsTab
    const posts = postsTab.state.posts.slice()
    const postIndex = posts.indexOf(this.props.post.props.data)

    posts[postIndex].comments.push(json.data)

    postsTab.setState({
      posts
    })

    input.setValue('')
    post.togglePreloader(false)
  }

  onCancelButtonClick = (e) => {
    const input = this.elements.input

    input.setValue('')
  }

  onInput = (e, textfield) => {
    if (!this.toggledActionButtons) {
      this.toggleActionButtons(true)
    } else if (this.toggledActionButtons && textfield.getValue().length < 1) {
      this.toggleActionButtons(false)
    }
  }

  toggleActionButtons (flag) {
    const actionButtonsContainer = this.elements.actionButtonsContainer
    actionButtonsContainer.style.height = ((flag) ? actionButtonsContainer.scrollHeight : 0) + 'px'

    this.toggledActionButtons = flag
  }

  render () {
    const avatarStyle = {
      backgroundImage: `url(${this.props.userInfo.avatar || 'images/default-avatar.png'})`
    }

    const textFieldHint = (this.props.userInfo) ? 'Dodaj komentarz' : 'Zaloguj się, by móc dodać komentarz'

    return (
      <div className='post-comment-input'>
        <div className='comment-input-avatar' style={avatarStyle} />
        <TextField
          ref={(e) => this.elements.input = e}
          textarea={true}
          hint={textFieldHint}
          maxLength={100}
          onInput={this.onInput}
          disabled={!this.props.userInfo}
          autoComplete={false}
        />
        <div className='action-buttons-container' ref={(e) => this.elements.actionButtonsContainer = e }>
          <MaterialButton
            text='DODAJ'
            shadow={false}
            rippleStyle={this.props.buttonRippleStyle}
            onClick={this.onAddButtonClick}
          />
          <MaterialButton
            text='ANULUJ'
            className='cancel'
            shadow={false}
            rippleStyle={this.props.cancelButtonRippleStyle}
            onClick={this.onCancelButtonClick}
          />
        </div>
      </div>
    )
  }
}

CommentInput.defaultProps = {
  buttonRippleStyle: {
    backgroundColor: '#3f51b5',
    opacity: 0.2
  },
  cancelButtonRippleStyle: {
    backgroundColor: '#000',
    opacity: 0.2
  }
}
