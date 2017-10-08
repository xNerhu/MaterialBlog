import Component from 'inferno-component'

import { getLessonsPlan } from '../../../../actions/lessons-plan'

import Day from '../../../Day'
import LessonsHours from './components/LessonsHours'

export default class LessonsPlan extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      days: [],
      hours: [],
      hoursCopy: []
    }

    this.daysCopy = []

    this.daysOfWeek = [
      'Poniedziałek',
      'Wtorek',
      'Środa',
      'Czwartek',
      'Piątek'
    ]

    this.toggledTable = true
    this.toggledPictures = false
    this.toggledDeletingMode = false

    this.checked = 0

    this.selectedDay = null
    this.selectedLesson = null
    this.selectedLessonsHoursItem = null

    this.days = []
  }

  async load () {
    const panel = window.panel

    const json = await getLessonsPlan()
    if (json.success === false) return console.error(json)

    this.daysCopy = JSON.parse(JSON.stringify(json.days))

    this.setState({
      days: json.days,
      hours: json.hours,
      hoursCopy: JSON.parse(JSON.stringify(json.hours))
    })

    panel.togglePreloader(false)
    this.elements.container.style.opacity = '1'
  }

  togglePreloader (component, flag) {
    const preloaderContainer = component.elements.preloaderContainer
    const buttonsContainer = component.elements.buttonsContainer

    preloaderContainer.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'
    setTimeout(() => {
      preloaderContainer.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 20 : 200)

    buttonsContainer.style.height = ((flag) ? 0 : buttonsContainer.scrollHeight) + 'px'
  }

  toggleActionButtons (component, flag) {
    const actionButtons = component.elements.actionButtons

    actionButtons.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'
    setTimeout(() => {
      actionButtons.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 20 : 200)
  }

  onTimePickerConfirmButtonClick = (e) => {
    const lessonsHours = this.elements.lessonsHours

    if (lessonsHours.selectedItem != null) {
      const hours = this.state.hours.slice()
      const index = hours.indexOf(lessonsHours.selectedItem.props.data)

      const timePicker = window.panel.elements.lessonsPlanTimePicker
      const time = timePicker.getTime()

      if (lessonsHours.selectedItemStart) hours[index].start = time
      else hours[index].end = time

      this.setState({
        hours
      })

      lessonsHours.selectedItem.isAM = timePicker.state.isAM
      lessonsHours.isEdited = true

      this.toggleActionButtons(lessonsHours, true)

      timePicker.toggle(false)
    }
  }

  onMenuDeleteButtonClick = (e) => {
    if (this.selectedLesson != null) {
      const days = this.state.days.slice()
      const day = this.selectedLesson.props.day
      const dayIndex = day.props.index
      const lessonIndex = this.selectedLesson.props.index

      days[dayIndex].subjects.splice(lessonIndex, 1)

      this.setState({
        days
      })

      day.isEdited = true
      this.toggleActionButtons(day, true)
    } else if (this.selectedLessonsHoursItem != null) {
      const lessonsHours = this.elements.lessonsHours
      const index = this.selectedLessonsHoursItem.props.index
      const hours = this.state.hours.slice()

      const longestDay = this.getLongestDay()

      if (longestDay.subjects.length < hours.length) {
        hours.splice(index, 1)

        this.setState({
          hours
        })
      }

      lessonsHours.isEdited = true
      this.toggleActionButtons(lessonsHours, true)
    }
  }

  getLongestDay () {
    let index = -1
    let biggestLength = -1

    for (var i = 0; i < this.state.days.length; i++) {
      const length = this.state.days[i].subjects.length

      if (length > biggestLength) {
        index = i
        biggestLength = length
      }
    }

    const day = this.state.days[index]
    return (day != null) ? day : {subjects: []}
  }

  render () {
    let index = 0

    const removableHours = (this.getLongestDay().subjects.length < this.state.hoursCopy.length)

    return (
      <div className='panel-page lessons-plan' ref={(e) => this.elements.root = e}>
        <div className='panels-container' ref={(e) => this.elements.container = e}>
          {
            this.state.days.map((data, key) => {
              index++
              return <Day data={data} key={key} index={index - 1} editable={true} daysOfWeek={this.daysOfWeek} hours={this.state.hours} />
            })
          }
          <LessonsHours ref={(e) => this.elements.lessonsHours = e} hours={this.state.hours} removableHours={removableHours} />
        </div>
      </div>
    )
  }

  componentDidMount () {
    const panel = window.panel
    const title = 'Plan lekcji'

    panel.defaultToolbarTitle = title
    panel.setState({
      toolbarTitle: title
    })

    panel.elements.lessonsPlanPage = this
    panel.toggleFAB(false)
  }
}
