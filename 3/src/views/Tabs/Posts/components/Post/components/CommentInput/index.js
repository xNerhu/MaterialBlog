import Component from '../../../../../../../helpers/Component'

import MaterialButton from '../../../../../../../imports/materialdesign/components/MaterialButton'

export default class CommentInput extends Component {
  beforeRender () {
    this.touched = false

    this.props.actionRippleStyle = {
      backgroundColor: '#2196f3',
      opacity: 0.3
    }
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * On textarea input event.
   * Hides or shows add comment button.
   */
  onInput = () => {
    const app = window.app
    const textarea = this.elements.textarea
    const length = textarea.value.length
    const action = this.elements.action

    if (app.accountInfo) {
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'

      if (length > 0) {
        action.style.height = action.scrollHeight + 'px'
      } else {
        action.style.height = '0px'
      }
    } else {
      action.style.height = '0px'
    }
  }

  render () {
    return (
      <div className='post-comment-input' ref='root'>
        <textarea className='post-comment-input-textarea' ref='textarea' placeholder='Zaloguj się, by móć dodawać komentarze' onInput={this.onInput} />
        <div className='post-comments-input-action' ref='action'>
          <MaterialButton text='DODAJ' shadow={false} className='post-comments-input-action-button' rippleStyle={this.props.actionRippleStyle} />
        </div>
      </div>
    )
  }
}
