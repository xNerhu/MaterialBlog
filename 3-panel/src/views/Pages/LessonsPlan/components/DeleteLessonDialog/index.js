import Component from '../../../../../helpers/Component'
import DialogManager from '../../../../../helpers/DialogManager'

import Dialog from '../../../../../imports/materialdesign/components/Dialog'

import Preloader from '../../../../../imports/materialdesign/components/Preloader'

export default class DeleteLessonDialog extends Component {
  beforeRender () {
    this.day = null
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Sets dialog action buttons.
   */
  setDialogItems () {
    const dialog = this.elements.dialog

    const items = [
      {
        text: 'USUŃ',
        onClick: this.onDeleteButtonClick
      },
      {
        text: 'ANULUJ',
        onClick: function () {
          dialog.toggle(false)
        }
      }
    ]

    dialog.setItems(items)
  }

  onDeleteButtonClick = (e) => {
    const app = window.app

    const root = this.getRoot()
    const dialog = this.elements.dialog
    const lessonsPlanPage = app.getLessonsPlanPage()

    const clickedLesson = lessonsPlanPage.clickedLesson
    const day = clickedLesson.props.getDay()
    const dayIndex = lessonsPlanPage.days.indexOf(day)
    const lessonIndex = day.subjects.indexOf(clickedLesson)

    if (lessonIndex < 0) {
      console.log('Index is less than 0')
    }

    root.classList.add('enabled-preloader')

    setTimeout(function () {
      root.classList.remove('enabled-preloader')

      lessonsPlanPage.lessonsPlan.plan[dayIndex].subjects.splice(lessonIndex, 1)
      lessonsPlanPage.lessonsPlanCopy = JSON.parse(JSON.stringify(lessonsPlanPage.lessonsPlan))

      for (var i = 0; i < lessonsPlanPage.days.length; i++) {
        lessonsPlanPage.toggleActionButtons(false, lessonsPlanPage.days[i].actionButtons)
      }

      day.addSubjects()
      app.elements.deleteLessonSnackbar.toggle(true)
      dialog.toggle(false)
    }, 1000)
  }

  render () {
    return (
      <div className='input-dialog delete-lesson-dialog' ref='root'>
        <Dialog title='Czy napewno chcesz usunąć tą lekcję?' ref='dialog'>
          <div className='text'>
            Nie będzie można tego cofnąć.
            <br />Zapisze to również jakie kolwiek zmiany w planie.
          </div>
          <Preloader />
        </Dialog>
      </div>
    )
  }

  afterRender () {
    this.setDialogItems()
  }
}
