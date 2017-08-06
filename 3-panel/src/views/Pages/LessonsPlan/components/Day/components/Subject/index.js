import Component from '../../../../../../../helpers/Component'

export default class Subject extends Component {
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
   * On mouse enter.
   * @param {Event}
   */
  onMouseEnter = (e) => {
    const day = this.props.getDay()

    if (day.isMovingMode) {
      const lastEnteredSubject = day.lastEnteredSubject

      if (lastEnteredSubject != null) {
        day.clearBorderFromLastEnterSubject()
      }

      const root = this.getRoot()

      root.classList.add((day.subjects.indexOf(this) < 0) ? 'border-top' : 'border')

      day.lastEnteredSubject = this
    }
  }

  /**
   * On mouse down.
   * @param {Event}
   */
  onMouseDown = (e) => {
    if (e.target !== this.elements.menuIcon) {
      this.props.getDay().toggleMovingMode(true, this)
    }
  }

  /**
   * On menu icon mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onMenuIconMouseDown = (e) => {
    if (!this.touched) {
      const ripple = Ripple.createRipple(this.elements.menuIcon, this.props.menuIconRippleStyle, createRippleCenter(this.elements.menuIcon, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On menu icon touch start. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onMenuIconTouchStart = (e) => {
    const ripple = Ripple.createRipple(this.elements.menuIcon, this.props.menuIconRippleStyle, createRippleCenter(this.elements.menuIcon, 14, 0.4, true))
    Ripple.makeRipple(ripple)

    this.touched = true
  }

  render () {
    return (
      <div className='subject' ref='root' onMouseDown={this.onMouseDown} onMouseEnter={this.onMouseEnter}>
        <div className='hour'>
          8.00-8.45
        </div>
        <div className='name'>
          {
            this.props.name
          }
        </div>
        <div className='menu-icon ripple-icon' ref='menuIcon' onMouseDown={this.onMenuIconMouseDown} onTouchStart={this.onMenuIconTouchStart} />
      </div>
    )
  }

  afterRender () {
    const props = this.props

    props.getDay().subjects.push(this)

    if (props.menuIconRippleStyle == null) {
      props.menuIconRippleStyle = {
        backgroundColor: '#000',
        opacity: 0.3
      }
    }
  }
}
