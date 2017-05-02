import React from 'react'

export default class Comment extends React.Component {
  /**
   * On mouse down event.
   * @param {Object} event data
   */
  onMouseDown = (e) => {
    if (this.props.ripple) {
      var ripple = Ripple.createRipple(this.refs.comment, {
        backgroundColor: '#444',
        opacity: 0.3
      }, createRippleMouse(this.refs.comment, e, 2))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On touch event (on mobile).
   * @param {Object} event data
   */
  onTouchStart = (e) => {
    if (this.props.ripple) {
      var ripple = Ripple.createRipple(this.refs.comment, {
        backgroundColor: '#444',
        opacity: 0.3
      }, createRippleMouse(this.refs.comment, e, 2, true))
      Ripple.makeRipple(ripple)
    }
  }

  render () {
    return (
      <div className='post-comment ripple' ref='comment' onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart}>
        <div className='post-comment-avatar' style={{backgroundImage: 'url(' + this.props.data.avatar + ')'}} />
        <div className='post-comment-avatar-right'>
          <div className='post-comment-author'>{this.props.data.author}</div>
          <div className='post-comment-text'>{this.props.data.content}</div>
          <div className='post-comment-date'>{this.props.data.date}</div>
        </div>
      </div>
    )
  }
}

Comment.defaultProps = {
  ripple: true
}
