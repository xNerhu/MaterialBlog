import Component from 'inferno-component'

import HourClock from './components/HourClock'
import MinutesClock from './components/MinutesClock'

import MaterialButton from '../MaterialButton'

export default class TimePicker extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      isAM: true,
      hour: 6,
      minutes: 30
    }

    this.selectedClock = null
    this.isSelectedClockMinutes = false
    this.center = false
    this.toggled = false
    this.selecting = false
    this.canSelectClock = true
    this.lastNumber = 0
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Shows or hides time picker dialog.
   * @param {Boolean} set time to default (optional)
   */
  toggle (flag, setTimeToDefault) {
    const root = this.getRoot()

    root.style[(flag) ? 'display' : 'top'] = (flag) ? 'block' : '25%'
    if (!flag) root.style.opacity = '0'

    setTimeout(function () {
      root.style[(flag) ? 'top' : 'display'] = (flag) ? '50%' : 'none'
      if (flag) root.style.opacity = '1'
    }, (flag) ? 20 : 300)

    this.toggleDark(flag)

    if (this.isSelectedClockMinutes && flag) {
      this.selectClock()
    }
  }

  /**
   * Shows or hides dark.
   * @param {Boolean}
   */
  toggleDark (flag) {
    const opacity = this.props.darkOpacity
    const dark = this.elements.dark

    dark.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(function () {
      dark.style[(flag) ? 'opacity' : 'display'] = (flag) ? opacity : 'none'
    }, (flag) ? 20 : 300)
  }

  /**
   * Gets ticks position.
   * @param {Int} circle radius (optional)
   * @param {Int} circle size (optional)
   * @param {Int} tick size (optional)
   * @param {Int} ticks count (optional)
   * @return {Object} positions
   */
  getTicksPosition (radius = 108, size = 270, tickSize = 40, length = 12) {
    const step = (2 * Math.PI) / length
    let angle = 0
    let positions = []

    for (var i = 0; i < length; i++) {
      positions.push({
        x: Math.round(size / 2 + radius * Math.cos(angle) - tickSize / 2),
        y: Math.round(size / 2 + radius * Math.sin(angle) - tickSize / 2)
      })

      angle += step
    }

    return positions
  }

  rotate (x, y) {
    const deltaX = x - this.center.x
    const deltaY = y - this.center.y

    return Math.atan2(deltaY, deltaX) * 180 / Math.PI
  }

  /**
   * Enables selecting hour or minute.
   */
  enableSelecting (e) {
    this.onWindowMove(e)
    this.selecting = true
    this.setCenter()

    window.addEventListener('touchmove', this.onWindowMove)
    window.addEventListener('mousemove', this.onWindowMove)
    window.addEventListener('mouseup', this.disableSelecting)
  }

  /**
   * Disables selecting.
   */
  disableSelecting = () => {
    if (!this.isSelectedClockMinutes) this.selectClock(false)

    this.selecting = false

    window.removeEventListener('mouseup', this.disableSelecting)
    window.removeEventListener('mousemove', this.onWindowMove)
  }

  onWindowMove = (e) => {
    const pageX = (e.type === 'touchmove') ? e.touches[0].pageX : e.pageX
    const pageY = (e.type === 'touchmove') ? e.touches[0].pageY : e.pageY

    const rotate = this.rotate(pageX, pageY) - 90

    let number = Math.round(rotate / 30) + 6
    if (number < 1) number += 12

    if (this.isSelectedClockMinutes) number *= 5
    if (number >= 60) number = 0

    if (this.lastNumber !== number) {
      this.selectTick(this.getTickByNumber(this.selectedClock, number))
    }

    this.lastNumber = number
  }

  /**
   * Selects tick.
   * @param {Tick}
   * @param {HourClock | MinutesClock} clock (optional)
   */
  selectTick (tick, clock = this.selectedClock) {
    if (tick == null) return

    const line = clock.elements.line
    const rotate = clock.getRotate(tick.props.data.number)

    clock.setState({
      lineRotate: rotate
    })

    tick.getRoot().classList.add('selected')

    if (clock.selectedTick !== tick) {
      this.deselectTick(clock.selectedTick)
    }
    clock.selectedTick = tick

    const hourSelectedTick = this.elements.hourClock.selectedTick
    const minutesSelectedTick = this.elements.minutesClock.selectedTick

    this.setState({
      hour: (hourSelectedTick != null) ? hourSelectedTick.props.data.number : '',
      minutes: (minutesSelectedTick != null) ? minutesSelectedTick.props.data.number : ''
    })
  }

  /**
   * Deselects tick.
   * @param {Tick}
   */
  deselectTick (tick) {
    if (tick != null) tick.getRoot().classList.remove('selected')
  }

  setCenter () {
    const clocksContainer = this.elements.clocksContainer
    const rect = clocksContainer.getBoundingClientRect()

    this.center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
  }

  getTickByNumber (clock, number) {
    for (var i = 0; i < clock.state.ticks.length; i++) {
      if (clock.state.ticks[i].number == number) {
        return clock.ticks[i]
      }
    }
  }

  onClocksContainerClick = (e) => {
    if (this.selecting) {
      this.setCenter()
      this.onWindowMove(e)
    }
  }

  selectClock (hourClock = true) {
    const hoursClock = this.elements.hourClock
    const minutesClock = this.elements.minutesClock

    const clock = (hourClock) ? hoursClock : minutesClock

    if (this.selectedClock !== clock && this.canSelectClock) {
      this.toggleClock(false, this.selectedClock)
      this.selectedClock = clock
      this.canSelectClock = false
      this.isSelectedClockMinutes = !hourClock

      const hour = this.elements.hour
      const minutes = this.elements.minutes

      const elementAdd = (hourClock) ? hour : minutes
      const elementRemove = (hourClock) ? minutes : hour

      elementAdd.classList.add('selected')
      elementRemove.classList.remove('selected')

      setTimeout(() => {
        this.toggleClock(true, (hourClock) ? hoursClock : minutesClock)

        setTimeout(() => {
          this.canSelectClock = true
        }, 100)
      }, 100)
    }
  }

  /**
   * Shows or hides clock.
   * @param {Boolean}
   * @param {HourClock | MinutesClock} clock
   */
  toggleClock (flag, clock) {
    const clockRoot = clock.getRoot()
    const ticksContainer = clock.elements.ticksContainer

    clockRoot.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(function () {
      ticksContainer.style.transform = 'translate(-50%, -50%) scale(' + ((flag) ? '1' : '1.2') + ')'
    }, 20)

    setTimeout(function () {
      clockRoot.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 20 : 300)
  }

  changeTimePeriod (changeToAM = true) {
    if (this.state.isAM !== changeToAM) {
      const am = this.elements.am
      const pm = this.elements.pm

      const elementAdd = (changeToAM) ? am : pm
      const elementRemove = (changeToAM) ? pm : am

      elementAdd.classList.add('selected')
      elementRemove.classList.remove('selected')

      this.setState({
        isAM: changeToAM
      })
    }
  }

  setTime (hour, minutes) {
    this.changeTimePeriod(hour <= 12 && hour > 0)

    if (hour >= 12) hour -= 12

    const hourTick = this.getTickByNumber(this.elements.hourClock, hour)
    const minutesTick = this.getTickByNumber(this.elements.minutesClock, minutes)

    if (hourTick != null) this.selectTick(hourTick, this.elements.hourClock)
    if (minutesTick != null) this.selectTick(minutesTick, this.elements.minutesClock)
  }

  getTime () {
    let hour = this.state.hour
    if (!this.state.isAM) hour += 12

    return new Date(0, 0, 0, hour, this.state.minutes)
  }

  render () {
    return (
      <div>
        <div className='material-time-picker' ref={(e) => this.elements.root = e}>
          <div className='date-display'>
            <div className='date-container'>
              <span className='hour selected' ref={(e) => this.elements.hour = e} onClick={() => { this.selectClock() }}>
                {this.state.hour}
              </span>
              <span className='separate'>
                :
              </span>
              <span className='minutes' ref={(e) => this.elements.minutes = e} onClick={() => { this.selectClock(false) }}>
                {this.state.minutes}
              </span>
              <div className='am-pm-container'>
                <div className='item selected' ref={(e) => this.elements.am = e} onClick={() => { this.changeTimePeriod() }}>
                  AM
                </div>
                <div className='item' ref={(e) => this.elements.pm = e} onClick={() => { this.changeTimePeriod(false) }}>
                  PM
                </div>
              </div>
            </div>
          </div>
          <div className='clock-buttons-container' ref={(e) => this.elements.clocksContainer = e} onClick={this.onClocksContainerClick}>
            <div className='clock'>
              <div className='dot' />
              <HourClock ref={(e) => this.elements.hourClock = e} timePicker={this} />
              <MinutesClock ref={(e) => this.elements.minutesClock = e} timePicker={this} />
            </div>
            <div className='buttons-container'>
              <MaterialButton text='OK' shadow={false} rippleStyle={this.props.actionButtonRippleStyle} onClick={this.props.onConfirmButtonClick} />
              <MaterialButton text='ANULUJ' shadow={false} rippleStyle={this.props.actionButtonRippleStyle} onClick={() => { this.toggle(false) }} />
            </div>
          </div>
        </div>
        <div className='material-time-picker-dark' ref={(e) => this.elements.dark = e} />
      </div>
    )
  }

  componentDidMount () {
    this.selectedClock = this.elements.hourClock

    setTimeout(() => {
      this.setTime(this.props.defaultHour, this.props.defaultMinutes)
    }, 1)
  }
}

TimePicker.defaultProps = {
  defaultHour: 6,
  defaultMinutes: 30,
  darkOpacity: 0.7,
  actionButtonRippleStyle: {
    backgroundColor: '#3f51b5',
    opacity: 0.3
  }
}
