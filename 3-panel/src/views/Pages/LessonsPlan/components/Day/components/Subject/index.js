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

    if (day.isMovingMode && !day.isSaving) {
      const lastEnteredSubject = day.lastEnteredSubject

      if (lastEnteredSubject != null) {
        day.clearBorderFromLastEnterSubject()
      }

      const root = this.getRoot()

      root.classList.add((day.subjects.indexOf(this) < 0) ? 'border-bottom' : 'border')

      day.lastEnteredSubject = this
    }
  }

  /**
   * On mouse down.
   * @param {Event}
   */
  onMouseDown = (e) => {
    if (e.target !== this.elements.menuIcon) {
      const day = this.props.getDay()

      if (!day.isSaving) day.toggleMovingMode(true, this)
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
        <div className='hour' ref='hour' />
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
    const day = props.getDay()
    const lessonsPlanPage = day.props.getLessonsPlanPage()

    day.subjects.push(this)

    const index = day.subjects.length - 1
    this.elements.hour.innerHTML = lessonsPlanPage.lessonsStart[index] + ' - ' + lessonsPlanPage.lessonsFinish[index]

    if (props.menuIconRippleStyle == null) {
      props.menuIconRippleStyle = {
        backgroundColor: '#000',
        opacity: 0.3
      }
    }
  }
}
