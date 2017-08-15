import Component from '../../../../../../helpers/Component'

export default class Tick extends Component {
  beforeRender () {
    this.toggled = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * On mouse down.
   * Enables ticks selecting.
   * @param {Event}
   */
  onMouseDown = (e) => {
    const timePicker = this.props.getTimePicker()

    timePicker.enableSelecting()
    if (!this.isSelected()) timePicker.selectTick(this)
  }

  /**
   * On mouse enter.
   * Selects touched tick.
   * @param {Event}
   */
  onMouseEnter = (e) => {
    const clock = this.props.getClock()
    const timePicker = this.props.getTimePicker()

    if (clock.isMouseDown && !this.isSelected()) timePicker.selectTick(this)
  }

  /**
   * On touch start. (on mobile)
   * Selects touched tick.
   * @param {Event}
   */
  onTouchStart = (e) => {
    const timePicker = this.props.getTimePicker()

    if (!this.isSelected()) timePicker.selectTick(this)
  }

  isSelected () {
    return (this.props.getClock().selectedTick === this)
  }

  render () {
    return (
      <div className='tick' ref='root' onMouseDown={this.onMouseDown} onMouseEnter={this.onMouseEnter} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd} onTouchMove={this.onTouchMove}>
        <div className='number' ref='number' />
      </div>
    )
  }

  afterRender () {
    const props = this.props
    const root = this.getRoot()

    const clock = props.getClock()

    root.style.top = props.top + 'px'
    root.style.left = props.left + 'px'

    this.elements.number.innerHTML = props.number

    clock.ticks.push(this)

    if (props.number === 6 || props.number === 30) {
      root.classList.add('selected')
      clock.selectedTick = this
    }
  }
}
