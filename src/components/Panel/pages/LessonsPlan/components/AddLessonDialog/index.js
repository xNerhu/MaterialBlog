import Component from 'inferno-component'

import { addCategory } from '../../../../../../actions/gallery'

import Dialog from '../../../../../../materialdesign/components/Dialog'
import TextField from '../../../../../../materialdesign/components/TextField'

export default class AddCategoryDialog extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      dialogItems: [
        {
          text: 'DODAJ',
          onClick: this.onAddButtonClick
        },
        {
          text: 'ANULUJ',
          onClick: this.onCancelButtonClick
        }
      ]
    }
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  onCancelButtonClick = (e) => {
    this.elements.dialog.toggle(false)
  }

  onAddButtonClick = async (e) => {
    const panel = window.panel
    const lessonsPlanPage = window.panel.elements.lessonsPlanPage

    const dialog = this.elements.dialog

    if (this.verify()) {
      const textField = this.elements.textField

      const days = lessonsPlanPage.state.days.slice()
      const dayIndex = lessonsPlanPage.selectedDay.props.index

      days[dayIndex].subjects.push(textField.getValue())

      lessonsPlanPage.setState({
        days
      })

      const dayElement = lessonsPlanPage.days[dayIndex]
      dayElement.isEdited = true

      lessonsPlanPage.toggleActionButtons(dayElement, true)

      textField.setValue('')
      dialog.toggle(false)
    }
  }

  verify () {
    const textField = this.elements.textField
    const length = textField.getValue().length

    if (length < 1) return textField.toggleError(true)
    else if (length > 20) return false

    return true
  }

  render () {
    return (
      <div className='input-dialog' ref={(e) => this.elements.root = e}>
        <Dialog title='Dodaj nową lekcję' ref={(e) => this.elements.dialog = e} items={this.state.dialogItems}>
          <TextField ref={(e) => this.elements.textField = e} hint='Lekcja' helperText='*Wymagane' maxLength={20} />
        </Dialog>
      </div>
    )
  }
}
