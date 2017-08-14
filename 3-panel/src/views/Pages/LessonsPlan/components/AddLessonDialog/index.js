import Component from '../../../../../helpers/Component'
import DialogManager from '../../../../../helpers/DialogManager'

import Dialog from '../../../../../imports/materialdesign/components/Dialog'

import TextField from '../../../../../imports/materialdesign/components/TextField'
import Preloader from '../../../../../imports/materialdesign/components/Preloader'

export default class AddLessonDialog extends Component {
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
        text: 'DODAJ',
        onClick: this.onAddButtonClick
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

  /**
   * On dialog action button add category click.
   * @param {Event}
   */
  onAddButtonClick = (e) => {
    const dialog = this.elements.dialog

    const app = window.app
    const lessonsPlanPage = app.getLessonsPlanPage()

    const index = lessonsPlanPage.days.indexOf(this.day)

    if (index < 0) {
      console.log('Index is less than 0')
    } else {
      const error = DialogManager.checkForErrors(this)

      if (!error) {
        lessonsPlanPage.lessonsPlan.plan[index].subjects.push(this.textField.getValue())
        this.day.addSubjects()
        this.day.isEdited = true
        lessonsPlanPage.toggleActionButtons(true, this.day.actionButtons)

        dialog.toggle(false)
      }
    }
  }

  /**
   * Shows dialog and clear text field value.
   */
  show (day) {
    this.day = day
    this.elements.dialog.toggle(true)
    this.textField.setValue('')
  }

  render () {
    return (
      <div className='input-dialog' ref='root'>
        <Dialog title='Dodaj lekcję' ref='dialog'>
          <TextField ref={(e) => this.textField = e} hint='Lekcja' helperText='*Wymagane' maxLength={20} />
          <Preloader />
        </Dialog>
      </div>
    )
  }

  afterRender () {
    this.setDialogItems()
  }
}
