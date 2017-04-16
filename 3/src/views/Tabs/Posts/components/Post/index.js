import React from 'react'

import Tooltip from '../../../../../imports/materialdesign/components/Tooltip'

export default class Post extends React.Component {
  constructor () {
    super()

    this.state = {
      commentsVisible: false,
      isFullView: false,
      width: '60%'
    }
  }

  /**
    * on like icon mouse down event
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
    * on show comments button mouse down event
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
    * on show comments button click event
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
    * on post mouse down event
    * @param {Object} event data
    */
  onMouseDown = (e) => {
    if (e.target !== this.refs.like && e.target !== this.refs.likeCount && e.target !== this.refs.commentsCount && e.target !== this.refs.showComments && e.target.parentNode.parentNode !== this.refs.comments) {
      var ripple = Ripple.createRipple(this.refs.content, {
        backgroundColor: '#444',
        opacity: 0.3
      }, createRippleMouse(this.refs.content, e, 1.5))
      Ripple.makeRipple(ripple)
    }
  }

  /**
    * on post click event
    * @param {Object} event data
    */
  onClick = (e) => {
    if (e.target !== this.refs.like && e.target !== this.refs.likeCount && e.target !== this.refs.commentsCount && e.target !== this.refs.showComments && e.target.parentNode.parentNode !== this.refs.comments) {
      this.props.onClick(e, this)
    }
  }

  /**
    * on comment mouse down event
    * @param {Object} event data
    */
  onCommentMouseDown = (e) => {
    const target = (e.target.parentNode.classList.contains('post-comment')) ? e.target.parentNode : e.target
    var ripple = Ripple.createRipple(target, {
      backgroundColor: '#444',
      opacity: 0.3
    }, createRippleMouse(target, e, 1.5))
    Ripple.makeRipple(ripple)
  }

  /**
    * on like button mouse enter event
    * shows tooltip
    * @param {Object} event data
    */
  onLikeMouseEnter = (e) => {
    this.props.getApp().setState({toolTipLikeText: (this.liked(this.props.likes, this.props.getApp().getAccountInfo()) ? 'Nie lubię!' : 'Lubię to!')})
    this.props.getApp().refs.tooltipLike.show(this.refs.like)
  }

  /**
    * on like button mouse leave event
    * hides tooltip
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
    var list = ''
    if (this.props.likes.length >= 1) {
      for (var i = 0; i < this.props.likes.length; i++) {
        list += this.props.likes[i].userName + ((i < this.props.likes.length - 1) ? '\n' : '')
      }
    } else {
      list = '...'
    }
    this.props.getApp().setState({toolTipLikesList: list})
    this.props.getApp().refs.tooltipLikesList.show(this.refs.likeCount)
  }

  /**
    * on likes list button mouse leave event
    * hides tooltip
    * @param {Object} event data
    */
  onLikesListMouseLeave = (e) => {
    this.props.getApp().refs.tooltipLikesList.hide()
  }

  /**
    * on show comments button mouse enter event
    * shows tooltip
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
    * on show comments button mouse leave event
    * hides tooltip
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
    * check if user is liked post
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

  viewFullScreen = () => {
    this.top = this.refs.post.offsetTop
    this.setState({isFullView: true, width: '100%'})
    this.props.getApp().setState({postFullScreen: true})
  }

  exitFullScreen = () => {
    var self = this
    self.setState({width: '60%'})
    self.setState({isFullView: false})
    self.props.getApp().setState({postFullScreen: false})
  }

  render () {
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
    const postStyle = {
      position: (!this.state.isFullView) ? 'relative' : 'absolute',
      width: this.state.width,
      zIndex: (!this.state.isFullView) ? 1 : 2
    }
    return (
      <div className='post' ref='post' onClick={this.onClick} style={postStyle}>
        <div className='ripple' ref='content' onMouseDown={this.onMouseDown}>
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
            <div className='post-action-like ripple-icon' ref='like' style={likeIconStyle} onMouseDown={this.onLikeMouseDown} onMouseEnter={this.onLikeMouseEnter} onMouseLeave={this.onLikeMouseLeave} />
            <div className='post-action-like-count' ref='likeCount' onMouseEnter={this.onLikesListMouseEnter} onMouseLeave={this.onLikesListMouseLeave}>{this.props.likes.length}</div>
            <div className='post-action-show-comments'>
              <div ref='commentsCount' onClick={this.onShowCommentsButtonClick}>KOMENTARZE ({this.props.comments.length})</div>
              <div className='post-action-show-comments-button ripple-icon' ref='showComments' onMouseDown={this.onShowCommentsButtonMouseDown} onClick={this.onShowCommentsButtonClick} style={commentIconStyle} onMouseEnter={this.onShowCommentsButtonMouseEnter} onMouseLeave={this.onShowCommentsButtonMouseLeave} />
            </div>
          </div>
        </div>
        <div className='post-comments' ref='comments' style={commentsStyle}>
          {this.props.comments.map((data, i) => {
            return (
              <div className='post-comment ripple' key={i} onMouseDown={this.onCommentMouseDown}>
                <div className='post-comment-avatar' style={{backgroundImage: 'url(' + data.avatar + ')'}} />
                <div className='post-comment-avatar-right'>
                  <div className='post-comment-author'>{data.author}</div>
                  <div className='post-comment-text'>{data.content}</div>
                  <div className='post-comment-date'>{data.date}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
