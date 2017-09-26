import Component from 'inferno-component'

import { setLessonsPlanHours } from '../../../../../../actions/lessons-plan'

import MaterialButton from '../../../../../../materialdesign/components/MaterialButton'
import Preloader from '../../../../../../materialdesign/components/Preloader'

import ExpansionPanel from '../../../../../ExpansionPanel'

import Item from './components/Item'

export default class LessonsHours extends Component {
  constructor () {
    super()
    this.elements = {}

    this.isEdited = false
    this.editingStartHours = false
    this.selectedItem = null
    this.selectedItemStart = false
  }

  toggleTimePicker (item, start) {
    const panel = window.panel
    const timePicker = panel.elements.lessonsPlanTimePicker

    const date = new Date((start) ? item.props.data.start : item.props.data.end)

    if (date.getMinutes() % 5 > 0) console.error(date)

    timePicker.setTime(date.getHours(), date.getMinutes())
    timePicker.toggle(true)

    this.editingStartHours = start
    this.selectedItem = item
    this.selectedItemStart = start
  }

  onCancelButtonClick = (e) => {
    const lessonsPlanPage = window.panel.elements.lessonsPlanPage

    lessonsPlanPage.toggleActionButtons(this, false)
    lessonsPlanPage.setState({
      hours: JSON.parse(JSON.stringify(lessonsPlanPage.state.hoursCopy)) //lessonsPlanPage.state.hoursCopy.slice()//JSON.parse(JSON.stringify(lessonsPlanPage.hoursCopy))
    })

    this.isEdited = false
  }

  onSaveButtonClick = async (e) => {
    if (this.isEdited) {
      const lessonsPlanPage = window.panel.elements.lessonsPlanPage

      lessonsPlanPage.togglePreloader(this, true)
      lessonsPlanPage.toggleActionButtons(this, false)

      const json = await setLessonsPlanHours(lessonsPlanPage.state.hours)
      if (!json.success) return console.error(json)

      lessonsPlanPage.setState({
        hoursCopy: JSON.parse(JSON.stringify(lessonsPlanPage.state.hours))
      })
      lessonsPlanPage.togglePreloader(this, false)

      this.isEdited = false
    }
  }

  onAddButtonClick = (e) => {
    const lessonsPlanPage = window.panel.elements.lessonsPlanPage
    const hours = lessonsPlanPage.state.hours.slice()

    let data = {
      start: new Date(0, 0, 0, 8, 0).toISOString(),
      end: new Date(0, 0, 0, 8, 45).toISOString()
    }

    const length = hours.length

    if (length > 0) {
      const hour = hours[length - 1]

      const lastStartingDate = new Date(hour.start)
      const lastStarting = this.calculateHour(lastStartingDate.getHours(), lastStartingDate.getMinutes(), 50)

      const startingHour = lastStarting.hour
      const startingMinutes = lastStarting.minutes

      const ending = this.calculateHour(startingHour, startingMinutes, 45)

      const endingHour = ending.hour
      const endingMinutes = ending.minutes

      data = {
        start: new Date(0, 0, 0, startingHour, startingMinutes).toISOString(),
        end: new Date(0, 0, 0, endingHour, endingMinutes).toISOString()
      }
    }

    hours.push(data)

    lessonsPlanPage.setState({
      hours
    })

    this.isEdited = true
    lessonsPlanPage.toggleActionButtons(this, true)
  }

  calculateHour (hour, minutes, minutesToAdd) {
    minutes += minutesToAdd

    if (minutes > 60) {
      minutes -= 60
      hour++
    }

    return {
      hour: hour,
      minutes: minutes
    }
  }

  render () {
    let index = 0

    return (
      <ExpansionPanel className='lessons-plan-hours' title='Godziny lekcji'>
        <div className='hours-container'>
          {
            this.props.hours.map((data, key) => {
              index++
              return <Item data={data} key={key} lessonsHours={this} index={index - 1} removable={this.props.removableHours} />
            })
          }
        </div>
        <div className='buttons-container' ref={(e) => this.elements.buttonsContainer = e} onMouseEnter={this.onButtonsContainerMouseEnter}>
          <div className='action-buttons' ref={(e) => this.elements.actionButtons = e}>
            <MaterialButton text='ZAPISZ' onClick={this.onSaveButtonClick} shadow={false} rippleStyle={this.props.buttonRippleStyle} />
            <MaterialButton className='cancel' text='ANULUJ' onClick={this.onCancelButtonClick} shadow={false} rippleStyle={this.props.cancelButtonRippleStyle} />
          </div>
          <MaterialButton className='add' text='DODAJ' onClick={this.onAddButtonClick} shadow={false} rippleStyle={this.props.buttonRippleStyle} />
        </div>
        <div className='preloader-container' ref={(e) => this.elements.preloaderContainer = e}>
          <Preloader />
        </div>
      </ExpansionPanel>
    )
  }
}

LessonsHours.defaultProps = {
  buttonRippleStyle: {
    backgroundColor: '#3f51b5',
    opacity: 0.2
  },
  cancelButtonRippleStyle: {
    backgroundColor: '#000',
    opacity: 0.2
  }
}
