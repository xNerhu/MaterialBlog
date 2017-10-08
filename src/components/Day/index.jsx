import Component from 'inferno-component'

import { setLessonsPlan } from '../../actions/lessons-plan'

import MaterialButton from '../../materialdesign/components/MaterialButton'
import Preloader from '../../materialdesign/components/Preloader'

import ExpansionPanel from '../ExpansionPanel'
import Lesson from './components/Lesson'

export default class Day extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      title: ''
    }

    this.lessons = []
    this.isMovingMode = false
    this.selectedLesson = null
    this.movedLesson = null
    this.isEdited = false
  }

  toggleMovingMode (flag, lesson) {
    if (!this.props.editable) return

    if (flag) {
      this.movedLesson = lesson

      window.addEventListener('mouseup', this.onWindowMouseUp)
    } else {
      window.removeEventListener('mouseup', this.onWindowMouseUp)

      if (this.selectedLesson == null) {
        this.movedLesson = null
        this.isMovingMode = false
        return
      }

      const isBottomBorder = this.selectedLesson.isBottomBorder

      this.selectedLesson.removeBorders()

      const lessonsPlanPage = window.panel.elements.lessonsPlanPage
      const days = lessonsPlanPage.state.days.slice()
      const dayIndex = this.props.index

      const oldIndex = this.movedLesson.props.index
      let newIndex = this.selectedLesson.props.index
      if (newIndex > oldIndex) newIndex -= 1

      if (isBottomBorder) {
        days[dayIndex].subjects.push(days[dayIndex].subjects.splice(oldIndex, 1)[0])
      } else {
        days[dayIndex].subjects = days[dayIndex].subjects.move(oldIndex, newIndex)
      }

      lessonsPlanPage.setState({
        days
      })

      this.movedLesson = null
      this.isMovingMode = false
      this.selectedLesson = null
      this.isEdited = true
      lessonsPlanPage.toggleActionButtons(this, true)
    }

    this.isMovingMode = flag
  }

  onWindowMouseUp = (e) => {
    this.toggleMovingMode(false)
  }

  selectLesson (lesson, bottomBorder = false) {
    if (this.props.editable && this.isMovingMode && (this.selectedLesson !== lesson || bottomBorder)) {
      if (this.selectedLesson != null) {
        this.selectedLesson.removeBorders()
        this.selectedLesson.isBottomBorder = bottomBorder
      }

      this.selectedLesson = lesson

      const root = lesson.elements.root
      const className = (bottomBorder) ? 'bottom' : 'top'

      root.classList.add('border-' + className)
    }
  }

  onButtonsContainerMouseEnter = (e) => {
    if (this.isMovingMode && this.props.editable) {
      const lessonsPlanPage = window.panel.elements.lessonsPlanPage
      const dayIndex = this.props.index
      const length = lessonsPlanPage.state.days[dayIndex].subjects.length

      this.selectLesson(this.lessons[length - 1], true)
    }
  }

  onCancelButtonClick = (e) => {
    if (this.props.editable) {
      const lessonsPlanPage = window.panel.elements.lessonsPlanPage
      const dayIndex = this.props.index

      const days = lessonsPlanPage.state.days.slice()
      days[dayIndex].subjects = JSON.parse(JSON.stringify(lessonsPlanPage.daysCopy[dayIndex].subjects))

      lessonsPlanPage.setState({
        days
      })

      lessonsPlanPage.toggleActionButtons(this, false)

      this.movedLesson = null
      this.isMovingMode = false
      this.selectedLesson = null
      this.isEdited = false
    }
  }

  onSaveButtonClick = async (e) => {
    if (this.isEdited && this.props.editable) {
      const lessonsPlanPage = window.panel.elements.lessonsPlanPage

      lessonsPlanPage.togglePreloader(this, true)
      lessonsPlanPage.toggleActionButtons(this, false)

      const dayIndex = this.props.index
      const days = lessonsPlanPage.state.days.slice()

      const json = await setLessonsPlan(this.props.data._id, days[dayIndex].subjects)
      if (!json.success) return console.error(json)

      lessonsPlanPage.daysCopy[dayIndex].subjects = days[dayIndex].subjects.slice()
      lessonsPlanPage.togglePreloader(this, false)
    }
  }

  onAddButtonClick = (e) => {
    if (this.props.editable) {
      const panel = window.panel

      panel.elements.lessonsPlanPage.selectedDay = this
      panel.elements.addLessonDialog.elements.dialog.toggle(true)
    }
  }

  render () {
    let index = 0

    let canAddLesson = false

    if (this.props.editable) {
      const lessonsPlanPage = window.panel.elements.lessonsPlanPage
      canAddLesson = (this.props.data.subjects.length < lessonsPlanPage.state.hoursCopy.length)
    }

    const subjectsContainerClassName = `subjects-container ${(!this.props.editable) ? 'default-cursor' : ''}`

    return (
      <ExpansionPanel className='lessons-plan-day' title={this.state.title}>
        <div className={subjectsContainerClassName}>
          {
            this.props.data.subjects.map((subject, key) => {
              const hours = this.props.hours[index]
              index++
              return <Lesson subject={subject} key={key} hours={hours} day={this} index={index - 1} editable={this.props.editable} />
            })
          }
        </div>
        {this.props.editable &&
          <div>
            <div className='buttons-container' ref={(e) => this.elements.buttonsContainer = e} onMouseEnter={this.onButtonsContainerMouseEnter}>
              <div className='action-buttons' ref={(e) => this.elements.actionButtons = e}>
                <MaterialButton text='ZAPISZ' onClick={this.onSaveButtonClick} shadow={false} rippleStyle={this.props.buttonRippleStyle} />
                <MaterialButton className='cancel' text='ANULUJ' onClick={this.onCancelButtonClick} shadow={false} rippleStyle={this.props.cancelButtonRippleStyle} />
              </div>
              <MaterialButton className='add' text='DODAJ' onClick={this.onAddButtonClick} shadow={false} rippleStyle={this.props.buttonRippleStyle} disabled={!canAddLesson} />
            </div>
            <div className='preloader-container' ref={(e) => this.elements.preloaderContainer = e}>
              <Preloader />
            </div>
          </div>
        }
      </ExpansionPanel>
    )
  }

  componentDidMount () {
    this.setState({
      title: this.props.daysOfWeek[this.props.index]
    })

    if (this.props.editable) window.panel.elements.lessonsPlanPage.days.push(this)
  }
}

Day.defaultProps = {
  editable: false,
  buttonRippleStyle: {
    backgroundColor: '#3f51b5',
    opacity: 0.2
  },
  cancelButtonRippleStyle: {
    backgroundColor: '#000',
    opacity: 0.2
  }
}
