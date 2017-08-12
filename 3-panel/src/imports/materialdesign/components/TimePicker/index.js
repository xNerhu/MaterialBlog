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
   */
  toggle (flag) {
    const root = this.getRoot()

    root.style[(flag) ? 'display' : 'top'] = (flag) ? 'block' : '25%'
    if (!flag) root.style.opacity = '0'

    setTimeout(function () {
      root.style[(flag) ? 'top' : 'display'] = (flag) ? '50%' : 'none'
      if (flag) root.style.opacity = '1'
    }, (flag) ? 20 : 300)

    this.toggleDark(flag)
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
      this.selectClock(this.elements.minutesClock)
    }
  }

  /**
   * Updates hour.
   */
  updateHour () {
    const hoursClock = this.elements.hoursClock
    const minutesClock = this.elements.minutesClock

    this.elements.hour.innerHTML = hoursClock.selectedTick.props.number
    this.elements.minutes.innerHTML = minutesClock.selectedTick.props.number

    this.minutes = parseInt(minutesClock.selectedTick.props.number)
  }

  /**
   * Selects clock.
   * @param {HoursClock | MinutesClock}
   */
  selectClock (clock) {
    if (this.actualClock !== clock && this.canSelectClock) {
      this.actualClock = clock

      const hoursClock = this.elements.hoursClock
      const minutesClock = this.elements.minutesClock

      const isMinutesClock = (clock === this.elements.minutesClock)

      this.toggleClock(false, (isMinutesClock) ? hoursClock : minutesClock)
      this.canSelectClock = false

      const self = this
      setTimeout(function () {
        self.toggleClock(true, (isMinutesClock) ? minutesClock : hoursClock)

        setTimeout(function () {
          self.canSelectClock = true
        }, 100)
      }, 100)

      const hourDisplay = this.elements.hour
      const minutesDisplay = this.elements.minutes

      this.select(false, (isMinutesClock ? hourDisplay : minutesDisplay))
      this.select(true, (isMinutesClock ? minutesDisplay : hourDisplay))
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
   * @param {DOMElement}
   */
  selectTime (element) {
    const am = this.elements.am
    const pm = this.elements.pm

    this.isAM = (element === am)

    this.select(false, (this.isAM) ? pm : am)
    this.select(true, (this.isAM) ? am : pm)
  }

  /**
   * Calculates ticks position.
   * @param {Int} circle radius (Optional)
   * @param {Int} circle size (Optional)
   * @param {Int} tick size (Optional)
   * @param {Int} ticks count (Optional)
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
   */
  selectTick (tick) {
    const line = this.actualClock.elements.line
    const rotate = this.actualClock.getRotate(tick.props.number)

    line.style.transform = 'translateY(-75%) rotate(' + rotate + 'deg)'

    tick.getRoot().classList.add('selected')

    this.deselectTick(this.actualClock.selectedTick)
    this.actualClock.selectedTick = tick
    this.updateHour()
  }

  /**
   * Deselects tick.
   * @param {Tick}
   */
  deselectTick (tick) {
    if (tick != null) tick.getRoot().classList.remove('selected')
  }

  render () {
    return (
      <div>
        <div className='material-time-picker' ref='root'>
          <div className='date-display'>
            <div className='date-container'>
              <span className='hour selected' ref='hour' onClick={() => this.selectClock(this.elements.hoursClock)}>
                6
              </span>
              <span className='separate'>
                :
              </span>
              <span className='minutes' ref='minutes' onClick={() => this.selectClock(this.elements.minutesClock)}>
                30
              </span>
              <div className='am-pm-container'>
                <div className='item selected' ref='am' onClick={() => this.selectTime(this.elements.am)}>
                  AM
                </div>
                <div className='item' ref='pm' onClick={() => this.selectTime(this.elements.pm)}>
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
        backgroundColor: '#26a69a',
        opacity: 0.3
      }
    }

    this.toggle(true)

    this.actualClock = this.elements.hoursClock

    const buttons = (
      <div>
        <MaterialButton text='OK' shadow={false} rippleStyle={this.props.actionButtonRippleStyle} />
        <MaterialButton text='ANULUJ' shadow={false} rippleStyle={this.props.actionButtonRippleStyle} onClick={() => { this.toggle(false) }} />
      </div>
    )

    this.renderComponents(buttons, this.elements.buttonsContainer)
  }
}
