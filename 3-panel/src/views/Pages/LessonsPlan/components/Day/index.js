import Component from '../../../../../helpers/Component'

import Subject from './components/Subject'

import MaterialButton from '../../../../../imports/materialdesign/components/MaterialButton'
import Preloader from '../../../../../imports/materialdesign/components/Preloader'

export default class Day extends Component {
  beforeRender () {
    this.toggled = false

    this.subjects = []

    this.isMovingMode = false
    this.movedSubject = null

    this.lastEnteredSubject = null

    this.touched = false

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
   * Collapses or rises up container with subjects.
   * @param {Boolean}
   */
  toggle (flag) {
    const root = this.getRoot()
    const icon = this.elements.toggleIcon

    root.style.height = root.scrollHeight + 'px'

    setTimeout(function () {
      root.style.height = (flag) ? 'auto' : '48px'
    }, (flag) ? 300 : 20)

    icon.style.transform = 'rotate(' + ((flag) ? 180 : 0) + 'deg)'

    this.toggled = flag
  }

  /**
   * Parses day and adds subjects.
   */
  addSubjects () {
    this.elements.subjectsContainer.innerHTML = ''
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

    this.renderComponents(subject, this.elements.subjectsContainer)
  }

  /**
   * On toggle icon click.
   * @param {Event}
   */
  onToggleIconClick = (e) => {
    this.toggle(!this.toggled)
  }

  /**
   * On expand / collapse icon mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onToggleIconMouseDown = (e) => {
    if (!this.touched) {
      const ripple = Ripple.createRipple(this.elements.toggleIcon, this.props.toggleIconRippleStyle, createRippleCenter(this.elements.toggleIcon, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On expand / collapse icon touch start. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onToggleIconTouchStart = (e) => {
    const ripple = Ripple.createRipple(this.elements.toggleIcon, this.props.toggleIconRippleStyle, createRippleCenter(this.elements.toggleIcon, 14, 0.4, true))
    Ripple.makeRipple(ripple)

    this.touched = true
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
    if (flag) {
      this.isMovingMode = true
      this.movedSubject = subject

      window.addEventListener('mouseup', this.onWindowMouseUp)

      this.toggleActionButtons(true)
    } else {
      window.removeEventListener('mouseup', this.onWindowMouseUp)

      if (this.lastEnteredSubject != null) {
        const oldIndex = this.subjects.indexOf(this.movedSubject)
        const newIndex = this.subjects.indexOf(this.lastEnteredSubject)

        const lessonsPlanPage = this.props.getLessonsPlanPage()

        lessonsPlanPage.lessonsPlan[lessonsPlanPage.days.indexOf(this)].subjects = this.props.data.subjects.move(oldIndex, newIndex)

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
    console.log('window mouse up event')
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
      lessonsPlanPage.lessonsPlan[index].subjects = JSON.parse(JSON.stringify(lessonsPlanPage.lessonsPlanCopy[index])).subjects // Same weird problem. Can't clone object copy of lessons plan.

      this.addSubjects()

      this.toggleActionButtons(false)
    }
  }

  /**
   * On save button click.
   * Saves plan for day.
   * @param {Event}
   */
  onSaveButtonClick = (e) => {
    const self = this

    const subjectsContainer = this.elements.subjectsContainer
    const buttonsContainer = this.elements.buttonsContainer

    const lessonsPlanPage = this.props.getLessonsPlanPage()
    const preloaderRoot = this.elements.preloader.getRoot()

    subjectsContainer.style.opacity = '0'
    subjectsContainer.classList.add('disable-cursor-pointer')

    buttonsContainer.style.height = '0px'
    this.toggleActionButtons(false)
    this.isSaving = true

    preloaderRoot.style.display = 'block'

    setTimeout(function () {
      subjectsContainer.style.opacity = '1'
      subjectsContainer.classList.remove('disable-cursor-pointer')

      buttonsContainer.style.height = buttonsContainer.scrollHeight + 'px'

      self.isSaving = false

      preloaderRoot.style.display = 'none'

      lessonsPlanPage.lessonsPlanCopy = JSON.parse(JSON.stringify(lessonsPlanPage.lessonsPlan))
    }, 1000)
  }

  onAddButtonClick = (e) => {
    const app = window.app
    const lessonsPlanPage = this.props.getLessonsPlanPage()

    let error = false

    const length = this.props.data.subjects.length + 1

    if (lessonsPlanPage.lessonsStart.length < length) {
      error = 'Brakuje godziny rozpoczynającej lekcję (po ' + lessonsPlanPage.lessonsStart[lessonsPlanPage.lessonsStart.length - 1] + ')'
    }

    if (lessonsPlanPage.lessonsFinish.length < length) {
      error += '<br>Brakuje godziny kończącej lekcję (' + lessonsPlanPage.lessonsFinish[lessonsPlanPage.lessonsFinish.length - 1] + ')'
    }

    if (!error) {
      app.elements.addLessonDialog.show(this)
    } else {
      app.elements.errorDialog.show(error)
    }
  }

  /**
   * Shows or hides action buttons container (save and cancel)
   * @param {Boolean}
   */
  toggleActionButtons (flag) {
    const actionButtons = this.elements.actionButtons

    actionButtons.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(function () {
      actionButtons.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 20 : 300)
  }

  render () {
    return (
      <div className='lessons-plan-list' ref='root'>
        <div className='title-container'>
          <div className='title' ref='title' />
          <div className='icon-container'>
            <div className='toggle-icon' ref='toggleIcon' onClick={this.onToggleIconClick} onMouseDown={this.onToggleIconMouseDown} onTouchStart={this.onToggleIconTouchStart} />
          </div>
        </div>
        <div className='subjects-container' ref='subjectsContainer' />
        <div className='buttons-container' ref='buttonsContainer' onMouseEnter={this.onButtonsContainerMouseEnter}>
          <div className='action-buttons' ref='actionButtons'>
            <MaterialButton className='save' text='ZAPISZ' onClick={this.onSaveButtonClick} shadow={false} rippleStyle={this.materialButtonRippleStyle} />
            <MaterialButton className='cancel' text='ANULUJ' onClick={this.onCancelButtonClick} shadow={false} rippleStyle={{
              backgroundColor: '#000',
              opacity: 0.2
            }} />
          </div>
          <MaterialButton className='add' text='DODAJ' onClick={this.onAddButtonClick} shadow={false} rippleStyle={this.materialButtonRippleStyle} />
          <div className='clear-both' />
        </div>
        <Preloader ref='preloader' />
      </div>
    )
  }

  afterRender () {
    const props = this.props
    const lessonsPlanPage = props.getLessonsPlanPage()

    lessonsPlanPage.days.push(this)
    this.elements.title.innerHTML = lessonsPlanPage.dayNames[lessonsPlanPage.days.indexOf(this)]

    this.addSubjects()

    if (props.toggleIconRippleStyle == null) {
      props.toggleIconRippleStyle = {
        backgroundColor: '#000',
        opacity: 0.3
      }
    }
  }
}
