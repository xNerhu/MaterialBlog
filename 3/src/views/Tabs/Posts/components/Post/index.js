import React from 'react'

export default class Post extends React.Component {
  /**
    * on like icon mouse down event
    * @param {object} event data
    */
  onLikeMouseDown = (e) => {
    var ripple = Ripple.createRipple(e.target, {
      backgroundColor: '#000',
      opacity: 0.4
    }, createRippleCenter(e.target, 14))
    Ripple.makeRipple(ripple)
  }

  /**
    * on show comments button mouse down event
    * @param {object} event data
    */
  onShowCommentsButton = (e) => {
    var ripple = Ripple.createRipple(this.refs.showComments, {
      backgroundColor: '#000',
      opacity: 0.4
    }, createRippleCenter(this.refs.showComments, 14))
    Ripple.makeRipple(ripple)
  }

  render () {
    var likeIconStyle = {
      backgroundImage: 'url(src/images/Post/favorite_full.png)'
    }
    var commentIconStyle = {
      backgroundImage: 'url(src/images/Post/expand_more.png)'
    }
    return (
      <div className='post'>
        <div className='post-title'>
          {this.props.title}
        </div>
        <div className='post-info'>{this.props.date}, {this.props.author}</div>
        <div className='post-content'>
          {this.props.children}
        </div>
        <div className='post-action'>
          <div className='post-action-like ripple-icon' style={likeIconStyle} onMouseDown={this.onLikeMouseDown} />
          <div className='post-action-like-count'>{this.props.likes}</div>
          <div className='post-action-show-comments'>
            KOMENTARZE (0)
            <div className='post-action-show-comments-button ripple-icon' ref='showComments' onMouseDown={this.onShowCommentsButton} style={commentIconStyle} />
          </div>
        </div>
      </div>
    )
  }
}
