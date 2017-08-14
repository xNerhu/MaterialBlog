import Component from '../../../../../helpers/Component'

import Dialog from '../../../../../imports/materialdesign/components/Dialog'

import Preloader from '../../../../../imports/materialdesign/components/Preloader'

export default class DeleteLessonHoursDialog extends Component {
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
    const lessonsPlan = lessonsPlanPage.lessonsPlan
    const clickedLessonHours = lessonsPlanPage.clickedLessonHours
    const lessonHours = lessonsPlanPage.elements.lessonHours

    const itemIndex = lessonHours.items.indexOf(clickedLessonHours)

    if (itemIndex < 0) {
      console.log('Index is less than 0')
    }

    lessonsPlanPage.toggleActionButtons(false, lessonsPlanPage.elements.lessonHours.actionButtons)

    root.classList.add('enabled-preloader')

    setTimeout(function () {
      root.classList.remove('enabled-preloader')

      lessonsPlan.start.splice(itemIndex, 1)
      lessonsPlan.finish.splice(itemIndex, 1)
      lessonsPlanPage.lessonsPlanCopy = JSON.parse(JSON.stringify(lessonsPlanPage.lessonsPlan))

      lessonHours.addItems()
      app.elements.deleteLessonHoursSnackbar.toggle(true)
      dialog.toggle(false)

      for (var i = 0; i < lessonsPlanPage.days.length; i++) {
        lessonsPlanPage.toggleActionButtons(false, lessonsPlanPage.days[i].actionButtons)
      }
    }, 1000)
  }

  render () {
    return (
      <div className='input-dialog delete-lesson-hours-dialog' ref='root'>
        <Dialog title='Czy napewno chcesz usunąć godziny lekcji?' ref='dialog'>
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
