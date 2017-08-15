import Component from '../../../../../../helpers/Component'

import Tick from '../Tick'

export default class HoursClock extends Component {
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
   */
  setTicks () {
    const timePicker = this.props.getTimePicker()
    const ticksContainer = this.elements.ticksContainer

    const positions = timePicker.calculateTickPosition()

    for (var i = 0; i < positions.length; i++) {
      let number = i + 3
      if (number > 12) number -= 12

      const tick = (
        <Tick left={positions[i].x} top={positions[i].y} number={number} getClock={() => { return this }} getTimePicker={() => { return this.props.getTimePicker() }} />
      )

      this.renderComponents(tick, ticksContainer)
    }
  }

  /**
   * Gets line rotate value.
   * @param {Int} minutes
   * @return {Int} rotate
   */
  getRotate (number) {
    return number * 30 + 180
  }

  render () {
    return (
      <div className='hours-clock' ref='root'>
        <div className='line' ref='line' />
        <div className='ticks-container' ref='ticksContainer' />
      </div>
    )
  }

  afterRender () {
    this.setTicks()
  }
}
