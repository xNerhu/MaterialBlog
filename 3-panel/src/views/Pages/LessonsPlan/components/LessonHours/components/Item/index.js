import Component from '../../../../../../../helpers/Component'
import MenuManager from '../../../../../../../helpers/MenuManager'

export default class Item extends Component {
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

  toggleEditing (time, isStart) {
    const app = window.app
    const lessonsPlanPage = this.props.getLessonsPlanPage()
    const timePicker = app.elements.timePicker

    const split = time.split('.')
    let hour = split[0]
    const minutes = split[1]

    if (hour > 12) {
      hour -= 12
      timePicker.selectTime(false)
    } else if (!timePicker.isAM) {
      timePicker.selectTime(true)
    }

    timePicker.setTime(hour, minutes)
    timePicker.toggle(true, false)

    lessonsPlanPage.editedTime = {
      time: time,
      start: isStart,
      item: this
    }
  }

  onMenuIconClick = (e) => {
    const app = window.app
    const menu = app.elements.lessonsPlanSubjectMenu
    const lessonsPlanPage = this.props.getLessonsPlanPage()

    document.removeEventListener('click', app.onClick)
    MenuManager.toggle(true, menu, e.target, false)
    lessonsPlanPage.clickedLessonHours = this
    lessonsPlanPage.deletingLesson = false
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

  setTime () {
    this.elements.start.innerHTML = this.props.start
    this.elements.finish.innerHTML = this.props.finish
  }

  render () {
    return (
      <div className='item'>
        <div className='start' ref='start' onClick={() => { this.toggleEditing(this.props.start, true) }} />
        <div className='finish' ref='finish' onClick={() => { this.toggleEditing(this.props.finish, false) }} />
        <div className='menu-icon' ref='menuIcon' onClick={this.onMenuIconClick} onMouseDown={this.onMenuIconMouseDown} onTouchStart={this.onMenuIconTouchStart} />
      </div>
    )
  }

  afterRender () {
    const props = this.props

    if (props.menuIconRippleStyle == null) {
      props.menuIconRippleStyle = {
        backgroundColor: '#000',
        opacity: 0.3
      }
    }

    this.setTime()
    props.getLessonHours().items.push(this)
  }
}
