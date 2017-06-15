import Component from '../../../../../helpers/Component'

import Comment from './components/Comment'
import CommentInput from './components/CommentInput'

export default class Post extends Component {
  beforeRender () {
    this.touched = false
    this.toggledComments = false
    this.likes = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * On click event.
   * @param {Event}
   */
  onClick = (e) => {
    const app = window.app
    const toolbar = app.getToolbar()
    const multiIcon = toolbar.getMultiIcon()

    if (e.target !== this.elements.showCommentsButton && e.target !== this.elements.commentsCount && e.target !== this.elements.likeButton && e.target !== this.elements.likesCount && multiIcon.canClick) {
      const postsTab = this.props.getPostsTab()

      postsTab.toggleFullScreen(true, this)
    }
  }

  /**
   * On mouse down event.
   * Makes ripple.
   * @param {Event}
   */
  onMouseDown = (e) => {
    if (!this.touched && e.target !== this.elements.showCommentsButton && e.target !== this.elements.commentsCount && e.target !== this.elements.likeButton && e.target !== this.elements.likesCount && this.props.ripple) {
      let ripple = Ripple.createRipple(this.elements.content, this.props.rippleStyle, createRippleMouse(this.elements.content, e, 2))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On touch start event (on mobile).
   * Makes ripple.
   * @param {Event}
   */
  onTouchStart = (e) => {
    if (e.target !== this.elements.showCommentsButton && e.target !== this.elements.commentsCount && e.target !== this.elements.likeButton && e.target !== this.elements.likesCount && this.props.ripple) {
      let ripple = Ripple.createRipple(this.elements.content, this.props.rippleStyle, createRippleMouse(this.elements.content, e, 2, true))
      Ripple.makeRipple(ripple)

      this.touched = true
    }
  }

  /**
   * On action icon mouse down event.
   * Makes ripple.
   * @param {Event}
   */
  onActionIconMouseDown = (e) => {
    if (!this.touched) {
      let ripple = Ripple.createRipple(e.target, this.props.actionIconRippleStyle, createRippleCenter(e.target, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On action icon touch start event (on mobile).
   * Makes ripple.
   * @param {Event}
   */
  onActionIconTouchStart = (e) => {
    let ripple = Ripple.createRipple(e.target, this.props.actionIconRippleStyle, createRippleCenter(e.target, 14, 0.4, true))
    Ripple.makeRipple(ripple)
    this.touched = true
  }

  /**
   * On show comments button click event.
   * @param {Event}
   */
  onShowCommentsButtonClick = (e) => {
    if (this.toggledComments !== null) this.toggleComments(!this.toggledComments)
  }

  /**
   * On show comments button mouse enter event.
   * Shows tooltip.
   * @param {Event}
   */
  onShowCommentsButtonMouseEnter = (e) => {
    const app = window.app
    const tooltip = app.elements.tooltipShowCommentsButton

    if (!this.toggledComments) {
      tooltip.setText('Pokaż komentarze')
    } else {
      tooltip.setText('Ukryj komentarze')
    }

    tooltip.toggle(true, e.target)
  }

  /**
   * On show comments button mouse leave event.
   * Hides tooltip.
   * @param {Event}
   */
  onShowCommentsButtonMouseLeave = (e) => {
    const app = window.app
    const tooltip = app.elements.tooltipShowCommentsButton

    tooltip.toggle(false)
  }

  /**
   * On like button mouse enter event.
   * Shows tooltip.
   * @param {Event}
   */
  onLikeButtonMouseEnter = (e) => {
    const app = window.app
    const tooltip = app.elements.tooltipLikeButton

    if (!this.isLikes) {
      tooltip.setText('Polub to!')
    } else {
      tooltip.setText('Lubię to!')
    }

    tooltip.toggle(true, e.target)
  }

  /**
   * On like button mouse leave event.
   * Hides tooltip.
   * @param {Event}
   */
  onLikeButtonMouseLeave = (e) => {
    const app = window.app
    const tooltip = app.elements.tooltipLikeButton

    tooltip.toggle(false)
  }

  /**
   * On likes count mouse enter event.
   * Shows tooltip.
   * @param {Event}
   */
  onLikesCountMouseEnter = (e) => {
    const app = window.app
    const tooltip = app.elements.tooltipLikesList

    let list = ''
    if (this.props.data.likes.length >= 1) {
      for (let i = 0; i < this.props.data.likes.length; i++) {
        list += this.props.data.likes[i].userName + ((i < this.props.data.likes.length - 1) ? '<br />' : '')
      }
    } else {
      list = '...'
    }

    tooltip.setText(list)

    tooltip.toggle(true, e.target)
  }

  /**
   * On likes list mouse leave event.
   * Hides tooltip.
   * @param {Event}
   */
  onLikesCountMouseLeave = (e) => {
    const app = window.app
    const tooltip = app.elements.tooltipLikesList

    tooltip.toggle(false)
  }

  /**
   * Toggle comments.
   * @param {Boolean}
   */
  toggleComments = (flag) => {
    const self = this
    const app = window.app
    const tooltip = app.elements.tooltipShowCommentsButton
    const button = this.elements.showCommentsButton
    const comments = this.elements.comments

    tooltip.toggle(false)

    this.toggledComments = null
    button.style.transform = 'rotate(' + ((flag) ? 180 : 0) + 'deg)'
    comments.style.height = comments.scrollHeight + 'px'

    if (flag) {
      setTimeout(function () {
        comments.style.height = 'auto'
        self.toggledComments = true
      }, 300)
    } else {
      setTimeout(function () {
        comments.style.height = '0px'
        self.toggledComments = false
      }, 10)
    }
  }

  /**
   * Adds comments.
   */
  loadComments = () => {
    const comments = this.elements.comments

    for (let i = 0; i < this.props.data.comments.length; i++) {
      const comment = (
        <Comment data={this.props.data.comments[i]} />
      )

      this.renderComponents(comment, comments)
    }

    const dark = false

    const commentInput = (
      <CommentInput ref='commentInput' dark={dark} />
    )

    this.renderComponents(commentInput, comments)
  }

  /**
   * Sets media.
   * @param {String} image url
   */
  setMedia = (url) => {
    const mediaBlur = this.elements.mediaBlur
    const mediaPic = this.elements.mediaPic

    mediaBlur.style.backgroundImage = 'url(' + url + ')'
    mediaPic.src = url
  }

  /**
   * Animates post.
   */
  animate = () => {
    const root = this.getRoot()
    const index = this.props.index

    const until = ((index + 1) * 0.1) * 1000

    setTimeout(function () {
      root.style.opacity = '1'
      root.style.marginTop = '32px'
    }, until)
  }

  /**
   * Checks that logged user likes the post.
   * @return {Boolean}
   */
  isLikes = () => {
    const app = window.app

    if (app.accountInfo) {
      for (let i = 0; i < this.props.data.likes.length; i++) {
        if (this.props.data.likes[i].userID === app.accountInfo.userID) {
          return true
        }
      }
    }
    return false
  }

  render () {
    return (
      <div className='post' ref='root'>
        <div className='post-media' ref='media'>
          <div className='post-media-blur' ref='mediaBlur' />
          <img className='post-media-pic' ref='mediaPic' />
        </div>
        <div className='post-content ripple' ref='content' onClick={this.onClick} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart}>
          <div className='post-info'>
            <div className='post-avatar' ref='avatar' />
            <div className='post-primary' ref='primary'>
              <div className='post-title' ref='title' />
              <div className='post-sub-title' ref='subTitle' />
            </div>
          </div>
          <div className='post-text' ref='content' />
          <div className='post-action' ref='action'>
            <div
              className='post-action-item post-action-show-comments ripple-icon'
              ref='showCommentsButton'
              onClick={this.onShowCommentsButtonClick}
              onMouseDown={this.onActionIconMouseDown}
              onTouchStart={this.onActionIconTouchStart}
              onMouseEnter={this.onShowCommentsButtonMouseEnter}
              onMouseLeave={this.onShowCommentsButtonMouseLeave} />
            <div
              className='post-action-item-count'
              ref='commentsCount' />
            <div
              className='post-action-item post-action-like ripple-icon'
              ref='likeButton'
              onMouseDown={this.onActionIconMouseDown}
              onTouchStart={this.onActionIconTouchStart}
              onMouseEnter={this.onLikeButtonMouseEnter}
              onMouseLeave={this.onLikeButtonMouseLeave} />
            <div
              className='post-action-item-count'
              ref='likesCount'
              onMouseEnter={this.onLikesCountMouseEnter}
              onMouseLeave={this.onLikesCountMouseLeave} />
          </div>
        </div>
        <div className='post-comments' ref='comments' />
      </div>
    )
  }

  afterRender () {
    const props = this.props
    const data = props.data
    const style = data.style
    const root = this.getRoot()
    const getPostsTab = props.getPostsTab()

    const title = this.elements.title
    const subTitle = this.elements.subTitle
    const content = this.elements.content

    const likeButton = this.elements.likeButton

    const commentsCount = this.elements.commentsCount
    const likesCount = this.elements.likesCount

    title.innerHTML = data.title
    subTitle.innerHTML = data.author + ', ' + data.date
    content.innerHTML = data.content

    if (this.isLikes()) likeButton.classList.add('likes')

    commentsCount.innerHTML = data.comments.length
    likesCount.innerHTML = data.likes.length

    if (props.ripple == null) props.ripple = true

    if (props.rippleStyle == null) {
      props.rippleStyle = {
        backgroundColor: '#000',
        opacity: 0.2
      }
    }

    if (props.actionIconRippleStyle == null) {
      props.actionIconRippleStyle = {
        backgroundColor: '#000',
        opacity: 0.4
      }
    }

    if (data.media != null) this.setMedia(data.media)

    if (style != null) {
      if (style.light) {
        props.rippleStyle.backgroundColor = '#fff'

        root.style.color = '#fff'
        root.classList.add('white-actions')
      }

      if (style.background != null) {
        root.style.backgroundColor = style.background
      }
    }

    this.loadComments()
    this.animate()

    getPostsTab.posts.push(this)
  }
}
