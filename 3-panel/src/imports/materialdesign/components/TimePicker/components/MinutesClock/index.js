import Component from '../../../../../../helpers/Component'

import Tick from '../Tick'

export default class MinutesClock extends Component {
  beforeRender () {
    this.ticks = []
    this.selectedTick = null

    this.isMouseDown = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Sets ticks around clock.
   * Yes. I know it. There is only five minutes. I'll fix this later.
   */
  setTicks () {
    const timePicker = this.props.getTimePicker()
    const ticksContainer = this.elements.ticksContainer

    const positions = timePicker.calculateTickPosition()

    let minutes = 10

    for (var i = 0; i < positions.length; i++) {
      minutes += 5
      if (minutes >= 60) minutes -= 60
      const _minutes = (minutes < 10) ? ('0' + minutes) : minutes

      const tick = (
        <Tick left={positions[i].x} top={positions[i].y} number={_minutes} getClock={() => { return this }} getTimePicker={() => { return this.props.getTimePicker() }} />
      )

      this.renderComponents(tick, ticksContainer)
    }

    setTimeout(function () {
      timePicker.updateTime()
    }, 10)
  }

  /**
   * Gets line rotate value.
   * @param {Int} minutes
   * @return {Int} rotate
   */
  getRotate (number) {
    return number * 6 + 180
  }

  render () {
    return (
      <div className='minutes-clock' ref='root'>
        <div className='line' ref='line' />
        <div className='ticks-container' ref='ticksContainer' />
      </div>
    )
  }

  afterRender () {
    this.setTicks()
  }
}
