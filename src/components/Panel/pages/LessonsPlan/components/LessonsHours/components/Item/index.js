import Component from 'inferno-component'

import MenuManager from '../../../../../../../../utils/MenuManager'

export default class Item extends Component {
  constructor () {
    super()
    this.elements = {}

    this.touched = false
  }

  addZero (time) {
    return (time < 10) ? ('0' + time) : time
  }

  /**
   * On menu icon click.
   * Shows category menu.
   * @param {Event}
   */
  onMenuIconClick = (e) => {
    if (this.props.removable) {
      const panel = window.panel
      const menu = window.app.panelElements.lessonsPlanMenu
      const lessonsPlanPage = panel.elements.lessonsPlanPage

      MenuManager.toggle(true, menu, e.target, true)
      panel.elements.lessonsPlanPage.selectedDay = this

      lessonsPlanPage.selectedLessonsHoursItem = this
      lessonsPlanPage.selectedLesson = null
    }
  }

  /**
   * On menu icon mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onMenuIconMouseDown = (e) => {
    if (!this.touched && this.props.removable) {
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
    if (this.props.removable) {
      const ripple = Ripple.createRipple(e.target, this.props.menuIconRippleStyle, createRippleCenter(e.target, 14, 0.4, true))
      Ripple.makeRipple(ripple)

      this.touched = true
    }
  }

  render () {
    const start = new Date(this.props.data.start)
    const end = new Date(this.props.data.end)

    const menuIconClassName = `menu-icon ripple-icon ${(!this.props.removable) ? 'disabled' : ''}`

    return (
      <div className='item'>
        <div className='start' onClick={() => { this.props.lessonsHours.toggleTimePicker(this, true) }}>
          {start.getHours()}:{this.addZero(start.getMinutes())}
        </div>
        <div className='finish' onClick={() => { this.props.lessonsHours.toggleTimePicker(this, false) }}>
          {end.getHours()}:{this.addZero(end.getMinutes())}
        </div>
        <div className={menuIconClassName} ref={(e) => this.elements.menuIcon = e} onClick={this.onMenuIconClick} onMouseDown={this.onMenuIconMouseDown} />
      </div>
    )
  }

  componentDidMount () {
    this.elements.menuIcon.addEventListener('touchstart', this.onMenuIconTouchStart)
  }
}

Item.defaultProps = {
  menuIconRippleStyle: {
    backgroundColor: '#000',
    opacity: 0.3
  }
}
