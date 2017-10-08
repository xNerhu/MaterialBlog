import Component from 'inferno-component'

import MenuManager from '../../../../utils/MenuManager'

export default class PostComment extends Component {
  constructor () {
    super()
    this.elements = {}

    this.touched = false
  }

  /**
   * On menu icon click.
   * Shows menu.
   * @param {Event}
   */
  onMenuIconClick = (e) => {
    if (this.props.post.props.userInfo && this.isEditable()) {
      const menu = window.app.blogElements.commentMenu

      MenuManager.toggle(true, menu, e.target, true)
      window.blog.elements.postsTab.selectedComment = this
    }
  }

  /**
   * On menu icon mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onMenuIconMouseDown = (e) => {
    if (!this.touched && this.props.post.props.userInfo && this.isEditable()) {
      const ripple = Ripple.createRipple(e.target, this.props.menuIconRippleStyle, createRippleCenter(e.target, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On menu icon touch start. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onMenuIconTouchStart = (e) => {
    if (this.props.post.props.userInfo && this.isEditable()) {
      const ripple = Ripple.createRipple(e.target, this.props.menuIconRippleStyle, createRippleCenter(e.target, 14, 0.4, true))
      Ripple.makeRipple(ripple)

      this.touched = true
    }
  }

  /**
   * Compares actual date and comment date and returns named date for example five minutes ago
   */
  getNamedDate (date) {
    const actualDate = new Date()
    const year = actualDate.getFullYear()
    const month = actualDate.getMonth()
    const day = actualDate.getDate()
    const hour = actualDate.getHours()
    const minute = actualDate.getMinutes()

    date = new Date(date)

    const minutes = minute - date.getMinutes()
    const hours = hour - date.getHours()
    const days = day - date.getDate()
    const months = month - date.getMonth()
    const years = year - date.getFullYear()

    let result = ''

    if (years > 0) {
      if (years === 1) {
        result = 'rok temu'
      } else if (years >= 5) {
        result = years + ' lat temu'
      }
    } else if (months > 0) {
      if (months === 1) {
        result = 'miesiąc temu'
      } else if (months >= 5) {
        result = months + ' miesiący temu'
      } else {
        result = months + ' miesięce temu'
      }
    } else if (days > 0) {
      if (days === 1) {
        result = 'dzień temu'
      } else {
        result = days + ' dni temu'
      }
    } else if (hours > 0) {
      if (hours === 1) {
        result = 'godzinę temu'
      } else if (hours >= 2 && hours <= 4) {
        result = hours + ' godziny temu'
      } else {
        result = hours + ' godzin temu'
      }
    } else if (minutes < 60) {
      if (minutes === 0) {
        result = 'teraz'
      } else if (minutes === 1) {
        result = 'minutę temu'
      } else if (minutes === 2) {
        result = minutes + ' minuty temu'
      } else {
        result = minutes + ' minut temu'
      }
    } else {
      return
    }

    return result
  }

  isEditable () {
    return this.props.post.props.userInfo && this.props.data.editable
  }

  render () {
    const avatarStyle = {
      backgroundImage: `url(${this.props.data.authorInfo.avatar})`
    }

    const className = `post-comment ${!this.isEditable() ? 'not-editable' : ''}`

    return (
      <div className={className}>
        <div className='comment-avatar' style={avatarStyle} />
        <div className='comment-info'>
          <div className='comment-author'>
            {this.props.data.authorInfo.username}
            <span className='comment-date'>
              {
                this.getNamedDate(this.props.data.date)
              }
            </span>
          </div>
          <div className='comment-content'>
            {
              this.props.data.content.split('<br />').map((item, key) => {
                return <span key={key}>{item}<br/></span>
              })
            }
          </div>
        </div>
        <div className='menu-icon' ref={(e) => this.elements.menuIcon = e} onClick={this.onMenuIconClick} onMouseDown={this.onMenuIconMouseDown} />
      </div>
    )
  }

  componentDidMount () {
    this.elements.menuIcon.addEventListener('touchstart', this.onMenuIconTouchStart)
  }
}

Comment.defaultProps = {
  menuIconRippleStyle: {
    backgroundColor: '#000',
    opacity: 0.3
  }
}
