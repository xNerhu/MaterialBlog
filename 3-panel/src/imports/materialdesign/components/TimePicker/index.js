import Component from '../../../../helpers/Component'

import HoursClock from './components/HoursClock'
import MinutesClock from './components/MinutesClock'

import MaterialButton from '../MaterialButton'

export default class TimePicker extends Component {
  beforeRender () {
    this.toggled = false

    this.actualClock = null
    this.canSelectClock = true

    this.isAM = true
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
    if (flag) this.reset(setTimeToDefault)
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
   * Resets clocks.
   * @param {Boolean} set time to default (optional)
   */
  reset (setTimeToDefault = true) {
    this.canSelectClock = true
    this.selectClock(true)

    if (setTimeToDefault) {
      this.selectTime(true)
      this.setTime(6, 30)
    }
  }

  /**
   * Sets time.
   * @param {Int} hour
   * @param {Int | String} minutes
   */
  setTime (hour, minutes) {
    const hoursClock = this.elements.hoursClock
    const minutesClock = this.elements.minutesClock

    const hoursTickIndex = this.getTickIndex(hoursClock, hour)
    const minutesTickIndex = this.getTickIndex(minutesClock, minutes)

    if (hoursTickIndex < 0) console.log('cant find hour tick index')
    if (minutesTickIndex < 0) console.log('cant find minutes tick index')
    console.log(hoursTickIndex, minutesTickIndex)

    const hoursTick = hoursClock.ticks[hoursTickIndex]
    const minutesTick = minutesClock.ticks[minutesTickIndex]

    if (hoursClock.selectedTick !== hoursTick) this.selectTick(hoursTick, hoursClock)
    if (minutesClock.selectedTick !== minutesTick) this.selectTick(minutesTick, minutesClock)

    this.updateTime()
  }

  /**
   * Gets tick index.
   * @param {HoursClock | MinutesClock}
   * @param {Int | String} hour or minutes
   * @return {Int} tick index
   */
  getTickIndex (clock, number) {
    for (var i = 0; i < clock.ticks.length; i++) {
      const tickNumber = clock.ticks[i].props.number
      if (tickNumber == number) return i
    }

    return -1
  }

  /**
   * Enables selecting hour or minute.
   */
  enableSelecting () {
    this.actualClock.isMouseDown = true

    window.addEventListener('mouseup', this.disableSelecting)
  }

  /**
   * Disables selecting.
   */
  disableSelecting = () => {
    this.actualClock.isMouseDown = false
    window.removeEventListener('mouseup', this.disableSelecting)

    if (this.actualClock === this.elements.hoursClock) {
      this.selectClock(false)
    }
  }

  /**
   * Updates time.
   */
  updateTime () {
    const hoursClock = this.elements.hoursClock
    const minutesClock = this.elements.minutesClock

    this.elements.hour.innerHTML = hoursClock.selectedTick.props.number
    this.elements.minutes.innerHTML = minutesClock.selectedTick.props.number

    this.minutes = parseInt(minutesClock.selectedTick.props.number)
  }

  /**
   * Selects clock.
   * @param {Boolean} select hours clock
   */
  selectClock (selectHoursClock) {
    const hoursClock = this.elements.hoursClock
    const minutesClock = this.elements.minutesClock

    const clock = (selectHoursClock) ? hoursClock : minutesClock

    if (this.actualClock !== clock && this.canSelectClock) {
      this.actualClock = clock

      this.toggleClock(false, (selectHoursClock) ? minutesClock : hoursClock)
      this.canSelectClock = false

      const self = this
      setTimeout(function () {
        self.toggleClock(true, (selectHoursClock) ? hoursClock : minutesClock)

        setTimeout(function () {
          self.canSelectClock = true
        }, 100)
      }, 100)

      const hourDisplay = this.elements.hour
      const minutesDisplay = this.elements.minutes

      this.select(false, (selectHoursClock ? minutesDisplay : hourDisplay))
      this.select(true, (selectHoursClock ? hourDisplay : minutesDisplay))
    }
  }

  /**
   * Shows or hides clock.
   * @param {Boolean}
   * @param {HoursClock | MinutesClock}
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

  /**
   * Adds or removes "selected" class from given element
   * @param {Boolean}
   * @param {DOMElement}
   */
  select (flag, display) {
    if (flag) {
      display.classList.add('selected')
    } else {
      display.classList.remove('selected')
    }
  }

  /**
   * Selects time. (AM, PM)
   * @param {Boolean} select AM
   */
  selectTime (selectAM) {
    const am = this.elements.am
    const pm = this.elements.pm

    this.select(false, (selectAM) ? pm : am)
    this.select(true, (selectAM) ? am : pm)

    this.isAM = selectAM
  }

  /**
   * Calculates ticks position.
   * @param {Int} circle radius (optional)
   * @param {Int} circle size (optional)
   * @param {Int} tick size (optional)
   * @param {Int} ticks count (optional)
   * @return {Object} positions
   */
  calculateTickPosition (radius = 108, size = 270, tickSize = 40, length = 12) {
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

  /**
   * Selects tick.
   * @param {Tick}
   * @param {HoursClock | MinutesClock} clock (optional)
   */
  selectTick (tick, clock = this.actualClock) {
    const line = clock.elements.line
    const rotate = clock.getRotate(tick.props.number)

    line.style.transform = 'translateY(-75%) rotate(' + rotate + 'deg)'

    tick.getRoot().classList.add('selected')

    this.deselectTick(clock.selectedTick)
    clock.selectedTick = tick
    this.updateTime()
  }

  /**
   * Deselects tick.
   * @param {Tick}
   */
  deselectTick (tick) {
    if (tick != null) tick.getRoot().classList.remove('selected')
  }

  /**
   * On confirm button click.
   * Triggers event.
   * @param {Event}
   */
  onConfirmButtonClick = (e) => {
    const onConfirm = this.props.onConfirm

    if (typeof onConfirm === 'function') {
      /**
       * @param {Int} hour
       * @param {Int | String} minutes
       * @param {Boolean} is AM
       */
      onConfirm(this.elements.hoursClock.selectedTick.props.number, this.elements.minutesClock.selectedTick.props.number, this.isAM)
    }

    this.toggle(false)
  }

  render () {
    return (
      <div>
        <div className='material-time-picker' ref='root'>
          <div className='date-display'>
            <div className='date-container'>
              <span className='hour selected' ref='hour' onClick={() => this.selectClock(true)}>
                6
              </span>
              <span className='separate'>
                :
              </span>
              <span className='minutes' ref='minutes' onClick={() => this.selectClock(false)}>
                30
              </span>
              <div className='am-pm-container'>
                <div className='item selected' ref='am' onClick={() => this.selectTime(true)}>
                  AM
                </div>
                <div className='item' ref='pm' onClick={() => this.selectTime(false)}>
                  PM
                </div>
              </div>
            </div>
          </div>
          <div className='clock-buttons-container'>
            <div className='clock'>
              <HoursClock ref='hoursClock' getTimePicker={() => { return this }} />
              <MinutesClock ref='minutesClock' getTimePicker={() => { return this }} />
              <div className='dot' />
            </div>
            <div className='buttons-container' ref='buttonsContainer' />
          </div>
        </div>
        <div className='material-time-picker-dark' ref='dark' />
      </div>
    )
  }

  afterRender () {
    const props = this.props

    if (props.darkOpacity == null) props.darkOpacity = 0.7
    if (props.actionButtonRippleStyle == null) {
      props.actionButtonRippleStyle = {
        backgroundColor: '#3f51b5',
        opacity: 0.3
      }
    }

    this.actualClock = this.elements.hoursClock

    const buttons = (
      <div>
        <MaterialButton text='OK' shadow={false} rippleStyle={this.props.actionButtonRippleStyle} onClick={this.onConfirmButtonClick} />
        <MaterialButton text='ANULUJ' shadow={false} rippleStyle={this.props.actionButtonRippleStyle} onClick={() => { this.toggle(false) }} />
      </div>
    )

    this.renderComponents(buttons, this.elements.buttonsContainer)
  }
}
