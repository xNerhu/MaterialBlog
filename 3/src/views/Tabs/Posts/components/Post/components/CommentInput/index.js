import React from 'react'

import TextField from '../../../../../../../imports/materialdesign/components/TextField'

export default class CommentInput extends React.Component {
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
        />
      </div>
    )
  }
}
