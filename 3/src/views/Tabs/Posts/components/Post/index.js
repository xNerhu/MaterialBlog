import React from 'react'

import Comment from './components/Comment'
import CommentInput from './components/CommentInput'

export default class Post extends React.Component {
  constructor () {
    super()

    this.toggledComments = false
  }

  /**
    * On show comments button click event.
    * Shows or hides comments.
    */
  onShowCommentsButtonClick = () => {
    const comments = this.refs.comments
    const showCommentsButton = this.refs.showCommentsButton

    this.toggledComments = !this.toggledComments

    if (this.toggledComments) {
      showCommentsButton.style.transform = 'rotate(180deg)'
      comments.style.height = comments.scrollHeight + 'px'

      setTimeout(function () {
        comments.style.height = 'auto'
      }, 350)
    } else {
      showCommentsButton.style.transform = 'rotate(0deg)'

      comments.style.height = comments.scrollHeight + 'px'
      setTimeout(function () {
        comments.style.height = '0px'
      }, 10)
    }
  }

  onShowCommentsButtonMouseDown = (e) => {
    if (!this.props.getApp().blockMouseDownEvent) {
      var ripple = Ripple.createRipple(this.refs.showCommentsButton, {
        backgroundColor: '#000',
        opacity: 0.4
      }, createRippleCenter(this.refs.showCommentsButton, 14))
      Ripple.makeRipple(ripple)
    }
  }

  onLikeButtonClick = () => {

  }

  onLikeButtonMouseDown = (e) => {
    if (!this.props.getApp().blockMouseDownEvent) {
      var ripple = Ripple.createRipple(this.refs.likeButton, {
        backgroundColor: '#000',
        opacity: 0.4
      }, createRippleCenter(this.refs.likeButton, 14))
      Ripple.makeRipple(ripple)
    }
  }

  render () {
    return (
      <div className='post'>
        <img className='post-media' src='http://img11.deviantart.net/a66d/i/2015/109/3/b/forest_wallpaper_16_9_by_iorgudesign-d8qa67w.jpg' />
        <div className='post-info'>
          <div className='post-avatar' />
          <div className='post-primary'>
            <div className='post-title'>
              Title
            </div>
            <div className='post-sub-title'>
              Mikołaj Palkiewicz, 21.05.2017 12:47
            </div>
          </div>
        </div>
        <div className='post-text'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div className='post-action'>
          <div className='post-action-item post-action-show-comments ripple-icon' ref='showCommentsButton' onClick={this.onShowCommentsButtonClick} onMouseDown={this.onShowCommentsButtonMouseDown} />
          <div className='post-action-item-count'>
            10
          </div>
          <div className='post-action-item post-action-like ripple-icon' ref='likeButton' onClick={this.onLikeButtonClick} onMouseDown={this.onLikeButtonMouseDown} />
          <div className='post-action-item-count'>
            1
          </div>
        </div>
        <div className='post-comments' ref='comments'>
          <Comment />
          <CommentInput />
        </div>
      </div>
    )
  }
}

Post.defaultProps = {
  ripple: true,
  commentsRipple: true
}
