import React from 'react'

import Comment from './components/Comment'
import CommentInput from './components/CommentInput'

export default class Post extends React.Component {
  constructor () {
    super()

    this.toggledComments = false
    this.canClickShowCommentsButton = true
    this.ripple = true
  }

  componentDidMount () {
    const self = this

    if (this.props.data.media) {
      var img = new Image()

      /**
       * On img load event.
       */
      img.onload = function () {
        const height = this.height
        const width = this.width

        self.refs.pic.src = this.src
        if (height !== width) {
          self.refs.blurPic.style.backgroundImage = 'url(' + this.src + ')'
        } else {
          self.refs.pic.style.maxHeight = '96px'
        }
      }

      img.src = this.props.data.media
    }

    // for tags support, but you can make in div {this.props.data.content}
    this.refs.text.innerHTML = this.props.data.content

    const postsTab = this.props.getPostsTab()
    const page = postsTab.page
    var index = this.props.index

    if (page >= 2) {
      index -= postsTab.state.posts.length
    }

    const until = ((index + 1) * 0.1) * 1000

    setTimeout(function () {
      self.refs.post.style.opacity = '1'
      self.refs.post.style.marginTop = '32px'
    }, until)

    this.props.getPostsTab().postsObjects.push(this)
  }

  /**
    * On show comments button click event.
    * Shows or hides comments.
    * @param {Object} event data.
    */
  onShowCommentsButtonClick = (e) => {
    if (this.canClickShowCommentsButton) {
      const self = this
      const app = this.props.getApp()
      const comments = this.refs.comments
      const showCommentsButton = this.refs.showCommentsButton

      this.toggledComments = !this.toggledComments
      this.canClickShowCommentsButton = false

      if (this.toggledComments) {
        showCommentsButton.style.transform = 'rotate(180deg)'
        comments.style.height = comments.scrollHeight + 'px'

        setTimeout(function () {
          comments.style.height = 'auto'
          self.canClickShowCommentsButton = true
        }, 350)
      } else {
        showCommentsButton.style.transform = 'rotate(0deg)'

        comments.style.height = comments.scrollHeight + 'px'
        setTimeout(function () {
          comments.style.height = '0px'
          self.canClickShowCommentsButton = true
        }, 10)
      }

      if (this.toggledComments) app.refs.tooltipShowComments.hide()
      else app.refs.tooltipHideComments.hide()
    }
  }

  /**
   * On show comments button mouse down event.
   * Makes ripple.
   * @param {Object} event data.
   */
  onShowCommentsButtonMouseDown = (e) => {
    if (!this.props.getApp().blockMouseDownEvent) {
      var ripple = Ripple.createRipple(this.refs.showCommentsButton, {
        backgroundColor: '#000',
        opacity: 0.4
      }, createRippleCenter(this.refs.showCommentsButton, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On show comments button mouse enter event.
   * Shows tooltip.
   * @param {Object} event data.
   */
  onShowCommentsButtonMouseEnter = (e) => {
    const app = this.props.getApp()

    if (this.toggledComments) {
      app.refs.tooltipHideComments.show(this.refs.showCommentsButton)
    } else {
      app.refs.tooltipShowComments.show(this.refs.showCommentsButton)
    }
  }

  /**
   * On show comments button mouse leave event.
   * hides tooltip.
   * @param {Object} event data.
   */
  onShowCommentsButtonMouseLeave = (e) => {
    const app = this.props.getApp()

    if (this.toggledComments) app.refs.tooltipHideComments.hide()
    else app.refs.tooltipShowComments.hide()
  }

  /**
   * On like button click event.
   * @param {Object} event data.
   */
  onLikeButtonClick = (e) => {

  }

  /**
   * On like button mouse down event.
   * Makes ripple.
   * @param {Object} event data.
   */
  onLikeButtonMouseDown = (e) => {
    if (!this.props.getApp().blockMouseDownEvent) {
      var ripple = Ripple.createRipple(this.refs.likeButton, {
        backgroundColor: '#000',
        opacity: 0.4
      }, createRippleCenter(this.refs.likeButton, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On like button mouse enter event.
   * Shows tooltip.
   * @param {Object} event data.
   */
  onLikeButtonMouseEnter = (e) => {
    const app = this.props.getApp()
    const tooltipsData = app.state.tooltipsData

    const text = (this.props.isLikes(this.props.data.likes) ? 'Lubię to!' : 'Polub to!')
    tooltipsData.like.text = text
    app.setState({
      tooltipsData: tooltipsData
    })

    app.refs.tooltipLike.show(this.refs.likeButton)
  }

  /**
   * On like button mouse leave event.
   * hides tooltip.
   * @param {Object} event data.
   */
  onLikeButtonMouseLeave = (e) => {
    this.props.getApp().refs.tooltipLike.hide()
  }

  /**
   * On likes list mouse enter event.
   * Shows tooltip.
   * @param {Object} event data.
   */
  onLikesListMouseEnter = (e) => {
    const app = this.props.getApp()
    const tooltipsData = app.state.tooltipsData

    var list = ''
    if (this.props.data.likes.length >= 1) {
      for (var i = 0; i < this.props.data.likes.length; i++) {
        list += this.props.data.likes[i].userName + ((i < this.props.data.likes.length - 1) ? '\n' : '')
      }
    } else {
      list = '...'
    }

    tooltipsData.like.list = list

    app.setState({
      tooltipsData: tooltipsData
    })

    app.refs.tooltipLikesList.show(this.refs.likesList)
  }

  /**
   * On likes list mouse enter leave.
   * Hides tooltip.
   * @param {Object} event data.
   */
  onLikesListMouseLeave = (e) => {
    this.props.getApp().refs.tooltipLikesList.hide()
  }

  /**
   * On post click event.
   * @param {Object} event data.
   */
  onClick = (e) => {
    if (e.target !== this.refs.showCommentsButton && e.target !== this.refs.commentsCount && e.target !== this.refs.likeButton && e.target !== this.refs.likesList && this.ripple) {
      this.props.enterFullScreen(this.refs.post, this.props.data)
    }
  }

  onMouseDown = (e) => {
    if (e.target !== this.refs.showCommentsButton && e.target !== this.refs.commentsCount && e.target !== this.refs.likeButton && e.target !== this.refs.likesList && this.ripple) {
      var ripple = Ripple.createRipple(this.refs.content, {
        backgroundColor: '#444',
        opacity: 0.3
      }, createRippleMouse(this.refs.content, e, 2))
      Ripple.makeRipple(ripple)
    }
  }

  render () {
    // Styles.
    const likeButtonStyle = {
      backgroundImage: (this.props.isLikes(this.props.data.likes)) ? 'url(src/images/Post/favorite_full.png)' : 'url(src/images/Post/favorite_border.png)'
    }

    return (
      <div className='post' ref='post'>
        <div className='post-media'>
          <div className='post-media-blur' ref='blurPic' />
          <img className='post-media-pic' ref='pic' />
        </div>
        <div className='post-content ripple' ref='content' onClick={this.onClick} onMouseDown={this.onMouseDown}>
          <div className='post-info'>
            <div className='post-avatar' />
            <div className='post-primary'>
              <div className='post-title'>
                {this.props.data.title}
              </div>
              <div className='post-sub-title'>
                {this.props.data.author}, {this.props.data.date}
              </div>
            </div>
          </div>
          <div className='post-text' ref='text' />
          <div className='post-action'>
            <div className='post-action-item post-action-show-comments ripple-icon' ref='showCommentsButton' onClick={this.onShowCommentsButtonClick} onMouseDown={this.onShowCommentsButtonMouseDown} onMouseEnter={this.onShowCommentsButtonMouseEnter} onMouseLeave={this.onShowCommentsButtonMouseLeave} />
            <div className='post-action-item-count' ref='commentsCount'>
              {this.props.data.comments.length}
            </div>
            <div className='post-action-item post-action-like ripple-icon' ref='likeButton' style={likeButtonStyle} onClick={this.onLikeButtonClick} onMouseDown={this.onLikeButtonMouseDown} onMouseEnter={this.onLikeButtonMouseEnter} onMouseLeave={this.onLikeButtonMouseLeave} />
            <div className='post-action-item-count' ref='likesList' onMouseEnter={this.onLikesListMouseEnter} onMouseLeave={this.onLikesListMouseLeave}>
              {this.props.data.likes.length}
            </div>
          </div>
        </div>
        <div className='post-comments' ref='comments'>
          {
            this.props.data.comments.map((data, i) => {
              return <Comment key={i} data={data} />
            })
          }
          <CommentInput getApp={this.props.getApp} />
        </div>
      </div>
    )
  }
}
