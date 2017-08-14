import Component from '../../../../../helpers/Component'

import ExpansionPanel from '../ExpansionPanel'
import Item from './components/Item'

import MaterialButton from '../../../../../imports/materialdesign/components/MaterialButton'
import Preloader from '../../../../../imports/materialdesign/components/Preloader'

export default class Day extends Component {
  beforeRender () {
    this.items = []

    this.materialButtonRippleStyle = {
      backgroundColor: '#3f51b5',
      opacity: 0.2
    }

    this.isSaving = false
    this.isEdited = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  addItems () {
    this.items = []
    this.container.innerHTML = ''

    const lessonsPlanPage = this.props.getLessonsPlanPage()
    const lessonsPlan = lessonsPlanPage.lessonsPlan

    for (var i = 0; i < lessonsPlan.start.length; i++) {
      this.addItem(lessonsPlan.start[i], lessonsPlan.finish[i])
    }
  }

  addItem (start, finish) {
    const item = (
      <Item start={start} finish={finish} getLessonHours={() => { return this }} getLessonsPlanPage={() => { return this.props.getLessonsPlanPage() }} />
    )

    this.renderComponents(item, this.container)
  }

  onSaveButtonClick = (e) => {
    const self = this

    const lessonsPlanPage = this.props.getLessonsPlanPage()

    lessonsPlanPage.toggleSavingAnimation(true, this)
    this.isSaving = true

    const editedDays = []

    for (var i = 0; i < lessonsPlanPage.days.length; i++) {
      const day = lessonsPlanPage.days[i]

      if (day.isEdited) {
        lessonsPlanPage.toggleSavingAnimation(true, day)
        editedDays.push(day)
      }
    }

    setTimeout(function () {
      self.isSaving = false
      self.isEdited = false

      lessonsPlanPage.lessonsPlanCopy = JSON.parse(JSON.stringify(lessonsPlanPage.lessonsPlan))
      lessonsPlanPage.toggleActionButtons(false, lessonsPlanPage.elements.lessonHours.actionButtons)

      lessonsPlanPage.toggleSavingAnimation(false, self)

      for (var i = 0; i < editedDays.length; i++) {
        editedDays[i].isEdited = false
        lessonsPlanPage.toggleSavingAnimation(false, editedDays[i])
      }
    }, 1000)
  }

  onCancelButtonClick = (e) => {
    const lessonsPlanPage = this.props.getLessonsPlanPage()

    lessonsPlanPage.lessonsPlan.start = JSON.parse(JSON.stringify(lessonsPlanPage.lessonsPlanCopy.start))
    lessonsPlanPage.lessonsPlan.finish = JSON.parse(JSON.stringify(lessonsPlanPage.lessonsPlanCopy.finish))
    this.addItems()

    this.isEdited = false

    lessonsPlanPage.toggleActionButtons(false, this.actionButtons)
  }

  render () {
    return (
      <ExpansionPanel className='hours-expansion-panel' ref='root'>
        <div className='container' ref={(e) => { this.container = e }} />
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
    this.getRoot().setTitle('Godziny lekcji')
    this.addItems()
  }
}
