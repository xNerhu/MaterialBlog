import React from 'react'

import TextField from '../../../../../../../imports/materialdesign/components/TextField'

export default class CommentInput extends React.Component {
  constructor () {
    super()

    this.state = {
      helperText: false
    }
  }

  /**
   * On text field error event.
   * Shows error message.
   * @param {DomObject} element
   * @param {String} error name
   * @param {Int} error id
   */
  onError = (element, errorName, errorID) => {
    // If error is too much letters
    if (errorID === 1) {
      this.setState({
        helperText: 'Za dużo znaków'
      })
    }
  }

  /**
   * On text field error end event.
   * Hides error message.
   * @param {DomObject} element
   */
  onErrorEnd = (element) => {
    this.setState({
      helperText: false
    })
  }

  /**
   * On action icon mouse enter event.
   * @param {Object} event data
   */
  onActionIconMouseEnter = (e) => {
    this.props.getApp().refs.tooltipAddComment.show(e.target)
  }

  /**
   * On action icon mouse leave event.
   * @param {Object} event data
   */
  onActionIconMouseLeave = (e) => {
    this.props.getApp().refs.tooltipAddComment.hide()
  }

  render () {
    const actionIcon = 'src/images/Post/add.png'

    const actionIconStyle = {
      width: 24,
      height: 24,
      right: 0,
      opacity: 0.7,
      top: 5
    }

    return (
      <div className='post-comment-input'>
        <div className='post-comment-input-avatar' />
        <TextField
          className='post-comment-input-textfield'
          hint='Dodaj komentarz'
          placeHolder='Treść komentarza'
          actionIcon={actionIcon}
          actionIconStyle={actionIconStyle}
          counter={true}
          maxLength={50}
          helperText={this.state.helperText}
          onError={this.onError}
          onErrorEnd={this.onErrorEnd}
          onActionIconMouseEnter={this.onActionIconMouseEnter}
          onActionIconMouseLeave={this.onActionIconMouseLeave}
        />
      </div>
    )
  }
}
