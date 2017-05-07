import React from 'react'

import TextField from '../../../../../../../imports/materialdesign/components/TextField'

export default class CommentInput extends React.Component {
  constructor () {
    super()

    this.state = {
      helperText: false
    }
  }

  componentDidMount () {
    if (!this.props.getApp().accountInfo) {

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
    // Styles.
    const actionIcon = 'src/images/Post/add.png'

    const actionIconStyle = {
      width: 24,
      height: 24,
      right: 0,
      opacity: 0.7,
      top: 5
    }

    const avatarURL = (!this.props.getApp().accountInfo) ? 'src/images/NavigationDrawer/login.png' : this.props.getApp().accountInfo.avatar

    const avatarStyle = {
      backgroundImage: 'url(' + avatarURL + ')',
      opacity: (!this.props.getApp().accountInfo) ? 0.5 : 1
    }

    const hint = (!this.props.getApp().accountInfo) ? 'Zaloguj się, by móc dodać komentarz' : 'Dodaj komentarz'

    return (
      <div className='post-comment-input'>
        <div className='post-comment-input-avatar' style={avatarStyle} />
        <TextField
          className='post-comment-input-textfield'
          hint={hint}
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
          disabled={!this.props.getApp().accountInfo}
        />
      </div>
    )
  }
}
