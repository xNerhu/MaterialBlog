import Component from 'inferno-component'

import Tick from '../Tick'

export default class HourClock extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      ticks: [],
      lineRotate: 0
    }

    this.selectedTick = null
    this.ticks = []
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Gets line rotate value.
   * @param {Int} minutes
   * @return {Int} rotate
   */
  getRotate (number) {
    return number * 30 - 180
  }

  render () {
    const lineStyle = {
      transform: 'translateY(-75%) rotate(' + this.state.lineRotate + 'deg)'
    }

    return (
      <div className='hour-clock' ref={(e) => this.elements.root = e}>
        <div className='line' style={lineStyle} />
        <div className='ticks-container' ref={(e) => this.elements.ticksContainer = e}>
          {
            this.state.ticks.map((data, key) => {
              return <Tick data={data} key={key} timePicker={this.props.timePicker} clock={this} />
            })
          }
        </div>
      </div>
    )
  }

  componentDidMount () {
    const timePicker = this.props.timePicker
    const ticksPositions = timePicker.getTicksPosition()
    const ticks = []

    for (var i = 0; i <= 11; i++) {
      let number = i + 3
      if (number > 12) number -= 12

      const tick = {
        left: ticksPositions[i].x,
        top: ticksPositions[i].y,
        number: number
      }

      ticks.push(tick)
    }

    this.setState({
      ticks
    })
  }
}
