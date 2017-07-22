import Component from '../../../../../../../helpers/Component'

export default class Post extends Component {
  beforeRender () {
    this.touched = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * On mouse down event.
   * Makes ripple.
   * @param {Event}
   */
  onMouseDown = (e) => {
    if (!this.touched && e.target !== this.elements.showCommentsButton && e.target !== this.elements.commentsCount && e.target !== this.elements.likeButton && e.target !== this.elements.likesCount && this.props.ripple) {
      const ripple = Ripple.createRipple(this.elements.content, this.props.rippleStyle, createRippleMouse(this.elements.content, e, 2))
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
      const ripple = Ripple.createRipple(this.elements.content, this.props.rippleStyle, createRippleMouse(this.elements.content, e, 2, true))
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
      const ripple = Ripple.createRipple(e.target, this.props.actionIconRippleStyle, createRippleCenter(e.target, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On action icon touch start event (on mobile).
   * Makes ripple.
   * @param {Event}
   */
  onActionIconTouchStart = (e) => {
    const ripple = Ripple.createRipple(e.target, this.props.actionIconRippleStyle, createRippleCenter(e.target, 14, 0.4, true))
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
   * Sets media.
   * @param {String} image url
   */
  setMedia = (url) => {
    const mediaBlur = this.elements.mediaBlur
    const mediaPic = this.elements.mediaPic

    if (url == null) {
      if (mediaBlur.style.display !== 'none') {
        mediaBlur.style.display = 'none'
        mediaPic.style.display = 'none'
      }
    } else {
      mediaBlur.style.backgroundImage = 'url(' + url + ')'
      mediaPic.src = url

      if (mediaBlur.style.display === 'none') {
        mediaBlur.style.display = 'block'
        mediaPic.style.display = 'block'
      }
    }
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
              onMouseDown={this.onActionIconMouseDown}
              onTouchStart={this.onActionIconTouchStart} />
            <div
              className='post-action-item-count'
              ref='commentsCount'>
                0
              </div>
            <div
              className='post-action-item post-action-like ripple-icon'
              ref='likeButton'
              onMouseDown={this.onActionIconMouseDown}
              onTouchStart={this.onActionIconTouchStart} />
            <div
              className='post-action-item-count'
              ref='likesCount'>
              0
            </div>
          </div>
        </div>
      </div>
    )
  }

  afterRender () {
    const props = this.props

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
  }
}
