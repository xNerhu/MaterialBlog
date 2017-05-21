import React from 'react'

import MaterialButton from '../../../../../../../imports/materialdesign/components/MaterialButton'

export default class CommentInput extends React.Component {
  constructor () {
    super()

    this.state = {
      toggledButton: false
    }
  }

  /**
   * On textarea input event.
   * Hides or shows add comment button.
   */
  onInput = () => {
    const textArea = this.refs.textarea
    const length = textArea.value.length
    const inputAction = this.refs.inputAction

    textArea.style.height = 'auto'
    textArea.style.height = textArea.scrollHeight + 'px'
    if (length > 0) {
      inputAction.style.height = inputAction.scrollHeight + 'px'
    } else {
      inputAction.style.height = '0px'
    }
  }

  render () {
    // Styles.
    const materialButtonRippleStyle = {
      backgroundColor: '#2196f3'
    }

    return (
      <div className='post-comment-input'>
        <textarea ref='textarea' className='post-comment-input-textarea' placeholder='Dodaj komentarz' onInput={this.onInput} />
        <div className='post-comments-input-action' ref='inputAction'>
          <MaterialButton shadow={false} backgroundColor='transparent' color='#2196f3' rippleStyle={materialButtonRippleStyle}>
            DODAJ
          </MaterialButton>
        </div>
      </div>
    )
  }
}
