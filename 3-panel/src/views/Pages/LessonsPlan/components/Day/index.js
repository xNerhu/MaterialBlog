import Component from '../../../../../helpers/Component'

import Subject from './components/Subject'

export default class Day extends Component {
  beforeRender () {
    this.toggled = false

    this.subjects = []

    this.isMovingMode = false
    this.movedSubject = null

    this.lastEnteredSubject = null
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
    const icon = this.elements.icon

    root.style.height = (flag) ? root.scrollHeight + 'px' : '48px'

    setTimeout(function () {
      root.style.height = 'auto'
    }, 300)

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
   * On title container mouse enter.
   * @param {Event}
   */
  onTitleContainerMouseEnter = (e) => {
    if (this.isMovingMode && this.lastEnteredSubject != null) {
      const lastEnteredSubjectRoot = this.lastEnteredSubject.getRoot()

      lastEnteredSubjectRoot.classList.remove('border')
      lastEnteredSubjectRoot.classList.add('border-top')
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
    lastEnteredSubjectRoot.classList.remove('border-top')
  }

  render () {
    return (
      <div className='lessons-plan-list' ref='root'>
        <div className='title-container' ref='titleContainer' onMouseEnter={this.onTitleContainerMouseEnter}>
          <div className='title' ref='title' />
          <div className='icon-container'>
            <div className='icon' ref='icon' onClick={this.onToggleIconClick} />
          </div>
        </div>
        <div className='subjects-container' ref='subjectsContainer' />
      </div>
    )
  }

  afterRender () {
    const lessonsPlanPage = this.props.getLessonsPlanPage()

    lessonsPlanPage.days.push(this)
    this.elements.title.innerHTML = lessonsPlanPage.dayNames[lessonsPlanPage.days.indexOf(this)]

    this.addSubjects()
  }
}
