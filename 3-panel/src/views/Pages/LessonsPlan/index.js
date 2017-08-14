import Component from '../../../helpers/Component'

import Day from './components/Day'
import LessonHours from './components/LessonHours'

export default class LessonsPlanPage extends Component {
  beforeRender () {
    this.pageData = {
      title: 'Plan lekcji',
      url: 'lessonsplan',
      loaded: false
    }

    this.lessonsPlan = []
    this.lessonsPlanCopy = []
    this.lessonsStart = []
    this.lessonsFinish = []

    this.dayNames = [
      'Poniedziałek',
      'Wtorek',
      'Środa',
      'Czwartek',
      'Piątek'
    ]

    this.days = []
    this.editedTime = null
    this.clickedLesson = null
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Loads categories.
   */
  load () {
    const self = this

    const app = window.app

    setTimeout(function () {
      app.togglePreloader(false)
      app.pagesData.loading = false

      self.lessonsPlan = {
        plan: [
          {
            subjects: [
              'WOS',
              'Niemiecki',
              'Polski',
              'Niemiecki',
              'Biologia',
              'Chemia',
              'Chemia',
              'Geografia'
            ]
          },
          {
            subjects: [
              'Fizyka',
              'Polski',
              'Geografia',
              'Niemiecki',
              'Angielski',
              'Angielski',
              'Niemiecki',
              'Matematyka'
            ]
          },
          {
            subjects: [
              'Historia',
              'Historia',
              'Informatyka',
              'Technika',
              'Fizyka',
              'Angielski',
              'Angielski',
              'Lekcja wychowawcza'
            ]
          },
          {
            subjects: [
              'Matematyka',
              'Matematyka',
              'Niemiecki',
              'Niemiecki',
              'Polski',
              'Polski',
              'Biologia'
            ]
          },
          {
            subjects: [
              'Matematyka',
              'Matematyka',
              'Angielski',
              'Angielski',
              'Polski'
            ]
          }
        ],
        start: [
          '8.00',
          '8.50',
          '9.40',
          '10.30',
          '11.30',
          '12.20',
          '13.30',
          '14.20',
          '15.10'
        ],
        finish: [
          '8.45',
          '9.35',
          '10.25',
          '11.15',
          '12.15',
          '13.05',
          '14.15',
          '15.05',
          '15.50'
        ]
      }

      self.lessonsPlanCopy = JSON.parse(JSON.stringify(self.lessonsPlan))
      self.setItems()
    }, 10)
  }

  setItems () {
    const container = this.elements.container

    this.days = []
    container.innerHTML = ''

    for (var i = 0; i < this.lessonsPlan.plan.length; i++) {
      const day = (
        <Day data={this.lessonsPlan.plan[i]} getLessonsPlanPage={() => { return this }} />
      )

      this.renderComponents(day, container)
    }

    const lessonHours = (
      <LessonHours ref='lessonHours' getLessonsPlanPage={() => { return this }} />
    )

    this.renderComponents(lessonHours, container)
  }

  onTimePickerConfirm = (hour, minutes, isAM) => {
    const time = this.parseTime(hour, minutes, isAM)

    const lessonHours = this.elements.lessonHours

    if (time !== this.editedTime.time) {
      const array = (this.editedTime.start) ? this.lessonsPlan.start : this.lessonsPlan.finish
      const index = lessonHours.items.indexOf(this.editedTime.item)

      if (index < 0) {
        console.log('Index is less than 0')
      } else {
        array[index] = time
      }

      for (var i = 0; i < this.days.length; i++) {
        const subject = this.days[i].subjects[index]

        if (subject != null) subject.setTime()
      }

      const lessonHoursItem = lessonHours.items[index]

      if (this.editedTime.start) {
        lessonHoursItem.props.start = time
      } else {
        lessonHoursItem.props.finish = time
      }

      lessonHoursItem.setTime()

      this.toggleActionButtons(true, lessonHours.actionButtons)

      lessonHours.isEdited = true
    }
  }

  parseTime (hour, minutes, isAM) {
    return ((!isAM) ? (hour + 12) : hour) + '.' + minutes
  }

  /**
   * Shows or hides action buttons container (save and cancel)
   * @param {Boolean}
   * @param {DOMElement}
   */
  toggleActionButtons (flag, actionButtons) {
    actionButtons.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(function () {
      actionButtons.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 20 : 300)
  }

  /**
   * Toggles saving animation.
   * @param {Boolean}
   * @param {Day | LessonHours}
   */
  toggleSavingAnimation (flag, expansionPanel) {
    const buttonsContainer = expansionPanel.buttonsContainer
    const preloaderContainer = expansionPanel.preloaderContainer

    preloaderContainer.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(function () {
      preloaderContainer.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 20 : 300)

    buttonsContainer.style.height = (flag) ? 0 : buttonsContainer.scrollHeight + 'px'

    if (flag) this.toggleActionButtons(false, expansionPanel.actionButtons)
  }

  render () {
    return (
      <div className='page page-lessons-plan' ref='root'>
        <div className='lessons-plan-container' ref='container' />
      </div>
    )
  }
}
