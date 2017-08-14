import Component from '../../../../../../../helpers/Component'

export default class Item extends Component {
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

  setTime () {
    this.elements.start.innerHTML = this.props.start
    this.elements.finish.innerHTML = this.props.finish
  }

  render () {
    return (
      <div className='item'>
        <div className='start' ref='start' onClick={() => { this.toggleEditing(this.props.start, true) }} />
        <div className='finish' ref='finish' onClick={() => { this.toggleEditing(this.props.finish, false) }} />
      </div>
    )
  }

  afterRender () {
    this.setTime()
    this.props.getLessonHours().items.push(this)
  }
}
