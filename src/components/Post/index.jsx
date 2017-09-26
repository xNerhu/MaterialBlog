import Component from 'inferno-component'

import { likePost } from '../../actions/posts'

import Comment from './components/Comment'
import CommentInput from './components/CommentInput'

import Preloader from '../../materialdesign/components/Preloader'

export default class Post extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      animate: false
    }

    this.touched = false
    this.toggledComments = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  onClick = (e) => {
    const onClick = this.props.onClick

    if (typeof onClick === 'function' && this.canClick(e.target)) onClick(e, this)
  }

  /**
   * On mouse down event.
   * Makes ripple.
   * @param {Event}
   */
  onMouseDown = (e) => {
    if (!this.touched && this.props.ripple && this.canClick(e.target)) {
      const ripple = Ripple.createRipple(this.elements.postContainer, this.props.rippleStyle, createRippleMouse(this.elements.postContainer, e, 1.5))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On touch event. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onTouchStart = (e) => {
    if (this.props.ripple && this.canClick(e.target)) {
      const ripple = Ripple.createRipple(this.elements.postContainer, this.props.rippleStyle, createRippleMouse(this.elements.postContainer, e, 1.5, true))
      Ripple.makeRipple(ripple)
      this.touched = true
    }
  }

  /**
   * On icon mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onIconMouseDown = (e, condition = true) => {
    if (!this.touched && condition) {
      const ripple = Ripple.createRipple(e.target, this.props.iconRippleStyle, createRippleCenter(e.target, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On icon touch start. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onIconTouchStart = (e, condition = true) => {
    if (condition) {
      const ripple = Ripple.createRipple(e.target, this.props.iconRippleStyle, createRippleCenter(e.target, 14, 0.4, true))
      Ripple.makeRipple(ripple)

      this.touched = true
    }
  }

  canClick (target) {
    return target.parentNode !== this.elements.actionButtons && target !== this.elements.actionButtons && target.tagName.toLowerCase() !== 'a' && !target.classList.contains('no-ripple')
  }

  toggleComments (flag) {
    if (!this.props.canToggleComments) return

    const commentsContainer = this.elements.commentsContainer
    const toggleCommentsButton = this.elements.toggleCommentsButton

    commentsContainer.style.height = commentsContainer.scrollHeight + 'px'

    setTimeout(() => {
      commentsContainer.style.height = (flag) ? 'auto' : '0px'
    }, (flag) ? 250 : 20)

    toggleCommentsButton.style.transform = `rotate(${(flag) ? 180 : 0}deg)`

    this.toggledComments = flag
  }

  togglePreloader (flag) {
    if (!this.props.canAddComments) return

    const preloaderContainer = this.elements.preloaderContainer

    preloaderContainer.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'
    setTimeout(() => {
      preloaderContainer.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 20 : 200)
  }

  onToggleCommentsButtonMouseEnter = (e) => {
    window.app.showTooltip(e.target, (!this.toggledComments) ? 'Pokaż komentarze' : 'Ukryj komentarze')
  }

  onFavoriteIconMouseEnter = (e) => {
    let text = 'Zaloguj się, by móc polubić ten post'

    if (this.props.userInfo) {
      text = (!this.props.data.liked) ? 'Lubię to!' : 'Już tego nie lubię!'
    }

    window.app.showTooltip(e.target, text)
  }

  onLikesCountMouseEnter = (e) => {
    const likes = this.props.data.likes
    let text = 'Brak polubień'
    let length = likes.length - 1

    for (var i = length; i >= 0; i--) {
      if (i === length) text = ''
      else text += '<br>'
      text += likes[i].authorInfo.username
    }

    window.app.showTooltip(e.target, text)
  }

  onFavoriteIconClick = async (e) => {
    if (!this.props.userInfo) return

    const json = await likePost(this.props.data._id)
    if (!json.success) return console.error(json)

    const postsTab = window.blog.elements.postsTab
    const posts = postsTab.state.posts.slice()
    const index = posts.indexOf(this.props.data)

    posts[index].liked = json.data.liked
    posts[index].likes = json.data.likes

    postsTab.setState({
      posts
    })
  }

  render () {
    let marginTop = 0
    if (this.state.animate) marginTop = 32
    else marginTop = 96

    const style = this.props.animation && {
      opacity: (this.state.animate || this.props.data.disableFirstSelectingAnimation) ? 1 : 0,
      marginTop: marginTop
    }

    const mediaBlurStyle = {
      backgroundImage: 'url(' + this.props.data.media + ')'
    }

    const avatarStyle = {
      backgroundImage: 'url(' + this.props.data.authorInfo.avatar + ')'
    }

    const favoriteIconClassName = `action-button favorite-icon ripple-icon ${this.props.data.liked ? 'liked' : ''}`

    return (
      <div className='post' ref={(e) => this.elements.root = e} style={style}>
        <div className='post-container ripple'
          ref={(e) => this.elements.postContainer = e}
          onMouseDown={this.onMouseDown}
          onClick={this.onClick}>
          <div className='media-container'>
            <div className='media-blur' style={mediaBlurStyle} />
            <img src={this.props.data.media} className='media' />
          </div>
          <div className='info'>
            <div className='avatar' style={avatarStyle} />
            <div className='primary'>
              <div className='title'>
                {this.props.data.title}
              </div>
              <div className='sub-title'>
                {this.props.data.authorInfo.username + ', ' + this.props.data.date}
              </div>
            </div>
          </div>
          <div className='content' dangerouslySetInnerHTML={{__html: this.props.data.content}} />
          <div className='action-buttons' ref={(e) => this.elements.actionButtons = e}>
            <div className='action-button toggle-icon toggle-comments ripple-icon'
              ref={(e) => this.elements.toggleCommentsButton = e}
              onClick={() => { this.toggleComments(!this.toggledComments) }}
              onMouseDown={this.onIconMouseDown}
              onMouseEnter={this.onToggleCommentsButtonMouseEnter}
            />
            <div className='action-count'>
              {this.props.data.comments.length}
            </div>
            <div className={favoriteIconClassName}
              ref={(e) => this.elements.favoriteIcon = e}
              onClick={this.onFavoriteIconClick}
              onMouseDown={(e) => { this.onIconMouseDown(e, this.props.userInfo) }}
              onMouseEnter={this.onFavoriteIconMouseEnter}
            />
            <div className='action-count' onMouseEnter={this.onLikesCountMouseEnter}>
              {this.props.data.likes.length}
            </div>
          </div>
        </div>
        <div className='comments-container' ref={(e) => this.elements.commentsContainer = e}>
          {
            this.props.data.comments.map((data, key) => {
              return <Comment data={data} key={key} post={this} />
            })
          }
          {this.props.canAddComments &&
            <div>
              <CommentInput post={this} userInfo={this.props.userInfo} />
              <div className='preloader-container' ref={(e) => this.elements.preloaderContainer = e}>
                <Preloader />
              </div>
            </div>
          }
        </div>
      </div>
    )
  }

  componentDidMount () {
    if (this.props.animation && !this.props.data.disableFirstSelectingAnimation) {
      setTimeout(() => {
        this.setState({
          animate: true
        })
      }, (this.props.index + 1) * 100)
    }

    if (typeof this.props.onLoad === 'function') this.props.onLoad(this)

    this.elements.postContainer.addEventListener('touchstart', this.onTouchStart)
    this.elements.toggleCommentsButton.addEventListener('touchstart', this.onIconTouchStart)
    this.elements.favoriteIcon.addEventListener('touchstart', (e) => {
      this.onIconTouchStart(e, this.props.userInfo)
    })
  }
}

Post.defaultProps = {
  canAddComments: true,
  canToggleComments: true,
  animation: false,
  disableFirstSelectingAnimation: false,
  ripple: true,
  rippleStyle: {
    backgroundColor: '#000',
    opacity: 0.15
  },
  iconRippleStyle: {
    backgroundColor: '#000',
    opacity: 0.2
  }
}
