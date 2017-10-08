import Component from 'inferno-component'

import MenuManager from '../../../../utils/MenuManager'

export default class Lesson extends Component {
  constructor () {
    super()
    this.elements = {}

    this.isBottomBorder = false
    this.touched = false
  }

  onMouseDown = (e) => {
    const day = this.props.day

    if (!day.isMovingMode && this.props.editable) {
      day.toggleMovingMode(true, this)
    }
  }

  onMouseEnter = (e) => {
    if (this.props.editable) this.props.day.selectLesson(this)
  }

  removeBorders () {
    const root = this.elements.root

    root.classList.remove('border-top')
    root.classList.remove('border-bottom')

    this.isBottomBorder = false
  }

  getDate (date) {
    return `${date.getHours()}.${(date.getMinutes() < 10) ? ('0' + date.getMinutes()) : date.getMinutes()}`
  }

  /**
   * On menu icon click.
   * Shows category menu.
   * @param {Event}
   */
  onMenuIconClick = (e) => {
    const panel = window.panel
    const menu = window.app.panelElements.lessonsPlanMenu
    const lessonsPlanPage = panel.elements.lessonsPlanPage

    MenuManager.toggle(true, menu, e.target, true)

    lessonsPlanPage.selectedLesson = this
    lessonsPlanPage.selectedLessonsHoursItem = null
  }

  /**
   * On menu icon mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onMenuIconMouseDown = (e) => {
    if (!this.touched) {
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
    const ripple = Ripple.createRipple(e.target, this.props.menuIconRippleStyle, createRippleCenter(e.target, 14, 0.4, true))
    Ripple.makeRipple(ripple)

    this.touched = true
  }

  render () {
    const start = new Date(this.props.hours.start)
    const end = new Date(this.props.hours.end)

    return (
      <div className='lesson' ref={(e) => this.elements.root = e} onMouseDown={this.onMouseDown} onMouseEnter={this.onMouseEnter}>
        <div className='hour'>
          {this.getDate(start)} - {this.getDate(end)}
        </div>
        <div className='subject'>
          {this.props.subject}
        </div>
        {this.props.editable &&
          <div className='menu-icon ripple-icon' onClick={this.onMenuIconClick} onMouseDown={this.onMenuIconMouseDown} ref={(e) => this.elements.menuIcon = e} />
        }
      </div>
    )
  }

  componentDidMount () {
    this.props.day.lessons.push(this)

    if (this.props.editable) {
      this.elements.menuIcon.addEventListener('touchstart', this.onMenuIconTouchStart)
    }
  }
}

Lesson.defaultProps = {
  menuIconRippleStyle: {
    backgroundColor: '#000',
    opacity: 0.3
  }
}
