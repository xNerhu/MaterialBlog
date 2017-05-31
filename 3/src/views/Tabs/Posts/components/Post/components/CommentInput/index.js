import React from 'react'

import MaterialButton from '../../../../../../../imports/materialdesign/components/MaterialButton'

export default class CommentInput extends React.Component {
  constructor () {
    super()

    this.state = {
      toggledButton: false
    }
  }

  componentDidMount () {
    const app = this.props.getApp()

    if (!app.accountInfo) {
      this.refs.textarea.disabled = true
    } else {
      this.userLogs()
    }
    app.elementsToChange.push(this)
  }

  /**
   * When user logs event.
   */
  userLogs = () => {
    const textArea = this.refs.textarea

    textArea.disabled = false
    textArea.placeholder = 'Dodaj komentarz'
    textArea.classList.remove('post-comment-input-textarea-not-logged')
  }

  /**
   * On textarea input event.
   * Hides or shows add comment button.
   */
  onInput = () => {
    const textArea = this.refs.textarea
    const length = textArea.value.length
    const inputAction = this.refs.inputAction

    if (this.props.getApp().accountInfo) {
      textArea.style.height = 'auto'
      textArea.style.height = textArea.scrollHeight + 'px'
      if (length > 0) {
        inputAction.style.height = inputAction.scrollHeight + 'px'
      } else {
        inputAction.style.height = '0px'
      }
    } else {
      inputAction.style.height = '0px'
    }
  }

  /**
   * On textarea click event.
   * @param {Object} event data.
   */
  onClick = (e) => {
    const app = this.props.getApp()
    const loginDialog = app.refs.loginDialog

    if (!app.accountInfo) {
      loginDialog.show()
    }
  }

  render () {
    // Styles.
    const materialButtonRippleStyle = {
      backgroundColor: '#2196f3'
    }

    return (
      <div className='post-comment-input'>
        <textarea ref='textarea' className='post-comment-input-textarea post-comment-input-textarea-not-logged' placeholder='Zaloguj się, by móc dodawać komentarze' onClick={this.onClick} onInput={this.onInput} />
        <div className='post-comments-input-action' ref='inputAction'>
          <MaterialButton shadow={false} backgroundColor='transparent' color='#2196f3' rippleStyle={materialButtonRippleStyle}>
            DODAJ
          </MaterialButton>
        </div>
      </div>
    )
  }
}
