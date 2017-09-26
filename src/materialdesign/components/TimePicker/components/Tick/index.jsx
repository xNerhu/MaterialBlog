import Component from 'inferno-component'

export default class Tick extends Component {
  constructor () {
    super()
    this.elements = {}

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
   * On mouse down or touch start.
   * Enables ticks selecting.
   * @param {Event}
   */
  onMouseOrTouch = (e) => {
    const timePicker = this.props.timePicker

    if (!timePicker.selecting) {
      timePicker.enableSelecting(e)
    }

    if (!this.isSelected() && timePicker.selecting) timePicker.selectTick(this)
  }

  isSelected () {
    return (this.props.clock.selectedTick === this)
  }

  render () {
    const style = {
      top: this.props.data.top + 'px',
      left: this.props.data.left + 'px'
    }

    return (
      <div className='tick' ref={(e) => this.elements.root = e} onMouseDown={this.onMouseOrTouch} style={style}>
        <div className='number'>
          {this.props.data.number}
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.props.clock.ticks.push(this)
    this.getRoot().addEventListener('touchstart', this.onMouseOrTouch)
  }
}
