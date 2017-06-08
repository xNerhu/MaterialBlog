import Comment from './components/Comment'
import CommentInput from './components/CommentInput'

export default class Post {
  constructor (data, index) {
    this.elements = {}
    this.props = {
      ripple: true,
      rippleStyle: {
        backgroundColor: '#000',
        opacity: 0.2
      },
      actionIconRippleStyle: {
        backgroundColor: '#000',
        opacity: 0.4
      },
      data: data,
      index: index
    }

    this.touched = false
    this.toggledComments = false

    this.render()
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
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
   * Toggle comments.
   * @param {Boolean}
   */
  toggleComments = (flag) => {
    const self = this
    const button = this.elements.showCommentsButton
    const comments = this.elements.comments

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
      const comment = new Comment(this.props.data.comments[i])

      comments.appendChild(comment.getRoot())
    }

    this.commentInput = new CommentInput()
    comments.appendChild(this.commentInput.getRoot())
  }

  /**
   * Sets media.
   */
  setMedia = () => {
    const pic = this.props.data.media
    const mediaBlur = this.elements.mediaBlur
    const mediaPic = this.elements.mediaPic

    mediaBlur.style.backgroundImage = 'url(' + pic + ')'
    mediaPic.src = pic
  }

  /**
   * Animates post.
   */
  animate = () => {
    const self = this
    const root = this.getRoot()
    const index = this.props.index

    const until = ((index + 1) * 0.1) * 1000

    setTimeout(function () {
      root.style.opacity = '1'
      root.style.marginTop = '32px'
    }, until + 100)
  }

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'post'

    // MEDIA
    this.elements.media = document.createElement('div')
    this.elements.media.className = 'post-media'
    this.elements.root.appendChild(this.elements.media)

    this.elements.mediaBlur = document.createElement('div')
    this.elements.mediaBlur.className = 'post-media-blur'
    this.elements.media.appendChild(this.elements.mediaBlur)

    this.elements.mediaPic = document.createElement('img')
    this.elements.mediaPic.className = 'post-media-pic'
    this.elements.media.appendChild(this.elements.mediaPic)

    // CONTENT
    this.elements.content = document.createElement('div')
    this.elements.content.className = 'post-content ripple'
    this.elements.content.addEventListener('mousedown', this.onMouseDown)
    this.elements.content.addEventListener('touchstart', this.onTouchStart)
    this.elements.root.appendChild(this.elements.content)

    // INFO
    this.elements.info = document.createElement('div')
    this.elements.info.className = 'post-info'
    this.elements.content.appendChild(this.elements.info)

    // AVATAR
    this.elements.avatar = document.createElement('div')
    this.elements.avatar.className = 'post-avatar'
    this.elements.info.appendChild(this.elements.avatar)

    // PRIMARY
    this.elements.primary = document.createElement('div')
    this.elements.primary.className = 'post-primary'
    this.elements.info.appendChild(this.elements.primary)

    // TITLE
    this.elements.title = document.createElement('div')
    this.elements.title.className = 'post-title'
    this.elements.title.innerHTML = this.props.data.title
    this.elements.primary.appendChild(this.elements.title)

    // SUB TITLE
    this.elements.subTitle = document.createElement('div')
    this.elements.subTitle.className = 'post-sub-title'
    this.elements.subTitle.innerHTML = this.props.data.author + ', ' + this.props.data.date
    this.elements.primary.appendChild(this.elements.subTitle)

    // TEXT
    this.elements.text = document.createElement('div')
    this.elements.text.className = 'post-text'
    this.elements.text.innerHTML = this.props.data.content
    this.elements.content.appendChild(this.elements.text)

    // ACTION
    this.elements.action = document.createElement('div')
    this.elements.action.className = 'post-action'
    this.elements.content.appendChild(this.elements.action)

    // SHOW COMMENTS BUTTON
    this.elements.showCommentsButton = document.createElement('div')
    this.elements.showCommentsButton.className = 'post-action-item post-action-show-comments ripple-icon'
    this.elements.showCommentsButton.addEventListener('click', this.onShowCommentsButtonClick)
    this.elements.showCommentsButton.addEventListener('mousedown', this.onActionIconMouseDown)
    this.elements.showCommentsButton.addEventListener('touchstart', this.onActionIconTouchStart)
    this.elements.action.appendChild(this.elements.showCommentsButton)

    // COMMENTS COUNT
    this.elements.commentsCount = document.createElement('div')
    this.elements.commentsCount.className = 'post-action-item-count'
    this.elements.commentsCount.innerHTML = this.props.data.comments.length
    this.elements.action.appendChild(this.elements.commentsCount)

    // LIKE BUTTON
    this.elements.likeButton = document.createElement('div')
    this.elements.likeButton.className = 'post-action-item post-action-like ripple-icon'
    this.elements.likeButton.addEventListener('mousedown', this.onActionIconMouseDown)
    this.elements.likeButton.addEventListener('touchstart', this.onActionIconTouchStart)
    this.elements.action.appendChild(this.elements.likeButton)

    // LIKES COUNT
    this.elements.likesCount = document.createElement('div')
    this.elements.likesCount.className = 'post-action-item-count'
    this.elements.likesCount.innerHTML = this.props.data.likes.length
    this.elements.action.appendChild(this.elements.likesCount)

    // COMMENTS
    this.elements.comments = document.createElement('div')
    this.elements.comments.className = 'post-comments'
    this.elements.root.appendChild(this.elements.comments)

    this.loadComments()
    if (this.props.data.media) this.setMedia()
    this.animate()
  }
}
