import React from 'react'

import Tooltip from '../../../../../imports/materialdesign/components/Tooltip'

import Comment from './components/Comment'
import CommentInput from './components/CommentInput'

export default class Post extends React.Component {
  constructor () {
    super()

    this.state = {
      commentsVisible: false
    }
  }

  /**
   * On like icon mouse down event.
   * @param {Object} event data
   */
  onLikeMouseDown = (e) => {
    var ripple = Ripple.createRipple(e.target, {
      backgroundColor: '#000',
      opacity: 0.4
    }, createRippleCenter(e.target, 14))
    Ripple.makeRipple(ripple)
  }

  /**
   * On like icon touch event (on mobile).
   * @param {Object} event data
   */
  onLikeTouchStart = (e) => {
    var ripple = Ripple.createRipple(e.target, {
      backgroundColor: '#000',
      opacity: 0.4
    }, createRippleCenter(e.target, 14, 0.4, true))
    Ripple.makeRipple(ripple)
  }

  /**
   * On show comments button mouse down event.
   * @param {Object} event data
   */
  onShowCommentsButtonMouseDown = (e) => {
    var ripple = Ripple.createRipple(this.refs.showComments, {
      backgroundColor: '#000',
      opacity: 0.4
    }, createRippleCenter(this.refs.showComments, 14))
    Ripple.makeRipple(ripple)
  }

  /**
   * On show comments button touch event (on mobile).
   * @param {Object} event data
   */
  onShowCommentsButtonTouchStart = (e) => {
    var ripple = Ripple.createRipple(this.refs.showComments, {
      backgroundColor: '#000',
      opacity: 0.4
    }, createRippleCenter(this.refs.showComments, 14, 0.4, true))
    Ripple.makeRipple(ripple)
  }

  /**
   * On show comments button click event.
   */
  onShowCommentsButtonClick = () => {
    if (!this.props.getApp().refs.tooltipShowComments.isToogled()) {
        this.props.getApp().refs.tooltipShowComments.hide()
    }
    if (!this.props.getApp().refs.tooltipHideComments.isToogled()) {
      this.props.getApp().refs.tooltipHideComments.hide()
    }
    this.setState({commentsVisible: !this.state.commentsVisible})
  }

  /**
   * On post mouse down event.
   * @param {Object} event data
   */
  onMouseDown = (e) => {
    if (e.target !== this.refs.like && e.target !== this.refs.likeCount && e.target !== this.refs.commentsCount && e.target !== this.refs.showComments && e.target.parentNode.parentNode !== this.refs.comments && this.props.ripple === true) {
      var ripple = Ripple.createRipple(this.refs.content, {
        backgroundColor: '#444',
        opacity: 0.3
      }, createRippleMouse(this.refs.content, e, 1.5))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On post touch event (on mobile).
   * @param {Object} event data
   */
  onTouchStart = (e) => {
    if (e.target !== this.refs.like && e.target !== this.refs.likeCount && e.target !== this.refs.commentsCount && e.target !== this.refs.showComments && e.target.parentNode.parentNode !== this.refs.comments && this.props.ripple === true) {
      var ripple = Ripple.createRipple(this.refs.content, {
        backgroundColor: '#444',
        opacity: 0.3
      }, createRippleMouse(this.refs.content, e, 1.5, true))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On post click event.
   * @param {Object} event data
   */
  onClick = (e) => {
    if (e.target !== this.refs.like && e.target !== this.refs.likeCount && e.target !== this.refs.commentsCount && e.target !== this.refs.showComments && e.target.parentNode.parentNode !== this.refs.comments && this.props.onClick !== undefined) {
      this.props.onClick(e, this)
    }
  }

  /**
   * On like button mouse enter event.
   * Shows tooltip.
   * @param {Object} event data
   */
  onLikeMouseEnter = (e) => {
    var tooltipsData = this.props.getApp().state.tooltipsData
    const tooltip = this.props.getApp().refs.tooltipCategoryInfo
    var text = (this.liked(this.props.likes, this.props.getApp().getAccountInfo()) ? 'Nie lubię!' : 'Lubię to!')
    tooltipsData.like.text = text
    this.props.getApp().setState({tooltipsData: tooltipsData})
    this.props.getApp().refs.tooltipLike.show(this.refs.like)
  }

  /**
   * On like button mouse leave event.
   * Hides tooltip.
   * @param {Object} event data
   */
  onLikeMouseLeave = (e) => {
    this.props.getApp().refs.tooltipLike.hide()
  }

  /**
    * on likes list button mouse enter event
    * shows tooltip
    * @param {Object} event data
    */
  onLikesListMouseEnter = (e) => {
    var tooltipsData = this.props.getApp().state.tooltipsData
    const tooltip = this.props.getApp().refs.tooltipCategoryInfo

    var list = ''
    if (this.props.likes.length >= 1) {
      for (var i = 0; i < this.props.likes.length; i++) {
        list += this.props.likes[i].userName + ((i < this.props.likes.length - 1) ? '\n' : '')
      }
    } else {
      list = '...'
    }
    tooltipsData.like.list = list
    this.props.getApp().setState({tooltipsData: tooltipsData})
    this.props.getApp().refs.tooltipLikesList.show(this.refs.likeCount)
  }

  /**
   * On likes list button mouse leave event.
   * Hides tooltip.
   * @param {Object} event data
   */
  onLikesListMouseLeave = (e) => {
    this.props.getApp().refs.tooltipLikesList.hide()
  }

  /**
   * On show comments button mouse enter event.
   * Shows tooltip.
   * @param {Object} event data
   */
  onShowCommentsButtonMouseEnter = (e) => {
    if (this.state.commentsVisible) {
      this.props.getApp().refs.tooltipHideComments.show(this.refs.showComments)
    } else {
      this.props.getApp().refs.tooltipShowComments.show(this.refs.showComments)
    }
  }

  /**
   * On show comments button mouse leave event.
   * Hides tooltip.
   * @param {Object} event data
   */
  onShowCommentsButtonMouseLeave = (e) => {
    if (!this.props.getApp().refs.tooltipShowComments.isToogled()) {
      this.props.getApp().refs.tooltipShowComments.hide()
    }
    if (!this.props.getApp().refs.tooltipHideComments.isToogled()) {
      this.props.getApp().refs.tooltipHideComments.hide()
    }
  }

  /**
   * Check if user liked post.
   * @param {Object} likes data
   * @param {Object} account info
   */
  liked = (likesData, accountInfo) => {
    var flag = false
    for(var i = 0; i < likesData.length; i++) {
      if (likesData[i].userID === accountInfo.userID) {
        flag = true
        break
      }
    }
    return flag
  }

  render () {
    // Styles.
    const avatarIconStyle = {
      backgroundImage: 'url(' + this.props.avatar + ')'
    }

    const likeIconStyle = {
      backgroundImage: (this.liked(this.props.likes, this.props.getApp().getAccountInfo())) ? 'url(src/images/Post/favorite_full.png)' : 'url(src/images/Post/favorite_border.png)'
    }

    const commentIconStyle = {
      backgroundImage: 'url(src/images/Post/expand_more.png)',
      transform: (!this.state.commentsVisible) ? 'rotate(0deg)' : 'rotate(180deg)'
    }

    const commentsStyle = {
      overflow: (!this.state.commentsVisible) ? 'hidden' : 'auto',
      height: (!this.state.commentsVisible) ? 0 : this.refs.comments.scrollHeight,
      borderTop: (!this.state.commentsVisible) ? 'none' : '1px solid #eee'
    }

    return (
      <div className={'post ' + ((this.props.className !== undefined) ? this.props.className : '')} ref='post' onClick={this.onClick} style={this.props.style}>
        <div className='ripple' ref='content' onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart}>
          <div className='post-avatar' style={avatarIconStyle} />
          <div className='post-avatar-right'>
            <div className='post-title'>
              {this.props.title}
            </div>
            <div className='post-info'>{this.props.date}, {this.props.author}</div>
          </div>
          <div className='post-text'>
            {this.props.children}
          </div>
          <div className='post-action'>
            <div className='post-action-like ripple-icon' ref='like'
              style={likeIconStyle}
              onMouseDown={this.onLikeMouseDown}
              onMouseEnter={this.onLikeMouseEnter}
              onMouseLeave={this.onLikeMouseLeave}
              onTouchStart={this.onLikeTouchStart} />
            <div className='post-action-like-count' ref='likeCount'
              onMouseEnter={this.onLikesListMouseEnter}
              onMouseLeave={this.onLikesListMouseLeave}>
              {this.props.likes.length}
            </div>
            <div className='post-action-show-comments'>
              <div ref='commentsCount'
                onClick={this.onShowCommentsButtonClick}>
                KOMENTARZE ({this.props.comments.length})
              </div>
              <div className='post-action-show-comments-button ripple-icon' ref='showComments' onMouseDown={this.onShowCommentsButtonMouseDown}
                onClick={this.onShowCommentsButtonClick}
                style={commentIconStyle}
                onMouseEnter={this.onShowCommentsButtonMouseEnter}
                onMouseLeave={this.onShowCommentsButtonMouseLeave}
                onTouchStart={this.onShowCommentsButtonTouchStart} />
            </div>
          </div>
        </div>
        <div className='post-comments' ref='comments' style={commentsStyle}>
          {this.props.comments.map((data, i) => {
            return (
              <Comment key={i} data={data} ripple={this.props.commentsRipple} />
            )
          })}
          <CommentInput getApp={this.props.getApp} />
        </div>
      </div>
    )
  }
}

Post.defaultProps = {
  ripple: true,
  commentsRipple: true
}
