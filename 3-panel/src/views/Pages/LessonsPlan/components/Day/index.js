import Component from '../../../../../helpers/Component'

import Subject from './components/Subject'

import ExpansionPanel from '../ExpansionPanel'

import MaterialButton from '../../../../../imports/materialdesign/components/MaterialButton'
import Preloader from '../../../../../imports/materialdesign/components/Preloader'

export default class Day extends Component {
  beforeRender () {
    this.subjects = []

    this.isMovingMode = false
    this.movedSubject = null

    this.lastEnteredSubject = null

    this.isEdited = false
    this.isSaving = false

    this.materialButtonRippleStyle = {
      backgroundColor: '#3f51b5',
      opacity: 0.2
    }
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Parses day and adds subjects.
   */
  addSubjects () {
    this.subjectsContainer.innerHTML = ''
    this.subjects = []

    for (var i = 0; i < this.props.data.subjects.length; i++) {
      this.addSubject(this.props.data.subjects[i])
    }
  }

  /**
   * Adds subject.
   * @param {String} subject name
   */
  addSubject (name) {
    const subject = (
      <Subject name={name} getDay={() => { return this }} />
    )

    this.renderComponents(subject, this.subjectsContainer)
  }

  /**
   * On buttons container mouse enter.
   * @param {Event}
   */
  onButtonsContainerMouseEnter = (e) => {
    if (!this.isSaving) {
      if (this.isMovingMode && this.lastEnteredSubject != null) {
        const lastEnteredSubjectRoot = this.lastEnteredSubject.getRoot()

        lastEnteredSubjectRoot.classList.remove('border')
        lastEnteredSubjectRoot.classList.add('border-bottom')
      }
    }
  }

  /**
   * Toggles subject moving mode.
   * @param {Boolean}
   * @param {Subject} moved subject
   */
  toggleMovingMode (flag, subject) {
    const lessonsPlanPage = this.props.getLessonsPlanPage()

    if (flag) {
      this.isMovingMode = true
      this.movedSubject = subject

      window.addEventListener('mouseup', this.onWindowMouseUp)

      this.isEdited = true
      lessonsPlanPage.toggleActionButtons(true, this.actionButtons)
    } else {
      window.removeEventListener('mouseup', this.onWindowMouseUp)

      if (this.lastEnteredSubject != null) {
        const oldIndex = this.subjects.indexOf(this.movedSubject)
        const newIndex = this.subjects.indexOf(this.lastEnteredSubject)

        lessonsPlanPage.lessonsPlan.plan[lessonsPlanPage.days.indexOf(this)].subjects = this.props.data.subjects.move(oldIndex, newIndex)

        this.clearBorderFromLastEnterSubject()
        this.addSubjects()
      }

      this.isMovingMode = false
      this.movedSubject = null
      this.lastEnteredSubject = null
    }
  }

  /**
   * On window mouse up.
   * @param {Event}
   */
  onWindowMouseUp = (e) => {
    this.toggleMovingMode(false)
  }

  /**
   * Clears borders from last entered subject.
   */
  clearBorderFromLastEnterSubject () {
    const lastEnteredSubjectRoot = this.lastEnteredSubject.getRoot()

    lastEnteredSubjectRoot.classList.remove('border')
    lastEnteredSubjectRoot.classList.remove('border-bottom')
  }

  /**
   * On cancel button click.
   * Backs plan.
   * @param {Event}
   */
  onCancelButtonClick = (e) => {
    if (!this.isSaving) {
      const lessonsPlanPage = this.props.getLessonsPlanPage()

      const index = lessonsPlanPage.days.indexOf(this)
      lessonsPlanPage.lessonsPlan.plan[index].subjects = JSON.parse(JSON.stringify(lessonsPlanPage.lessonsPlanCopy.plan[index])).subjects // Same weird problem. Can't clone object copy of lessons plan.

      this.addSubjects()
      this.isEdited = false

      lessonsPlanPage.toggleActionButtons(false, this.actionButtons)
    }
  }

  /**
   * On save button click.
   * Saves plan for day.
   * @param {Event}
   */
  onSaveButtonClick = (e) => {
    const self = this

    const lessonsPlanPage = this.props.getLessonsPlanPage()
    const lessonHours = lessonsPlanPage.elements.lessonHours

    lessonsPlanPage.toggleSavingAnimation(true, this)
    this.isSaving = true
    this.isEdited = false

    const edited = []

    if (lessonHours.isEdited) {
      edited.push(lessonHours)
      lessonsPlanPage.toggleSavingAnimation(true, lessonHours)
    }

    for (var i = 0; i < lessonsPlanPage.days.length; i++) {
      const day = lessonsPlanPage.days[i]

      if (day.isEdited) {
        edited.push(day)
        lessonsPlanPage.toggleSavingAnimation(true, day)
      }
    }

    setTimeout(function () {
      self.isSaving = false

      lessonsPlanPage.lessonsPlanCopy = JSON.parse(JSON.stringify(lessonsPlanPage.lessonsPlan))
      lessonsPlanPage.toggleActionButtons(false, lessonsPlanPage.elements.lessonHours.actionButtons)
      lessonsPlanPage.toggleSavingAnimation(false, self)

      for (var i = 0; i < edited.length; i++) {
        edited[i].isEdited = false
        lessonsPlanPage.toggleSavingAnimation(false, edited[i])
      }

      lessonHours.isEdited = false
    }, 1000)
  }

  onAddButtonClick = (e) => {
    const app = window.app
    const lessonsPlanPage = this.props.getLessonsPlanPage()

    let error = false

    const length = this.props.data.subjects.length + 1

    const lessonsPlanStart = lessonsPlanPage.lessonsPlan.start
    const lessonsPlanFinish = lessonsPlanPage.lessonsPlan.finish

    if (lessonsPlanStart.length < length) {
      error = 'Brakuje godziny rozpoczynającej lekcję (po ' + lessonsPlanStart[lessonsPlanStart.length - 1] + ')'
    }

    if (lessonsPlanFinish.length < length) {
      error = ((error) ? (error + '<br>') : '') + 'Brakuje godziny kończącej lekcję (' + lessonsPlanFinish[lessonsPlanFinish.length - 1] + ')'
    }

    if (!error) {
      app.elements.addLessonDialog.show(this)
    } else {
      app.elements.errorDialog.show(error)
    }
  }

  render () {
    return (
      <ExpansionPanel className='day-expansion-panel' ref='root'>
        <div className='subjects-container' ref={(e) => { this.subjectsContainer = e }} />
        <div className='buttons-container' ref={(e) => { this.buttonsContainer = e }} onMouseEnter={this.onButtonsContainerMouseEnter}>
          <div className='action-buttons' ref={(e) => { this.actionButtons = e }}>
            <MaterialButton className='save' text='ZAPISZ' onClick={this.onSaveButtonClick} shadow={false} rippleStyle={this.materialButtonRippleStyle} />
            <MaterialButton className='cancel' text='ANULUJ' onClick={this.onCancelButtonClick} shadow={false} rippleStyle={{
              backgroundColor: '#000',
              opacity: 0.2
            }} />
          </div>
          <MaterialButton className='add' text='DODAJ' onClick={this.onAddButtonClick} shadow={false} rippleStyle={this.materialButtonRippleStyle} />
        </div>
        <div className='preloader-container' ref={(e) => { this.preloaderContainer = e }}>
          <Preloader ref={(e) => { this.preloader = e }} />
        </div>
      </ExpansionPanel>
    )
  }

  afterRender () {
    const props = this.props
    const lessonsPlanPage = props.getLessonsPlanPage()

    lessonsPlanPage.days.push(this)
    this.getRoot().setTitle(lessonsPlanPage.dayNames[lessonsPlanPage.days.indexOf(this)])

    this.addSubjects()

    if (props.toggleIconRippleStyle == null) {
      props.toggleIconRippleStyle = {
        backgroundColor: '#000',
        opacity: 0.3
      }
    }
  }
}
