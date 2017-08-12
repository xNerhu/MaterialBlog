import Component from '../../../../../../../helpers/Component'

export default class Item extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  editStart = (e) => {
    const app = window.app
    const timePicker = app.elements.timePicker

    const time = this.props.start
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
  }

  render () {
    return (
      <div className='item'>
        <div className='start' ref='start' onClick={this.editStart} />
        <div className='finish' ref='finish' />
      </div>
    )
  }

  afterRender () {
    const props = this.props

    props.getLessonHours().items.push(this)

    this.elements.start.innerHTML = props.start
    this.elements.finish.innerHTML = props.finish
  }
}
